"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[13],{2634:function(e,n,r){r.r(n),r.d(n,{default:function(){return Z}});var t=r(4165),c=r(5861),s=r(9439),a=r(2791),i=r(7689),o=r(6517),l=r(9466),d=r(184),u=function(e){var n=(0,a.useRef)(),r=e.center,t=e.zoom;return(0,a.useEffect)((function(){var e=new window.google.maps.Map(n.current,{center:r,zoom:t});new window.google.maps.Marker({position:r,map:e})}),[r,t]),(0,d.jsx)("div",{ref:n,className:"map ".concat(e.className),style:e.style})},p=r(4575),h=r(1708),m=r(7722),f=r(6273),x=r(3696);var j=function(e){var n=(0,m.Z)(),r=n.isLoading,i=n.error,j=n.sendRequest,v=n.clearError,Z=(0,a.useContext)(h.Z),C=(0,a.useState)(!1),k=(0,s.Z)(C,2),g=k[0],E=k[1],w=(0,a.useState)(!1),N=(0,s.Z)(w,2),y=N[0],_=N[1],b=function(){return E(!1)},D=function(){_(!1)},I=function(){var n=(0,c.Z)((0,t.Z)().mark((function n(){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return _(!1),n.prev=1,n.next=4,j("".concat("https://brick-red-salmon-vest.cyclic.app/api","/places/").concat(e.id),"DELETE",null,{Authorization:"Bearer "+Z.token});case 4:e.onDelete(e.id),n.next=9;break;case 7:n.prev=7,n.t0=n.catch(1);case 9:case"end":return n.stop()}}),n,null,[[1,7]])})));return function(){return n.apply(this,arguments)}}();return(0,d.jsxs)(a.Fragment,{children:[(0,d.jsx)(f.Z,{error:i,onClear:v}),(0,d.jsx)(p.Z,{show:g,onCancel:b,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:(0,d.jsx)(o.Z,{onClick:b,children:"CLOSE"}),children:(0,d.jsx)("div",{className:"map-container",children:(0,d.jsx)(u,{center:e.coordinates,zoom:16})})}),(0,d.jsx)(p.Z,{show:y,onCancel:D,header:"Are you sure",footerClass:"place-item__modal-actions",footer:(0,d.jsxs)(a.Fragment,{children:[(0,d.jsx)(o.Z,{inverse:!0,onClick:D,children:"CANCEL"}),(0,d.jsx)(o.Z,{danger:!0,onClick:I,children:"DELETE"})]}),children:(0,d.jsx)("p",{children:"Are you sure to delete this place? Please note that it will delete the data from your account permanently"})}),(0,d.jsx)("li",{className:"place-item",children:(0,d.jsxs)(l.Z,{className:"place-item__content",children:[r&&(0,d.jsx)(x.Z,{asOverlay:!0}),(0,d.jsx)("div",{className:"place-item__image",children:(0,d.jsx)("img",{src:"".concat("https://brick-red-salmon-vest.cyclic.app","/").concat(e.image),alt:e.name})}),(0,d.jsxs)("div",{className:"place-item__info",children:[(0,d.jsx)("h2",{children:e.title}),(0,d.jsx)("h3",{children:e.address}),(0,d.jsx)("p",{children:e.description})]}),(0,d.jsxs)("div",{className:"place-item__actions",children:[(0,d.jsx)(o.Z,{inverse:!0,onClick:function(){return E(!0)},children:"VIEW ON MAP"}),Z.userId===e.creatorId&&(0,d.jsx)(o.Z,{to:"/places/".concat(e.id),children:"EDIT"}),Z.userId===e.creatorId&&(0,d.jsx)(o.Z,{danger:!0,onClick:function(){_(!0)},children:"DELETE"})]})]})})]})};var v=function(e){return 0===e.items.length?(0,d.jsx)("div",{className:"place-list center",children:(0,d.jsxs)(l.Z,{children:[(0,d.jsx)("h2",{children:"No Places Found, May be Create one?"}),(0,d.jsx)(o.Z,{to:"/places/new",children:"Share Place"})]})}):(0,d.jsx)("ul",{className:"place-list",children:e.items.map((function(n){return(0,d.jsx)(j,{id:n.id,image:n.image,title:n.title,description:n.description,address:n.address,creatorId:n.creator,coordinates:n.location,onDelete:e.onDeletePlace},n.id)}))})};var Z=function(){var e=(0,a.useState)(),n=(0,s.Z)(e,2),r=n[0],o=n[1],l=(0,m.Z)(),u=l.isLoading,p=l.error,h=l.sendRequest,j=l.clearError,Z=(0,i.UO)().userId;return(0,a.useEffect)((function(){var e=function(){var e=(0,c.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://brick-red-salmon-vest.cyclic.app/api","/places/user/").concat(Z));case 3:n=e.sent,o(n.places),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[h,Z]),(0,d.jsxs)(a.Fragment,{children:[(0,d.jsx)(f.Z,{error:p,onClear:j}),u&&(0,d.jsx)("div",{className:"center",children:(0,d.jsx)(x.Z,{})}),!u&&r&&(0,d.jsx)(v,{items:r,onDeletePlace:function(e){o((function(n){return n.filter((function(n){return n.id!==e}))}))}})]})}},9466:function(e,n,r){r.d(n,{Z:function(){return c}});r(2791);var t=r(184),c=function(e){return(0,t.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}}}]);
//# sourceMappingURL=13.f7710ff0.chunk.js.map