module.exports = socketServer => {
    let app = require('express')();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);
    console.log('ok');
    http.listen(8081, () => {
        console.log('listening on 8081');
    });
    io.on('connection', function(socket) {
        console.log('a user connected')
        socket.on('message', msg => {
            console.log(msg);
            socket.broadcast.emit('message',msg);
        });
        socket.on('DesktopClipBoard', msg => {
            console.log(msg);
            socket.broadcast.emit('DesktopClipBoard', msg);
        });
        socket.on('MobileClipBoardText', msg => {
            console.log(msg);
            socket.broadcast.emit('MobileClipBoardText', msg);
        })
    } );
    return io;
}