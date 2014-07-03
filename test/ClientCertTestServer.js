var https = require('https'),      // module for https
    fs =    require('fs'),        // required to read certs and keys
    path = require('path');
console.log("directory name : [%s]", path.join(__dirname, '../fakecerts', 'server.crt'));
var options = {
     cert : fs.readFileSync(path.join(__dirname, '../fakecerts', 'server.crt')),
     key  : fs.readFileSync(path.join(__dirname, '../fakecerts', 'server.key')),
     ca   : fs.readFileSync(path.join(__dirname, '../fakecerts', 'ca.crt')),
    requestCert:        true,
    rejectUnauthorized: false,
    passphrase: 'tae123456'
};

https.createServer(options, function (req, res) {
    if (req.client.authorized) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end('{"status";:"approved"}');
    } else {
        res.writeHead(401, {"Content-Type": "application/json"});
        res.end('{"status": "denied"}');
    }
}).listen(3000);