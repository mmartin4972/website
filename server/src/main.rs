use std::net::{TcpStream, TcpListener};
use std::io::{Read, Write};
use std::str::Bytes;
use http::{Response, StatusCode, Version};
use std::{env, default};
use httparse::{Header, Request};
use std::path::Path;
use std::fs;

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
    let listener = TcpListener::bind("0.0.0.0:8080").unwrap();
    
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
    // Error handling might be an issue here
    let mut buffer = [0; 1024]; // Provided information shouldn't be over 1024 bytes long, since don't support file uploads, but could change in future
    let size_read = stream.read(&mut buffer);
    match size_read {
        Ok(size) => print!("{}\n", size),
        Err(_) => print!("Issue parsing request\n")
    }
    let mut headers = [httparse::EMPTY_HEADER; 100]; // request can have at most 100 headers
    let mut req = httparse::Request::new(&mut headers);
    let res = req.parse(&buffer).unwrap();
    print!("{}\n", res.unwrap());
    // let req = parse_request(&buffer, &headers);
    
    let response = gen_response(req.path.unwrap());

    let res2 = stream.write(&response);
    match res2 {
        Ok(_) => print!("Response succeeded\n"),
        Err(_) => print!("Response failed\n")
    }
    
}

// TODO: Implement this when you want to figure out lifetimes
// fn parse_request(buffer: &[u8], headers: &mut [Header]) -> Request {
//     return req;
// }

struct FILE_TYPES {
}
impl FILE_TYPES {
    const HTML: &'static str = ".html";
    const CSS: &'static str = ".css";
    const JS: &'static str = ".js";
    const PNG: &'static str = ".png";
    const JPG: &'static str = ".jpg";
}

fn gen_response(path: &str) -> Vec<u8> {
    
    // Check specified file exists
    let mut file_path = std::env::current_dir().unwrap();
    file_path.pop();
    file_path.push("client");
    file_path.push(Path::new(&path[1..]));

    let file_path2 = file_path.clone();
    print!("{}\n", file_path2.to_str().unwrap()); 
    
    if !file_path.exists() {
        let error = 
        "HTTP/1.1 404 Not Found
        \r\n\r\n";
        print!("File Not Found\n");
        return error.to_string().into_bytes();
    }
    
    let mut content_bytes: Vec<u8> = Vec::new();
    
    let mut headers: &str = "";

    if path.ends_with(FILE_TYPES::HTML) {
        let mut default_file_path = std::env::current_dir().unwrap();
        default_file_path.pop();
        default_file_path.push("client");
        default_file_path.push("_layouts");
        default_file_path.push("default.html");

        let default_file: String = fs::read_to_string(default_file_path).unwrap(); // need this since the file_parts only has references to this object
        let default_file_parts: Vec<&str> = default_file.split("---").collect();
        let file: String = fs::read_to_string(file_path).unwrap();
        let file_parts: Vec<&str>= file.split("---").collect();

        let mut content: String = "".to_string();
        for i in 0..file_parts.len() {
            content += &default_file_parts[i].to_string();
            content += &file_parts[i].to_string();
        }
        content += &default_file_parts[default_file_parts.len()-1].to_string();

        content_bytes = content.into_bytes();

        headers = 
        "HTTP/1.1 200 OK
        Content-type: text/html
        \r\n\r\n";

    } else if path.ends_with(FILE_TYPES::JS) || path.ends_with(FILE_TYPES::CSS){
        content_bytes = fs::read(file_path).unwrap();
        
        headers = 
        "HTTP/1.1 200 OK
        Content-type: text/html
        \r\n\r\n";
    } else if path.ends_with(FILE_TYPES::PNG) || path.ends_with(FILE_TYPES::JPG) {
        content_bytes = fs::read(file_path).unwrap();
        
        headers = 
        "HTTP/1.1 200 OK
        Content-type: image/jpeg
        \r\n\r\n";
    }

    let mut response = headers.to_string().into_bytes();
    response.append(&mut content_bytes);
    print!("{}\n",path);

    //print!("Response: {}", response);
    return response;
}

// main listens for incoming connections
// once a tcp connection is established send it to a function that will handle the connection and spawn this function in a thread pool
// the handle connection function is simply going to read what information was requested based on the page and return this information
// it is then the responsibility of the browser to render the static page and make all subsequent requests for other static content

