(this.webpackJsonpsocset=this.webpackJsonpsocset||[]).push([[5],{398:function(e,t,c){"use strict";c.r(t);var r=c(162),n=c(0),s=c.n(n),j=c(18),i=c(198),u=c(1),o=function(){var e=Object(j.d)((function(e){return e.chat.status})),t=Object(j.c)();return Object(n.useEffect)((function(){return t(Object(i.c)()),function(){t(Object(i.d)())}}),[]),Object(u.jsx)("div",{children:"error"===e?Object(u.jsx)("div",{children:"Some error occurred. Please refresh the page."}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(a,{}),Object(u.jsx)(O,{})]})})},a=function(){var e=Object(j.d)((function(e){return e.chat.messages})),t=Object(n.useRef)(null),c=Object(n.useState)(!0),s=Object(r.a)(c,2),i=s[0],o=s[1];return Object(n.useEffect)((function(){var e;i&&(null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}))}),[e]),Object(u.jsxs)("div",{style:{height:"400px",overflowY:"auto"},onScroll:function(e){var t=e.currentTarget;Math.abs(t.scrollHeight-t.scrollTop-t.clientHeight)<30?!i&&o(!0):i&&o(!1)},children:[e.map((function(e,t){return Object(u.jsx)(b,{message:e},t)})),Object(u.jsx)("div",{ref:t})]})},b=s.a.memo((function(e){var t=e.message;return Object(u.jsxs)("div",{children:[Object(u.jsx)("img",{src:t.photo,style:{width:"30px"},alt:"ava"})," ",Object(u.jsx)("b",{children:t.userName}),Object(u.jsx)("br",{}),t.message,Object(u.jsx)("hr",{})]})})),O=function(){var e=Object(n.useState)(""),t=Object(r.a)(e,2),c=t[0],s=t[1],o=Object(j.d)((function(e){return e.chat.status})),a=Object(j.c)();return Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{children:Object(u.jsx)("textarea",{onChange:function(e){return s(e.currentTarget.value)},value:c,onKeyUp:function(e){c&&(10!==e.keyCode&&13!==e.keyCode||!e.ctrlKey||(a(Object(i.b)(c)),s("")))}})}),Object(u.jsx)("button",{disabled:"ready"!==o,onClick:function(){c&&(a(Object(i.b)(c)),s(""))},children:"Send"})]})};t.default=function(){return Object(u.jsx)("div",{children:Object(u.jsx)(o,{})})}}}]);
//# sourceMappingURL=5.00058bb3.chunk.js.map