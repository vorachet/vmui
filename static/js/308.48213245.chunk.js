"use strict";(self.webpackChunkvmui=self.webpackChunkvmui||[]).push([[308],{5308:function(e,i,n){n.r(i);n(7313);var a=n(3654),t=n(7491),r=n(5912),s=n(9592),c=n(8452),l=n(3944),o=n(4626),m=n(2869),p=n(6417),u=o.D.buildTrayModel("Polished Machine",[[10,10,10,10,10],[5,5,5,5,5,5],[1,1]]),g={"1-1":{socket:"1-1",limit:10,name:"Redbull",price:26,image:"/vmui/images/redbull.png",qty:10},"1-2":{socket:"1-2",limit:10,name:"Redbull",price:26,image:"/vmui/images/redbull.png",qty:10},"1-3":{socket:"1-3",limit:10,name:"Gum",price:26,image:"/vmui/images/gum.png",qty:10},"1-4":{socket:"1-4",limit:10,name:"Snack",price:26,image:"/vmui/images/snack.png",qty:10},"1-5":{socket:"1-5",limit:10,name:"Snack",price:40,image:"/vmui/images/snack.png",qty:10},"2-1":{socket:"2-1",limit:5,name:"Cola",price:40,image:"/vmui/images/cola.png",qty:5},"2-2":{socket:"2-2",limit:5,name:"Cola",price:40,image:"/vmui/images/cola.png",qty:5},"2-3":{socket:"2-3",limit:5,name:"Snack",price:40,image:"/vmui/images/snack.png",qty:5},"2-4":{socket:"2-4",limit:5,name:"Redbull",price:26,image:"/vmui/images/redbull.png",qty:5},"2-5":{socket:"2-5",limit:5,name:"Cola",price:14,image:"/vmui/images/gum.png",qty:5},"2-6":{socket:"2-6",limit:5,name:"Gum",price:37,image:"/vmui/images/gum.png",qty:5},"3-1":{socket:"3-1",limit:1,name:"PC",price:800,image:"/vmui/images/laptop.png",qty:1},"3-2":{socket:"3-2",limit:1,name:"iMac",price:1e3,image:"/vmui/images/computer.png",qty:1}};i.default=function(){return(0,p.jsxs)(a.W,{style:{minWidth:1200},children:[(0,p.jsx)(m.Z,{title:"A Polished Machine"}),(0,p.jsxs)(t.Z,{position:"apart",children:[(0,p.jsxs)(t.Z,{children:[(0,p.jsx)(l.Y.SetCurrency,{}),(0,p.jsx)(l.Y.SetPredefinedCoins,{})]}),(0,p.jsx)(t.Z,{children:(0,p.jsx)(l.Y.InventoryModalButton,{})})]}),(0,p.jsx)(r.Z,{withBorder:!0,shadow:"xl",style:{background:"gray"},my:10,children:(0,p.jsxs)(s.r,{children:[(0,p.jsx)(s.r.Col,{span:8,children:(0,p.jsx)(l.Y.Assortment,{showTitle:!1,showSocket:!1,trayModel:u,dispenserDB:g})}),(0,p.jsx)(s.r.Col,{span:4,children:(0,p.jsxs)(c.M,{cols:2,children:[(0,p.jsx)(l.Y.CashAcceptor,{showTitle:!1}),(0,p.jsx)(l.Y.Pickup,{showTitle:!1})]})})]})})]})}},8452:function(e,i,n){n.d(i,{M:function(){return j}});var a=n(7762),t=n(7313),r=n(6723),s=n(3304),c=n(3433);var l=Object.defineProperty,o=Object.getOwnPropertySymbols,m=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,u=function(e,i,n){return i in e?l(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n},g=function(e,i){for(var n in i||(i={}))m.call(i,n)&&u(e,n,i[n]);if(o){var t,r=(0,a.Z)(o(i));try{for(r.s();!(t=r.n()).done;){n=t.value;p.call(i,n)&&u(e,n,i[n])}}catch(s){r.e(s)}finally{r.f()}}return e},d=(0,s.k)((function(e,i){var n=i.spacing,a=i.breakpoints,t=i.cols,r=i.verticalSpacing,s=null!=r,l=function(e,i){if(0===i.length)return i;var n="maxWidth"in i[0]?"maxWidth":"minWidth",a=(0,c.Z)(i).sort((function(i,a){return e.fn.size({size:a[n],sizes:e.breakpoints})-e.fn.size({size:i[n],sizes:e.breakpoints})}));return"minWidth"===n?a.reverse():a}(e,a).reduce((function(i,a){var t="maxWidth"in a?"max-width":"min-width",c=e.fn.size({size:"max-width"===t?a.maxWidth:a.minWidth,sizes:e.breakpoints});return i["@media (".concat(t,": ").concat(c-("max-width"===t?1:0),"px)")]={gridTemplateColumns:"repeat(".concat(a.cols,", minmax(0, 1fr))"),gap:"".concat(e.fn.size({size:a.verticalSpacing||(s?r:n),sizes:e.spacing}),"px ").concat(e.fn.size({size:a.spacing||n,sizes:e.spacing}),"px")},i}),{});return{root:g({boxSizing:"border-box",display:"grid",gridTemplateColumns:"repeat(".concat(t,", minmax(0, 1fr))"),gap:"".concat(e.fn.size({size:s?r:n,sizes:e.spacing}),"px ").concat(e.fn.size({size:n,sizes:e.spacing}),"px")},l)}})),f=n(8189),y=Object.defineProperty,h=Object.getOwnPropertySymbols,v=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable,x=function(e,i,n){return i in e?y(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n},k={breakpoints:[],cols:1,spacing:"md"},j=(0,t.forwardRef)((function(e,i){var n=(0,r.N4)("SimpleGrid",k,e),s=n.className,c=n.breakpoints,l=n.cols,o=n.spacing,m=n.verticalSpacing,p=n.children,u=n.unstyled,g=function(e,i){var n={};for(var t in e)v.call(e,t)&&i.indexOf(t)<0&&(n[t]=e[t]);if(null!=e&&h){var r,s=(0,a.Z)(h(e));try{for(s.s();!(r=s.n()).done;)t=r.value,i.indexOf(t)<0&&b.call(e,t)&&(n[t]=e[t])}catch(c){s.e(c)}finally{s.f()}}return n}(n,["className","breakpoints","cols","spacing","verticalSpacing","children","unstyled"]),y=d({breakpoints:c,cols:l,spacing:o,verticalSpacing:m},{unstyled:u,name:"SimpleGrid"}),j=y.classes,z=y.cx;return t.createElement(f.x,function(e,i){for(var n in i||(i={}))v.call(i,n)&&x(e,n,i[n]);if(h){var t,r=(0,a.Z)(h(i));try{for(r.s();!(t=r.n()).done;)n=t.value,b.call(i,n)&&x(e,n,i[n])}catch(s){r.e(s)}finally{r.f()}}return e}({className:z(j.root,s),ref:i},g),p)}));j.displayName="@mantine/core/SimpleGrid"}}]);