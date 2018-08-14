const {clipboard, Notification} = require('electron');
let clipboardText = "";

module.exports = () => {
    setTimeout(()=>{
        setInterval(() => {
            let tempText = clipboard.readText();
            if(clipboardText != tempText){
                clipboardText = tempText;
                console.log(clipboardText);
                let noti = new Notification({
                    title: '剪贴板变化',
                    body: clipboardText
                });
                noti.show();
                
            } 
    
        }, 1000);
    },5000);
} 