//     jquery-meta-data
//     (c) simonfan
//     jquery-meta-data is licensed under the MIT terms.

define(["require","exports","module","jquery","lodash","./__jquery-meta-data/read","./__jquery-meta-data/set"],function(e,t,n){var r=e("jquery"),i=e("lodash"),s=e("./__jquery-meta-data/read"),o=e("./__jquery-meta-data/set"),u={};r.metaData=function(){i.isObject(arguments[0])?i.assign(u,arguments[0]):u[arguments[0]]=arguments[1]},r.prototype.metaData=function(t){t=i.isString(t)?u[t]:t;if(arguments.length===1)return s.all(this,t);if(arguments.length!==2)return o.single(this,t,arguments[1],arguments[2]),this;if(i.isString(arguments[1]))return s.single(this,t,arguments[1]);if(i.isObject(arguments[1]))return o.multiple(this,t,arguments[1]),this}});