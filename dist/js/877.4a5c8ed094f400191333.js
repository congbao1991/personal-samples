(self.webpackChunkreact_webpack=self.webpackChunkreact_webpack||[]).push([[877,3177],{72652:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"}},5085:(e,t,r)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(a=r(76720))&&a.__esModule?a:{default:a};t.default=n,e.exports=n},76720:(e,t,r)=>{"use strict";var a=r(95318),n=r(20862);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(r(67294)),s=a(r(72652)),l=a(r(92074)),i=function(e,t){return c.createElement(l.default,Object.assign({},e,{ref:t,icon:s.default}))};i.displayName="DownOutlined";var u=c.forwardRef(i);t.default=u},34046:(e,t,r)=>{"use strict";r.d(t,{Z:()=>_});var a=r(63497),n=r.n(a),c=r(9830),s=r.n(c),l=r(30695),i=r.n(l),u=r(83507),E=r.n(u),o=r(69024),d=r.n(o),m=r(600),N=r.n(m),f=r(67294);var _=function(e){E()(c,e);var t,r,a=(t=c,r=function(){if("undefined"==typeof Reflect||!n())return!1;if(n().sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(n()(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=N()(t);if(r){var c=N()(this).constructor;e=n()(a,arguments,c)}else e=a.apply(this,arguments);return d()(this,e)});function c(){return s()(this,c),a.apply(this,arguments)}return i()(c,[{key:"render",value:function(){var e=this.props,t=e.visible,r=e.children,a=t?r:null;return f.createElement(f.Fragment,null,a)}}]),c}(f.PureComponent)},18181:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(67294),n=r(45697),c=r.n(n);function s(e){return a.createElement("div",{className:"form-item-label"},a.createElement("span",{className:"form-item-label-title"},e.title),a.createElement("span",{className:"form-item-label-desc"},e.desc))}s.propTypes={title:c().string,desc:c().string},s.defaultProps={title:"",desc:""};const l=s},89241:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var a=r(67294),n=r(45697),c=r.n(n),s=r(32478),l=r(14617),i=r(9676),u=r(34046),E=r(18181);function o(e){return a.createElement(s.Z,{layout:"vertical",labelAlign:"right",name:"customInput",onValuesChange:e.updateComponentForm,ref:e.formRef,className:"custom-tmpl-formlayer",onFinish:function(){return e.onFormFinish("success")},onFinishFailed:function(){return e.onFormFinish("error")}},a.createElement(u.Z,{visible:!e.hideTitle},a.createElement(s.Z.Item,{label:a.createElement(E.default,{title:"标题",desc:"最多6个字"}),style:{marginTop:5},name:"label",rules:[{required:!0,whitespace:!0,message:"请输入标题"}]},a.createElement(l.Z,{placeholder:"请输入标题",maxLength:6}))),e.children,a.createElement(s.Z.Item,{label:"其他"},a.createElement(s.Z.Item,{name:"required",valuePropName:"checked",style:{marginBottom:0,transform:"translateY(-5px)"}},a.createElement(i.Z,{disabled:e.currentComponent.required_fixed},"必填")),a.createElement(s.Z.Item,{name:"print",valuePropName:"checked",style:{transform:"translateY(-9px)"}},a.createElement(i.Z,{disabled:e.currentComponent.print_fixed},"参与打印"))))}o.propTypes={updateComponentForm:c().func,hideTitle:c().bool},o.defaultProps={updateComponentForm:function(){},hideTitle:!1};const d=o},67738:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(55682),n=r.n(a),c=r(67294),s=r(32478),l=r(14617),i=r(21888),u=r(18181),E=r(89241);const o=function(e){return c.createElement(E.default,e,c.createElement(c.Fragment,null,c.createElement(s.Z.Item,{label:c.createElement(u.default,{title:"提示性文字",desc:"最多20字"}),name:"tip",rules:[{required:!0,whitespace:!0,message:"请输入提示性文字"}]},c.createElement(l.Z,{placeholder:"请输入提示性文字",maxLength:20})),c.createElement(s.Z.Item,{label:c.createElement(u.default,{title:"字符限制",desc:"最多1024个字符"}),name:"length_limit",rules:[{required:!0,message:"请输入字符限制"},{validator:function(e,t){return r=t,new(n())((function(e,t){/^[1-9]\d*$/.test(r)&&r<=1024||!r?e():t(new Error("请输入正确数值，最多1024个字符"))}));var r}}]},c.createElement(i.Z,{style:{width:"100%"},min:1,max:1024}))))}},15105:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});var a={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(e){var t=e.keyCode;if(e.altKey&&!e.ctrlKey||e.metaKey||t>=a.F1&&t<=a.F12)return!1;switch(t){case a.ALT:case a.CAPS_LOCK:case a.CONTEXT_MENU:case a.CTRL:case a.DOWN:case a.END:case a.ESC:case a.HOME:case a.INSERT:case a.LEFT:case a.MAC_FF_META:case a.META:case a.NUMLOCK:case a.NUM_CENTER:case a.PAGE_DOWN:case a.PAGE_UP:case a.PAUSE:case a.PRINT_SCREEN:case a.RIGHT:case a.SHIFT:case a.UP:case a.WIN_KEY:case a.WIN_KEY_RIGHT:return!1;default:return!0}},isCharacterKey:function(e){if(e>=a.ZERO&&e<=a.NINE)return!0;if(e>=a.NUM_ZERO&&e<=a.NUM_MULTIPLY)return!0;if(e>=a.A&&e<=a.Z)return!0;if(-1!==window.navigator.userAgent.indexOf("WebKit")&&0===e)return!0;switch(e){case a.SPACE:case a.QUESTION_MARK:case a.NUM_PLUS:case a.NUM_MINUS:case a.NUM_PERIOD:case a.NUM_DIVISION:case a.SEMICOLON:case a.DASH:case a.EQUALS:case a.COMMA:case a.PERIOD:case a.SLASH:case a.APOSTROPHE:case a.SINGLE_QUOTE:case a.OPEN_SQUARE_BRACKET:case a.BACKSLASH:case a.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}};const n=a},56982:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});var a=r(67294);function n(e,t,r){var n=a.useRef({});return"value"in n.current&&!r(n.current.condition,t)||(n.current.value=e(),n.current.condition=t),n.current.value}}}]);