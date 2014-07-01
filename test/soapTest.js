//start of  soap test
  var soap = require('soap');
  var url = 'http://198.135.15.92:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep?WSDL';
  var ep_uri ='http://198.135.15.92:8001/soa-infra/services/default/DocumentUploadDetailsService/DocumentUploadDetailsService_ep'
  var retrieveArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, applicantId:'1122'};
  var saveArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, 
                                        applicantId: '1122',
                                        answerId: 'A-1122-10c',
                                        dDocName: 'dID=1858;dDocName=MPSTD001858',
                                        createdBy: 'nodejs'};
  console.log("trying to connect...");
  soap.createClient(url, function(err, client) {
  	  if(err){
  	  	  console.log("Error msg: " + err);
  	  }
  	  else{
	  	  console.log("       ======= Client  Describe output: ======");
	  	  console.log(client.describe().DocumentUploadDetailsService_ep.DocumentUploadDetailsServicePort_pt.saveDocument);
        //saveDocument , retrieveDocument
        //console.log( JSON.stringify(client) );
        //client.setSecurity(new soap.BasicAuthSecurity('tae', 'Welcome1')); 
	       client.retrieveDocument(retrieveArgs, function(err, result) {
          console.log(result);
	            console.log(result.DocumentCollection.Document);
          });

        // client.saveDocument(saveArgs, function(err, result) {
        //    console.log(result);
        // });

      }
  });
