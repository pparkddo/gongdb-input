(this["webpackJsonpgongdb-input"]=this["webpackJsonpgongdb-input"]||[]).push([[0],{48:function(e,t,a){e.exports=a(60)},53:function(e,t,a){},54:function(e,t,a){},55:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(16),r=a.n(c),o=(a(53),a(46)),u=a(25),m=a(27),i=a(10),s=a(62),E=a(69),d=a(68),f=a(63),b=a(64),h=a(66),p=a(67),C=a(39),k=a(65),v=(a(54),a(55),function(e,t){return t?"#158b9f":e?"#14a4be":"#ffffff"}),g=function(e){var t=Object(n.useState)(!1),a=Object(i.a)(t,2),c=a[0],r=a[1],o=Object(n.useState)(!1),u=Object(i.a)(o,2),m=u[0],s=u[1];return l.a.createElement("label",{className:"pill-checkbox",style:{backgroundColor:v(c,m)}},l.a.createElement(p.a.Check,{id:e.id,type:"checkbox",className:"position-absolute",value:e.label,checked:c,onChange:function(){return r(!c)},onBlur:function(){return s(!1)},onFocus:function(){return s(!0)},onKeyPress:function(e){"Enter"===e.key&&r(!c)}}),l.a.createElement("span",{className:"pill-label ".concat(c?"checked":""," ").concat(m?"focused":"")},e.label))},y=["\uc758\uc0ac\uc18c\ud1b5\ub2a5\ub825","\ubb38\uc81c\ud574\uacb0\ub2a5\ub825","\ub300\uc778\uad00\uacc4\ub2a5\ub825","\uc790\uc6d0\uad00\ub9ac\ub2a5\ub825","\uc9c1\uc5c5\uc724\ub9ac","\uc815\ubcf4\ub2a5\ub825","\uc218\ub9ac\ub2a5\ub825","\uc9c1\ubb34\uc218\ud589\ub2a5\ub825","\uc804\uacf5\ub2a5\ub825"],j=function(e){var t=[e.ncs0,e.ncs1,e.ncs2,e.ncs3,e.ncs4,e.ncs5,e.ncs6,e.ncs7,e.ncs8];return y.filter((function(e,a){return t[a]})).join(",")};var x=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(),v=Object(i.a)(r,2),x=v[0],O=v[1],N=Object(n.useState)(!1),S=Object(i.a)(N,2),L=S[0],T=S[1],w=Object(n.useState)(!1),q=Object(i.a)(w,2),B=q[0],I=q[1],A=Object(n.useState)(!0),J=Object(i.a)(A,2),F=J[0],R=J[1],H=Object(n.useState)(!0),K=Object(i.a)(H,2),P=K[0],W=K[1],M=Object(n.useState)(!0),U=Object(i.a)(M,2),$=U[0],z=U[1],D=Object(n.useRef)(null),G=function(){var e={};return document.querySelectorAll(".form-control").forEach((function(t){var a=t.value;e=Object(m.a)(Object(m.a)({},e),{},Object(u.a)({},t.id,a))})),document.querySelectorAll(".form-check-input").forEach((function(t){var a=t.checked;e=Object(m.a)(Object(m.a)({},e),{},Object(u.a)({},t.id,a))})),e},Q=function(){return I(!1)};return l.a.createElement(s.a,null,l.a.createElement(E.a,{bg:"light",expand:"lg"},l.a.createElement(E.a.Brand,{href:"#"},"\uacf5\ub514\ube44"),l.a.createElement(E.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(E.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(d.a,{className:"mr-auto"},l.a.createElement(d.a.Link,{href:"#"},"Form")),l.a.createElement(f.a,{variant:"outline-info",onClick:function(){return function(e){var t="text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),a=document.createElement("a");a.href="data:"+t,a.download="data.json",a.click(),a.remove()}(a)}},"\ub370\uc774\ud130 \ub2e4\uc6b4\ub85c\ub4dc"))),l.a.createElement(b.a,{variant:"success",show:L,style:{position:"fixed",top:15,right:15}},"\uc815\uc0c1\uc801\uc73c\ub85c \uc785\ub825\ub418\uc5c8\uc2b5\ub2c8\ub2e4!"),l.a.createElement(h.a,{show:B,onHide:Q,animation:!1},l.a.createElement(h.a.Header,{closeButton:!0},l.a.createElement(h.a.Title,null,"\ub370\uc774\ud130 \uc0ad\uc81c")),l.a.createElement(h.a.Body,null,x+1,"\ubc88 \ub370\uc774\ud130\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c"),l.a.createElement(h.a.Footer,null,l.a.createElement(f.a,{variant:"light",onClick:Q},"\ucde8\uc18c"),l.a.createElement(f.a,{variant:"danger",onClick:function(){return e=x,Q(),void c(a.filter((function(t,a){return a!==e})));var e}},"\uc0ad\uc81c"))),l.a.createElement(p.a,null,l.a.createElement(p.a.Row,{id:"input-form"},l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\ud68c\uc0ac\uba85"),l.a.createElement(p.a.Control,{id:"companyName",autoComplete:"off"})),l.a.createElement(C.a,{xs:6},l.a.createElement(p.a.Label,null,"\uc811\uc218\uc77c\uc790"),l.a.createElement(p.a.Control,{id:"announcementTimestamp",autoComplete:"off"})),l.a.createElement(C.a,{xs:6},l.a.createElement(p.a.Label,null,"\ucc28\uc218"),l.a.createElement(p.a.Control,{id:"sequence",autoComplete:"off"})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\ub9c1\ud06c"),l.a.createElement(p.a.Control,{id:"link",autoComplete:"off"})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\uc9c0\uc6d0\uac00\ub2a5 \uc5b4\ud559\uc131\uc801"),l.a.createElement(p.a.Control,{id:"languageScore",autoComplete:"off"})),l.a.createElement(C.a,{xs:12,className:"mt-3"},l.a.createElement("hr",null)),l.a.createElement(C.a,{xs:6},l.a.createElement(p.a.Label,null,"\uadfc\ubb34\ud615\ud0dc"),l.a.createElement(p.a.Control,{id:"workingType",className:"erasable",autoComplete:"off",ref:D})),l.a.createElement(C.a,{xs:6},l.a.createElement(p.a.Label,null,"\ucc44\uc6a9\uad6c\ubd84"),l.a.createElement(p.a.Control,{id:"recruitType",className:"erasable",autoComplete:"off",onChange:function(e){return"\uc9c0\uc5ed"===e.target.value?z(!1):z(!0)}})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\uc9c0\uc5ed"),l.a.createElement(p.a.Control,{id:"districts",className:"erasable",autoComplete:"off",readOnly:$,tabIndex:$?-1:void 0,placeholder:$?"\ucc44\uc6a9\uad6c\ubd84\uc774 \uc9c0\uc5ed\uc77c \ub54c \uc785\ub825":void 0})),l.a.createElement(C.a,{xs:6},l.a.createElement(p.a.Label,null,"\ucc44\uc6a9\uc218\uc900"),l.a.createElement(p.a.Control,{id:"recruitLevel",className:"erasable",autoComplete:"off"})),l.a.createElement(C.a,{xs:6},l.a.createElement(p.a.Label,null,"\uc9c1\uae09"),l.a.createElement(p.a.Control,{id:"rank",className:"erasable",autoComplete:"off"})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\uc9c1\uad70"),l.a.createElement(p.a.Control,{id:"position",className:"erasable",autoComplete:"off"})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\ucc44\uc6a9\uc778\uc6d0"),l.a.createElement(p.a.Control,{id:"headCount",className:"erasable",autoComplete:"off"})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\uacfc\ubaa9"),l.a.createElement(p.a.Control,{id:"subjects",className:"erasable",autoComplete:"off"})),l.a.createElement(C.a,{xs:12,className:"mt-3"},l.a.createElement("hr",null)),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\uc9c0\uc6d0\uac00\ub2a5 \uc790\uaca9\uc99d"),l.a.createElement(p.a.Control,{id:"certificates",className:"erasable",autoComplete:"off",readOnly:F,tabIndex:F?-1:void 0,placeholder:F?"\ud65c\uc131\ud654\ud558\ub824\uba74 \ud074\ub9ad":void 0,onClick:function(){return R(!F)}})),l.a.createElement(C.a,{xs:12},l.a.createElement(p.a.Label,null,"\uc9c0\uc6d0\uac00\ub2a5 \ud559\uacfc"),l.a.createElement(p.a.Control,{id:"departments",className:"erasable",autoComplete:"off",readOnly:P,tabIndex:P?-1:void 0,placeholder:P?"\ud65c\uc131\ud654\ud558\ub824\uba74 \ud074\ub9ad":void 0,onClick:function(){return W(!P)}})),F||P?null:l.a.createElement(C.a,{xs:12,className:"mt-3 text-right"},l.a.createElement(p.a.Check,{inline:!0,type:"checkbox",id:"isEither",label:"\ub458 \uc911 \ud558\ub098\ub9cc \ub9cc\uc871\ud558\uba74 \ub3fc\uc694",onKeyPress:function(e){"Enter"===e.key&&(e.currentTarget.checked=!e.currentTarget.checked)}})),l.a.createElement(C.a,{xs:12,className:"my-4 text-center"},y.map((function(e,t){return l.a.createElement(g,{key:t,id:"ncs".concat(t),label:e})}))),l.a.createElement(C.a,{xs:12},l.a.createElement(f.a,{block:!0,variant:"info",onClick:function(){var e,t,n=[].concat(Object(o.a)(a),[(e=G(),{workingType:e.workingType,recruitType:e.recruitType,districts:e.districts,recruitLevel:e.recruitLevel,rank:e.rank,certificates:e.certificates,companyName:e.companyName,departments:e.departments,headCount:e.headCount,languageScore:e.languageScore,link:e.link,ncs:j(e),announcementTimestamp:e.announcementTimestamp,position:e.position,sequence:e.sequence,subjects:e.subjects,isEither:e.isEither})]);c(n),document.querySelectorAll(".erasable").forEach((function(e){e.value=""})),document.querySelectorAll(".form-check-input").forEach((function(e){e.checked&&e.click()})),function(){var e;null===D||void 0===D||null===(e=D.current)||void 0===e||e.focus()}(),T(!0),setTimeout((function(){T(!1)}),1e3),R(!0),W(!0),z(!0),t=n,localStorage.setItem("gongdb-input",JSON.stringify(t))}},"\uc785\ub825")))),a.length>0?l.a.createElement(k.a,{striped:!0,bordered:!0,hover:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"\ud68c\uc0ac\uba85"),l.a.createElement("th",null,"\uacf5\uace0\uc5f0\ub3c4"),l.a.createElement("th",null,"\ucc28\uc218"),l.a.createElement("th",null,"\uc5b4\ud559"),l.a.createElement("th",null,"\ub9c1\ud06c"),l.a.createElement("th",null,"\uc9c1\uad70"),l.a.createElement("th",null,"\uadfc\ubb34\ud615\ud0dc"),l.a.createElement("th",null,"\ucc44\uc6a9\uad6c\ubd84"),l.a.createElement("th",null,"\uc9c0\uc5ed"),l.a.createElement("th",null,"\ucc44\uc6a9\uc218\uc900"),l.a.createElement("th",null,"\uc9c1\uae09"),l.a.createElement("th",null,"\uc778\uc6d0"),l.a.createElement("th",null,"\uacfc\ubaa9"),l.a.createElement("th",null,"\uc790\uaca9\uc99d"),l.a.createElement("th",null,"\ud559\uacfc"),l.a.createElement("th",null,"NCS"),l.a.createElement("th",null,"\ub458\uc911\ud558\ub098"))),l.a.createElement("tbody",null,a.map((function(e,t){return l.a.createElement("tr",{key:t,"data-key":t,onClick:function(){O(t),I(!0)}},l.a.createElement("td",null,t+1),l.a.createElement("td",null,e.companyName),l.a.createElement("td",null,e.announcementTimestamp),l.a.createElement("td",null,e.sequence),l.a.createElement("td",null,e.languageScore),l.a.createElement("td",null,e.link),l.a.createElement("td",null,e.position),l.a.createElement("td",null,e.workingType),l.a.createElement("td",null,e.recruitType),l.a.createElement("td",null,e.districts),l.a.createElement("td",null,e.recruitLevel),l.a.createElement("td",null,e.rank),l.a.createElement("td",null,e.headCount),l.a.createElement("td",null,e.subjects),l.a.createElement("td",null,e.certificates),l.a.createElement("td",null,e.departments),l.a.createElement("td",null,e.ncs),l.a.createElement("td",null,"boolean"===typeof e.isEither?String(e.isEither):""))})))):null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(59);r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[48,1,2]]]);
//# sourceMappingURL=main.36c6f706.chunk.js.map