(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{16:function(e,t,a){},38:function(e,t,a){},80:function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(4),n=a.n(c),r=a(31),o=a.n(r),i=(a(38),a(2)),l=a.n(i),d=a(6),h=a(10),j=a(11),p=a(13),u=a(12),b=(a(15),a(16),function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(j.a)(a,[{key:"render",value:function(){return Object(s.jsx)("div",{className:"card",children:Object(s.jsxs)("div",{className:"card-body",children:["Name: ",this.props.element.name," ",Object(s.jsx)("br",{}),"City: ",this.props.element.city," ",Object(s.jsx)("br",{}),"Street: ",this.props.element.street," ",Object(s.jsx)("br",{}),"Country: ",this.props.element.country," ",Object(s.jsx)("br",{}),"Deleted: ",this.props.element.deleted?"yes":"no"," ",Object(s.jsx)("br",{}),"Package: ",this.props.element.package," ",Object(s.jsx)("br",{}),"Paid: ",this.props.element.paid?"yes":"no"," ",Object(s.jsx)("br",{})]})})}}]),a}(n.a.Component)),m=a(1),g=a.n(m),x=a(32),f=a.n(x),v=(a(78),function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).refresh=Object(d.a)(l.a.mark((function e(){var t,a,c,n,r,o,i,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.post("/projects",s.state.searchBody);case 3:return t=e.sent,console.log(t.data),e.next=7,g.a.post("/projectsstats",s.state.searchBody);case 7:return a=e.sent,console.log(a.data),e.next=11,g.a.post("/smarttag",s.state.searchBody);case 11:return c=e.sent,console.log(c),e.next=15,g.a.post("/processingtime",s.state.searchBody);case 15:return n=e.sent,console.log(n),e.next=19,g.a.post("/projectcount",s.state.searchBody);case 19:return r=e.sent,console.log(r),e.next=23,g.a.post("/projectcountpackage",s.state.searchBody);case 23:return o=e.sent,console.log(o),e.next=27,g.a.post("/totalarea",s.state.searchBody);case 27:return i=e.sent,console.log(i),e.next=31,g.a.get("/checkworker");case 31:d=e.sent,console.log(d),s.setState({projects:t.data,searchClicked:!0,page:1,avgSmartTag:c.data[0],processingTime:n.data[0],projectCount:r.data,projectCountPackage:o.data,totalArea:i.data,stats:a.data,heartbeat:d.data}),e.next=39;break;case 36:e.prev=36,e.t0=e.catch(0),console.log(e.t0);case 39:case"end":return e.stop()}}),e,null,[[0,36]])}))),s.handleSelectOrganization=function(e){s.setState({selectedOrganization:""!==e.target.value?JSON.parse(e.target.value):""})},s.handleSelectProjectType=function(e){var t={all:!1,finished:!1,unfinished:!1};t[e.target.value]=!0,s.setState({projectsType:t})},s.handleSelectProjectSub=function(e){var t={all:!1,paid:!1,unpaid:!1};t[e.target.value]=!0,s.setState({projectsSub:t})},s.handleClickRefresh=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==s.state.inteval){e.next=3;break}return alert("You need to search before refreshing"),e.abrupt("return");case 3:return clearInterval(s.state.inteval),e.next=6,s.refresh();case 6:s.setState({interval:setInterval(s.refresh,s.state.refreshRate)});case 7:case"end":return e.stop()}}),e)}))),s.handleClickSearch=Object(d.a)(l.a.mark((function e(){var t,a,c,n,r,o,i,d,h;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return clearInterval(s.state.inteval),t={organizationName:s.state.selectedOrganization,projectsType:s.state.projectsType,projectsSub:s.state.projectsSub,page:1,year:s.state.yearVal,month:s.state.monthVal},console.log(t),e.prev=3,e.next=6,g.a.post("/projects",t);case 6:return a=e.sent,console.log(a),e.next=10,g.a.post("/projectsstats",t);case 10:return c=e.sent,console.log(c),e.next=14,g.a.post("/smarttag",t);case 14:return n=e.sent,console.log(n),e.next=18,g.a.post("/processingtime",t);case 18:return r=e.sent,console.log(r),e.next=22,g.a.post("/projectcount",t);case 22:return o=e.sent,console.log(o),e.next=26,g.a.post("/projectcountpackage",t);case 26:return i=e.sent,console.log(i),e.next=30,g.a.post("/totalarea",t);case 30:return d=e.sent,console.log(d),e.next=34,g.a.get("/checkworker");case 34:h=e.sent,console.log(h),s.setState({projects:a.data,searchBody:t,searchClicked:!0,page:1,avgSmartTag:n.data[0],processingTime:r.data[0],projectCount:o.data,projectCountPackage:i.data,totalArea:d.data,heartbeat:h.data,stats:c.data,inteval:setInterval(s.refresh,s.state.refreshRate)}),e.next=42;break;case 39:e.prev=39,e.t0=e.catch(3),console.log(e.t0);case 42:case"end":return e.stop()}}),e,null,[[3,39]])}))),s.handleClickPrevous=Object(d.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!==s.state.page){e.next=3;break}return alert("You are on page 1"),e.abrupt("return");case 3:return t={organizationName:s.state.selectedOrganization,projectsType:s.state.projectsType,projectsSub:s.state.projectsSub,page:s.state.page-1},console.log(t),e.prev=5,e.next=8,g.a.post("/projects",t);case 8:a=e.sent,console.log(a.data),s.setState({projects:a.data,searchBody:t,searchClicked:!0,page:s.state.page-1}),window.scrollTo(0,0),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(5),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[5,14]])}))),s.handleClickNext=Object(d.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={organizationName:s.state.selectedOrganization,projectsType:s.state.projectsType,projectsSub:s.state.projectsSub,page:s.state.page+1},console.log(t),e.prev=2,e.next=5,g.a.post("/projects",t);case 5:if(a=e.sent,console.log(a.data),0!==a.data.length){e.next=10;break}return alert("There is no next page"),e.abrupt("return");case 10:s.setState({projects:a.data,searchBody:t,searchClicked:!0,page:s.state.page+1}),window.scrollTo(0,0),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(2),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[2,14]])}))),s.componentDidMount=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.a.get("/organizations");case 3:t=e.sent,console.log(t.data),s.handleClickSearch(),s.setState({organizations:t.data}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])}))),s.componentWillUnmount=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:clearInterval(s.state.inteval),s.setState({interval:null});case 2:case"end":return e.stop()}}),e)}))),s.timeConversion=function(e){var t=(e/1e3).toFixed(1),a=(e/6e4).toFixed(1),s=(e/36e5).toFixed(1),c=(e/864e5).toFixed(1);return t<60?t+" Sec":a<60?a+" Min":s<24?s+" Hrs":c+" Days"},s.state={refreshRate:6e4,organizations:[],projects:[],selectedOrganization:"",projectsType:{all:!0,finished:!1,unfinished:!1},projectsSub:{all:!0,paid:!1,unpaid:!1},page:1,searchBody:{},searchClicked:!1,avgSmartTag:{},processingTime:{},projectCount:[],projectCountPackage:[],totalArea:[],inteval:null,heartbeat:{live:!1},monthVal:(new Date).getMonth(),yearVal:(new Date).getFullYear()},s}return Object(j.a)(a,[{key:"render",value:function(){var e=this;return Object(s.jsxs)("div",{className:"container",children:[Object(s.jsx)("br",{}),Object(s.jsxs)("form",{style:{marginLeft:"20%",marginRight:"20%"},children:[Object(s.jsxs)("div",{className:"form-group",children:[Object(s.jsx)("label",{htmlFor:"organizations",children:"Select organization:"}),Object(s.jsxs)("select",{className:"form-control",id:"organizations",onChange:this.handleSelectOrganization,children:[Object(s.jsx)("option",{value:"",children:"All"}),this.state.organizations.map((function(e,t){return Object(s.jsx)("option",{value:JSON.stringify(e),children:e.organizationName},t)}))]})]}),Object(s.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(s.jsx)("div",{className:"form-group",children:Object(s.jsx)("label",{children:"Select projects type:"})}),Object(s.jsxs)("div",{className:"form-check",children:[Object(s.jsx)("input",{className:"form-check-input",type:"radio",id:"allType",value:"all",checked:this.state.projectsType.all,onChange:this.handleSelectProjectType}),Object(s.jsx)("label",{className:"form-check-label",htmlFor:"allType",children:"All"})]}),Object(s.jsxs)("div",{className:"form-check",children:[Object(s.jsx)("input",{className:"form-check-input",type:"radio",id:"finished",value:"finished",checked:this.state.projectsType.finished,onChange:this.handleSelectProjectType}),Object(s.jsx)("label",{className:"form-check-label",htmlFor:"finished",children:"Finished projects"})]}),Object(s.jsxs)("div",{className:"form-check disabled",children:[Object(s.jsx)("input",{className:"form-check-input",type:"radio",id:"unfinished",value:"unfinished",checked:this.state.projectsType.unfinished,onChange:this.handleSelectProjectType}),Object(s.jsx)("label",{className:"form-check-label",htmlFor:"unfinished",children:"Unfinished projects"})]})]}),Object(s.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(s.jsx)("div",{className:"form-group",children:Object(s.jsx)("label",{children:"Select projects subscription:"})}),Object(s.jsxs)("div",{className:"form-check",children:[Object(s.jsx)("input",{className:"form-check-input",type:"radio",id:"allSub",value:"all",checked:this.state.projectsSub.all,onChange:this.handleSelectProjectSub}),Object(s.jsx)("label",{className:"form-check-label",htmlFor:"allSub",children:"All"})]}),Object(s.jsxs)("div",{className:"form-check",children:[Object(s.jsx)("input",{className:"form-check-input",type:"radio",id:"paid",value:"paid",checked:this.state.projectsSub.paid,onChange:this.handleSelectProjectSub}),Object(s.jsx)("label",{className:"form-check-label",htmlFor:"paid",children:"Paid projects"})]}),Object(s.jsxs)("div",{className:"form-check disabled",children:[Object(s.jsx)("input",{className:"form-check-input",type:"radio",id:"unpaid",value:"unpaid",checked:this.state.projectsSub.unpaid,onChange:this.handleSelectProjectSub}),Object(s.jsx)("label",{className:"form-check-label",htmlFor:"unpaid",children:"Unpaid projects"})]})]}),Object(s.jsx)("div",{className:"form-group",children:Object(s.jsx)(f.a,{year:this.state.yearVal,month:this.state.monthVal,onChange:function(t,a,s){console.log(t,a,s),e.setState({yearVal:a,monthVal:s})}})}),Object(s.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(s.jsx)("div",{className:"btn btn-primary",onClick:this.handleClickSearch,children:"Search"}),Object(s.jsx)("div",{className:"btn btn-primary",onClick:this.handleClickRefresh,children:"Refresh"})]})]}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{style:{marginLeft:"20%",marginRight:"20%"},children:[this.state.searchClicked&&!this.state.heartbeat.live?Object(s.jsx)("div",{className:"alert alert-danger",role:"alert",children:"Worker is down!"}):"",this.state.searchClicked?Object(s.jsxs)("div",{className:"card",children:[Object(s.jsxs)("div",{children:["Page: ",this.state.page]}),Object(s.jsxs)("div",{children:["Project count: ",this.state.stats.all]}),Object(s.jsxs)("div",{children:["Project count per page: ",this.state.projects.length]}),Object(s.jsxs)("div",{children:["Deleted projects: ",this.state.stats.deleted]}),Object(s.jsxs)("div",{children:["Completed projects: ",this.state.stats.finished]}),Object(s.jsxs)("div",{children:["Not completed projects: ",this.state.stats.unfinished]}),Object(s.jsxs)("div",{children:["Paid projects: ",this.state.stats.paid]}),Object(s.jsxs)("div",{children:["Unpaid projects: ",this.state.stats.unpaid]}),Object(s.jsxs)("div",{children:["Average count of smartTags per project: ",this.state.avgSmartTag?this.state.avgSmartTag.avgSmartTag.toFixed(3):0]}),Object(s.jsxs)("div",{children:["Average project processing time: ",this.state.processingTime?this.timeConversion(this.state.processingTime.avgProcessingTIme):0]}),Object(s.jsx)("br",{}),Object(s.jsx)("div",{children:"Project count for each scanner:"}),Object(s.jsx)("select",{multiple:!0,disabled:!0,className:"form-control",id:"exampleFormControlSelect2",children:this.state.projectCount.map((function(e,t){return Object(s.jsxs)("option",{children:["scanner id: ",null===e._id?"None":e._id,", count: ",e.count]},t)}))}),Object(s.jsx)("br",{}),Object(s.jsx)("div",{children:"Total area scanned by the organization:"}),Object(s.jsx)("select",{multiple:!0,disabled:!0,className:"form-control",id:"exampleFormControlSelect2",children:this.state.totalArea.map((function(e,t){return Object(s.jsxs)("option",{children:["organization id: ",null===e._id?"None":e._id,", count: ",e.count.toFixed(3)]},t)}))}),Object(s.jsx)("br",{}),Object(s.jsx)("div",{children:"Project count for each package:"}),Object(s.jsx)("select",{multiple:!0,disabled:!0,className:"form-control",id:"exampleFormControlSelect2",children:this.state.projectCountPackage.map((function(e,t){return Object(s.jsxs)("option",{children:["package: ",null===e._id?"None":e._id,", count: ",e.count]},t)}))}),Object(s.jsx)("br",{})]}):"",Object(s.jsx)("br",{}),this.state.projects.map((function(e,t){return Object(s.jsxs)("div",{children:[Object(s.jsx)(b,{element:e}),Object(s.jsx)("br",{})]},e._id)})),this.state.searchClicked?Object(s.jsx)("nav",{children:Object(s.jsxs)("ul",{className:"pagination",children:[Object(s.jsx)("li",{className:"page-item",onClick:this.handleClickPrevous,children:Object(s.jsx)("div",{className:"page-link",children:"Previous"})}),Object(s.jsx)("li",{className:"page-item",onClick:this.handleClickNext,children:Object(s.jsx)("div",{className:"page-link",children:"Next"})})]})}):""]})]})}}]),a}(n.a.Component)),O=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,81)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),s(e),c(e),n(e),r(e)}))};o.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(v,{})}),document.getElementById("root")),O()}},[[80,1,2]]]);
//# sourceMappingURL=main.f5b34eb0.chunk.js.map