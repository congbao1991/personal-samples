(self.webpackChunkreact_webpack=self.webpackChunkreact_webpack||[]).push([[6652,3177],{34046:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});var r=n(63497),l=n.n(r),a=n(9830),m=n.n(a),i=n(30695),c=n.n(i),u=n(83507),s=n.n(u),o=n(69024),d=n.n(o),p=n(600),f=n.n(p),E=n(67294);var h=function(e){s()(a,e);var t,n,r=(t=a,n=function(){if("undefined"==typeof Reflect||!l())return!1;if(l().sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(l()(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=f()(t);if(n){var a=f()(this).constructor;e=l()(r,arguments,a)}else e=r.apply(this,arguments);return d()(this,e)});function a(){return m()(this,a),r.apply(this,arguments)}return c()(a,[{key:"render",value:function(){var e=this.props,t=e.visible,n=e.children,r=t?n:null;return E.createElement(E.Fragment,null,r)}}]),a}(E.PureComponent)},18181:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i});var r=n(67294),l=n(45697),a=n.n(l);function m(e){return r.createElement("div",{className:"form-item-label"},r.createElement("span",{className:"form-item-label-title"},e.title),r.createElement("span",{className:"form-item-label-desc"},e.desc))}m.propTypes={title:a().string,desc:a().string},m.defaultProps={title:"",desc:""};const i=m},89241:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>d});var r=n(67294),l=n(45697),a=n.n(l),m=n(32478),i=n(14617),c=n(9676),u=n(34046),s=n(18181);function o(e){return r.createElement(m.Z,{layout:"vertical",labelAlign:"right",name:"customInput",onValuesChange:e.updateComponentForm,ref:e.formRef,className:"custom-tmpl-formlayer",onFinish:function(){return e.onFormFinish("success")},onFinishFailed:function(){return e.onFormFinish("error")}},r.createElement(u.Z,{visible:!e.hideTitle},r.createElement(m.Z.Item,{label:r.createElement(s.default,{title:"标题",desc:"最多6个字"}),style:{marginTop:5},name:"label",rules:[{required:!0,whitespace:!0,message:"请输入标题"}]},r.createElement(i.Z,{placeholder:"请输入标题",maxLength:6}))),e.children,r.createElement(m.Z.Item,{label:"其他"},r.createElement(m.Z.Item,{name:"required",valuePropName:"checked",style:{marginBottom:0,transform:"translateY(-5px)"}},r.createElement(c.Z,{disabled:e.currentComponent.required_fixed},"必填")),r.createElement(m.Z.Item,{name:"print",valuePropName:"checked",style:{transform:"translateY(-9px)"}},r.createElement(c.Z,{disabled:e.currentComponent.print_fixed},"参与打印"))))}o.propTypes={updateComponentForm:a().func,hideTitle:a().bool},o.defaultProps={updateComponentForm:function(){},hideTitle:!1};const d=o},60437:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>E});var r=n(55682),l=n.n(r),a=n(67294),m=n(34041),i=n(32478),c=n(14617),u=n(21888),s=n(47933),o=n(34046),d=n(18181),p=n(89241),f=m.Z.Option;const E=function(e){return e.currentComponent.inputType,a.createElement(p.default,e,a.createElement(a.Fragment,null,a.createElement(i.Z.Item,{required:!0,label:a.createElement(d.default,{title:"提示性文字",desc:"最多20字"}),name:"tip",rules:[{required:!0,whitespace:!0,message:"请输入提示性文字"}]},a.createElement(c.Z,{placeholder:"请输入提示性文字",maxLength:20})),a.createElement(o.Z,{visible:void 0!==e.currentComponent.form.length_limit},a.createElement(i.Z.Item,{required:!0,label:a.createElement(d.default,{title:"字符限制",desc:"支持输入1-200个字符"}),name:"length_limit",rules:[{required:!0,message:"请输入字符限制"},{validator:function(e,t){return n=t,new(l())((function(e,t){/^[1-9]\d*$/.test(n)&&n<=250||!n?e():t(new Error("请输入正确数值"))}));var n}}]},a.createElement(u.Z,{style:{width:"100%"},min:1,max:200}))),a.createElement(a.Fragment,null,a.createElement(i.Z.Item,{label:"数字格式"},a.createElement("div",{style:{display:"flex",alignItems:"center"}},a.createElement("span",null,"精确到  "),a.createElement(i.Z.Item,{name:"decimal_length",style:{display:"inline-block",marginBottom:0},rules:[{required:!0,message:"请选择"}]},a.createElement(m.Z,{style:{width:50}},a.createElement(f,{value:0},"0"),a.createElement(f,{value:1},"1"),a.createElement(f,{value:2},"2"))),a.createElement("span",null,"  位小数")))),a.createElement(a.Fragment,{"r-else":!0},a.createElement(i.Z.Item,{name:"default_type",label:a.createElement(d.default,{title:"默认值"})},a.createElement(s.ZP.Group,null,a.createElement(s.ZP,{value:"empty"},"无"),a.createElement("br",null),a.createElement(s.ZP,{value:"fill_text"},"默认填充固定文本"))),a.createElement(i.Z.Item,{label:"",name:"default_value",rules:[{validator:function(t,n){return r=n,a=e.formRef.current.getFieldValue("length_limit"),new(l())((function(e,t){a?r&&r.length>a?t(new Error("超出字符限制")):e():t(new Error("请输入字符限制"))}));var r,a}}]},a.createElement(c.Z.TextArea,{placeholder:"请输入默认填充文本"})))))}}}]);