(this["webpackJsonpchat-client"]=this["webpackJsonpchat-client"]||[]).push([[0],{34:function(e,t,n){e.exports=n(74)},39:function(e,t,n){},40:function(e,t,n){},71:function(e,t){},74:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),c=n(28),a=n.n(c),i=(n(39),n(2)),l=n(29),s=n(30),u=n(33),d=n(32),f=(n(40),n(31)),m=n.n(f),p=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.call(this)).state={username:"",callerName:"",users:{},localStream:null,remoteStream:null,offer:null},e.onMediaStream=function(t){var n=e.state.username;e.localVideo.current.srcObject=t,e.localVideo.current.volume=0;var r={room:"test",username:n};e.socket.current.emit("join",JSON.stringify(r)),e.socket.current.on("user",e.onUser),e.socket.current.on("ready",(function(){e.startCallButton.current.removeAttribute("disabled"),e.startCallButton.current.onclick=e.onStartCall})),e.socket.current.on("offer",e.onOffer)},e.onUser=function(t){var n=JSON.parse(t);e.setState((function(e){return Object(i.a)(Object(i.a)({},e),{},{users:{user:n}})}))},e.onStartCall=function(t){e.startCallButton.current.setAttribute("disabled","disabled"),e.endCallButton.current.removeAttribute("disabled"),e.socket.current.emit("token"),e.socket.current.on("token",e.onToken(e.createOffer))},e.onOffer=function(t){e.setState((function(e){return Object(i.a)(Object(i.a)({},e),{},{offer:t})})),e.startCallButton.current.setAttribute("disabled","disabled"),e.endCallButton.current.removeAttribute("disabled"),e.acceptCallButton.current.removeAttribute("disabled"),e.acceptCallButton.current.onclick=e.onAcceptCall},e.onAcceptCall=function(){var t=e.state.offer;e.socket.current.on("token",e.onToken(e.createAnswer(t))),e.socket.current.emit("token"),e.acceptCallButton.current.setAttribute("disabled","disabled")},e.createAnswer=function(t){return function(){e.connected.current=!0;var n=new RTCSessionDescription(JSON.parse(t));e.peerConnection.current.setRemoteDescription(n),e.peerConnection.current.createAnswer((function(t){e.peerConnection.current.setLocalDescription(t),e.socket.current.emit("answer",JSON.stringify(t))}),(function(e){console.log(e)}))}},e.onToken=function(t){return function(n){e.peerConnection.current=new RTCPeerConnection({iceServers:n.iceServers}),e.peerConnection.current.addStream(e.state.localStream),e.peerConnection.current.onicecandidate=e.onIceCandiate,e.peerConnection.current.onaddstream=e.onAddStream,e.socket.current.on("candidate",e.onCandidate),e.socket.current.on("answer",e.onAnswer),t()}},e.onAddStream=function(t){e.remoteVideo.current.srcObject=t.stream},e.onCandidate=function(t){var n=new RTCIceCandidate(JSON.parse(t));e.peerConnection.current.addIceCandidate(n)},e.onAnswer=function(t){var n=new RTCSessionDescription(JSON.parse(t));e.peerConnection.current.setRemoteDescription(n),e.connected.current=!0,e.localICECandidates.current.forEach((function(t){e.socket.current.emit("candidate",JSON.stringify(t))})),e.localICECandidates.current=[]},e.createOffer=function(){e.peerConnection.current.createOffer((function(t){e.peerConnection.current.setLocalDescription(t),e.socket.current.emit("offer",JSON.stringify(t))}),(function(e){console.log(e)}))},e.onIceCandiate=function(t){t.candidate&&(e.connected.current?e.socket.current.emit("candidate",JSON.stringify(t.candidate)):(e.localICECandidates.current=[],e.localICECandidates.current.push(t.candidate)))},e.localVideo=Object(r.createRef)(),e.remoteVideo=Object(r.createRef)(),e.socket=Object(r.createRef)(),e.startCallButton=Object(r.createRef)(),e.acceptCallButton=Object(r.createRef)(),e.endCallButton=Object(r.createRef)(),e.peerConnection=Object(r.createRef)(),e.localICECandidates=Object(r.createRef)([]),e.connected=Object(r.createRef)(!1),e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e,t=this;do{e=prompt("please enter your name?","")}while(!e);this.socket.current=m.a.connect("https://uwem-signal-server.herokuapp.com"),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(n){t.setState((function(t){return Object(i.a)(Object(i.a)({},t),{},{localStream:n,username:e})})),t.onMediaStream(n)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Video Chat"),o.a.createElement("video",{ref:this.localVideo,muted:!0,id:"local-video",height:"300",autoPlay:!0}),o.a.createElement("video",{ref:this.remoteVideo,id:"remote-video",height:"300",autoPlay:!0}),o.a.createElement("div",null,o.a.createElement("button",{type:"button",disabled:!0,ref:this.startCallButton,id:"startCall"},"Call"),o.a.createElement("button",{type:"button",disabled:!0,ref:this.acceptCallButton,id:"acceptCall"},"Accept"),o.a.createElement("button",{type:"button",disabled:!0,ref:this.endCallButton,id:"endCall"},"End")))}}]),n}(r.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function b(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}a.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(p,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/chat-client",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/chat-client","/service-worker.js");C?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):b(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):b(t,e)}))}}()}},[[34,1,2]]]);
//# sourceMappingURL=main.edb8da5a.chunk.js.map