
/* exported FindProxyForURL */

var blockedHosts = [];
const allow = "DIRECT";
const deny = "PROXY http://compress.googlezip.net:80/";


// required PAC function that will be called to determine
// if a proxy should be used.
function FindProxyForURL(url, host) {
  if (url.substring(0,5)==="http:") {
    return deny;
  }
  return allow;
}