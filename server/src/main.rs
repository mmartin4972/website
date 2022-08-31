
pub mod thread_pool;

fn main() {
    let mut tp = thread_pool::ThreadPool::new(4, 200);
    tp.execute(|| { print!("Executed!\n")}); // tp must be mutable since execute takes in a mutable reference to self
    tp.execute(|| { print!("Executed!\n")}); // tp must be mutable since execute takes in a mutable reference to self
}
