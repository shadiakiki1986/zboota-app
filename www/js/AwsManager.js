var AwsManager = function($scope) {
  this.status = "disconnected";
  this.ncheck = 0;
  this.$scope=$scope;
} // end class

AwsManager.prototype.retry = function(cbFn,cbErr) {
     this.ncheck++;
     var self=this;
      console.log("re-attempt", this.ncheck);
      if(this.ncheck<5) {
        setTimeout(function() { self.connect(cbFn,cbErr); },1000);
      } else {
        if(cbErr!=null) cbErr("Aborting waiting for aws cognito connect");
      }
};

AwsManager.prototype.connect = function(cbFn,cbErr) {
  var self=this;
  switch(this.status) {
    case "disconnected":
      console.log("AWS Cognito: disconnected. Will connect");
      this.status="connecting";
  
      // Make the call to obtain credentials
      AWS.config.credentials.get(function(err){
        if(err) { 
          self.status="disconnected";
          if(err.message=="Timeout") {
            self.retry(cbFn,cbErr);
          } else {
            if(cbErr!=null) cbErr(err);
          }
          return;
        }
        self.status="connected";
        //console.log("AWS Cognito connected");
        self.accessKeyId = AWS.config.credentials.accessKeyId;
        self.secretAccessKey = AWS.config.credentials.secretAccessKey;
        self.sessionToken = AWS.config.credentials.sessionToken;
  
        self.ncheck = 0; // reset
        if(cbFn!=null) cbFn();
      });
      break;
    case "connecting":
       this.retry(cbFn,cbErr);
       break;
    case "connected":
      this.ncheck = 0; // reset
      if(cbFn!=null) cbFn();
      break;
    default:
      console.log("Undefined status state");
  }

};

AwsManager.prototype.invokeLambda = function(lfn,lp,cbFn) {
// lfn: lambda function name
// lp: lambda payload, javascript object, before JSON.stringify
// cbFn: callback function, should accept err and data

  var self=this;
  this.connect(function() {
    // zboota-app IAM user
    var lambda = new AWS.Lambda({
        'accessKeyId' : self.accessKeyId,
        'secretAccessKey'  : self.secretAccessKey,
        'sessionToken' : self.sessionToken,
        'region'  : "us-west-2"
    });
  
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#invoke-property
    var params = {
      FunctionName: lfn, /* required */
      Payload: JSON.stringify(lp)
    };
    lambda.invoke(params, cbFn);
  }, function(et) {
console.log("et",et);
  });


}; // end invokeLambda
