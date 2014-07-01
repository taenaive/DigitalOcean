//start of  soap test
  var soap = require('soap');
  var url = 'http://198.135.15.18:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep?WSDL';
  var ep_uri ='http://198.135.15.18:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep'
  var args = {retrieveDocumentRequest: {requestHeader:{ loginUserName: 'null', requestId:'1'}}, applicantId:'1111'};
  console.log("trying to connect...");
  soap.createClient(url, function(err, client) {
  	  if(err){
  	  	  console.log("Error msg: " + err);
  	  }
  	  else{
	  	  console.log("       ======= Client  Describe output: ======");
	  	  console.log(client.describe());
	      client.retrieveDocument(args, function(err, result) {
	          console.log(result.DocumentCollection.Document);
      });
      }
  });
