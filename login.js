const fs = require("fs");
const login = require("fca-unofficial");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const option = {
    logLevel:"silent",
    forceLogin:true,
   userAgent:  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36",
   //* cách lấy userAgent: F12-> tab console gõ 'navigator.userAgent' Link: https://imgur.com/oQ5hUkH
}

const obj = {email: "vanhuy69@icloud.com", password: ""};
login(obj, option, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }
    // Logged in wirite cookie!
    fs.writeFileSync('./user/hackerman.json', JSON.stringify(api.getAppState()));
    
     
});
