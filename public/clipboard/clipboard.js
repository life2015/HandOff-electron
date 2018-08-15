const {clipboard, Notification} = require('electron');
const openSocket = require('socket.io-client');
const socket = openSocket('http://localhost:8081');

let clipboardText = "";

module.exports = () => {
    socket.on('MobileClipBoardText', msg => {
        const text = msg.textData;
        clipboard.writeText(text);
    })
        setInterval(() => {
            let tempText = clipboard.readText();
            if(clipboardText != tempText){
                clipboardText = tempText;
                console.log(clipboardText);
                socket.emit('DesktopClipBoard',{
                    textData: clipboardText
                })
                // let noti = new Notification({
                //     title: '剪贴板变化',
                //     body: clipboardText
                // });
                // noti.show();
                
            } 
    
        }, 500);
} 