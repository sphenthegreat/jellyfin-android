define(["jQuery","paper-icon-button-light","cardStyle"],function(e){function t(e,t){var a=Globalize.translate("CancelSyncJobConfirmation");require(["confirm"],function(r){r(a,Globalize.translate("HeaderCancelSyncJob")).then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({url:ApiClient.getUrl("Sync/Jobs/"+t),type:"DELETE"}).then(function(){l(e)})})})}function a(e){var t=".85",a="rgba(204,51,51,"+t+")",r=Globalize.translate("SyncJobStatus"+e.Status);"Completed"==e.Status?a="rgba(82, 181, 75, "+t+")":"CompletedWithError"==e.Status||("Queued"==e.Status?a="rgba(51, 136, 204, "+t+")":"ReadyToTransfer"==e.Status?a="rgba(51, 136, 204, "+t+")":"Transferring"==e.Status?a="rgba(72, 0, 255, "+t+")":"Converting"==e.Status&&(a="rgba(255, 106, 0, "+t+")"));var n="";return n+='<div class="syncStatusBanner" data-status="'+e.Status+'" style="background-color:'+a+';position:absolute;top:0;right:0;padding:.5em .5em; text-align:left;color: #fff; font-weight: 500; text-transform:uppercase; border-bottom-left-radius: 3px;">',n+=r,n+="</div>"}function r(e,t,r,n){var i="";i+="<div class='card squareCard scalableCard' data-id='"+t.Id+"' data-status='"+t.Status+"'>",i+='<div class="'+r+'">',i+='<div class="cardScalable">',i+='<div class="cardPadder cardPadder-square"></div>',n+="?id="+t.Id,i+='<a class="cardContent" href="'+n+'">';var s,o="";t.PrimaryImageItemId?(s=ApiClient.getScaledImageUrl(t.PrimaryImageItemId,{type:"Primary",width:400,tag:t.PrimaryImageTag}),o="background-position:center center;"):(o="background-color:#38c;background-position:center center;",s="css/images/items/detail/video.png"),i+='<div class="cardImage coveredCardImage lazy" data-src="'+s+'" style="'+o+'">';var c=t.Progress||0,l="cardFooter fullCardFooter lightCardFooter";(0==c||c>=100)&&(l+=" hide"),i+='<div class="'+l+'">',i+="<div class='cardText cardProgress'>",i+='<progress class="itemProgressBar" min="0" max="100" value="'+c+'"></progress>',i+="</div>",i+="</div>",i+="</div>",i+=a(t),i+="</a>",i+="</div>",i+='<div class="cardFooter outerCardFooter">';var d=[];t.ParentName&&d.push(t.ParentName),d.push(t.Name),d.push(1==t.ItemCount?Globalize.translate("ValueItemCount",t.ItemCount):Globalize.translate("ValueItemCountPlural",t.ItemCount)),t.ParentName||d.push("&nbsp;"),i+='<div class="cardText" style="text-align:right; float:right;padding:0;">',i+='<button type="button" is="paper-icon-button-light" class="btnJobMenu autoSize"><i class="md-icon">'+AppInfo.moreIcon.replace("-","_")+"</i></button>",i+="</div>";for(var u=0,g=d.length;g>u;u++)i+="<div class='cardText' style='margin-right:30px;'>",i+=d[u],i+="</div>";return i+="</div>",i+="</div>",i+="</div>"}function n(t,a){if((new Date).getTime()-b<6e4)return void i(t,a);b=(new Date).getTime();var n="",s="",l="cardBox visualCardBox",d="syncjob.html",u=!0;e(t).hasClass("mySyncPage")&&(d="mysyncjob.html",u=!c());for(var g=!1,v=0,m=a.length;m>v;v++){var p=a[v];if(u){var h=p.TargetName||"Unknown";h!=s&&(s&&(n+="</div>",n+="<br/>",n+="<br/>",n+="<br/>",g=!1),s=h,n+='<div class="detailSectionHeader">',n+="<div>"+h+"</div>",n+="</div>",n+='<div class="itemsContainer vertical-wrap">',g=!0)}n+=r(t,p,l,d)}g&&(n+="</div>");var y=e(".syncActivity",t).html(n).lazyChildren();e(".btnJobMenu",y).on("click",function(){o(t,this)}),a.length||y.html('<div style="padding:1em .25em;">'+Globalize.translate("MessageNoSyncJobsFound")+"</div>")}function i(e,t){for(var a=0,r=t.length;r>a;a++){var n=t[a];s(e,n)}}function s(e,t){var r=e.querySelector(".card[data-id='"+t.Id+"']");if(r){var n=r.querySelector(".syncStatusBanner");if(n.getAttribute("data-status")==t.Status){var i=document.createElement("div");i.innerHTML=a(t),i=i.querySelector(".syncStatusBanner"),i.parentNode.removeChild(i),n.parentNode.replaceChild(i,n)}var s=t.Progress||0,o=r.querySelector(".cardFooter");0==s||s>=100?o.classList.add("hide"):(o.classList.remove("hide"),o.querySelector(".itemProgressBar").value=s)}}function o(a,r){var n=e(r).parents(".card"),i=n.attr("data-id"),s=n.attr("data-status"),o=[];o.push("Cancelled"==s?{name:Globalize.translate("ButtonDelete"),id:"delete"}:{name:Globalize.translate("ButtonCancelSyncJob"),id:"cancel"}),require(["actionsheet"],function(e){e.show({items:o,positionTo:r,callback:function(e){switch(e){case"delete":t(a,i);break;case"cancel":t(a,i)}}})})}function c(){return Dashboard.capabilities().SupportsSync}function l(t){b=0,Dashboard.showLoadingMsg();var a={};Dashboard.getCurrentUser().then(function(){e(t).hasClass("mySyncPage")&&(a.UserId=Dashboard.getCurrentUserId(),c()&&(a.TargetId=ApiClient.deviceId())),ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs",a)).then(function(e){n(t,e.Items),Dashboard.hideLoadingMsg()})})}function d(t,a){var r=e(e.mobile.activePage)[0];if("SyncJobs"==a.MessageType){var i=a.Data;if(c()){var s=ApiClient.deviceId();i=i.filter(function(e){return e.TargetId==s})}n(r,i)}}function u(t){var a="0,1500";e(t).hasClass("mySyncPage")&&(a+=","+Dashboard.getCurrentUserId()),ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobsStart",a)}function g(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobsStop","")}function v(){return[{href:"syncactivity.html",name:Globalize.translate("TabSyncJobs")},{href:"devicesupload.html",name:Globalize.translate("TabCameraUpload")},{href:"appservices.html?context=sync",name:Globalize.translate("TabServices")},{href:"syncsettings.html",name:Globalize.translate("TabSettings")}]}var b=0;e.fn.lazyChildren=function(){for(var e=0,t=this.length;t>e;e++)ImageLoader.lazyChildren(this[e]);return this},e(document).on("pageinit",".syncActivityPage",function(){var t=this;e(".btnSyncSupporter",t).on("click",function(){requirejs(["registrationservices"],function(){RegistrationServices.validateFeature("sync")})}),e(".supporterPromotion .mainText",t).html(Globalize.translate("HeaderSyncRequiresSupporterMembership"))}).on("pageshow",".syncActivityPage",function(){"syncActivityPage"==this.id&&LibraryMenu.setTabs("syncadmin",0,v);var t=this;Dashboard.getPluginSecurityInfo().then(function(a){a.IsMBSupporter?e(".supporterPromotionContainer",t).hide():e(".supporterPromotionContainer",t).show()}),l(t),e(".btnSync",t).taskButton({mode:"on",progressElem:t.querySelector(".syncProgress"),taskKey:"SyncPrepare"}),u(t),Events.on(ApiClient,"websocketmessage",d)}).on("pagebeforehide",".syncActivityPage",function(){var t=this;e(".btnSync",t).taskButton({mode:"off"}),g(),Events.off(ApiClient,"websocketmessage",d)})});