(this["webpackJsonpchat-client"]=this["webpackJsonpchat-client"]||[]).push([[0],{105:function(e,t){},107:function(e,t){},116:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(48),i=n.n(r),o=(n(58),n(4)),u=n(13),l=(n(59),n(49)),s=n.n(l),f=n(21),b=n.n(f),m=n(14);function d(){var e=Object(u.a)(["\n  border: 1px solid blue;\n  width: 50%;\n  height: 50%;\n"]);return d=function(){return e},e}function j(){var e=Object(u.a)(["\n  display: flex;\n  width: 100%;\n"]);return j=function(){return e},e}function O(){var e=Object(u.a)(["\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"]);return O=function(){return e},e}var h=m.a.div(O()),v=m.a.div(j()),g=m.a.video(d());var p=function(){var e,t,n,r=Object(c.useState)(""),i=Object(o.a)(r,2),u=i[0],l=i[1],f=Object(c.useState)({}),m=Object(o.a)(f,2),d=m[0],j=m[1],O=Object(c.useState)(),p=Object(o.a)(O,2),E=p[0],w=p[1],y=Object(c.useState)(!1),k=Object(o.a)(y,2),S=k[0],x=k[1],C=Object(c.useState)(""),I=Object(o.a)(C,2),D=I[0],R=I[1],U=Object(c.useState)(),A=Object(o.a)(U,2),B=A[0],J=A[1],M=Object(c.useState)(!1),P=Object(o.a)(M,2),W=P[0],T=P[1],$=Object(c.useRef)(),q=Object(c.useRef)(),z=Object(c.useRef)();return Object(c.useEffect)((function(){z.current=s.a.connect("/"),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){w(e),$.current&&($.current.srcObject=e)})),z.current.on("yourID",(function(e){l(e)})),z.current.on("allUsers",(function(e){j(e)})),z.current.on("hey",(function(e){x(!0),R(e.from),J(e.signal)}))}),[]),E&&(e=a.a.createElement(g,{playsInline:!0,muted:!0,ref:$,autoPlay:!0})),W&&(t=a.a.createElement(g,{playsInline:!0,ref:q,autoPlay:!0})),S&&(n=a.a.createElement("div",null,a.a.createElement("h1",null,D," is calling you"),a.a.createElement("button",{onClick:function(){T(!0);var e=new b.a({initiator:!1,trickle:!1,stream:E});e.on("signal",(function(e){z.current.emit("acceptCall",{signal:e,to:D})})),e.on("stream",(function(e){q.current.srcObject=e})),e.signal(B)}},"Accept"))),a.a.createElement(h,null,a.a.createElement(v,null,e,t),a.a.createElement(v,null,Object.keys(d).map((function(e){return e===u?null:a.a.createElement("button",{onClick:function(){return function(e){var t=new b.a({initiator:!0,trickle:!1,stream:E});t.on("signal",(function(t){z.current.emit("callUser",{userToCall:e,signalData:t,from:u})})),t.on("stream",(function(e){q.current&&(q.current.srcObject=e)})),z.current.on("callAccepted",(function(e){T(!0),t.signal(e)}))}(e)}},"Call ",e)}))),a.a.createElement(v,null,n))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},53:function(e,t,n){e.exports=n(116)},58:function(e,t,n){},59:function(e,t,n){},89:function(e,t){}},[[53,1,2]]]);
//# sourceMappingURL=main.66fd5c2d.chunk.js.map