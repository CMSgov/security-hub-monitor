(this["webpackJsonppolicy-infraction-monitor"]=this["webpackJsonppolicy-infraction-monitor"]||[]).push([[0],{178:function(e,t){},201:function(e,t,n){},313:function(e,t){},314:function(e,t){},330:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(181),c=(n(201),n(10)),i=n(187),s=n(114),l=n(83),o=n.n(l),u=n(186),f=n(9);var d=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)([]),d=Object(c.a)(l,2),b=d[0],j=d[1],h=Object(a.useState)([]),O=Object(c.a)(h,2),v=O[0],m=O[1],g=Object(a.useState)([]),x=Object(c.a)(g,2),S=x[0],p=x[1],y=Object(a.useState)([]),C=Object(c.a)(y,2),w=C[0],F=C[1],N=Object(a.useState)([]),L=Object(c.a)(N,2),A=L[0],I=L[1],R=Object(a.useState)([]),k=Object(c.a)(R,2),T=k[0],H=k[1],E=Object(a.useState)({}),P=Object(c.a)(E,2),D=P[0],M=P[1],q=Object(a.useState)({}),W=Object(c.a)(q,2),U=W[0],B=W[1],G=Object(a.useState)([]),J=Object(c.a)(G,2),$=J[0],_=J[1],z=Object(a.useState)({}),K=Object(c.a)(z,2),Q=K[0],V=K[1],X=function(e,t){var n=t?t.name:e.target.name,a=t?e:[e.target];Q[n]=a.map((function(e){return e.value})),U[n]=a,B(U),V(Q),Y()},Y=function(){for(var e=v,t=!1,n=function(n){for(var a=b[n],r=[],c=function(n){var c=Q[a][n].toLowerCase();if(!c)return"continue";t=!0;var i=e.filter((function(e){return e[a].toLowerCase().includes(c)}));r=r.concat(i)},i=0;i<Q[a].length;i++)c(i);t?(t=!1,e=r):e=e.concat(r)},a=0;a<b.length;a++)n(a);Z(e)},Z=function(e){var t=Q.Search[0].toLowerCase();if(t){for(var n=[],a=function(a){var r=b[a],c=e.filter((function(e){return e[r].toLowerCase().includes(t)}));n=n.concat(c)},r=0;r<b.length;r++)a(r);e=n}_(e);var c=Object.values(e.reduce((function(e,t){var n=t.Title;return e[n]?e[n].value+=1:e[n]={id:n,value:1},e}),{}));F(c);var i=Object.values(e.reduce((function(e,t){var n=t["Severity Label"];return e[n]?e[n].value+=1:e[n]={id:n,value:1},e}),{}));H(i)},ee=function(){return Object(f.jsx)(i.a,{data:T,innerRadius:.5,padAngle:.7,cornerRadius:3,colors:function(e){switch(e.id){case"INFORMATIONAL":return"#fffff0";case"LOW":return"#ffffcc";case"MEDIUM":return"#ffeda0";case"HIGH":return"#fed976";case"CRITICAL":return"#feb24c"}},borderWidth:1,borderColor:{from:"color",modifiers:[["darker",.2]]},enableArcLinkLabels:!1,className:"pie"})},te=function(){return Object(f.jsx)(o.a,{pagination:!0,highlightOnHover:!0,columns:S,data:w,defaultSortAsc:!1,defaultSortField:"value",className:"datatable",title:"Findings by title"})},ne=function(){return Object(f.jsx)(o.a,{pagination:!0,highlightOnHover:!0,columns:A,data:T,defaultSortAsc:!1,defaultSortField:"value",className:"datatable",title:"Findings by severity",conditionalRowStyles:ae})},ae=[{when:function(e){return"LOW"===e.id},style:{backgroundColor:"#ffffcc"}},{when:function(e){return"MEDIUM"===e.id},style:{backgroundColor:"#ffeda0"}},{when:function(e){return"HIGH"===e.id},style:{backgroundColor:"#fed976"}},{when:function(e){return"CRITICAL"===e.id},style:{backgroundColor:"#feb24c"}}],re=function(){return Object(f.jsx)(o.a,{pagination:!0,highlightOnHover:!0,columns:n,data:$,className:"datatable",title:"All findings"})},ce=function(e){var t=e.name;return Object(f.jsxs)("div",{className:"field onequarter",children:[Object(f.jsxs)("label",{htmlFor:t,children:[t,":"]}),Object(f.jsx)(u.a,{isMulti:!0,name:t,options:D[t],className:"basic-multi-select",classNamePrefix:"select",value:U[t],onChange:X})]})};return Object(f.jsxs)("div",{children:[Object(f.jsxs)("form",{id:"form",children:[Object(f.jsxs)("div",{className:"field onequarter",children:[Object(f.jsx)("label",{htmlFor:"File",children:"File:"}),Object(f.jsx)("input",{type:"file",accept:".csv,.xlsx,.xls",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onload=function(e){var t=e.target.result,n=s.read(t,{type:"binary"}),a=n.SheetNames[0],c=n.Sheets[a];!function(e){for(var t=e.split(/\r\n|\n/),n=t[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/),a=[],c=1;c<t.length;c++){var i=t[c].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);if(n&&i.length===n.length){for(var s={},l=0;l<n.length;l++){var o=i[l];o.length>0&&('"'===o[0]&&(o=o.substring(1,o.length-1)),'"'===o[o.length-1]&&(o=o.substring(o.length-2,1))),n[l]&&(s[n[l]]=o)}Object.values(s).filter((function(e){return e})).length>0&&a.push(s)}}for(var u={},f=function(e){var t=n[e];u[t]=Array.from(new Set(a.map((function(e){return e[t]})))),Q[t]=[""]},d=0;d<n.length;d++)f(d);Q.Search=[""];var b={};for(var h in u)b[h]=u[h].map((function(e){return{label:e,value:e}}));var O=n.map((function(e){return{name:e,selector:e}}));m(a),V(Q),j(n),r(O),p([{name:"Title",selector:"id",sortable:!0,width:"80%"},{name:"# resources affected",selector:"value",sortable:!0}]),I([{name:"Severity",selector:"id",sortable:!0},{name:"# resources affected",selector:"value",sortable:!0}]),M(b),Z(a)}(s.utils.sheet_to_csv(c,{header:1}))},n.readAsBinaryString(t)},required:!0,name:"File"})]}),Object(f.jsxs)("div",{className:"field onequarter",children:[Object(f.jsx)("label",{htmlFor:"Search",children:"Search:"}),Object(f.jsx)("input",{type:"search",name:"Search",placeholder:"Type to filter all fields",onChange:X})]}),Object(f.jsx)(ce,{name:"Team"}),Object(f.jsx)(ce,{name:"AWS Account ID"}),Object(f.jsx)(ce,{name:"Compliance Status"}),Object(f.jsx)(ce,{name:"Severity Label"}),Object(f.jsx)(ce,{name:"Resource Type"}),Object(f.jsx)(ce,{name:"Record State"}),Object(f.jsxs)("div",{className:"field onequarter",children:[Object(f.jsx)("input",{id:"hideSuppressed",name:"Workflow Status",type:"checkbox",onChange:function(e){var t=e.target.name,n=e.target.checked;Q[t]=D[t].map((function(e){return e.value})),n&&(Q[t]=Q[t].filter((function(e){return"SUPPRESSED"!==e}))),V(Q),Y()}}),Object(f.jsx)("label",{htmlFor:"hideSuppressed",children:"Hide SUPPRESSED items"})]}),Object(f.jsx)("button",{type:"reset",children:"Reset"})]}),Object(f.jsx)("div",{className:"half",children:Object(f.jsx)(te,{})}),Object(f.jsx)("div",{className:"twosixths",children:Object(f.jsx)(ne,{})}),Object(f.jsx)("div",{className:"onesixth pie",style:{height:300},children:Object(f.jsx)(ee,{})}),Object(f.jsx)("div",{className:"full",children:Object(f.jsx)(re,{})})]})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,368)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};Object(r.render)(Object(f.jsx)(d,{}),document.getElementById("root")),b()}},[[330,1,2]]]);
//# sourceMappingURL=main.d49e9cb2.chunk.js.map