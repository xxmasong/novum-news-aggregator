import{A as M}from"./ArticleCardGrid.8f44c318.js";import{M as A}from"./index.999239b2.js";import{t as N,M as P}from"./index.5460d30b.js";import{as as k,W as j}from"./App.bfe04db8.js";import{r as f}from"./index.724d464e.js";import{u as H}from"./useScrollPagination.a9ab45b0.js";import{u as L}from"./useNews.05a78353.js";import{j as l}from"./news.98d612ed.js";import"./notifications.f7445e66.js";import"./typeof.2a08ffa3.js";function S(s){var u,c;const{user:o}=N(),{newsByCategory:t,page:n,updateNewsByCategory:i,keepNextPageKey:a}=L(),[h,m]=f.exports.useState(!1),p=f.exports.useCallback(async()=>{var d,x;m(!0);let r=[];o&&(o==null?void 0:o.country)&&(r=[(d=o==null?void 0:o.country)==null?void 0:d.code]),s||(s="top");const e=await k([s],r,n);(e==null?void 0:e.status)==="success"&&(i(s,[...(x=t==null?void 0:t[s])!=null?x:[],...e.results]),a(e==null?void 0:e.nextPage)),m(!1)},[s,t,a,n,i]);return f.exports.useEffect(()=>{var r;s&&t&&((r=t[s])==null?void 0:r.length)<=10&&p()},[s]),H({offset:s?(u=t==null?void 0:t[s])==null?void 0:u.length:(c=t==null?void 0:t.top)==null?void 0:c.length,onLoadMoreByOffset:p}),{newsByCategory:t,loading:h}}function z({match:s}){var i;const{category:o}=s.params,{newsByCategory:t,loading:n}=S(o);return l(A,{children:l(P,{children:l(b,{children:l(M,{articles:(t==null?void 0:t[o])||[],loading:!((i=t==null?void 0:t[o])!=null&&i.length)||n,forHome:!0})})})})}const b=j.main`
  display: flex;
  margin-top: 2rem;
  flex: 1;
`;export{z as default};