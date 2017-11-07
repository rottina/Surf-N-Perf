!function(a,b){"function"==typeof define&&define.amd?define("surfnperf/resource-timing",["surfnperf"],b):"object"==typeof exports?module.exports=b(require("surfnperf")):a.surfnperfRT=b(a.surfnperf)}(this,function(a){var b=function(a,b){if(Array.prototype.indexOf)return-1!=a.indexOf(b);var c,d=a.length;for(c=0;c<d;c++)if(a[c]===b)return!0;return!1},c=function(){this._resourceTiming=null,this.initialize()},d=c.prototype;return d.initialize=function(){window.performance?(this._resourceTiming=!!window.performance.getEntriesByType,this._perf=function(){return window.performance}):this._resourceTiming=!1},d._inList=function(a,c){return c=c||{},c.hasOwnProperty("whitelist")?b(c.whitelist,a):!c.hasOwnProperty("blacklist")||!b(c.blacklist,a)},d._getURLOrigin=function(a){var b=document.createElement("a");return b.href=a,b.protocol+"//"+b.host},d.getOrigins=function(a){if(this._resourceTiming){var c=this.getResources(),d=[];for(var e in c){var f=this._getURLOrigin(c[e].name);!b(d,f)&&this._inList(f,a)&&0===f.indexOf("http")&&d.push(f)}return d}return null},d.getResourcesFromOrigin=function(a,b){if(this._resourceTiming){for(var c=this.getResources(),d=[],e=0,f=c.length;e<f;e++){this._getURLOrigin(c[e].name)===a&&(b?d.push(c[e][b]):d.push(c[e]))}return d}return null},d.getResourceNamesFromOrigin=function(a){return this.getResourcesFromOrigin(a,"name")},d.getLocation=function(){return window.location},d._name=function(a){if("/"==a.charAt(0)){var b=this.getLocation();return b.protocol+"//"+b.host+a}return a},d.getResources=function(a){return this._resourceTiming?a?this._perf().getEntriesByName(this._name(a),"resource"):this._perf().getEntriesByType("resource"):null},d.getResourceCount=function(a){return this._resourceTiming?this.getResources(a).length:null},d.getResource=function(a,b){if(this._resourceTiming){if("string"==typeof a){var c=this.getResources(a),d=0;return b&&("object"==typeof b?d=b.index||0:"number"!=typeof b&&"string"!=typeof b||(d=b)),"last"===d&&(d=c.length-1),c[d]}return a}return null},d.getLastResource=function(a){return this._resourceTiming?this.getResource(a,"last"):null},d.duration=function(b,c,d,e){if(this._resourceTiming){var f=this.getResource(b,e);return f?0!==f[c]&&0!==f[d]&&a._roundedDuration(f[c],f[d],e):void 0}return null},d.getStart=function(b,c){if(this._resourceTiming){var d=this.getResource(b,c);return d?a._round(d.startTime,c):void 0}return null},d.getEnd=function(b,c){if(this._resourceTiming){var d=this.getResource(b,c);return d?a._round(d.responseEnd,c):void 0}return null},d.getFullRequestLoadTime=function(b,c){if(this._resourceTiming){var d=this.getResource(b,c);return d?a._round(d.duration,c):void 0}return null},d.getNetworkTime=function(a,b){return this._resourceTiming?this.duration(a,"fetchStart","connectEnd",b):null},d.getServerTime=function(a,b){return this._resourceTiming?this.duration(a,"requestStart","responseEnd",b):null},d.getBlockingTime=function(a,b){if(this._resourceTiming){var c=this.getResource(a,b);return c?c.connectEnd&&c.connectEnd===c.fetchStart?this.duration(a,"connectEnd","requestStart",b):!!c.domainLookupStart&&this.duration(a,"fetchStart","domainLookupStart",b):void 0}return null},d.getNetworkDuration=function(b,c){if(!this._resourceTiming)return null;var d=this.getResource(b,c);if(d){if(d.domainLookupStart){c=c||{};var e={decimalPlaces:15,index:c.index},f=this.duration(b,"domainLookupStart","domainLookupEnd",e),g=this.duration(b,"connectStart","connectEnd",e),h=this.duration(b,"requestStart","responseEnd",e);return a._round(f+g+h,c)}return!1}},new c});