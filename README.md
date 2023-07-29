# Matt Martin's Personal Site
Visit the [Site!](https://mmartin4972.github.io/)

Project Start: 3/21/20

This website was written entirely from scratch using HTML, CSS, Javascript, and jQuery. The YouTube Video player is a plugin created by pupunzi,
who did an incredible job creating it. The contact form was based on code written by "freecontactform.com". The parallax effect used in various 
webpages was based on a demo by w3schools.com. Insipration for the effects of this site came from hyperlite.com.  Implementation of these effects 
and all other aspects of the website is completely original.

The Rust server for this site currently runs on Heroku and its implementation is based only on the simple multi-threaded server described in the Rust documentation
This project could become completely trivial if I were to use the Rocket library, Nginx, or Firebase; however, since this is a personal project to enhance my own knowledge I am not going to use any of these libraries or platforms.

## Technologies

## Setup
- ```git clone https://github.com/mmartin4972/mmartin4972.github.io.git```
- ```docker pull mmartin4972/ubuntu20:dev```
- ```docker container run -p 8080:8080 -v <name of current path e.g. C:\Users\mmart\Programming\website\:/website -dt mmartin4972/ubuntu20:dev```
### Push to Heroku
    git push heroku Development:main

## TODO
* Add better error handling for the different routes
* Add a system that is going to construct html from default and specific static pages
* Add reading environment variables for debug configuration, so can monitor local host or the actual host port
* Create a memory caching system that threads are able to access so they don't constantly have to open and read files
* Add support for handling TLS requests
* Could add zip decompression on the client side when reading an image or large file
* Add logging to track what the response time is
