import{h as C,a as t,j as V,c as w,v as B,R,r as y,bN as S,bO as W,aL as T,aH as j,g as O,aI as _,I as A}from"./main.2bad25cd.js";const D=C(t("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"}),"ChevronRightOutlined");function K(o){const{isCurrent:b,sizeStyle:i,isMenuTrigger:d,isClickable:E,isDisabled:m,onSelected:u,className:z,isMenuItem:f,isLink:e}=o,g=typeof o.children=="function"?o.children({isMenuItem:f}):o.children;if(f)return g;const I=d?{}:{tabIndex:e&&!m?0:void 0,role:e?"link":void 0,"aria-disabled":e?m:void 0,"aria-current":b&&e?"page":void 0,onClick:()=>u==null?void 0:u()};return V("li",{className:w(`inline-flex justify-start items-center relative min-w-0 ${i==null?void 0:i.font}`,d&&"flex-shrink-0",(!E||m)&&"pointer-events-none",!b&&m&&"text-disabled"),children:[t("div",{...I,className:w(z,"px-8 cursor-pointer rounded whitespace-nowrap overflow-hidden",!d&&"py-4 hover:bg-hover",!d&&e&&"focus-visible:ring outline-none"),children:g}),b===!1&&t(D,{size:i==null?void 0:i.icon,className:w(m?"text-disabled":"text-muted")})]})}const P=C(t("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHorizOutlined"),X=1,q=10;function Q(o){const{size:b="md",children:i,isDisabled:d,className:E,currentIsClickable:m,isNavigation:u}=o,{trans:z}=B(),f=F(b),e=[];R.Children.forEach(i,s=>{R.isValidElement(s)&&e.push(s)});const g=y.exports.useRef(null),I=y.exports.useRef(null),[k,L]=S(e.length),N=y.exports.useCallback(()=>{const s=r=>{const l=I.current;if(!l)return;const n=Array.from(l.children);if(!n.length)return;const h=l.offsetWidth,v=e.length>r;let c=0,a=0,x=q;if(c+=n.shift().offsetWidth,a++,v&&(c+=n.shift().offsetWidth,x--),c>=h&&a--,n.length>0){const M=n.pop();M.style.overflow="visible",c+=M.offsetWidth,c<h&&a++,M.style.overflow=""}for(const M of n.reverse())c+=M.offsetWidth,c<h&&a++;return Math.max(X,Math.min(x,a))};L(function*(){yield e.length;const r=s(e.length);yield r,r<e.length&&r>1&&(yield s(r))})},[I,i,L]);W({ref:g,onResize:N}),T(N,[i]);let p=e;if(e.length>k){const s=e.length-1;p=[t(K,{sizeStyle:f,isMenuTrigger:!0,children:V(j,{selectionMode:"single",selectedValue:s,children:[t(O,{"aria-label":"\u2026",disabled:d,size:f.btn,children:t(P,{})}),t(_,{children:e.map((h,v)=>{const c=s===v;return t(A,{value:v,onSelected:()=>{var a,x;c||(x=(a=h.props).onSelected)==null||x.call(a)},children:y.exports.cloneElement(h,{isMenuItem:!0})},v)})})]})},"menu")];const l=[...e];let n=k;k>1&&(p.unshift(l.shift()),n--),p.push(...l.slice(-n))}const $=p.length-1,H=p.map((s,r)=>{const l=r===$,n=!l||m;return y.exports.cloneElement(s,{key:s.key||r,isCurrent:l,sizeStyle:f,isClickable:n,isDisabled:d,isLink:u})});return t(u?"nav":"div",{className:w(E,"min-w-0 w-full"),"aria-label":z({message:"Breadcrumbs"}),ref:g,children:t("ol",{ref:I,className:w("flex justify-start flex-nowrap",f.minHeight),children:H})})}function F(o){switch(o){case"sm":return{font:"text-sm",icon:"sm",btn:"sm",minHeight:"min-h-36"};case"lg":return{font:"text-lg",icon:"md",btn:"md",minHeight:"min-h-42"};default:return{font:"text-base",icon:"md",btn:"md",minHeight:"min-h-42"}}}const U=C(t("path",{d:"m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"}),"EditOutlined");export{Q as B,D as C,U as E,P as M,K as a};
//# sourceMappingURL=Edit.2aa2741b.js.map
