cordova.define("com.cmpsoft.mobile.plugin.pushnotification.FGPushNotification", function(require, exports, module) { 
var argscheck = require('cordova/argscheck'),
    cordova = require('cordova'),
    exec = require('cordova/exec');




var FGPushNotification = function() {
	this.registered = false;
	this.title = null;
	this.description = null;
	this.value = null;
	//
	this.appId = null;
    this.channelId = null;
    this.clientId = null;
    
    var me = this;

     me.getInfo(function(info) {
            me.appId = info.appId;
            me.channelId = info.channelId;
            me.clientId = info.clientId;
        });
    
};


FGPushNotification.prototype.openNotificationInAndroidCallback = function(data){
	try{
	    
		console.log("BPushPlugin:openNotificationInAndroidCallback"); 
		var bToObj  = JSON.parse(data);
		fastgoPushNotification.title = bToObj.title;
		fastgoPushNotification.description = bToObj.description;
		fastgoPushNotification.value = bToObj.value;
		cordova.fireDocumentEvent('bpush.openNotification',data);
	
		
	}
	catch(exception){               
		console.log(exception);
	}
}


FGPushNotification.prototype.init = function(api_key)
{
    exec(fastgoPushNotification.successFn, fastgoPushNotification.failureFn, 'FGPushNotification', 'init', [api_key]);
    alert("api_key---------------"+api_key);
};

FGPushNotification.prototype.successFn = function(info)
{
	if(info){
		fastgoPushNotification.registered = true;
		cordova.fireDocumentEvent("cloudPushRegistered", info);
	}
};

FGPushNotification.prototype.failureFn = function(info)
{
	fastgoPushNotification.registered = false;
};

FGPushNotification.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'FGPushNotification.getInfo', arguments);
    exec(successCallback, errorCallback, "FGPushNotification", "getInfo", []);
};
var fastgoPushNotification = new FGPushNotification();

module.exports = fastgoPushNotification;

});
