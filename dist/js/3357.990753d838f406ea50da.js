"use strict";(self.webpackChunkreact_webpack=self.webpackChunkreact_webpack||[]).push([[3357,3502,7315],{58975:(e,t,n)=>{n.d(t,{Z:()=>b});var r=n(63497),c=n.n(r),a=n(9830),o=n.n(a),i=n(30695),s=n.n(i),l=n(83507),u=n.n(l),d=n(69024),p=n.n(d),f=n(600),h=n.n(f),m=n(85893),y=n(67294);var b=function(e){u()(a,e);var t,n,r=(t=a,n=function(){if("undefined"==typeof Reflect||!c())return!1;if(c().sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(c()(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=h()(t);if(n){var a=h()(this).constructor;e=c()(r,arguments,a)}else e=r.apply(this,arguments);return p()(this,e)});function a(){return o()(this,a),r.apply(this,arguments)}return s()(a,[{key:"render",value:function(){var e=this.props,t=e.visible,n=e.children,r=t?n:null;return(0,m.jsx)(y.Fragment,{children:r})}}]),a}(y.PureComponent)},13502:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var r=n(85893),c=(n(67294),n(45697)),a=n.n(c);function o(e){return(0,r.jsxs)("div",{className:"form-item-label",children:[(0,r.jsx)("span",{className:"form-item-label-title",children:e.title}),(0,r.jsx)("span",{className:"form-item-label-desc",children:e.desc})]})}o.propTypes={title:a().string,desc:a().string},o.defaultProps={title:"",desc:""};const i=o},45354:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var r=n(85893),c=(n(67294),n(45697)),a=n.n(c),o=n(32478),i=n(14617),s=n(9676),l=n(58975),u=n(13502);function d(e){return(0,r.jsxs)(o.Z,{layout:"vertical",labelAlign:"right",name:"customInput",onValuesChange:e.updateComponentForm,ref:e.formRef,className:"custom-tmpl-formlayer",onFinish:function(){return e.onFormFinish("success")},onFinishFailed:function(){return e.onFormFinish("error")},children:[(0,r.jsx)(l.Z,{visible:!e.hideTitle,children:(0,r.jsx)(o.Z.Item,{label:(0,r.jsx)(u.default,{title:"标题",desc:"最多6个字"}),style:{marginTop:5},name:"label",rules:[{required:!0,whitespace:!0,message:"请输入标题"}],children:(0,r.jsx)(i.Z,{placeholder:"请输入标题",maxLength:6})})}),e.children,(0,r.jsxs)(o.Z.Item,{label:"其他",children:[(0,r.jsx)(o.Z.Item,{name:"required",valuePropName:"checked",style:{marginBottom:0,transform:"translateY(-5px)"},children:(0,r.jsx)(s.Z,{disabled:e.currentComponent.required_fixed,children:"必填"})}),(0,r.jsx)(o.Z.Item,{name:"print",valuePropName:"checked",style:{transform:"translateY(-9px)"},children:(0,r.jsx)(s.Z,{disabled:e.currentComponent.print_fixed,children:"参与打印"})})]})]})}d.propTypes={updateComponentForm:a().func,hideTitle:a().bool},d.defaultProps={updateComponentForm:function(){},hideTitle:!1};const p=d},50132:(e,t,n)=>{n.d(t,{Z:()=>b});var r=n(87462),c=n(45987),a=n(4942),o=n(15671),i=n(43144),s=n(79340),l=n(82963),u=n(61120),d=n(67294),p=n(94184),f=n.n(p);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){(0,s.Z)(h,e);var t,n,p=(t=h,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.Z)(t);if(n){var c=(0,u.Z)(this).constructor;e=Reflect.construct(r,arguments,c)}else e=r.apply(this,arguments);return(0,l.Z)(this,e)});function h(e){var t;(0,o.Z)(this,h),(t=p.call(this,e)).handleChange=function(e){var n=t.props,r=n.disabled,c=n.onChange;r||("checked"in t.props||t.setState({checked:e.target.checked}),c&&c({target:m(m({},t.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},t.saveInput=function(e){t.input=e};var n="checked"in e?e.checked:e.defaultChecked;return t.state={checked:n},t}return(0,i.Z)(h,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,o=t.className,i=t.style,s=t.name,l=t.id,u=t.type,p=t.disabled,h=t.readOnly,m=t.tabIndex,y=t.onClick,b=t.onFocus,v=t.onBlur,k=t.autoFocus,g=t.value,x=t.required,j=(0,c.Z)(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","autoFocus","value","required"]),C=Object.keys(j).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=j[t]),e}),{}),Z=this.state.checked,O=f()(n,o,(e={},(0,a.Z)(e,"".concat(n,"-checked"),Z),(0,a.Z)(e,"".concat(n,"-disabled"),p),e));return d.createElement("span",{className:O,style:i},d.createElement("input",(0,r.Z)({name:s,id:l,type:u,required:x,readOnly:h,disabled:p,tabIndex:m,className:"".concat(n,"-input"),checked:!!Z,onClick:y,onFocus:b,onBlur:v,onChange:this.handleChange,autoFocus:k,ref:this.saveInput,value:g},C)),d.createElement("span",{className:"".concat(n,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"checked"in e?m(m({},t),{},{checked:e.checked}):null}}]),h}(d.Component);y.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){}};const b=y}}]);