//     jquery-meta-data
//     (c) simonfan
//     jquery-meta-data is licensed under the MIT terms.

define("__jquery-meta-data/helpers",["require","exports","module","jquery","lodash"],function(e,r){e("jquery"),e("lodash");r.buildPrefixRegExp=function(e){return new RegExp("^"+e+"([A-Z$_].*$)")},r.lowercaseFirst=function(e){return e.charAt(0).toLowerCase()+e.slice(1)},r.uppercaseFirst=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},r.fullKey=function(e,t){return e?e+r.uppercaseFirst(t):t}}),define("__jquery-meta-data/read",["require","exports","module","lodash","./helpers"],function(e,r){function t(e){return e}var a=e("lodash"),n=e("./helpers");r.all=function(e,r){var u=e.data(),s=r.parse||t;if(r.prefix){var i=n.buildPrefixRegExp(r.prefix);return a.transform(u,function(t,a,u){var l=u.match(i);if(l){var o=n.lowercaseFirst(l[1]);a=s(a,o,u),r.replace&&e.data(u,a),t[o]=a}})}return a.mapValues(u,function(e,r){return s(e,r,r)})},r.single=function(e,r,t){var a=n.fullKey(r.prefix,t),u=e.data(a);return r.parse&&(u=r.parse(u,t,a),r.replace&&e.data(a,u)),u}}),define("__jquery-meta-data/set",["require","exports","module","lodash","./helpers"],function(e,r){var t=e("lodash"),a=e("./helpers");r.single=function(e,r,t,n){var u=a.fullKey(r.prefix,t);n=r.stringify?r.stringify(n,t,u):n,e.data(u,n)},r.multiple=function(e,a,n){t.each(n,function(t,n){r.single(e,a,n,t)})}}),define("jquery-meta-data",["require","exports","module","jquery","lodash","./__jquery-meta-data/read","./__jquery-meta-data/set"],function(e){var r=e("jquery"),t=e("lodash"),a=e("./__jquery-meta-data/read"),n=e("./__jquery-meta-data/set"),u={};r.metaData=function(){t.isObject(arguments[0])?t.assign(u,arguments[0]):u[arguments[0]]=arguments[1]},r.prototype.metaData=function(e){return e=t.isString(e)?u[e]:e,1===arguments.length?a.all(this,e):2!==arguments.length?(n.single(this,e,arguments[1],arguments[2]),this):t.isString(arguments[1])?a.single(this,e,arguments[1]):t.isObject(arguments[1])?(n.multiple(this,e,arguments[1]),this):void 0}});