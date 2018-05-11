!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=8)}([function(e,t){e.exports=React},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=new Date,s=n.getFullYear()+"."+(n.getMonth()+1)+"."+n.getDate();t.possibleTopics={Arbeit:{bezeichnung:"Arbeit",color:"red"},"Prüfung":{bezeichnung:"Prüfung",color:"blue"},Zuhause:{bezeichnung:"Zuhause",color:"green"}};let o=[{bezeichnung:"Projektarbeit",endDatum:new Date("May 07, 2018 12:00:00"),topic:t.possibleTopics.Prüfung},{bezeichnung:"Feierabend",endDatum:new Date(s+" 17:50:00"),topic:t.possibleTopics.Arbeit},{bezeichnung:"Kenntnisprüfung",endDatum:new Date("Apr 25, 2018 07:45:00"),topic:t.possibleTopics.Prüfung},{bezeichnung:"Mündliche",endDatum:new Date("June 14, 2018 10:00:00"),topic:t.possibleTopics.Prüfung},{bezeichnung:"Countdown Code",endDatum:new Date("June 18, 2018 10:00:00"),topic:t.possibleTopics.Zuhause},{bezeichnung:"Bubu",endDatum:new Date(s+" 22:15:00"),topic:t.possibleTopics.Zuhause}];t.getCountdownlist=(e=>{if(e){let t=[];return o.forEach(i=>{i.topic===e&&t.push(i)}),t}return o}),t.getTopicList=(e=>{let i=[];if(e){if(e)for(const n in t.possibleTopics)if(t.possibleTopics[n].bezeichnung===e){let e=t.getCountdownlist(t.possibleTopics[n]);i.push({countdownList:e,bezeichnung:t.possibleTopics[n].bezeichnung,color:t.possibleTopics[n].color,done:0})}}else for(const e in t.possibleTopics){let n=t.getCountdownlist(t.possibleTopics[e]);i.push({countdownList:n,bezeichnung:t.possibleTopics[e].bezeichnung,color:t.possibleTopics[e].color,done:0})}return i}),t.getTopicListDumb=(()=>{let e=[];for(const i in t.possibleTopics)e.push(t.possibleTopics[i]);return e})},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(0);t.SideBarItem=(e=>n.createElement("div",{onClick:t=>{e.switchToView(e.bezeichnung)},className:"w-full flex h-12 flex-col text-md text-black justify-center items-center  cursor-pointer border-r-4 border-"+e.color+" bg-"+e.color+"-lightest hover:bg-"+e.color+"-lighter"},e.bezeichnung)),t.SideBar=(e=>n.createElement("div",{id:"sideBar",className:"w-1/4 flex flex-col items-center"},n.createElement(t.SideBarItem,{switchToView:()=>{e.switchToDefaultView()},bezeichnung:"Alle",color:"grey",key:"Default"}),e.topicList.map((i,s)=>n.createElement(t.SideBarItem,{switchToView:t=>e.switchToView(t),bezeichnung:i.bezeichnung,color:i.color,key:s}))))},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(0),s=e=>n.createElement("div",{id:"subinfoObject",className:"h-6 flex flex-1 items-center justify-center text-xs bg-"+e.color+"-light"},n.createElement("span",{id:"topic",className:"px-2"},e.topicBezeichnung),n.createElement("span",{id:"topicDone",className:"px-2"},e.amountOfDone),n.createElement("span",null,"/"),n.createElement("span",{id:"topicDue",className:"px-2"},e.amountOfDue));t.Subinfo=(e=>n.createElement("div",{id:"subInfo",className:"w-full min-w-2 flex flex-wrap flex-row items-stretch justify-center"},e.subInfoArray.map(e=>n.createElement(s,{amountOfDone:e.amountOfDone,amountOfDue:e.amountOfDue,topicBezeichnung:e.topicBezeichnung,key:e.topicBezeichnung,color:e.color}))))},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(0);t.Head=(e=>n.createElement("div",{id:"head",className:"w-full h-16 border-b flex items-center justify-center"},n.createElement("span",{id:"done",className:"text-2xl px-3"},"Done: ",e.done),n.createElement("span",{id:"due",className:"text-2xl px-3"},"Due: ",e.due)))},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(0);t.CountdownItem=class extends n.Component{constructor(e,t){super(e,t),this.countDownLogic=(()=>{const e=this.props.endDatum.getTime();if(this.state.done)this.props.countDoneUp(this.props.topic.bezeichnung);else{const t=setInterval(()=>{const i=(new Date).getTime(),n=e-i,s=this.getDistance(n);n>0?this.setState({distanceTime:s.days+"d "+s.hours+"h "+s.minutes+"m "}):this.setState({distanceTime:"DONE",done:!0},()=>{this.countDownLogic(),clearInterval(t)})},500)}}),this.getDistance=(e=>({days:Math.floor(e/864e5),hours:Math.floor(e%864e5/36e5),minutes:Math.floor(e%36e5/6e4),seconds:Math.floor(e%6e4/1e3)})),this.state={distanceTime:null,done:!1}}componentWillMount(){}componentDidMount(){this.setState({distanceTime:"Refreshing..."},()=>{this.countDownLogic()})}render(){return n.createElement("div",{className:"w-full flex justify-center items-center flex-col min-h-24 h-24 border-b border-"+this.props.topic.color+" bg-"+this.props.topic.color+"-lightest"},n.createElement("span",{id:"bezeichnung",className:"text-md w-full flex justify-center items-center pb-2"},this.props.bezeichnung),null!==this.state.distanceTime&&n.createElement("span",{id:"countdowntime",className:"w-full text-2xl flex justify-center items-center"},this.state.distanceTime))}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(0),s=i(5),o=i(4),c=i(3),l=i(2),r=i(1);t.Countdown=class extends n.Component{constructor(e,t){super(e,t),this.switchToView=(e=>{this.setState({visibleTopicList:[]},()=>{this.setState({visibleTopicList:r.getTopicList(e)})})}),this.switchToDefaultView=(()=>{this.setState({visibleTopicList:[]},()=>{this.setState({visibleTopicList:r.getTopicList()})})}),this.getSubInfoArray=(()=>{let e=[];const t=this.state.invisibleTopicList;t.forEach((i,n)=>{e.push({amountOfDone:t[n].done,amountOfDue:t.length-t[n].done,color:t[n].color,topicBezeichnung:t[n].bezeichnung})}),this.setState({subinfoArray:e})}),this.resetDone=(()=>{let e=this.state.visibleTopicList;this.state.invisibleTopicList,e.forEach(e=>{e.done=0})}),this.countDoneUp=(e=>{let t=this.state.visibleTopicList;t.forEach(t=>{t.bezeichnung==e&&t.done++}),this.setState({invisibleTopicList:t},()=>{this.getSubInfoArray()})}),this.state={countDownsDone:0,countDownsDue:0,visibleTopicList:r.getTopicList(),invisibleTopicList:r.getTopicList(),sideBarTopicList:r.getTopicListDumb(),headVisible:!0,subinfoVisible:!0,sidebarVisible:!0,loading:!0,currentDate:new Date,subinfoArray:[]}}componentWillMount(){}componentDidMount(){this.resetDone()}render(){return n.createElement("div",{className:"w-full h-full"},this.state?n.createElement("div",{className:"h-full flex flex-col"},this.state.headVisible&&n.createElement(o.Head,{done:this.state.countDownsDone,due:this.state.countDownsDue}),this.state.subinfoVisible&&n.createElement(c.Subinfo,{subInfoArray:this.state.subinfoArray}),n.createElement("div",{id:"main",className:"flex flex-1 h-full"},this.state.sidebarVisible&&n.createElement(l.SideBar,{switchToDefaultView:()=>this.switchToDefaultView(),switchToView:e=>this.switchToView(e),topicList:this.state.sideBarTopicList}),n.createElement("div",{id:"countDowns",className:"w-3/4 h-full overflow-auto"},this.state.visibleTopicList&&this.state.visibleTopicList.map(e=>e.countdownList.map((t,i)=>n.createElement(s.CountdownItem,{countDoneUp:e=>{this.countDoneUp(e)},bezeichnung:t.bezeichnung,endDatum:t.endDatum,topic:e,key:i})))))):n.createElement("div",null,"Datenstruktur wird geladen..."))}}},function(e,t){e.exports=ReactDOM},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=i(0),s=i(7),o=i(6);s.render(n.createElement(o.Countdown,null),document.getElementById("example"))}]);
//# sourceMappingURL=bundle.js.map