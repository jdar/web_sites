// Intercom with IYO
var APP_ID = "ltb01z7c";
// function readCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }
// var value = readCookie('caddyoauth');
// var decoded = jwt_decode(value);
// var email, userName, phone, userId
// for(var i=0; i<decoded.scope.length;i++){
//     if(decoded.scope[i].includes("[user:email]")){
//           email = decoded.scope[i].split("]:")[1];
//     }
//     else if(decoded.scope[i].includes("[user:name]")) {
//           userName = decoded.scope[i].split("]:")[1];
//     }
//     else if(decoded.scope[i].includes("[user:phone]")) {
//           phone = decoded.scope[i].split("]:")[1];
//     }
// }
// var userId = decoded.username;

window.intercomSettings = {
  app_id: APP_ID,
//   name: userName, // Full name
//   email: email, // Email address
//   phone: phone, // Phone
//   user_id: userId //username of IYO
};

(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function")
{ic('reattach_activator');ic('update',intercomSettings);}else
{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args)
{i.q.push(args)};w.Intercom=i;function l()
{var s=d.createElement('script');s.type='text/javascript';s.async=true;
s.src='https://widget.intercom.io/widget/' + APP_ID;
var x=d.getElementsByTagName('script')[0];
x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}
else{w.addEventListener('load',l,false);}}})()
