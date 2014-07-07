var https = require('https'),      // module for https
    fs =    require('fs'),        // required to read certs and keys
    path = require('path');
console.log("directory name : [%s]", path.join(__dirname, '../fakecerts', 'server.crt'));
var options = {
     cert : fs.readFileSync(path.join(__dirname, '../fakecerts/ca2/', 'server2.crt')),
     key  : fs.readFileSync(path.join(__dirname, '../fakecerts', 'server.key')),
     ca   : fs.readFileSync(path.join(__dirname, '../fakecerts/ca2/', 'ca2.crt')),
    requestCert:        true,
    rejectUnauthorized: false,
    passphrase: 'tae123456'
};

https.createServer(options, function (req, res) {
    if (req.client.authorized) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end('{"status";:"approved"}');
    } else {
    	var cert = req.connection.getPeerCertificate();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({"status": "denied", "cert" : cert}) );
        res.end();
    }
}).listen(443);

// create client pcks12
// cat client.key client.crt > client.pem
// openssl pkcs12 -export -in client.pem -out client.pkcs12 -name "taePcks12"