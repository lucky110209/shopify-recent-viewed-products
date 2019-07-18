/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};

/**
 * Module to show Recently Viewed Products
 *
 * Copyright (c) 2014 Caroline Schnapp (11heavens.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
Shopify.Products=(function(){var a={howManyToShow:3,howManyToStoreInMemory:10,wrapperId:"recently-viewed-products",templateId:"recently-viewed-product-template",onComplete:null};var c=[];var h=null;var d=null;var e=0;var b={configuration:{expires:90,path:"/",domain:window.location.hostname},name:"shopify_recently_viewed",write:function(i){jQuery.cookie(this.name,i.join(" "),this.configuration)},read:function(){var i=[];var j=jQuery.cookie(this.name);if(j!==null){i=j.split(" ")}return i},destroy:function(){jQuery.cookie(this.name,null,this.configuration)},remove:function(k){var j=this.read();var i=jQuery.inArray(k,j);if(i!==-1){j.splice(i,1);this.write(j)}}};var f=function(){h.show();if(a.onComplete){try{a.onComplete()}catch(i){}}};var g=function(){if(c.length&&e<a.howManyToShow){jQuery.ajax({dataType:"json",url:"/products/"+c[0]+".js",cache:false,success:function(i){d.tmpl(i).appendTo(h);c.shift();e++;g()},error:function(){b.remove(c[0]);c.shift();g()}})}else{f()}};return{resizeImage:function(m,j){if(j==null){return m}if(j=="master"){return m.replace(/http(s)?:/,"")}var i=m.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?/i);if(i!=null){var k=m.split(i[0]);var l=i[0];return(k[0]+"_"+j+l).replace(/http(s)?:/,"")}else{return null}},showRecentlyViewed:function(i){var i=i||{};jQuery.extend(a,i);c=b.read();d=jQuery("#"+a.templateId);h=jQuery("#"+a.wrapperId);a.howManyToShow=Math.min(c.length,a.howManyToShow);if(a.howManyToShow&&d.length&&h.length){g()}},getConfig:function(){return a},clearList:function(){b.destroy()},recordRecentlyViewed:function(l){var l=l||{};jQuery.extend(a,l);var j=b.read();if(window.location.pathname.indexOf("/products/")!==-1){var k=window.location.pathname.match(/\/products\/([a-z0-9\-]+)/)[1];var i=jQuery.inArray(k,j);if(i===-1){j.unshift(k);j=j.splice(0,a.howManyToStoreInMemory)}else{j.splice(i,1);j.unshift(k)}b.write(j)}}}})();
var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
Shopify.formatMoney = function(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};
