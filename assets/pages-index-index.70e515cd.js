import{d as e,o as s,c as t,w as a,r as l,i,a as n,t as o,b as r,u as h,e as u,f as d,g as c,h as v,j as p,k as m,l as f,n as x,m as g,p as b,q as y,s as w,v as H,x as k,y as G,F as _,z as B,A as I,I as $,S as T,B as j,C,D as z,E as q,G as E,H as F,J as M,K as S}from"./index.c078cb52.js";import{_ as L,a as R}from"./sys.e6f64471.js";const V={data:()=>({scrollTop:0,min:0,max:0,focus:!0,height:12}),mounted(){this.min=Number(this.$ownerInstance.$el.dataset.height),window.addEventListener("scroll",this.scrollHandler),window.addEventListener("touchstart",(()=>this.focus=!0)),window.addEventListener("touchend",(()=>this.focus=!1))},watch:{focus(e){e||(this.height=Math.abs(this.height-this.min)<Math.abs(this.height-this.max)?this.min:this.max,this.setHeight(!0))},scrollTop(e,s){if(e<=0)return this.height=this.max,this.setHeight(!0);this.focus&&(this.height+=s-e||0,this.height<this.min&&(this.height=this.min),this.height>this.max&&(this.height=this.max),this.setHeight(!1))}},methods:{propObserver(e){console.log("props",e)},scrollHandler(){this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop},setHeight(e){this.$ownerInstance.$el.style.transition=e?"all 0.3s ease":"none",this.$ownerInstance.$el.style.transform="translateY("+this.height+"px)"}}};var W,K,N,Y=e=>{e.$renderjs||(e.$renderjs=[]),e.$renderjs.push("renderBiz"),e.mixins||(e.mixins=[]),e.mixins.push({beforeCreate(){this.renderBiz=this},mounted(){this.$ownerInstance=this.$gcd(this,!0)}}),e.mixins.push(V)},A=0;function D(e,s){e.setStyle({transition:s?"all 0.3s ease":"all 0.05s cubic-bezier(0,.6,.34,1)","will-change":"transform",transform:"translateY("+A+"px)"})}const J={onScroll:function(e,s,t){if(e<=0)return A=K,D(t,!0);N&&((A+=s-e||0)<W&&(A=W),A>K&&(A=K),D(t,!1))},limit:function(e){e&&([W,K]=e.split(",").map(Number))},focus:function(e,s,t){void 0!==e&&((N=e)||(A=Math.abs(A-W)<Math.abs(A-K)?W:K,D(t,!0)))}};var O=e=>{e.$wxs||(e.$wxs=[]),e.$wxs.push("wxsBiz"),e.mixins||(e.mixins=[]),e.mixins.push({beforeCreate(){this.wxsBiz=J}})};const P=e({props:{back:{default:40}},setup:e=>(n,o)=>{const r=i;return s(),t(r,{id:"sticker","data-height":e.back,style:{willchange:"transform"}},{default:a((()=>[l(n.$slots,"default",{},void 0,!0)])),_:3},8,["data-height"])}});Y(P),O(P);var U=L(P,[["__scopeId","data-v-17b6435a"]]);var Q=L(e({setup(e){var t;let l=n("searchInfo"),i=o(l,"value"),j=o(l,"searched");const C=r({get:()=>L.value&&!M.value&&i.value||j.value,set:e=>i.value=e});function z(e){return e*v.Global.navBarHeight+"px"}let q=h(30);var E=!1;let F=u(!1),M=u(!1),S=u(!1),L=r({get:()=>F.value||M.value,set:()=>F.value=M.value=S.value=!1});function R(){return 1==S.value?S.value=!1:L.value?M.value?M.value=!1:i.value?i.value="":L.value=!1:S.value=!0}d((()=>M.value&&(F.value=!1))),c(L,(()=>S.value=!1));let V=u(0);null==(t=uni.onKeyboardHeightChange)||t.call(uni,(({height:e})=>{V.value=e,e&&(W.value=N.value)}));let W=u(h(1e3)),K=u(h(500)),N=r((()=>{let e=v.Global.systemInfo.windowHeight-v.Global.systemInfo.statusBarHeight-V.value-h(50)||W.value;return e>W.value?W.value:e})),Y=null;const A=()=>Y=setTimeout(J,5e3),D=()=>clearTimeout(Y),J=()=>(B({}),v.to("test/index"));return(e,t)=>{const l=I,i=$,n=T;return s(),p(_,null,[m(U,{class:"sticker",style:x({top:e.app.Global.systemInfo.statusBarHeight+"px"}),back:-e.app.Global.navBarHeight-e.app.Global.systemInfo.statusBarHeight-g(q)},{default:a((()=>[f("div",{style:x({height:e.app.Global.navBarHeight+"px",marginRight:-e.app.Global.capsuleMarginRight+"px",padding:g(E)?"":"20rpx 0 0 0",paddingRight:e.app.Global.capsuleWidth+"px"}),flex:"",onTouchmove:t[4]||(t[4]=w((()=>{}),["stop","prevent"]))},[f("div",{style:x({height:(L.value?M.value?K.value:N.value:e.app.Global.navBarHeight)+"px"}),relative:"",mxsm:"","shadow-box":"",pxsm:"",flex:"","flex-grow":"","flex-col":""},[f("div",{style:x({height:e.app.Global.navBarHeight+"px"}),"flex-center":"","justify-start":""},[f("div",{"flex-center":""},[m(l,{style:x({height:z(g(E)?.5:.6),width:z(g(E)?.5:.6)}),class:"smooth",src:"https://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005",onClick:t[0]||(t[0]=e=>M.value=!M.value),onTouchstart:A,onTouchmove:D,onTouchend:D},null,8,["style"])]),f("div",{relative:"","h-full":"","flex-grow":"",mxsm:""},[m(i,{modelValue:g(C),"onUpdate:modelValue":t[1]||(t[1]=e=>b(C)?C.value=e:null),class:y(["ab",{hide:M.value}]),"h-full":"","w-full":"",placeholder:"搜索思潮",style:x({fontSize:z(g(E)?.35:.3)}),onFocus:t[2]||(t[2]=e=>{V.value=e.detail.height,F.value=!0})},null,8,["modelValue","class","style"]),f("div",{class:y(["ab",{hide:!M.value}]),flex:"","items-center":"","bg-white":""},"123",2)]),f("div",{"flex-center":"",style:x({fontSize:z((g(E),.5))})},[f("div",{"i-ri-close-fill":"",class:y(["x",{act:L.value||S.value}]),onClick:w(R,["prevent","stop"])},null,10,["onClick"])],4)],4),f("div",{"flex-grow":"",relative:"","overflow-hidden":""},[m(n,{"scroll-y":"",class:y(["ab history",{hide:!F.value}]),onTouchend:t[3]||(t[3]=w((()=>{}),["prevent"]))},{default:a((()=>[H(" 搜索记录和推荐 "),f("div",{py30:""},"111111111111111111111"),f("div",{py30:""},"111111111111111111111"),f("div",{py30:""},"111111111111111111111"),f("div",{py30:""},"111111111111111111111"),f("div",{py30:""},"111111111111111111111"),f("div",{py30:""},"111111111111111111111")])),_:1},8,["class"]),m(n,{"scroll-y":"",class:y(["ab profile",{hide:!M.value}])},{default:a((()=>[H(" 个人信息 ")])),_:1},8,["class"])]),f("div",{"shadow-box":"",class:y(["menu",{act:S.value}]),style:x({right:e.app.Global.capsuleWidth&&10-e.app.Global.capsuleWidth+"px"})},null,6)],4)],36)])),_:1},8,["style","back"]),k(f("div",{class:"mask",onClick:t[5]||(t[5]=w((e=>L.value=!1),["stop"])),onTouchmove:t[6]||(t[6]=w((()=>{}),["stop","prevent"]))},null,544),[[G,L.value||S.value]])],64)}}}),[["__scopeId","data-v-40c0c06e"]]);var X=L(e({setup:e=>(e,t)=>{const a=I;return s(),p("div",{mblg:"",mxsm:""},[f("div",{flex:"","justify-between":""},[f("div",{mbxs:"","flex-center":"","text-gray":"","text-20":""},[m(a,{w35:"",h35:"",mrxs:"",class:"smooth",src:"https://q2.qlogo.cn/headimg_dl?dst_uin=2490445193&spec=100&v=0.5662477152747005"}),f("div",null,"PentaTea")]),f("div",{"flex-center":"","text-gray":"","text-20":""},[f("div",{"i-ri-eye-fill":"",mrxs:""}),j(" 关注的人 ")])]),f("div",{class:"card",thin:""},[f("div",{"w-full":"",h100:""},[m(a,{"w-full":"","h-full":"",mode:"aspectFill",src:"https://repository-images.githubusercontent.com/279473495/14866c80-d6b5-11ea-84f1-a824c550bb7d"})]),f("div",{pxsm:"",pyxs:"","bg-hex-f6f8fa":""},[f("div",{class:"row1",flex:"","justify-between":"",myxs:""},[f("div",{flex:""},[f("div",{class:"tag thin-8"},"创业"),f("div",{class:"tag thin-8"},"售楼处当托"),f("div",{class:"tag thin-8"},"物联网")]),f("div",null,[f("div",{class:"more thin-500 round"},[f("h1",{w30:"",h30:"","i-ri-arrow-drop-down-line":""})])])]),f("div",{class:"title","text-35":""},"福建一男子摄入卡路里结果卡路里"),f("div",{flex:"","justify-between":"","text-20":"","text-gray":"",mtxs:""},[f("div",null,"3 天前更新"),f("div",{"flex-center":""},[f("div",{"i-ri-star-fill":"",mlsm:"",mrxs:""}),f("div",null,"238"),f("div",{"i-ri-thumb-up-fill":"",mlsm:"",mrxs:""}),f("div",null,"1.5k+"),f("div",{"i-ri-brush-fill":"",mlsm:"",mrxs:""}),f("div",null,"24")])])]),f("div",{psm:""},[f("div",{"line-clamp-3":"","text-27":""}," 根据现场情况，消防员立即对水泥盖板周围杂物及缝隙里的小石块及泥土进行清理，随后用撬棍等工具撬动水泥盖板。经过3分钟救助，被困人员成功脱困。 ")])])])}}),[["__scopeId","data-v-1cf482e0"]]);const Z=e({setup(e){C(S),u(!1);const l=z({value:"",searched:""});q("searchInfo",l);let i=r((()=>{const{navBarHeight:e}=v.Global,{statusBarHeight:s}=v.Global.systemInfo;return e+s+h(30)+"px"}));return(e,l)=>{const n=E(F("sys"),R);return s(),t(n,{top:i.value},{fixed:a((()=>[m(Q),H(' <Fab @click="log"></Fab> ')])),default:a((()=>[f("div",{ptsm:""}),(s(),p(_,null,M(20,(e=>m(X,{key:e}))),64)),f("div",{onClick:l[0]||(l[0]=s=>e.app.to("login"))},"登录")])),_:1},8,["top"])}}});export{Z as default};
