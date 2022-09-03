
/// Embodies all data structures and infrastructure utilized by the server
// Exports identifiers from private sub-modules into the current
// Now instead of having to use server::thread_pool::Thread_pool to access Thread_pool, just do server::Thread_pool

use std::sync::{Mutex, Arc, Condvar};
use std::thread;
use std::sync::atomic::{Ordering, AtomicUsize, AtomicBool};
use std::thread::JoinHandle;
use std::collections::VecDeque;

/// Overview:
/// * Custom ThreadPool
/// * Built primarily for learning purposes
/// * Advantage of the thread pool is that resources (threads) are able to be reused across tasks instead
///     of being recreated for every single job that needs to be handled
/// * Threadpool can be iterated upon, but in its naive form it creates a pool with a specified number of threads
/// * These threads consume no CPU time while waiting for tasks to be provided
/// * All threads are created with the construction of the threadpool and destroyed gracefully at ThreadPool shutdown
/// * TODO: Add dynamic thread construction and destruction based on server load
/// * TODO: Remove the ```unwrap``` usage throughout the thread pool
/// * Channels are not used simply because I was learning synchronization primitives. Their use would simplify and likely boost code performance
/// * Doesn't guarantee that all functions in the queue will be executed before the pool is dstructed
pub struct ThreadPool {
    m_pool_size: usize,
    m_thread_count: usize,
    m_thread_handles: Vec<JoinHandle<()>>, // Returns unit type which is the equivalent of void
    m_running_task_count: Arc<AtomicUsize>, // Counts the number of tasks that are currently running
    m_job_queue: Arc<Mutex<VecDeque<Job>>>,
    m_job_queue_condvar: Arc<Condvar>,
    m_wait_condvar: Arc<Condvar>,
    m_is_alive: Arc<AtomicBool>,
}

type Job = Box<dyn FnOnce() + Send + Sync + 'static>;

impl ThreadPool {

    /// EFFECTS:
    /// * Iniitializes a new thread pool that can have at most `size` threads
    ///   
    /// NOTES:
    /// * No reference to self since this object should be callable without having an instance of ThreadPool
    /// Examples
    /// * This example is not currently functional because this is a module in a binary crate and rust doesn't run doc tests on binary crates
    /// ```
    /// let tp = ThreadPool::new(2,400);
    /// assert_eq!(tp.get_pool_size(), 1);
    /// ```
    pub fn new(pool_size: usize, queue_size: usize) -> ThreadPool { // This function needs to be made static since it is generating a new Thread_pool
        
        let mut tp = ThreadPool{
            m_pool_size: pool_size,
            m_thread_count: 0,
            m_thread_handles: Vec::with_capacity(pool_size),
            m_running_task_count: Arc::new(AtomicUsize::new(0)), // Allocate atomic usize on the heap and get a pointer to it
            m_job_queue: Arc::new(Mutex::new(VecDeque::with_capacity(queue_size))),
            m_job_queue_condvar: Arc::new(Condvar::new()),
            m_wait_condvar: Arc::new(Condvar::new()),
            m_is_alive: Arc::new(AtomicBool::new(true)),
        };
        
        // Spawn all the threads and put their handles into a vector
        let thread_vec  = &mut tp.m_thread_handles;
        thread_vec.reserve(tp.m_pool_size);
        for _ in 0..tp.m_pool_size {
            let running_task_count_copy = tp.m_running_task_count.clone();
            let job_queue_copy = tp.m_job_queue.clone();
            let job_queue_condvar_copy = tp.m_job_queue_condvar.clone();
            let wait_condvar = tp.m_wait_condvar.clone();
            let is_alive = tp.m_is_alive.clone();
            thread_vec.push(thread::spawn(move || {
                ThreadPool::do_work(
                    running_task_count_copy,
                    job_queue_copy,
                    job_queue_condvar_copy,
                    wait_condvar,
                    is_alive,
                )})); // Spawn cannot be passed parameters and the function it is provided must be static. Only way to pass parameters is to use closure?
            tp.m_thread_count += 1;
        }
        
        return tp;
    }

    /// MODIFIES:
    /// * running_task_count, send_chan
    /// EFFECTS: 
    /// * Pulls a task off the shared memory task list, updates the task count, executes the task, updates the task count, sends a reply to the main thread
    /// * Function executed by each spawned thread
    fn do_work(running_task_count: Arc<AtomicUsize>, job_queue_copy: Arc<Mutex<VecDeque<Job>>>, job_queue_condvar: Arc<Condvar>, wait_condvar: Arc<Condvar>, is_alive: Arc<AtomicBool>) {
        loop {
            let job;
            {
                let mut queue = job_queue_copy.lock().unwrap(); // queue is really a pointer, but rust auto dereferencing allows us to ignore that
                while is_alive.load(Ordering::Relaxed) && queue.len() == 0 {
                    queue = job_queue_condvar.wait(queue).unwrap();
                }
                if is_alive.load(Ordering::Relaxed) == false {
                    return;
                }
                running_task_count.fetch_add(1, Ordering::Relaxed);
                job = queue.pop_front().unwrap();
            }
            job();
            running_task_count.fetch_sub(1, Ordering::Relaxed);
            {
                let queue = job_queue_copy.lock().unwrap(); // queue is really a pointer, but rust auto dereferencing allows us to ignore that
                if queue.len() == 0 && running_task_count.load(Ordering::Relaxed) == 0 {
                    wait_condvar.notify_all();
                } 
            }
        }
    }

    /// REQUIRES:
    ///     
    /// EFFECTS:  
    /// * Adds the provided function to the thread pool for execution
    ///     
    /// NOTES:
    /// * Self permits you to omit the parameter type most of the time. Also always pass self by reference so that you don't destroy object at the end of function call. Unless you wnat that to happen.
    /// * `FnOnce()`: Trait that says the function must be able to be called at least one time and might require variables in the surrounding environment. Is the most generic function trait
    /// * `Send`: trait makes sure that we can communicate with the function across threads and static specifies that the lifetime of the function is the same as that of the program.
    /// * `'static`: makes sense in this case since the function is likely a code segment and the code segment is static and globally accessible
    /// * It is important that this function doesn't take in a mutable self object. This is because an immutable threadpool reference is far easier to share amongst threads. Therfore, the threadpool can
    ///     be shared across multiple threads trivially if all references are immutable, while if execute is mutable there has to be coordination amongs the various threads using the pool.
    pub fn execute<F>(&mut self, f: F)
    where
        F: FnOnce() + Send + Sync + 'static 
    {
        // print!("{0}\n", self.m_size);
        let mut queue = self.m_job_queue.lock().unwrap();
        queue.push_back(Box::new(f));
        self.m_job_queue_condvar.notify_one();
    }

    /// EFFECTS:
    /// * blocks until all tasks have been completed
    /// * consumes minimal amounts of CPU while blocking
    pub fn wait_for_completion(&self) {
        let mut queue = self.m_job_queue.lock().unwrap();
        while queue.len() != 0 || self.m_running_task_count.load(Ordering::Relaxed) != 0 {
            queue = self.m_wait_condvar.wait(queue).unwrap();
        }
    }

    /// Thread count getter
    pub fn get_thread_count(&self) -> usize {
        return self.m_thread_count;
    }

    /// Pool size getter 
    pub fn get_pool_size(&self) -> usize {
        return self.m_pool_size;
    }

}

/// MODIFIES: 
/// * m_is_alive
/// * m_thread_handles
/// EFFECTS: 
/// * sets is_alive to false 
/// * waits for all threads to join
impl Drop for ThreadPool {
    fn drop(&mut self) {
        // print!("THREAD POOL DROPPED BITCHES\n");
        self.m_is_alive.store(false, Ordering::Relaxed);
        self.m_job_queue_condvar.notify_all();
        for _ in 0..self.m_thread_handles.len() {
            let handle = self.m_thread_handles.pop(); // Because the JoinHandle is destroyed when join is called, we must pull the JoinHandle out of the vector since join requires a mutable reference to the handle
            // print!("WAITING TO JOIN!!\n");
            handle.unwrap().join().unwrap();
        }
        let queue = self.m_job_queue.lock().unwrap();
        print!("Unfinished tasks length is {}\n", queue.len());
    }
}

#[cfg(test)]
mod tests {
    use std::thread::{sleep};
    use std::time::{Duration};
    use super::*;

    #[test]
    fn init() {
        let tp = ThreadPool::new(1,1);
        assert_eq!(1, tp.m_thread_count);
        assert_eq!(1, tp.get_thread_count());
    }

    #[test]
    fn test_wait_for_completion() {
        let mut tp = ThreadPool::new(4,200);
        assert_eq!(tp.get_pool_size(), tp.get_thread_count());
        let wait_1_sec = || {sleep(Duration::from_secs(1));};
        for _ in 0..(tp.get_pool_size()*2) {
            tp.execute(wait_1_sec);
        }
        tp.wait_for_completion();
        assert_eq!(tp.m_running_task_count.load(Ordering::Relaxed), 0);
    }

}
