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
 var resourceful = require('resourceful');
 	 //resourceful.use('couchdb', {database: 'mpstd'});
 var Creature = resourceful.define('creature', function () {
  //
  // Specify a storage engine
  //
  this.use('couchdb',{
  	
    uri: 'couchdb://127.0.0.1:5984/mpstd'
  });


  //
  // Specify some properties with validation
  //
  this.string('applicantId');
  this.string('imageEncodeType');
  this.string('base64png');
  //this.array('belly');

  //
  // Specify timestamp properties
  //
  this.timestamps();
});

//
// Now that the `Creature` prototype is defined
// we can add custom logic to be available on all instances
//
Creature.prototype.insertSignature = function (sig) {

  var baseString = sig.base64png;//data
            var index = baseString.indexOf(",");  // Gets the first index
            var imageEncodeType = baseString.substr(0, index); // first part
            var textCode = baseString.substr(index + 1);//second part
            
  this.applicantId = sig.applicantId;
  this.imageEncodeType = imageEncodeType;
  this.base64png = textCode;
  console.log("applicant" + " : " + sig.applicantId +" saved!");

};

//end of soap test

function base64ToBuffer(data){
  var b64string = data;
  var buf = new Buffer(b64string, 'base64');
  console.log("base64 buffer length = " +buf.length);
  // var fd = fs.openSync(path.join(__dirname,'public', 'log.png'), 'w')
  //          console.log("fs.write retunred length :"  +
  //                      fs.writeSync(fd, buf,0, buf.length, 0) );
  //             fs.close(fd, function(){
  //                 console.log('file closed');
  //               });
  return buf;
}


app.router.get('/png', function () {
  this.res.writeHead(200, { 'Content-Type': 'image/png' });
  this.res.write(globalbuffer);
  this.res.end();
});

var globalbuffer = new Buffer({}, 'base64');

app.router.post('/post',function(){
  //console.log( this.req.body );
  var sig = this.req.body;
  Creature.create({
  					id: "hello2"
					}, function(err, c_instance){
					     var baseString = sig.base64png;//data
			             var index = baseString.indexOf(",");  // Gets the first index
			             var imageEncodeType = baseString.substr(0, index); // first part
			             var textCode = baseString.substr(index + 1);//second part
					            
						  c_instance.applicantId = sig.applicantId;
						  c_instance.imageEncodeType = imageEncodeType;
						  c_instance.base64png = textCode;
						  console.log("applicant" + " : " + sig.applicantId +" saved!");
              //write to buffer.
              globalbuffer = base64ToBuffer(textCode);
            

						  c_instance.save(function(err, result){
						    console.log(err, "id = " + result.id + " applicantId" + result.applicantId);
						  })
				});
  //Creature.prototype.insertSignature(this.req.body);
  this.res.writeHead(200, { 'Content-Type': 'application/json' });
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
app.start(3000 ,function(){
  console.log(app.router.routes)
  console.log(' > http server started on port 3000');
  console.log(' > visit: http://localhost:3000/ ');
});
//ssh -L5984:localhost:5984 -o TCPKeepAlive=yes -o ServerAliveInterval=15 me@home.com
//test wsdl list and data set
//        reqH.setLoginUserName(null);
//        reqH.setRequestId("1");
//http://mpstd-soa01:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep?WSDL
