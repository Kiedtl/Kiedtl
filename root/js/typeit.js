/*!
 *
 *   typeit - The most versatile animated typing utility on the planet.
 *   Author: Alex MacArthur <alex@macarthur.me> (https://macarthur.me)
 *   Version: v5.7.0
 *   URL: https://typeitjs.com
 *   License: GPL-2.0
 *
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.TypeIt=e()}(this,function(){"use strict";function t(t){var e=t.getBoundingClientRect();return!(e.right>window.innerWidth||e.bottom>window.innerHeight)&&!(e.top<0||e.left<0)}function e(t,e){return Math.abs(Math.random()*(t+e-(t-e))+(t-e))}function i(t,e){return 0===t.indexOf(e)}function n(t){return Array.isArray(t)?t.slice(0):t.split("<br>")}window.TypeItDefaults={strings:[],speed:100,deleteSpeed:null,lifeLike:!0,cursor:!0,cursorChar:"|",cursorSpeed:1e3,breakLines:!0,startDelay:250,startDelete:!1,nextStringDelay:750,loop:!1,loopDelay:750,html:!0,autoStart:!0,callback:!1,beforeString:!1,afterString:!1,beforeStep:!1,afterStep:!1,afterComplete:!1};var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),h=function(){function s(t,e,i,n){o(this,s),this.typeit=n,this.timeouts=[],this.id=e,this.queue=[],this.hasStarted=!1,this.isFrozen=!1,this.isComplete=!1,this.isInTag=!1,this.stringsToDelete="",this.style="display:inline;position:relative;font:inherit;color:inherit;",this.element=t,this.setOptions(i,window.TypeItDefaults,!1),this.setNextStringDelay(),this.init()}return r(s,[{key:"contents",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===t?this.options.html?this.elementContainer.innerHTML:this.elementContainer.innerText:(this.options.html?this.elementContainer.innerHTML=t:this.elementContainer.innerText=t,t)}},{key:"setNextStringDelay",value:function(){var t=Array.isArray(this.options.nextStringDelay),e=t?null:this.options.nextStringDelay/2;this.options.nextStringDelay={before:t?this.options.nextStringDelay[0]:e,after:t?this.options.nextStringDelay[1]:e,total:t?this.options.nextStringDelay.reduce(function(t,e){return t+e}):this.options.nextStringDelay}}},{key:"init",value:function(){this.checkElement(),this.options.strings=n(this.options.strings),this.options.strings=this.options.strings.map(function(t){return t.replace(/<\!--.*?-->/g,"")}),this.options.strings.length>=1&&""===this.options.strings[0]||(this.element.innerHTML='\n        <span style="'+this.style+'" class="ti-container"></span>\n      ',this.element.setAttribute("data-typeitid",this.id),this.elementContainer=this.element.querySelector("span"),this.options.startDelete&&(this.insert(this.stringsToDelete),this.queue.push([this.delete]),this.insertSplitPause(1)),this.cursor(),this.generateQueue(),this.kickoff())}},{key:"generateQueue",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e=null===e?[this.pause,this.options.startDelay]:e,this.queue.push(e),this.options.strings.forEach(function(e,i){if(t.queueString(e),i+1!==t.options.strings.length){if(t.options.breakLines)return t.queue.push([t.break]),void t.insertSplitPause(t.queue.length);t.queueDeletions(e),t.insertSplitPause(t.queue.length,e.length)}})}},{key:"queueDeletions",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e="string"==typeof t?t.length:t,i=0;i<e;i++)this.queue.push([this.delete,1])}},{key:"queueString",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(t){if(t=n(t),document.implementation.createHTMLDocument("").body.innerHTML=t,e&&(t=(t=this.rake(t))[0]),this.options.html&&i(t[0],"<")&&!i(t[0],"</")){var s=t[0].match(/\<(.*?)\>/),o=document.implementation.createHTMLDocument("");o.body.innerHTML="<"+s[1]+"></"+s[1]+">",this.queue.push([this.type,o.body.children[0]])}else this.queue.push([this.type,t[0]]);t.splice(0,1),e&&this.queue[this.queue.length-1].push("first-of-string"),t.length?this.queueString(t,!1):this.queue[this.queue.length-1].push("last-of-string")}}},{key:"insertSplitPause",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.queue.splice(t,0,[this.pause,this.options.nextStringDelay.before]),this.queue.splice(t-e,0,[this.pause,this.options.nextStringDelay.after])}},{key:"kickoff",value:function(){if(this.options.autoStart)return this.hasStarted=!0,void this.next();if(t(this.element))return this.hasStarted=!0,void this.next();var e=this;window.addEventListener("scroll",function i(n){t(e.element)&&!e.hasStarted&&(e.hasStarted=!0,e.next(),n.currentTarget.removeEventListener(n.type,i))})}},{key:"cursor",value:function(){var t="visibility: hidden;";if(this.options.cursor){var e=document.createElement("style");e.id=this.id;var i="\n            @keyframes blink-"+this.id+" {\n              0% {opacity: 0}\n              49% {opacity: 0}\n              50% {opacity: 1}\n            }\n\n            [data-typeitid='"+this.id+"'] .ti-cursor {\n              animation: blink-"+this.id+" "+this.options.cursorSpeed/1e3+"s infinite;\n            }\n          ";e.appendChild(document.createTextNode(i)),document.head.appendChild(e),t=""}this.element.insertAdjacentHTML("beforeend",'<span style="'+this.style+t+'" class="ti-cursor">'+this.options.cursorChar+"</span>")}},{key:"insert",value:function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1]?this.elementContainer.lastChild.insertAdjacentHTML("beforeend",t):this.elementContainer.insertAdjacentHTML("beforeend",t),this.contents(this.contents().split("").join(""))}},{key:"checkElement",value:function(){var t=this;[].slice.call(this.element.childNodes).forEach(function(e){void 0!==e.classList&&e.classList.contains("ti-container")&&(t.element.innerHTML="")}),!this.options.startDelete&&this.element.innerHTML.length>0?this.options.strings=this.element.innerHTML.trim():this.stringsToDelete=this.element.innerHTML}},{key:"break",value:function(){this.insert("<br>"),this.next()}},{key:"pause",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];setTimeout(function(){t.next()},e||this.options.nextStringDelay.total)}},{key:"rake",value:function(t){var e=this;return t.map(function(t){return t=t.split(""),e.options.html?function(t){for(var e=[],i=void 0,n=!1,s=0;s<t.length;s++)"<"!==t[s]&&"&"!==t[s]||(e[0]=s,n="&"===t[s]),(">"===t[s]||";"===t[s]&&n)&&(e[1]=s,s=0,i=t.slice(e[0],e[1]+1).join(""),t.splice(e[0],e[1]-e[0]+1,i),n=!1);return t}(t):t})}},{key:"type",value:function(t){var e=this;this.setPace(),this.timeouts[0]=setTimeout(function(){return"string"!=typeof t?(t.innerHTML="",e.elementContainer.appendChild(t),e.isInTag=!0,void e.next()):i(t,"</")?(e.isInTag=!1,void e.next()):(e.insert(t,e.isInTag),void e.next())},this.typePace)}},{key:"setOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n={};for(var s in null===e&&(e=this.options),e)n[s]=e[s];for(var o in t)n[o]=t[o];this.options=n,i&&this.next()}},{key:"setPace",value:function(){var t=this.options.speed,i=null!==this.options.deleteSpeed?this.options.deleteSpeed:this.options.speed/3,n=t/2,s=i/2;this.typePace=this.options.lifeLike?e(t,n):t,this.deletePace=this.options.lifeLike?e(i,s):i}},{key:"delete",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.timeouts[1]=setTimeout(function(){t.setPace();for(var i=t.contents().split(""),n=i.length-1;n>-1;n--){if(">"!==i[n]&&";"!==i[n]||!t.options.html){i.pop();break}for(var s=n;s>-1;s--){if("<br>"===i.slice(s-3,s+1).join("")){i.splice(s-3,4);break}if("&"===i[s]){i.splice(s,n-s+1);break}if("<"===i[s]&&">"!==i[s-1]){if(";"===i[s-1])for(var o=s-1;o>-1;o--)if("&"===i[o]){i.splice(o,s-o);break}i.splice(s-1,1);break}}break}if(t.options.html&&t.contents().indexOf("></")>-1)for(var r=t.contents().indexOf("></")-2;r>=0;r--)if("<"===i[r]){i.splice(r,i.length-r);break}t.contents(i.join("").replace(/<[^\/>][^>]*><\/[^>]+>/,"")),null===e&&t.queue.unshift([t.delete,i.length]),e>1&&t.queue.unshift([t.delete,e-1]),t.next()},this.deletePace)}},{key:"empty",value:function(){this.contents(""),this.next()}},{key:"next",value:function(){var t=this;if(!this.isFrozen){if(this.queue.length>0)return this.step=this.queue.shift(),"first-of-string"===this.step[2]&&this.options.beforeString&&this.options.beforeString(this.step,this.queue,this.typeit),this.options.beforeStep&&this.options.beforeStep(this.step,this.queue,this.typeit),this.step[0].call(this,this.step[1],this.step[2]),"last-of-string"===this.step[2]&&this.options.afterString&&this.options.afterString(this.step,this.queue,this.typeit),void(this.options.afterStep&&this.options.afterStep(this.step,this.queue,this.typeit));if(this.options.callback&&this.options.callback(),this.options.afterComplete&&this.options.afterComplete(this.typeit),this.options.loop)return this.queueDeletions(this.contents()),this.generateQueue([this.pause,this.options.loopDelay/2]),void setTimeout(function(){t.next()},this.options.loopDelay/2);this.isComplete=!0}}}]),s}();return function(){function t(e,i){o(this,t),this.id=this.generateHash(),this.instances=[],this.elements=[],this.args=i,this.hasBeenDestroyed=!1,"object"===(void 0===e?"undefined":s(e))&&(void 0===e.length?this.elements.push(e):this.elements=e),"string"==typeof e&&(this.elements=document.querySelectorAll(e)),this.createInstances()}return r(t,[{key:"generateHash",value:function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}},{key:"createInstances",value:function(){var t=this;[].slice.call(this.elements).forEach(function(e){t.instances.push(new h(e,t.id,t.args,t))})}},{key:"pushAction",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.instances.forEach(function(i){i.queue.push([i[t],e]),!0===i.isComplete&&i.next()})}},{key:"type",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return this.instances.forEach(function(e){e.queueString(t),!0===e.isComplete&&e.next()}),this}},{key:"delete",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.pushAction("delete",t),this}},{key:"freeze",value:function(){this.instances.forEach(function(t){t.isFrozen=!0})}},{key:"unfreeze",value:function(){this.instances.forEach(function(t){t.isFrozen&&(t.isFrozen=!1,t.next())})}},{key:"pause",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.pushAction("pause",t),this}},{key:"destroy",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.instances.forEach(function(e){e.timeouts=e.timeouts.map(function(t){return clearTimeout(t),null}),t&&e.element.removeChild(e.element.querySelector(".ti-cursor"))}),this.hasBeenDestroyed=!0,this.instances=[]}},{key:"empty",value:function(){return this.pushAction("empty"),this}},{key:"break",value:function(){return this.pushAction("break"),this}},{key:"options",value:function(t){return this.pushAction("setOptions",t),this}},{key:"isComplete",get:function(){return!!this.instances.length&&this.instances[0].isComplete}}]),t}()});