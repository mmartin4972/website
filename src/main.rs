use std::net::{TcpStream, TcpListener};
use std::io::{Read, Write};
use std::str::Bytes;
use std::thread::panicking;
use http::{Response, StatusCode, Version};
use std::{env, default};
use httparse::{Header, Request, Error};
use std::path::Path;
use std::fs;

pub mod thread_pool;

/// EFFECTS:
/// * Listens for incoming requests on a port
/// * Sends incoming requests to a thread in the thread pool to be handled
/// * Loops forever and never returns
fn main() {    
    // Read environment variables
    let port: String;
    let is_debug: bool;
    let pool_size: usize;
    match std::env::var("PORT") { // Bind to heroku port environment variable
        Ok(p) => port = p,
        Err(_) => port = "8080".to_string(),
    }
    match std::env::var("DEBUG") {
        Ok(v) => is_debug = v == "1".to_string(),
        Err(_) => is_debug = false,
    }
    match std::env::var("POOL_SIZE") {
        Ok(v) => pool_size = v.parse::<usize>().unwrap(),
        Err(_) => pool_size = 1,
    }

    // Start listenging for connections
    let mut tp = thread_pool::ThreadPool::new(pool_size, 200);
    let address = "0.0.0.0:".to_string() + &port;
    let listener = TcpListener::bind(address).unwrap();
    print!("Listening on port: {}\n", port);
    
    // Spawn a thread for each established connection
    for stream in listener.incoming() {
        match stream {
            Ok(succ_stream) => tp.execute(|| {handle_connection(succ_stream)}),
            Err(_) => print!("Connection Error\n")
        }
    }
}

/// MODIFIES: stream
/// EFFECTS:
/// * Reads from stream, writes response to stream, and closes stream
/// * Contains all error handling logic. All other functions should propogate errors to this function
fn handle_connection(mut stream: TcpStream) {
    // Variables declared outside of function, since returned value contains references to them and 
    //  is faster if these variables are kept on the stack
    let mut headers = [httparse::EMPTY_HEADER; 100]; // request can have at most 100 headers
    let mut buffer = [0; 1024]; // Provided information shouldn't be over 1024 bytes long, since don't support file uploads, but could change in future
    let req = get_request(&mut stream, &mut headers, &mut buffer);    

    // Get Path
    let mut p: &str;    
    match req {
        Ok(r) => p = r.path.unwrap(),
        Err(e) => { stream.write(&gen_error()); return () },
    }
    print!("P : {}\n", p);
    
    // Routing Configuration
    if p == "/" { 
        p = "/index.html";
    }

    // Generate and send the response
    let res = gen_response(p);
    match res {
        Ok(r) => {
            let bytes_written = stream.write(&r);
            match bytes_written {
                Ok(_) => print!("Response succeeded\n"),
                Err(_) => print!("Response failed\n")
            }
        },
        Err(s) => {
            print!("ERROR: Generating the response failed with {}", s);
            _ = stream.write(&gen_error());
        }
    }
}

/// Overview: Basic struct defining different file endings
struct FILE_TYPES {
}
impl FILE_TYPES {
    const HTML: &'static str = ".html";
    const CSS: &'static str = ".css";
    const JS: &'static str = ".js";
    const PNG: &'static str = ".png";
    const JPG: &'static str = ".jpg";
}

/// MODIFIES: stream, headers, buffer
/// EFFECTS:
/// * Reads from the stream and parses the data stream as a new http Request object
/// * Returns the newly parsed request object
/// Note:
/// * headers and buffer are passed as parameters, since we need their lifetime to exceed that of
///     this function, but declaring them locally, would cause them to be destroyed when the function returns
///     I wanted to avoid heap allocation, since it seems Rust is optimized to avoid doing so
fn get_request<'s>(stream: &'s mut TcpStream, headers: &'s mut [Header<'s>], buffer: &'s mut [u8]) -> Result<httparse::Request<'s, 's>, Error> {
    let cur_byte = 0;
    let mut read_end = false;
    
    // Read HTTP Request from TCP Stream
    loop {
        let len = buffer.len();
        let s = stream.read(&mut buffer[cur_byte..len]);
        let mut size_read = 0;
        match s {
            Ok(size) => size_read = size,
            Err(_) => return Err(Error::NewLine),
        }
        
        if size_read == 0 {break;}
        if cur_byte + size_read > 1024 {panic!("Reading more than 1024 bytes")}
        if size_read >= 4 {
            for i in cur_byte..(cur_byte + size_read - 3) {
                print!("char: {}\n", buffer[i]);
                if buffer[i] == '\r' as u8 && buffer[i+1] == '\n' as u8 && buffer[i+2] == '\r' as u8 && buffer[i+3] == '\n' as u8 {
                    read_end = true;
                    break;
                } 
            }
            break;
        }
    }
    if read_end {
        print!("EXPECTING SUCCESS\n");
    } else {
        print!("Shit\n");
    }

    // Parse the info from the read stream
    let mut req = httparse::Request::new(headers);
    let res = req.parse(buffer)?;
    if res.is_partial() {
        panic!("Header only partially acquired\n");
    }
    return Ok(req);
}

/// EFFECTS: 
/// Returns a byte array containing an error message
fn gen_error() -> Vec<u8> {
    let error = 
    "HTTP/1.1 404 Not Found
    \r\n\r\n";
    print!("File Not Found\n");
    return error.to_string().into_bytes();
}

/// EFFECTS:
/// * Returns a vector of bytes containing the information for the 
///     response to be sent back to the client
fn gen_response(path: &str) -> Result<Vec<u8>, &str> {
    
    // Check specified file exists
    let mut file_path = std::env::current_dir().unwrap();
    file_path.push("docs");
    file_path.push(Path::new(&path[1..]));

    let file_path2 = file_path.clone();
    print!("{}\n", file_path2.to_str().unwrap()); 
    
    if !file_path.exists() || file_path.is_dir() {
        return Err("File not found");
    }
    
    let mut content_bytes: Vec<u8>;
    let content_type: &str;
    let content_length: usize;

    if path.ends_with(FILE_TYPES::HTML) {
        let mut default_file_path = std::env::current_dir().unwrap();
        default_file_path.push("docs");
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
        content_type = "text/html";
        content_length = content_bytes.len();

    } else {
        content_bytes = fs::read(file_path).unwrap();
        content_length = content_bytes.len();

        if path.ends_with(FILE_TYPES::JS) {
            content_type = "application/javascript";
        } else if path.ends_with(FILE_TYPES::CSS) {
            content_type = "text/css";
        } else if path.ends_with(FILE_TYPES::PNG) {
            content_type = "image/png";
        } else if path.ends_with(FILE_TYPES::JPG) {
            content_type = "image/jpeg";
        } else { // TODO: Not sure if this is the proper default value
            content_type = "";
        }
    } 
    
    // Build final response as bytes
    let headers = format!(
        "HTTP/1.1 200 OK\nContent-type: {0}\nContent-length: {1}\r\n\r\n", content_type, content_length);

    let mut response = headers.into_bytes();
    response.append(&mut content_bytes);
    return Ok(response);
}
