import http from 'http';
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

const requestHandler = (req, res) => {
    if (req.url === '/') {
        eventEmitter.emit('HomePageEvent', res);
    // } else if ( req.url === '/student') {
    //     res.writeHead(200, {'content-type': 'text/html'})
    //     res.write('<html><body><p>Student Page</p></body></html>');
    //     res.end(); 
    // } else if ( req.url === '/admin') {
    //     res.writeHead(200, {'content-type': 'text/html'})
    //     res.write('<html><body><p>Admin Page</p></body></html>');
    //     res.end(); 
    } else {
        res.writeHead(404, {'content-type': 'text/plain'});
        res.write('page not found');
        res.end(); 
    }
};

// Load the homepage
eventEmitter.on('HomePageEvent', (res) => {
    res.writeHead(200, {'content-type': 'text/html'})
    res.write('<html><body><p>Home Page</p></body></html>')
    res.end();
});

eventEmitter.on('HomePageEvent', (res) => {
    // Asynchronously Log that homepage is loaded
    console.log("Homepage loaded");
});

eventEmitter.on('HomePageEvent', (res) => {
    // Asynchronously Log IP Address
    console.log("Visited Homepage from IP",req.socket.remoteAddress);
});

var server = http.createServer(requestHandler);

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000')
});

