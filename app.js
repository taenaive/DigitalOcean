var flatiron = require('flatiron'),
    fs = require('fs'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http );
app.use(flatiron.plugins.static, { dir: __dirname+'/public' });

// app.router.get('/headers', function () {
//   this.res.json(this.req.headers);
// });

//start of  soap test
 

//end of soap test


app.router.get('/hello', function () {
  this.res.json({ 'hello': 'world' ,'dir' : __dirname })
});

app.router.post('/post',function(){
  console.log( this.req.body );
  
  this.res.writeHead(200, { 'Content-Type': 'application/json' });
  //this.res.write('Hey, you posted some cool data!\n');
  this.res.end(JSON.stringify(this.req.body));
});

app.router.get('/', function(){
	var parentThis = this;
	fs.readFile(__dirname + '/public/index.html', function (err, data) {
		      if (err) {
		        parentThis.res.writeHead(500);
		        return parentThis.res.end('Error loading index.html');
		      }
		      parentThis.res.writeHead(200);
		      parentThis.res.end(data);
		    });
})
app.start(3000);
//test wsdl list and data set
//        reqH.setLoginUserName(null);
//        reqH.setRequestId("1");
//http://mpstd-soa01:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep?WSDL
