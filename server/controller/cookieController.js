const cookieController = {};

//create a session controller that will set a cookie when a user creates an account and logs into the app
//cookie will have expire after x time
//set to HttpOnly: true  so client-side JavaScript cannot access your cookie, 
//This greatly decreases the likelihood of it being stolen or manipulated by malicious JavaScript running on the client

cookieController.setCookie = (req, res, next => {

})


//store user ID in a cookie

cookieController.setSSIDCookie = (req, res, next => {
    
})


module.export = cookieController;