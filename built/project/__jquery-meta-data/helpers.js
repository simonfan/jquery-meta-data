define(["require","exports","module","jquery","lodash"],function(e,t,n){var r=e("jquery"),i=e("lodash");t.buildPrefixRegExp=function(t){return new RegExp("^"+t+"([A-Z$_].*$)")},t.lowercaseFirst=function(t){return t.charAt(0).toLowerCase()+t.slice(1)},t.uppercaseFirst=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},t.fullKey=function(n,r){return n?n+t.uppercaseFirst(r):r}});