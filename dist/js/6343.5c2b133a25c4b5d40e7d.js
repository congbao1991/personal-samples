(self.webpackChunkreact_webpack=self.webpackChunkreact_webpack||[]).push([[6343,3177,7137,5505],{34607:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"}},3840:(e,t,r)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=(n=r(54434))&&n.__esModule?n:{default:n};t.default=o,e.exports=o},54434:(e,t,r)=>{"use strict";var n=r(95318),o=r(20862);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(r(67294)),i=n(r(34607)),l=n(r(92074)),c=function(e,t){return a.createElement(l.default,Object.assign({},e,{ref:t,icon:i.default}))};c.displayName="QuestionCircleOutlined";var s=a.forwardRef(c);t.default=s},71649:(e,t,r)=>{var n=r(66406);function o(){return e.exports=o=n||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}e.exports=o},34046:(e,t,r)=>{"use strict";r.d(t,{Z:()=>v});var n=r(63497),o=r.n(n),a=r(9830),i=r.n(a),l=r(30695),c=r.n(l),s=r(83507),u=r.n(s),f=r(69024),d=r.n(f),p=r(600),m=r.n(p),h=r(67294);var v=function(e){u()(a,e);var t,r,n=(t=a,r=function(){if("undefined"==typeof Reflect||!o())return!1;if(o().sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(o()(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=m()(t);if(r){var a=m()(this).constructor;e=o()(n,arguments,a)}else e=n.apply(this,arguments);return d()(this,e)});function a(){return i()(this,a),n.apply(this,arguments)}return c()(a,[{key:"render",value:function(){var e=this.props,t=e.visible,r=e.children,n=t?r:null;return h.createElement(h.Fragment,null,n)}}]),a}(h.PureComponent)},18181:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(67294),o=r(45697),a=r.n(o);function i(e){return n.createElement("div",{className:"form-item-label"},n.createElement("span",{className:"form-item-label-title"},e.title),n.createElement("span",{className:"form-item-label-desc"},e.desc))}i.propTypes={title:a().string,desc:a().string},i.defaultProps={title:"",desc:""};const l=i},89241:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var n=r(67294),o=r(45697),a=r.n(o),i=r(32478),l=r(14617),c=r(9676),s=r(34046),u=r(18181);function f(e){return n.createElement(i.Z,{layout:"vertical",labelAlign:"right",name:"customInput",onValuesChange:e.updateComponentForm,ref:e.formRef,className:"custom-tmpl-formlayer",onFinish:function(){return e.onFormFinish("success")},onFinishFailed:function(){return e.onFormFinish("error")}},n.createElement(s.Z,{visible:!e.hideTitle},n.createElement(i.Z.Item,{label:n.createElement(u.default,{title:"标题",desc:"最多6个字"}),style:{marginTop:5},name:"label",rules:[{required:!0,whitespace:!0,message:"请输入标题"}]},n.createElement(l.Z,{placeholder:"请输入标题",maxLength:6}))),e.children,n.createElement(i.Z.Item,{label:"其他"},n.createElement(i.Z.Item,{name:"required",valuePropName:"checked",style:{marginBottom:0,transform:"translateY(-5px)"}},n.createElement(c.Z,{disabled:e.currentComponent.required_fixed},"必填")),n.createElement(i.Z.Item,{name:"print",valuePropName:"checked",style:{transform:"translateY(-9px)"}},n.createElement(c.Z,{disabled:e.currentComponent.print_fixed},"参与打印"))))}f.propTypes={updateComponentForm:a().func,hideTitle:a().bool},f.defaultProps={updateComponentForm:function(){},hideTitle:!1};const d=f},24986:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var n=r(71649),o=r.n(n),a=r(67294),i=r(32478),l=r(14617),c=r(18181),s=r(89241);const u=function(e){return a.createElement("div",{className:"custom-detailed-form"},a.createElement(s.default,o()({},e,{hideRequired:"custom_detailed"===e.currentComponent.name}),a.createElement(i.Z.Item,{label:a.createElement(c.default,{title:"按钮名称",desc:"最多15字"}),name:"tip",rules:[{required:!0,whitespace:!0,message:"请输入按钮文字"}]},a.createElement(l.Z,{placeholder:"请输入按钮名称",maxLength:15}))))}},50132:(e,t,r)=>{"use strict";r.d(t,{Z:()=>b});var n=r(22122),o=r(81253),a=r(96156),i=r(6610),l=r(5991),c=r(65255),s=r(46070),u=r(77608),f=r(67294),d=r(94184),p=r.n(d);function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=function(e){(0,c.Z)(m,e);var t,r,d=(t=m,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,u.Z)(t);if(r){var o=(0,u.Z)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return(0,s.Z)(this,e)});function m(e){var t;(0,i.Z)(this,m),(t=d.call(this,e)).handleChange=function(e){var r=t.props,n=r.disabled,o=r.onChange;n||("checked"in t.props||t.setState({checked:e.target.checked}),o&&o({target:h(h({},t.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},t.saveInput=function(e){t.input=e};var r="checked"in e?e.checked:e.defaultChecked;return t.state={checked:r},t}return(0,l.Z)(m,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,t=this.props,r=t.prefixCls,i=t.className,l=t.style,c=t.name,s=t.id,u=t.type,d=t.disabled,m=t.readOnly,h=t.tabIndex,v=t.onClick,b=t.onFocus,y=t.onBlur,g=t.autoFocus,w=t.value,C=t.required,O=(0,o.Z)(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","autoFocus","value","required"]),k=Object.keys(O).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=O[t]),e}),{}),E=this.state.checked,P=p()(r,i,(e={},(0,a.Z)(e,"".concat(r,"-checked"),E),(0,a.Z)(e,"".concat(r,"-disabled"),d),e));return f.createElement("span",{className:P,style:l},f.createElement("input",(0,n.Z)({name:c,id:s,type:u,required:C,readOnly:m,disabled:d,tabIndex:h,className:"".concat(r,"-input"),checked:!!E,onClick:v,onFocus:b,onBlur:y,onChange:this.handleChange,autoFocus:g,ref:this.saveInput,value:w},k)),f.createElement("span",{className:"".concat(r,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"checked"in e?h(h({},t),{},{checked:e.checked}):null}}]),m}(f.Component);v.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){}};const b=v},51472:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u});var n=r(90484),o=r(28991),a=r(81253),i=r(67294),l=r(63533),c=r(43159);const s=function(e){var t=e.overlay,r=e.prefixCls,n=e.id,o=e.overlayInnerStyle;return i.createElement("div",{className:"".concat(r,"-inner"),id:n,role:"tooltip",style:o},"function"==typeof t?t():t)},u=(0,i.forwardRef)((function(e,t){var r=e.overlayClassName,u=e.trigger,f=void 0===u?["hover"]:u,d=e.mouseEnterDelay,p=void 0===d?0:d,m=e.mouseLeaveDelay,h=void 0===m?.1:m,v=e.overlayStyle,b=e.prefixCls,y=void 0===b?"rc-tooltip":b,g=e.children,w=e.onVisibleChange,C=e.afterVisibleChange,O=e.transitionName,k=e.animation,E=e.placement,P=void 0===E?"right":E,Z=e.align,x=void 0===Z?{}:Z,j=e.destroyTooltipOnHide,N=void 0!==j&&j,D=e.defaultVisible,I=e.getTooltipContainer,F=e.overlayInnerStyle,V=(0,a.Z)(e,["overlayClassName","trigger","mouseEnterDelay","mouseLeaveDelay","overlayStyle","prefixCls","children","onVisibleChange","afterVisibleChange","transitionName","animation","placement","align","destroyTooltipOnHide","defaultVisible","getTooltipContainer","overlayInnerStyle"]),T=(0,i.useRef)(null);(0,i.useImperativeHandle)(t,(function(){return T.current}));var R=(0,o.Z)({},V);"visible"in e&&(R.popupVisible=e.visible);var S=!1,H=!1;if("boolean"==typeof N)S=N;else if(N&&"object"===(0,n.Z)(N)){var M=N.keepParent;S=!0===M,H=!1===M}return i.createElement(l.Z,Object.assign({popupClassName:r,prefixCls:y,popup:function(){var t=e.arrowContent,r=void 0===t?null:t,n=e.overlay,o=e.id;return[i.createElement("div",{className:"".concat(y,"-arrow"),key:"arrow"},r),i.createElement(s,{key:"content",prefixCls:y,id:o,overlay:n,overlayInnerStyle:F})]},action:f,builtinPlacements:c.C,popupPlacement:P,ref:T,popupAlign:x,getPopupContainer:I,onPopupVisibleChange:w,afterPopupVisibleChange:C,popupTransitionName:O,popupAnimation:k,defaultPopupVisible:D,destroyPopupOnHide:S,autoDestroy:H,mouseLeaveDelay:h,popupStyle:v,mouseEnterDelay:p},R),g)}))},43159:(e,t,r)=>{"use strict";r.d(t,{C:()=>a});var n={adjustX:1,adjustY:1},o=[0,0],a={left:{points:["cr","cl"],overflow:n,offset:[-4,0],targetOffset:o},right:{points:["cl","cr"],overflow:n,offset:[4,0],targetOffset:o},top:{points:["bc","tc"],overflow:n,offset:[0,-4],targetOffset:o},bottom:{points:["tc","bc"],overflow:n,offset:[0,4],targetOffset:o},topLeft:{points:["bl","tl"],overflow:n,offset:[0,-4],targetOffset:o},leftTop:{points:["tr","tl"],overflow:n,offset:[-4,0],targetOffset:o},topRight:{points:["br","tr"],overflow:n,offset:[0,-4],targetOffset:o},rightTop:{points:["tl","tr"],overflow:n,offset:[4,0],targetOffset:o},bottomRight:{points:["tr","br"],overflow:n,offset:[0,4],targetOffset:o},rightBottom:{points:["bl","br"],overflow:n,offset:[4,0],targetOffset:o},bottomLeft:{points:["tl","bl"],overflow:n,offset:[0,4],targetOffset:o},leftBottom:{points:["br","bl"],overflow:n,offset:[-4,0],targetOffset:o}}},56982:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(67294);function o(e,t,r){var o=n.useRef({});return"value"in o.current&&!r(o.current.condition,t)||(o.current.value=e(),o.current.condition=t),o.current.value}},64239:(e,t,r)=>{"use strict";function n(e){return null!=e&&"object"==typeof e&&1===e.nodeType}function o(e,t){return(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e}function a(e,t){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var r=getComputedStyle(e,null);return o(r.overflowY,t)||o(r.overflowX,t)||function(e){var t=function(e){if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}}(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)}(e)}return!1}function i(e,t,r,n,o,a,i,l){return a<e&&i>t||a>e&&i<t?0:a<=e&&l<=r||i>=t&&l>=r?a-e-n:i>t&&l<r||a<e&&l>r?i-t+o:0}function l(e,t){var r=window,o=t.scrollMode,l=t.block,c=t.inline,s=t.boundary,u=t.skipOverflowHiddenElements,f="function"==typeof s?s:function(e){return e!==s};if(!n(e))throw new TypeError("Invalid target");for(var d=document.scrollingElement||document.documentElement,p=[],m=e;n(m)&&f(m);){if((m=m.parentNode)===d){p.push(m);break}m===document.body&&a(m)&&!a(document.documentElement)||a(m,u)&&p.push(m)}for(var h=r.visualViewport?r.visualViewport.width:innerWidth,v=r.visualViewport?r.visualViewport.height:innerHeight,b=window.scrollX||pageXOffset,y=window.scrollY||pageYOffset,g=e.getBoundingClientRect(),w=g.height,C=g.width,O=g.top,k=g.right,E=g.bottom,P=g.left,Z="start"===l||"nearest"===l?O:"end"===l?E:O+w/2,x="center"===c?P+C/2:"end"===c?k:P,j=[],N=0;N<p.length;N++){var D=p[N],I=D.getBoundingClientRect(),F=I.height,V=I.width,T=I.top,R=I.right,S=I.bottom,H=I.left;if("if-needed"===o&&O>=0&&P>=0&&E<=v&&k<=h&&O>=T&&E<=S&&P>=H&&k<=R)return j;var M=getComputedStyle(D),W=parseInt(M.borderLeftWidth,10),_=parseInt(M.borderTopWidth,10),B=parseInt(M.borderRightWidth,10),L=parseInt(M.borderBottomWidth,10),q=0,Y=0,z="offsetWidth"in D?D.offsetWidth-D.clientWidth-W-B:0,X="offsetHeight"in D?D.offsetHeight-D.clientHeight-_-L:0;if(d===D)q="start"===l?Z:"end"===l?Z-v:"nearest"===l?i(y,y+v,v,_,L,y+Z,y+Z+w,w):Z-v/2,Y="start"===c?x:"center"===c?x-h/2:"end"===c?x-h:i(b,b+h,h,W,B,b+x,b+x+C,C),q=Math.max(0,q+y),Y=Math.max(0,Y+b);else{q="start"===l?Z-T-_:"end"===l?Z-S+L+X:"nearest"===l?i(T,S,F,_,L+X,Z,Z+w,w):Z-(T+F/2)+X/2,Y="start"===c?x-H-W:"center"===c?x-(H+V/2)+z/2:"end"===c?x-R+B+z:i(H,R,V,W,B+z,x,x+C,C);var A=D.scrollLeft,Q=D.scrollTop;Z+=Q-(q=Math.max(0,Math.min(Q+q,D.scrollHeight-F+X))),x+=A-(Y=Math.max(0,Math.min(A+Y,D.scrollWidth-V+z)))}j.push({el:D,top:q,left:Y})}return j}function c(e){return e===Object(e)&&0!==Object.keys(e).length}r.d(t,{Z:()=>s});const s=function(e,t){var r=!e.ownerDocument.documentElement.contains(e);if(c(t)&&"function"==typeof t.behavior)return t.behavior(r?[]:l(e,t));if(!r){var n=function(e){return!1===e?{block:"end",inline:"nearest"}:c(e)?e:{block:"start",inline:"nearest"}}(t);return function(e,t){void 0===t&&(t="auto");var r="scrollBehavior"in document.body.style;e.forEach((function(e){var n=e.el,o=e.top,a=e.left;n.scroll&&r?n.scroll({top:o,left:a,behavior:t}):(n.scrollTop=o,n.scrollLeft=a)}))}(l(e,n),n.behavior)}}}}]);