import{A as h}from"./ArticleCardGrid.8f44c318.js";import{r as l}from"./index.724d464e.js";import{u as y}from"./useScrollPagination.a9ab45b0.js";import{i as A,n as x,t as T,H as M,x as C,_ as w,d as N,f as v,aq as H,Q as P,W as R}from"./App.bfe04db8.js";import{u as d}from"./useNews.05a78353.js";import{t as g,A as U,B as _,M as j}from"./index.5460d30b.js";import{M as k}from"./index.999239b2.js";import{j as a,_ as B,f as L}from"./news.98d612ed.js";import{p as S}from"./notifications.f7445e66.js";import"./typeof.2a08ffa3.js";function W(t){return A("MuiAlertTitle",t)}x("MuiAlertTitle",["root"]);const $=["className"],b=t=>{const{classes:o}=t;return v({root:["root"]},W,o)},E=T(M,{name:"MuiAlertTitle",slot:"Root",overridesResolver:(t,o)=>o.root})(({theme:t})=>({fontWeight:t.typography.fontWeightMedium,marginTop:-2})),q=l.exports.forwardRef(function(o,e){const r=C({props:o,name:"MuiAlertTitle"}),{className:s}=r,i=w(r,$),c=r,p=b(c);return a(E,B({gutterBottom:!0,component:"div",ownerState:c,ref:e,className:N(p.root,s)},i))}),D=q;function F(){const{user:t,validating:o}=g(),{articles:e,page:r,updateArticles:s,keepNextPageKey:i}=d(),[c,p]=l.exports.useState(!1),u=l.exports.useCallback(async()=>{var m;p(!0);let f=[];t&&(t==null?void 0:t.country)&&(f=[(m=t==null?void 0:t.country)==null?void 0:m.code]);const n=await H(f,r);(n==null?void 0:n.status)==="success"&&(s([...e,...n.results]),i(n==null?void 0:n.nextPage)),p(!1)},[t,e,i,r,s]);return l.exports.useEffect(()=>{o||e&&(e==null?void 0:e.length)<=10&&u()},[o]),y({offset:e==null?void 0:e.length,onLoadMoreByOffset:u}),{articles:e,loading:c}}function tt(){const t=U(),o=P(),{user:e}=g(),{preFetchArticle:r}=d(),{articles:s,loading:i}=F();return l.exports.useEffect(()=>{e&&s.length<=10&&s.length>1&&o(S({options:{content:L(_,{severity:"success",onClick:()=>{r(s[0]),t.push(`/article/${encodeURI(s[0].title)}`)},style:{cursor:"pointer"},children:[a(D,{children:"Latest News"}),s[0].title]})}}))},[e,s]),a(k,{children:a(j,{children:a(G,{children:a(h,{articles:s,loading:!(s!=null&&s.length)||i,forHome:!0})})})})}const G=R.main`
  display: flex;
  margin-top: 2rem;
  flex: 1;
`;export{tt as default};
