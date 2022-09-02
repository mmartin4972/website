use std::net::{TcpStream, TcpListener};
use std::io::{Read, Write};
use http::{Response, StatusCode, Version};

pub mod thread_pool;

/// TODO:
/// * Add a system that is going to construct html from default and specific static pages
/// * Add reading environment variables for debug configuration, so can monitor local host or the actual host port
/// * MUST create a memory caching system that threads are able to access so they don't constantly have to open and read files
/// * Add support for handling TLS requests
/// * Could add zip decompression on the client side when reading an image or large file
/// * Add logging to track what the response time is
/// Notes:
/// * According to this [site](https://engineering.zalando.com/posts/2019/04/how-to-set-an-ideal-thread-pool-size.html) the optima thread pool size = number of cpus * ((1 + wait time) / service time)
fn main() {
    let mut tp = thread_pool::ThreadPool::new(1, 200);
    
    // TODO: make environment variable here
    let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
    
    
    for stream in listener.incoming() {
        print!("Waiting\n");
        match stream {
            Ok(succ_stream) => tp.execute(|| {handle_connection(succ_stream)}),
            Err(_) => print!("Connection Error\n")
        }
    }
}

fn handle_connection(mut stream: TcpStream) {
    // TODO: This whole parsing system is a bit questionable and needs to be thoroughly tested
    let mut buffer = [0; 1024]; // Provided information shouldn't be over 1024 bytes long, since don't support file uploads, but could change in future
    let size_read = stream.read(&mut buffer);
    match size_read {
        Ok(size) => print!("{}\n", size),
        Err(_) => print!("Issue parsing request\n")
    }
    let mut headers = [httparse::EMPTY_HEADER; 4];
    let mut req = httparse::Request::new(&mut headers);
    let res = req.parse(&buffer).unwrap();
    print!("{}\n", res.unwrap());
    
    // Build the response
    let headers = 
        "HTTP/1.1 200 OK
        Content-type: text/html
        \r\n\r\n";

    let mut response = headers.to_string();
    print!("{}\n", response);

    let p = req.path.unwrap();
    print!("{}\n",p);
    let mut content = "";

    if p == "/nice" {
        content = "NICE\n";
    } else {
        content = "You suck\n";
    }

    response += content;
    print!("Response: {}", response);
    let res2 = stream.write(&(response.into_bytes()));
    match res2 {
        Ok(_) => print!("Response succeeded\n"),
        Err(_) => print!("Response failed\n")
    }
    
}
// main listens for incoming connections
// once a tcp connection is established send it to a function that will handle the connection and spawn this function in a thread pool
// the handle connection function is simply going to read what information was requested based on the page and return this information
// it is then the responsibility of the browser to render the static page and make all subsequent requests for other static content

