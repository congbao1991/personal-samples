(self.webpackChunkreact_webpack=self.webpackChunkreact_webpack||[]).push([[3533],{63533:(e,t,n)=>{"use strict";n.d(t,{Z:()=>Fe});var o=n(28991),i=n(6610),r=n(5991),u=n(63349),a=n(65255),s=n(54070),c=n(67294),l=n(73935),p=n(75164),f=n(94999),h=n(34203),d=n(42550),m=n(64019),v=n(59015),g=n(94184),w=n.n(g);function y(e,t,n){return n?e[0]===t[0]:e[0]===t[0]&&e[1]===t[1]}var b=n(22122),T=n(60444);function M(e){var t=e.prefixCls,n=e.motion,o=e.animation,i=e.transitionName;return n||(o?{motionName:"".concat(t,"-").concat(o)}:i?{motionName:i}:null)}function C(e){var t=e.prefixCls,n=e.visible,i=e.zIndex,r=e.mask,u=e.maskMotion,a=e.maskAnimation,s=e.maskTransitionName;if(!r)return null;var l={};return(u||s||a)&&(l=(0,o.Z)({motionAppear:!0},M({motion:u,prefixCls:t,transitionName:s,animation:a}))),c.createElement(T.Z,Object.assign({},l,{visible:n,removeOnLeave:!0}),(function(e){var n=e.className;return c.createElement("div",{style:{zIndex:i},className:w()("".concat(t,"-mask"),n)})}))}var x=n(28481),P=n(90484);function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var E,S={Webkit:"-webkit-",Moz:"-moz-",ms:"-ms-",O:"-o-"};function H(){if(void 0!==E)return E;E="";var e=document.createElement("p").style;for(var t in S)t+"Transform"in e&&(E=t);return E}function V(){return H()?"".concat(H(),"TransitionProperty"):"transitionProperty"}function R(){return H()?"".concat(H(),"Transform"):"transform"}function Z(e,t){var n=V();n&&(e.style[n]=t,"transitionProperty"!==n&&(e.style.transitionProperty=t))}function N(e,t){var n=R();n&&(e.style[n]=t,"transform"!==n&&(e.style.transform=t))}var A,W=/matrix\((.*)\)/,j=/matrix3d\((.*)\)/;function L(e){var t=e.style.display;e.style.display="none",e.offsetHeight,e.style.display=t}function B(e,t,n){var o=n;if("object"!==k(t))return void 0!==o?("number"==typeof o&&(o="".concat(o,"px")),void(e.style[t]=o)):A(e,t);for(var i in t)t.hasOwnProperty(i)&&B(e,i,t[i])}function F(e,t){var n=e["page".concat(t?"Y":"X","Offset")],o="scroll".concat(t?"Top":"Left");if("number"!=typeof n){var i=e.document;"number"!=typeof(n=i.documentElement[o])&&(n=i.body[o])}return n}function Y(e){return F(e)}function X(e){return F(e,!0)}function z(e){var t=function(e){var t,n,o,i=e.ownerDocument,r=i.body,u=i&&i.documentElement;return n=(t=e.getBoundingClientRect()).left,o=t.top,{left:n-=u.clientLeft||r.clientLeft||0,top:o-=u.clientTop||r.clientTop||0}}(e),n=e.ownerDocument,o=n.defaultView||n.parentWindow;return t.left+=Y(o),t.top+=X(o),t}function I(e){return null!=e&&e==e.window}function U(e){return I(e)?e.document:9===e.nodeType?e:e.ownerDocument}var _=new RegExp("^(".concat(/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,")(?!px)[a-z%]+$"),"i"),$=/^(top|right|bottom|left)$/;function Q(e,t){return"left"===e?t.useCssRight?"right":e:t.useCssBottom?"bottom":e}function q(e){return"left"===e?"right":"right"===e?"left":"top"===e?"bottom":"bottom"===e?"top":void 0}function G(e,t,n){"static"===B(e,"position")&&(e.style.position="relative");var o=-999,i=-999,r=Q("left",n),u=Q("top",n),a=q(r),s=q(u);"left"!==r&&(o=999),"top"!==u&&(i=999);var c,l="",p=z(e);("left"in t||"top"in t)&&(l=(c=e).style.transitionProperty||c.style[V()]||"",Z(e,"none")),"left"in t&&(e.style[a]="",e.style[r]="".concat(o,"px")),"top"in t&&(e.style[s]="",e.style[u]="".concat(i,"px")),L(e);var f=z(e),h={};for(var d in t)if(t.hasOwnProperty(d)){var m=Q(d,n),v="left"===d?o:i,g=p[d]-f[d];h[m]=m===d?v+g:v-g}B(e,h),L(e),("left"in t||"top"in t)&&Z(e,l);var w={};for(var y in t)if(t.hasOwnProperty(y)){var b=Q(y,n),T=t[y]-p[y];w[b]=y===b?h[b]+T:h[b]-T}B(e,w)}function J(e,t){for(var n=0;n<e.length;n++)t(e[n])}function K(e){return"border-box"===A(e,"boxSizing")}"undefined"!=typeof window&&(A=window.getComputedStyle?function(e,t,n){var o=n,i="",r=U(e);return(o=o||r.defaultView.getComputedStyle(e,null))&&(i=o.getPropertyValue(t)||o[t]),i}:function(e,t){var n=e.currentStyle&&e.currentStyle[t];if(_.test(n)&&!$.test(t)){var o=e.style,i=o.left,r=e.runtimeStyle.left;e.runtimeStyle.left=e.currentStyle.left,o.left="fontSize"===t?"1em":n||0,n=o.pixelLeft+"px",o.left=i,e.runtimeStyle.left=r}return""===n?"auto":n});var ee=["margin","border","padding"];function te(e,t,n){var o,i={},r=e.style;for(o in t)t.hasOwnProperty(o)&&(i[o]=r[o],r[o]=t[o]);for(o in n.call(e),t)t.hasOwnProperty(o)&&(r[o]=i[o])}function ne(e,t,n){var o,i,r,u=0;for(i=0;i<t.length;i++)if(o=t[i])for(r=0;r<n.length;r++){var a;a="border"===o?"".concat(o).concat(n[r],"Width"):o+n[r],u+=parseFloat(A(e,a))||0}return u}var oe={getParent:function(e){var t=e;do{t=11===t.nodeType&&t.host?t.host:t.parentNode}while(t&&1!==t.nodeType&&9!==t.nodeType);return t}};function ie(e,t,n){var o=n;if(I(e))return"width"===t?oe.viewportWidth(e):oe.viewportHeight(e);if(9===e.nodeType)return"width"===t?oe.docWidth(e):oe.docHeight(e);var i="width"===t?["Left","Right"]:["Top","Bottom"],r="width"===t?e.getBoundingClientRect().width:e.getBoundingClientRect().height,u=(A(e),K(e)),a=0;(null==r||r<=0)&&(r=void 0,(null==(a=A(e,t))||Number(a)<0)&&(a=e.style[t]||0),a=parseFloat(a)||0),void 0===o&&(o=u?1:-1);var s=void 0!==r||u,c=r||a;return-1===o?s?c-ne(e,["border","padding"],i):a:s?1===o?c:c+(2===o?-ne(e,["border"],i):ne(e,["margin"],i)):a+ne(e,ee.slice(o),i)}J(["Width","Height"],(function(e){oe["doc".concat(e)]=function(t){var n=t.document;return Math.max(n.documentElement["scroll".concat(e)],n.body["scroll".concat(e)],oe["viewport".concat(e)](n))},oe["viewport".concat(e)]=function(t){var n="client".concat(e),o=t.document,i=o.body,r=o.documentElement[n];return"CSS1Compat"===o.compatMode&&r||i&&i[n]||r}}));var re={position:"absolute",visibility:"hidden",display:"block"};function ue(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o,i=t[0];return 0!==i.offsetWidth?o=ie.apply(void 0,t):te(i,re,(function(){o=ie.apply(void 0,t)})),o}function ae(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}J(["width","height"],(function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);oe["outer".concat(t)]=function(t,n){return t&&ue(t,e,n?0:1)};var n="width"===e?["Left","Right"]:["Top","Bottom"];oe[e]=function(t,o){var i=o;return void 0===i?t&&ue(t,e,-1):t?(A(t),K(t)&&(i+=ne(t,["padding","border"],n)),B(t,e,i)):void 0}}));var se={getWindow:function(e){if(e&&e.document&&e.setTimeout)return e;var t=e.ownerDocument||e;return t.defaultView||t.parentWindow},getDocument:U,offset:function(e,t,n){if(void 0===t)return z(e);!function(e,t,n){if(n.ignoreShake){var o=z(e),i=o.left.toFixed(0),r=o.top.toFixed(0),u=t.left.toFixed(0),a=t.top.toFixed(0);if(i===u&&r===a)return}n.useCssRight||n.useCssBottom?G(e,t,n):n.useCssTransform&&R()in document.body.style?function(e,t){var n=z(e),o=function(e){var t=window.getComputedStyle(e,null),n=t.getPropertyValue("transform")||t.getPropertyValue(R());if(n&&"none"!==n){var o=n.replace(/[^0-9\-.,]/g,"").split(",");return{x:parseFloat(o[12]||o[4],0),y:parseFloat(o[13]||o[5],0)}}return{x:0,y:0}}(e),i={x:o.x,y:o.y};"left"in t&&(i.x=o.x+t.left-n.left),"top"in t&&(i.y=o.y+t.top-n.top),function(e,t){var n=window.getComputedStyle(e,null),o=n.getPropertyValue("transform")||n.getPropertyValue(R());if(o&&"none"!==o){var i,r=o.match(W);r?((i=(r=r[1]).split(",").map((function(e){return parseFloat(e,10)})))[4]=t.x,i[5]=t.y,N(e,"matrix(".concat(i.join(","),")"))):((i=o.match(j)[1].split(",").map((function(e){return parseFloat(e,10)})))[12]=t.x,i[13]=t.y,N(e,"matrix3d(".concat(i.join(","),")")))}else N(e,"translateX(".concat(t.x,"px) translateY(").concat(t.y,"px) translateZ(0)"))}(e,i)}(e,t):G(e,t,n)}(e,t,n||{})},isWindow:I,each:J,css:B,clone:function(e){var t,n={};for(t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);if(e.overflow)for(t in e)e.hasOwnProperty(t)&&(n.overflow[t]=e.overflow[t]);return n},mix:ae,getWindowScrollLeft:function(e){return Y(e)},getWindowScrollTop:function(e){return X(e)},merge:function(){for(var e={},t=0;t<arguments.length;t++)se.mix(e,t<0||arguments.length<=t?void 0:arguments[t]);return e},viewportWidth:0,viewportHeight:0};ae(se,oe);var ce=se.getParent;function le(e){if(se.isWindow(e)||9===e.nodeType)return null;var t,n=se.getDocument(e).body,o=se.css(e,"position");if("fixed"!==o&&"absolute"!==o)return"html"===e.nodeName.toLowerCase()?null:ce(e);for(t=ce(e);t&&t!==n&&9!==t.nodeType;t=ce(t))if("static"!==(o=se.css(t,"position")))return t;return null}var pe=se.getParent;function fe(e,t){for(var n={left:0,right:1/0,top:0,bottom:1/0},o=le(e),i=se.getDocument(e),r=i.defaultView||i.parentWindow,u=i.body,a=i.documentElement;o;){if(-1!==navigator.userAgent.indexOf("MSIE")&&0===o.clientWidth||o===u||o===a||"visible"===se.css(o,"overflow")){if(o===u||o===a)break}else{var s=se.offset(o);s.left+=o.clientLeft,s.top+=o.clientTop,n.top=Math.max(n.top,s.top),n.right=Math.min(n.right,s.left+o.clientWidth),n.bottom=Math.min(n.bottom,s.top+o.clientHeight),n.left=Math.max(n.left,s.left)}o=le(o)}var c=null;se.isWindow(e)||9===e.nodeType||(c=e.style.position,"absolute"===se.css(e,"position")&&(e.style.position="fixed"));var l=se.getWindowScrollLeft(r),p=se.getWindowScrollTop(r),f=se.viewportWidth(r),h=se.viewportHeight(r),d=a.scrollWidth,m=a.scrollHeight,v=window.getComputedStyle(u);if("hidden"===v.overflowX&&(d=r.innerWidth),"hidden"===v.overflowY&&(m=r.innerHeight),e.style&&(e.style.position=c),t||function(e){if(se.isWindow(e)||9===e.nodeType)return!1;var t=se.getDocument(e).body,n=null;for(n=pe(e);n&&n!==t;n=pe(n))if("fixed"===se.css(n,"position"))return!0;return!1}(e))n.left=Math.max(n.left,l),n.top=Math.max(n.top,p),n.right=Math.min(n.right,l+f),n.bottom=Math.min(n.bottom,p+h);else{var g=Math.max(d,l+f);n.right=Math.min(n.right,g);var w=Math.max(m,p+h);n.bottom=Math.min(n.bottom,w)}return n.top>=0&&n.left>=0&&n.bottom>n.top&&n.right>n.left?n:null}function he(e){var t,n,o;if(se.isWindow(e)||9===e.nodeType){var i=se.getWindow(e);t={left:se.getWindowScrollLeft(i),top:se.getWindowScrollTop(i)},n=se.viewportWidth(i),o=se.viewportHeight(i)}else t=se.offset(e),n=se.outerWidth(e),o=se.outerHeight(e);return t.width=n,t.height=o,t}function de(e,t){var n=t.charAt(0),o=t.charAt(1),i=e.width,r=e.height,u=e.left,a=e.top;return"c"===n?a+=r/2:"b"===n&&(a+=r),"c"===o?u+=i/2:"r"===o&&(u+=i),{left:u,top:a}}function me(e,t,n,o,i){var r=de(t,n[1]),u=de(e,n[0]),a=[u.left-r.left,u.top-r.top];return{left:Math.round(e.left-a[0]+o[0]-i[0]),top:Math.round(e.top-a[1]+o[1]-i[1])}}function ve(e,t,n){return e.left<n.left||e.left+t.width>n.right}function ge(e,t,n){return e.top<n.top||e.top+t.height>n.bottom}function we(e,t,n){var o=[];return se.each(e,(function(e){o.push(e.replace(t,(function(e){return n[e]})))})),o}function ye(e,t){return e[t]=-e[t],e}function be(e,t){return(/%$/.test(e)?parseInt(e.substring(0,e.length-1),10)/100*t:parseInt(e,10))||0}function Te(e,t){e[0]=be(e[0],t.width),e[1]=be(e[1],t.height)}function Me(e,t,n,o){var i=n.points,r=n.offset||[0,0],u=n.targetOffset||[0,0],a=n.overflow,s=n.source||e;r=[].concat(r),u=[].concat(u);var c={},l=0,p=fe(s,!(!(a=a||{})||!a.alwaysByViewport)),f=he(s);Te(r,f),Te(u,t);var h=me(f,t,i,r,u),d=se.merge(f,h);if(p&&(a.adjustX||a.adjustY)&&o){if(a.adjustX&&ve(h,f,p)){var m=we(i,/[lr]/gi,{l:"r",r:"l"}),v=ye(r,0),g=ye(u,0);(function(e,t,n){return e.left>n.right||e.left+t.width<n.left})(me(f,t,m,v,g),f,p)||(l=1,i=m,r=v,u=g)}if(a.adjustY&&ge(h,f,p)){var w=we(i,/[tb]/gi,{t:"b",b:"t"}),y=ye(r,1),b=ye(u,1);(function(e,t,n){return e.top>n.bottom||e.top+t.height<n.top})(me(f,t,w,y,b),f,p)||(l=1,i=w,r=y,u=b)}l&&(h=me(f,t,i,r,u),se.mix(d,h));var T=ve(h,f,p),M=ge(h,f,p);if(T||M){var C=i;T&&(C=we(i,/[lr]/gi,{l:"r",r:"l"})),M&&(C=we(i,/[tb]/gi,{t:"b",b:"t"})),i=C,r=n.offset||[0,0],u=n.targetOffset||[0,0]}c.adjustX=a.adjustX&&T,c.adjustY=a.adjustY&&M,(c.adjustX||c.adjustY)&&(d=function(e,t,n,o){var i=se.clone(e),r={width:t.width,height:t.height};return o.adjustX&&i.left<n.left&&(i.left=n.left),o.resizeWidth&&i.left>=n.left&&i.left+r.width>n.right&&(r.width-=i.left+r.width-n.right),o.adjustX&&i.left+r.width>n.right&&(i.left=Math.max(n.right-r.width,n.left)),o.adjustY&&i.top<n.top&&(i.top=n.top),o.resizeHeight&&i.top>=n.top&&i.top+r.height>n.bottom&&(r.height-=i.top+r.height-n.bottom),o.adjustY&&i.top+r.height>n.bottom&&(i.top=Math.max(n.bottom-r.height,n.top)),se.mix(i,r)}(h,f,p,c))}return d.width!==f.width&&se.css(s,"width",se.width(s)+d.width-f.width),d.height!==f.height&&se.css(s,"height",se.height(s)+d.height-f.height),se.offset(s,{left:d.left,top:d.top},{useCssRight:n.useCssRight,useCssBottom:n.useCssBottom,useCssTransform:n.useCssTransform,ignoreShake:n.ignoreShake}),{points:i,offset:r,targetOffset:u,overflow:c}}function Ce(e,t,n){var o=n.target||t;return Me(e,he(o),n,!function(e,t){var n=fe(e,t),o=he(e);return!n||o.left+o.width<=n.left||o.top+o.height<=n.top||o.left>=n.right||o.top>=n.bottom}(o,n.overflow&&n.overflow.alwaysByViewport))}Ce.__getOffsetParent=le,Ce.__getVisibleRectForElement=fe;var xe=n(91033);function Pe(e,t){var n=null,o=null,i=new xe.Z((function(e){var i=(0,x.Z)(e,1)[0].target;if(document.documentElement.contains(i)){var r=i.getBoundingClientRect(),u=r.width,a=r.height,s=Math.floor(u),c=Math.floor(a);n===s&&o===c||Promise.resolve().then((function(){t({width:s,height:c})})),n=s,o=c}}));return e&&i.observe(e),function(){i.disconnect()}}function ke(e){return"function"!=typeof e?null:e()}function Oe(e){return"object"===(0,P.Z)(e)&&e?e:null}var De=c.forwardRef((function(e,t){var n=e.children,o=e.disabled,i=e.target,r=e.align,u=e.onAlign,a=e.monitorWindowResize,s=e.monitorBufferTime,l=void 0===s?0:s,p=c.useRef({}),h=c.useRef(),v=c.Children.only(n),g=c.useRef({});g.current.disabled=o,g.current.target=i,g.current.onAlign=u;var w=function(e,t){var n=c.useRef(!1),o=c.useRef(null);function i(){window.clearTimeout(o.current)}return[function e(a){if(n.current&&!0!==a)i(),o.current=window.setTimeout((function(){n.current=!1,e()}),t);else{if(!1===function(){var e=g.current,t=e.disabled,n=e.target;if(!t&&n){var o,i=h.current,a=ke(n),s=Oe(n);p.current.element=a,p.current.point=s;var c=document.activeElement;return a&&function(e){if(!e)return!1;if(e.offsetParent)return!0;if(e.getBBox){var t=e.getBBox();if(t.width||t.height)return!0}if(e.getBoundingClientRect){var n=e.getBoundingClientRect();if(n.width||n.height)return!0}return!1}(a)?o=Ce(i,a,r):s&&(o=function(e,t,n){var o,i,r=se.getDocument(e),u=r.defaultView||r.parentWindow,a=se.getWindowScrollLeft(u),s=se.getWindowScrollTop(u),c=se.viewportWidth(u),l=se.viewportHeight(u);o="pageX"in t?t.pageX:a+t.clientX,i="pageY"in t?t.pageY:s+t.clientY;var p=o>=0&&o<=a+c&&i>=0&&i<=s+l;return Me(e,{left:o,top:i,width:0,height:0},function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(n,!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{points:[n.points[0],"cc"]}),p)}(i,s,r)),function(e,t){e!==document.activeElement&&(0,f.Z)(t,e)&&"function"==typeof e.focus&&e.focus()}(c,i),u&&o&&u(i,o),!0}return!1}())return;n.current=!0,i(),o.current=window.setTimeout((function(){n.current=!1}),t)}},function(){n.current=!1,i()}]}(0,l),y=(0,x.Z)(w,2),b=y[0],T=y[1],M=c.useRef({cancel:function(){}}),C=c.useRef({cancel:function(){}});c.useEffect((function(){var e,t,n=ke(i),o=Oe(i);h.current!==C.current.element&&(C.current.cancel(),C.current.element=h.current,C.current.cancel=Pe(h.current,b)),p.current.element===n&&((e=p.current.point)===(t=o)||e&&t&&("pageX"in t&&"pageY"in t?e.pageX===t.pageX&&e.pageY===t.pageY:"clientX"in t&&"clientY"in t&&e.clientX===t.clientX&&e.clientY===t.clientY))||(b(),M.current.element!==n&&(M.current.cancel(),M.current.element=n,M.current.cancel=Pe(n,b)))})),c.useEffect((function(){o?T():b()}),[o]);var P=c.useRef(null);return c.useEffect((function(){a?P.current||(P.current=(0,m.Z)(window,"resize",b)):P.current&&(P.current.remove(),P.current=null)}),[a]),c.useEffect((function(){return function(){M.current.cancel(),C.current.cancel(),P.current&&P.current.remove(),T()}}),[]),c.useImperativeHandle(t,(function(){return{forceAlign:function(){return b(!0)}}})),c.isValidElement(v)&&(v=c.cloneElement(v,{ref:(0,d.sQ)(v.ref,h)})),v}));De.displayName="Align";const Ee=De;var Se=n(87757),He=n.n(Se),Ve=n(92137),Re=["measure","align",null,"motion"],Ze=c.forwardRef((function(e,t){var n=e.visible,i=e.prefixCls,r=e.className,u=e.style,a=e.children,s=e.zIndex,l=e.stretch,f=e.destroyPopupOnHide,h=e.align,d=e.point,m=e.getRootDomNode,v=e.getClassNameFromAlign,g=e.onAlign,y=e.onMouseEnter,b=e.onMouseLeave,C=e.onMouseDown,P=e.onTouchStart,k=(0,c.useRef)(),O=(0,c.useRef)(),D=(0,c.useState)(),E=(0,x.Z)(D,2),S=E[0],H=E[1],V=function(e){var t=c.useState({width:0,height:0}),n=(0,x.Z)(t,2),o=n[0],i=n[1];return[c.useMemo((function(){var t={};if(e){var n=o.width,i=o.height;-1!==e.indexOf("height")&&i?t.height=i:-1!==e.indexOf("minHeight")&&i&&(t.minHeight=i),-1!==e.indexOf("width")&&n?t.width=n:-1!==e.indexOf("minWidth")&&n&&(t.minWidth=n)}return t}),[e,o]),function(e){i({width:e.offsetWidth,height:e.offsetHeight})}]}(l),R=(0,x.Z)(V,2),Z=R[0],N=R[1],A=function(e,t){var n=(0,c.useState)(null),o=(0,x.Z)(n,2),i=o[0],r=o[1],u=(0,c.useRef)();function a(){p.Z.cancel(u.current)}return(0,c.useEffect)((function(){r("measure")}),[e]),(0,c.useEffect)((function(){switch(i){case"measure":l&&N(m())}i&&(u.current=(0,p.Z)((0,Ve.Z)(He().mark((function e(){var t,n;return He().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Re.indexOf(i),(n=Re[t+1])&&-1!==t&&r(n);case 3:case"end":return e.stop()}}),e)})))))}),[i]),(0,c.useEffect)((function(){return function(){a()}}),[]),[i,function(e){a(),u.current=(0,p.Z)((function(){r((function(e){switch(i){case"align":return"motion";case"motion":return"stable"}return e})),null==e||e()}))}]}(n),W=(0,x.Z)(A,2),j=W[0],L=W[1],B=(0,c.useRef)();function F(){var e;null===(e=k.current)||void 0===e||e.forceAlign()}function Y(e,t){if("align"===j){var n=v(t);H(n),S!==n?Promise.resolve().then((function(){F()})):L((function(){var e;null===(e=B.current)||void 0===e||e.call(B)})),null==g||g(e,t)}}var X=(0,o.Z)({},M(e));function z(){return new Promise((function(e){B.current=e}))}["onAppearEnd","onEnterEnd","onLeaveEnd"].forEach((function(e){var t=X[e];X[e]=function(e,n){return L(),null==t?void 0:t(e,n)}})),c.useEffect((function(){X.motionName||"motion"!==j||L()}),[X.motionName,j]),c.useImperativeHandle(t,(function(){return{forceAlign:F,getElement:function(){return O.current}}}));var I=(0,o.Z)((0,o.Z)((0,o.Z)({},Z),{},{zIndex:s},u),{},{opacity:"motion"!==j&&"stable"!==j&&n?0:void 0,pointerEvents:"stable"===j?void 0:"none"}),U=!0;!(null==h?void 0:h.points)||"align"!==j&&"stable"!==j||(U=!1);var _=a;return c.Children.count(a)>1&&(_=c.createElement("div",{className:"".concat(i,"-content")},a)),c.createElement(T.Z,Object.assign({visible:n,ref:O},X,{onAppearPrepare:z,onEnterPrepare:z,removeOnLeave:f,leavedClassName:"".concat(i,"-hidden")}),(function(e,t){var n=e.className,u=e.style,a=w()(i,r,S,n);return c.createElement(Ee,{target:d||m,key:"popup",ref:k,monitorWindowResize:!0,disabled:U,align:h,onAlign:Y},c.createElement("div",{ref:t,className:a,onMouseEnter:y,onMouseLeave:b,onMouseDown:C,onTouchStart:P,style:(0,o.Z)((0,o.Z)({},u),I)},_))}))}));Ze.displayName="PopupInner";const Ne=Ze;var Ae=c.forwardRef((function(e,t){var n=(0,b.Z)({},e);return c.createElement("div",null,c.createElement(C,Object.assign({},n)),c.createElement(Ne,Object.assign({},n,{ref:t})))}));Ae.displayName="Popup";const We=Ae,je=c.createContext(null);function Le(){}var Be=["onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur","onContextMenu"];const Fe=(Ye=v.Z,(Xe=function(e){(0,a.Z)(n,e);var t=(0,s.Z)(n);function n(e){var o,r;return(0,i.Z)(this,n),(o=t.call(this,e)).popupRef=c.createRef(),o.triggerRef=c.createRef(),o.onMouseEnter=function(e){var t=o.props.mouseEnterDelay;o.fireEvents("onMouseEnter",e),o.delaySetPopupVisible(!0,t,t?null:e)},o.onMouseMove=function(e){o.fireEvents("onMouseMove",e),o.setPoint(e)},o.onMouseLeave=function(e){o.fireEvents("onMouseLeave",e),o.delaySetPopupVisible(!1,o.props.mouseLeaveDelay)},o.onPopupMouseEnter=function(){o.clearDelayTimer()},o.onPopupMouseLeave=function(e){var t;e.relatedTarget&&!e.relatedTarget.setTimeout&&(0,f.Z)(null===(t=o.popupRef.current)||void 0===t?void 0:t.getElement(),e.relatedTarget)||o.delaySetPopupVisible(!1,o.props.mouseLeaveDelay)},o.onFocus=function(e){o.fireEvents("onFocus",e),o.clearDelayTimer(),o.isFocusToShow()&&(o.focusTime=Date.now(),o.delaySetPopupVisible(!0,o.props.focusDelay))},o.onMouseDown=function(e){o.fireEvents("onMouseDown",e),o.preClickTime=Date.now()},o.onTouchStart=function(e){o.fireEvents("onTouchStart",e),o.preTouchTime=Date.now()},o.onBlur=function(e){o.fireEvents("onBlur",e),o.clearDelayTimer(),o.isBlurToHide()&&o.delaySetPopupVisible(!1,o.props.blurDelay)},o.onContextMenu=function(e){e.preventDefault(),o.fireEvents("onContextMenu",e),o.setPopupVisible(!0,e)},o.onContextMenuClose=function(){o.isContextMenuToShow()&&o.close()},o.onClick=function(e){if(o.fireEvents("onClick",e),o.focusTime){var t;if(o.preClickTime&&o.preTouchTime?t=Math.min(o.preClickTime,o.preTouchTime):o.preClickTime?t=o.preClickTime:o.preTouchTime&&(t=o.preTouchTime),Math.abs(t-o.focusTime)<20)return;o.focusTime=0}o.preClickTime=0,o.preTouchTime=0,o.isClickToShow()&&(o.isClickToHide()||o.isBlurToHide())&&e&&e.preventDefault&&e.preventDefault();var n=!o.state.popupVisible;(o.isClickToHide()&&!n||n&&o.isClickToShow())&&o.setPopupVisible(!o.state.popupVisible,e)},o.onPopupMouseDown=function(){var e;o.hasPopupMouseDown=!0,clearTimeout(o.mouseDownTimeout),o.mouseDownTimeout=window.setTimeout((function(){o.hasPopupMouseDown=!1}),0),o.context&&(e=o.context).onPopupMouseDown.apply(e,arguments)},o.onDocumentClick=function(e){if(!o.props.mask||o.props.maskClosable){var t=e.target,n=o.getRootDomNode(),i=o.getPopupDomNode();(0,f.Z)(n,t)||(0,f.Z)(i,t)||o.hasPopupMouseDown||o.close()}},o.getRootDomNode=function(){var e=o.props.getTriggerDOMNode;if(e)return e(o.triggerRef.current);try{var t=(0,h.Z)(o.triggerRef.current);if(t)return t}catch(e){}return l.findDOMNode((0,u.Z)(o))},o.getPopupClassNameFromAlign=function(e){var t=[],n=o.props,i=n.popupPlacement,r=n.builtinPlacements,u=n.prefixCls,a=n.alignPoint,s=n.getPopupClassNameFromAlign;return i&&r&&t.push(function(e,t,n,o){for(var i=n.points,r=Object.keys(e),u=0;u<r.length;u+=1){var a=r[u];if(y(e[a].points,i,o))return"".concat(t,"-placement-").concat(a)}return""}(r,u,e,a)),s&&t.push(s(e)),t.join(" ")},o.getComponent=function(){var e=o.props,t=e.prefixCls,n=e.destroyPopupOnHide,i=e.popupClassName,r=e.onPopupAlign,u=e.popupMotion,a=e.popupAnimation,s=e.popupTransitionName,l=e.popupStyle,p=e.mask,f=e.maskAnimation,h=e.maskTransitionName,d=e.maskMotion,m=e.zIndex,v=e.popup,g=e.stretch,w=e.alignPoint,y=o.state,b=y.popupVisible,T=y.point,M=o.getPopupAlign(),C={};return o.isMouseEnterToShow()&&(C.onMouseEnter=o.onPopupMouseEnter),o.isMouseLeaveToHide()&&(C.onMouseLeave=o.onPopupMouseLeave),C.onMouseDown=o.onPopupMouseDown,C.onTouchStart=o.onPopupMouseDown,c.createElement(We,Object.assign({prefixCls:t,destroyPopupOnHide:n,visible:b,point:w&&T,className:i,align:M,onAlign:r,animation:a,getClassNameFromAlign:o.getPopupClassNameFromAlign},C,{stretch:g,getRootDomNode:o.getRootDomNode,style:l,mask:p,zIndex:m,transitionName:s,maskAnimation:f,maskTransitionName:h,maskMotion:d,ref:o.popupRef,motion:u}),"function"==typeof v?v():v)},o.attachParent=function(e){p.Z.cancel(o.attachId);var t,n=o.props,i=n.getPopupContainer,r=n.getDocument,u=o.getRootDomNode();i?(u||0===i.length)&&(t=i(u)):t=r().body,t?t.appendChild(e):o.attachId=(0,p.Z)((function(){o.attachParent(e)}))},o.getContainer=function(){var e=document.createElement("div");return e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="100%",o.attachParent(e),e},o.setPoint=function(e){o.props.alignPoint&&e&&o.setState({point:{pageX:e.pageX,pageY:e.pageY}})},o.handlePortalUpdate=function(){o.state.prevPopupVisible!==o.state.popupVisible&&o.props.afterPopupVisibleChange(o.state.popupVisible)},r="popupVisible"in e?!!e.popupVisible:!!e.defaultPopupVisible,o.state={prevPopupVisible:r,popupVisible:r},Be.forEach((function(e){o["fire".concat(e)]=function(t){o.fireEvents(e,t)}})),o}return(0,r.Z)(n,[{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"componentDidUpdate",value:function(){var e,t=this.props;if(this.state.popupVisible)return this.clickOutsideHandler||!this.isClickToHide()&&!this.isContextMenuToShow()||(e=t.getDocument(),this.clickOutsideHandler=(0,m.Z)(e,"mousedown",this.onDocumentClick)),this.touchOutsideHandler||(e=e||t.getDocument(),this.touchOutsideHandler=(0,m.Z)(e,"touchstart",this.onDocumentClick)),!this.contextMenuOutsideHandler1&&this.isContextMenuToShow()&&(e=e||t.getDocument(),this.contextMenuOutsideHandler1=(0,m.Z)(e,"scroll",this.onContextMenuClose)),void(!this.contextMenuOutsideHandler2&&this.isContextMenuToShow()&&(this.contextMenuOutsideHandler2=(0,m.Z)(window,"blur",this.onContextMenuClose)));this.clearOutsideHandler()}},{key:"componentWillUnmount",value:function(){this.clearDelayTimer(),this.clearOutsideHandler(),clearTimeout(this.mouseDownTimeout),p.Z.cancel(this.attachId)}},{key:"getPopupDomNode",value:function(){var e;return(null===(e=this.popupRef.current)||void 0===e?void 0:e.getElement())||null}},{key:"getPopupAlign",value:function(){var e=this.props,t=e.popupPlacement,n=e.popupAlign,i=e.builtinPlacements;return t&&i?function(e,t,n){var i=e[t]||{};return(0,o.Z)((0,o.Z)({},i),n)}(i,t,n):n}},{key:"setPopupVisible",value:function(e,t){var n=this.props.alignPoint,o=this.state.popupVisible;this.clearDelayTimer(),o!==e&&("popupVisible"in this.props||this.setState({popupVisible:e,prevPopupVisible:o}),this.props.onPopupVisibleChange(e)),n&&t&&e&&this.setPoint(t)}},{key:"delaySetPopupVisible",value:function(e,t,n){var o=this,i=1e3*t;if(this.clearDelayTimer(),i){var r=n?{pageX:n.pageX,pageY:n.pageY}:null;this.delayTimer=window.setTimeout((function(){o.setPopupVisible(e,r),o.clearDelayTimer()}),i)}else this.setPopupVisible(e,n)}},{key:"clearDelayTimer",value:function(){this.delayTimer&&(clearTimeout(this.delayTimer),this.delayTimer=null)}},{key:"clearOutsideHandler",value:function(){this.clickOutsideHandler&&(this.clickOutsideHandler.remove(),this.clickOutsideHandler=null),this.contextMenuOutsideHandler1&&(this.contextMenuOutsideHandler1.remove(),this.contextMenuOutsideHandler1=null),this.contextMenuOutsideHandler2&&(this.contextMenuOutsideHandler2.remove(),this.contextMenuOutsideHandler2=null),this.touchOutsideHandler&&(this.touchOutsideHandler.remove(),this.touchOutsideHandler=null)}},{key:"createTwoChains",value:function(e){var t=this.props.children.props,n=this.props;return t[e]&&n[e]?this["fire".concat(e)]:t[e]||n[e]}},{key:"isClickToShow",value:function(){var e=this.props,t=e.action,n=e.showAction;return-1!==t.indexOf("click")||-1!==n.indexOf("click")}},{key:"isContextMenuToShow",value:function(){var e=this.props,t=e.action,n=e.showAction;return-1!==t.indexOf("contextMenu")||-1!==n.indexOf("contextMenu")}},{key:"isClickToHide",value:function(){var e=this.props,t=e.action,n=e.hideAction;return-1!==t.indexOf("click")||-1!==n.indexOf("click")}},{key:"isMouseEnterToShow",value:function(){var e=this.props,t=e.action,n=e.showAction;return-1!==t.indexOf("hover")||-1!==n.indexOf("mouseEnter")}},{key:"isMouseLeaveToHide",value:function(){var e=this.props,t=e.action,n=e.hideAction;return-1!==t.indexOf("hover")||-1!==n.indexOf("mouseLeave")}},{key:"isFocusToShow",value:function(){var e=this.props,t=e.action,n=e.showAction;return-1!==t.indexOf("focus")||-1!==n.indexOf("focus")}},{key:"isBlurToHide",value:function(){var e=this.props,t=e.action,n=e.hideAction;return-1!==t.indexOf("focus")||-1!==n.indexOf("blur")}},{key:"forcePopupAlign",value:function(){var e;this.state.popupVisible&&(null===(e=this.popupRef.current)||void 0===e||e.forceAlign())}},{key:"fireEvents",value:function(e,t){var n=this.props.children.props[e];n&&n(t);var o=this.props[e];o&&o(t)}},{key:"close",value:function(){this.setPopupVisible(!1)}},{key:"render",value:function(){var e=this.state.popupVisible,t=this.props,n=t.children,i=t.forceRender,r=t.alignPoint,u=t.className,a=t.autoDestroy,s=c.Children.only(n),l={key:"trigger"};this.isContextMenuToShow()?l.onContextMenu=this.onContextMenu:l.onContextMenu=this.createTwoChains("onContextMenu"),this.isClickToHide()||this.isClickToShow()?(l.onClick=this.onClick,l.onMouseDown=this.onMouseDown,l.onTouchStart=this.onTouchStart):(l.onClick=this.createTwoChains("onClick"),l.onMouseDown=this.createTwoChains("onMouseDown"),l.onTouchStart=this.createTwoChains("onTouchStart")),this.isMouseEnterToShow()?(l.onMouseEnter=this.onMouseEnter,r&&(l.onMouseMove=this.onMouseMove)):l.onMouseEnter=this.createTwoChains("onMouseEnter"),this.isMouseLeaveToHide()?l.onMouseLeave=this.onMouseLeave:l.onMouseLeave=this.createTwoChains("onMouseLeave"),this.isFocusToShow()||this.isBlurToHide()?(l.onFocus=this.onFocus,l.onBlur=this.onBlur):(l.onFocus=this.createTwoChains("onFocus"),l.onBlur=this.createTwoChains("onBlur"));var p=w()(s&&s.props&&s.props.className,u);p&&(l.className=p);var f=(0,o.Z)({},l);(0,d.Yr)(s)&&(f.ref=(0,d.sQ)(this.triggerRef,s.ref));var h,m=c.cloneElement(s,f);return(e||this.popupRef.current||i)&&(h=c.createElement(Ye,{key:"portal",getContainer:this.getContainer,didUpdate:this.handlePortalUpdate},this.getComponent())),!e&&a&&(h=null),c.createElement(je.Provider,{value:{onPopupMouseDown:this.onPopupMouseDown}},m,h)}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.popupVisible,o={};return void 0!==n&&t.popupVisible!==n&&(o.popupVisible=n,o.prevPopupVisible=t.popupVisible),o}}]),n}(c.Component)).contextType=je,Xe.defaultProps={prefixCls:"rc-trigger-popup",getPopupClassNameFromAlign:function(){return""},getDocument:function(){return window.document},onPopupVisibleChange:Le,afterPopupVisibleChange:Le,onPopupAlign:Le,popupClassName:"",mouseEnterDelay:0,mouseLeaveDelay:.1,focusDelay:0,blurDelay:.15,popupStyle:{},destroyPopupOnHide:!1,popupAlign:{},defaultPopupVisible:!1,mask:!1,maskClosable:!0,action:[],showAction:[],hideAction:[],autoDestroy:!1},Xe);var Ye,Xe}}]);