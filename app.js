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


app.router.get('/hello', function () {
  this.res.json({ 'hello': 'world' ,'dir' : __dirname })
});

app.router.post('/post',function(){
  //console.log( this.req.body );
  var sig = this.req.body;
  Creature.create({
  					id: "hello"
					}, function(err, c_instance){
					     var baseString = sig.base64png;//data
			             var index = baseString.indexOf(",");  // Gets the first index
			             var imageEncodeType = baseString.substr(0, index); // first part
			             var textCode = baseString.substr(index + 1);//second part
					            
						  c_instance.applicantId = sig.applicantId;
						  c_instance.imageEncodeType = imageEncodeType;
						  c_instance.base64png = textCode;
						  console.log("applicant" + " : " + sig.applicantId +" saved!");

						  c_instance.save(function(err, result){
						    console.log(err, result);
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
//test wsdl list and data set
//        reqH.setLoginUserName(null);
//        reqH.setRequestId("1");
//http://mpstd-soa01:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep?WSDL
