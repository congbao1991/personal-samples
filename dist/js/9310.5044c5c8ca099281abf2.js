(self.webpackChunkreact_webpack=self.webpackChunkreact_webpack||[]).push([[9310],{48823:(e,r,t)=>{e.exports=t(3597)},39755:(e,r,t)=>{var o=t(24422);e.exports=function(e){if(o(e))return e}},50335:(e,r,t)=>{var o=t(48823),n=t(86399),l=t(77219);e.exports=function(e,r){if(void 0!==l&&n(Object(e))){var t=[],c=!0,a=!1,u=void 0;try{for(var i,s=o(e);!(c=(i=s.next()).done)&&(t.push(i.value),!r||t.length!==r);c=!0);}catch(e){a=!0,u=e}finally{try{c||null==s.return||s.return()}finally{if(a)throw u}}return t}}},50432:e=>{e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},48550:(e,r,t)=>{var o=t(39755),n=t(50335),l=t(39527),c=t(50432);e.exports=function(e,r){return o(e)||n(e,r)||l(e,r)||c()}},3597:(e,r,t)=>{t(73871),t(91867),e.exports=t(46459)},46459:(e,r,t)=>{var o=t(12159),n=t(83728);e.exports=t(34579).getIterator=function(e){var r=n(e);if("function"!=typeof r)throw TypeError(e+" is not iterable!");return o(r.call(e))}},29310:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i});var o=t(48550),n=t.n(o),l=t(67294),c=t(37636),a=t(73727);function u(){for(var e="#",r=0;r<6;r++)e+=Math.floor(16*Math.random()).toString(16);return e}const i=function(){var e=(0,l.useState)({color1:u(),color2:u(),color3:u(),color4:u()}),r=n()(e,1)[0];return l.createElement(c.Z,{style:{marginLeft:30,marginTop:30}},l.createElement(c.Z.Item,{color:r.color1},l.createElement(a.rU,{to:"/workbench",style:{color:r.color1}},"拖拽组件构建页面Demo")),l.createElement(c.Z.Item,{color:r.color4},l.createElement(a.rU,{to:"/custom-tmpl",style:{color:r.color4}},"拖拽组件配置移动端页面demo（含配置）")),l.createElement(c.Z.Item,{color:r.color2},l.createElement(a.rU,{to:"/approval-flow",style:{color:r.color2}},"审批流树状可视配置Demo")),l.createElement(c.Z.Item,{color:r.color3},l.createElement(a.rU,{to:"/time-selector",style:{color:r.color3}},"拖拽框选时间选择器")))}}}]);