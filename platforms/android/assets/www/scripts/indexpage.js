define(["libraryBrowser","emby-tabs","emby-button"],function(e){function t(e){if(AppInfo.isNativeApp&&browserInfo.safari)switch(e){case 0:return c;case 1:return"resume";case 2:return"nextup";case 3:return"latestmovies";case 4:return"latestepisodes";case 5:return"latesttvrecordings";default:return""}switch(e){case 0:return c;case 1:return"resume";case 2:return"latestmedia";case 3:return"latesttvrecordings";default:return""}}function r(e,r,a,s){var i=r.Id,n=a.CustomPrefs["home"+s]||t(s);"folders"==n&&(n=c);var o="0"!=a.CustomPrefs.enableLibraryTileNames,l=e.querySelector(".section"+s);return"latestmedia"==n?Sections.loadRecentlyAdded(l,r):"latestmovies"==n?Sections.loadLatestMovies(l,r):"latestepisodes"==n?Sections.loadLatestEpisodes(l,r):"librarytiles"==n?Sections.loadLibraryTiles(l,r,"backdrop",s,!1,o):"smalllibrarytiles"==n?Sections.loadLibraryTiles(l,r,"smallBackdrop",s,!1,o):"smalllibrarytiles-automobile"==n?Sections.loadLibraryTiles(l,r,"smallBackdrop",s,!0,o):"librarytiles-automobile"==n?Sections.loadLibraryTiles(l,r,"backdrop",s,!0,o):"librarybuttons"==n?Sections.loadlibraryButtons(l,i,s):"resume"==n?Sections.loadResume(l,i):"nextup"==n?Sections.loadNextUp(l,i):"latesttvrecordings"==n?Sections.loadLatestLiveTvRecordings(l,i):"latestchannelmedia"==n?Sections.loadLatestChannelMedia(l,i):(l.innerHTML="",new Promise(function(e){e()}))}function a(e,t,a){var s,i,n=6,o=e.querySelector(".sections");if(!o.innerHTML.length){var l="";for(s=0,i=n;i>s;s++)l+='<div class="homePageSection section'+s+'"></div>';o.innerHTML=l}var u=[];for(s=0,i=n;i>s;s++)u.push(r(e,t,a,s));return Promise.all(u)}function s(){return AppInfo.isNativeApp?"Emby Mobile":"webclient"}function i(e,t){u("home",t).then(function(e){e.CustomPrefs[d]=b,ApiClient.updateDisplayPreferences("home",e,t,s())})}function n(e,t){if(t.CustomPrefs[d]==b)e.querySelector(".welcomeMessage").classList.add("hide");else{Dashboard.hideLoadingMsg();var r=e.querySelector(".welcomeMessage");r.classList.remove("hide"),t.CustomPrefs[d]?(r.querySelector(".tourHeader").innerHTML=Globalize.translate("HeaderWelcomeBack"),r.querySelector(".tourButtonText").innerHTML=Globalize.translate("ButtonTakeTheTourToSeeWhatsNew")):(r.querySelector(".tourHeader").innerHTML=Globalize.translate("HeaderWelcomeToProjectWebClient"),r.querySelector(".tourButtonText").innerHTML=Globalize.translate("ButtonTakeTheTour"))}}function o(e,t){require(["slideshow"],function(){var r=[{imageUrl:"css/images/tour/web/tourcontent.jpg",title:Globalize.translate("WebClientTourContent")},{imageUrl:"css/images/tour/web/tourmovies.jpg",title:Globalize.translate("WebClientTourMovies")},{imageUrl:"css/images/tour/web/tourmouseover.jpg",title:Globalize.translate("WebClientTourMouseOver")},{imageUrl:"css/images/tour/web/tourtaphold.jpg",title:Globalize.translate("WebClientTourTapHold")},{imageUrl:"css/images/tour/web/tourmysync.png",title:Globalize.translate("WebClientTourMySync")},{imageUrl:"css/images/tour/web/toureditor.png",title:Globalize.translate("WebClientTourMetadataManager")},{imageUrl:"css/images/tour/web/tourplaylist.png",title:Globalize.translate("WebClientTourPlaylists")},{imageUrl:"css/images/tour/web/tourcollections.jpg",title:Globalize.translate("WebClientTourCollections")},{imageUrl:"css/images/tour/web/tourusersettings1.png",title:Globalize.translate("WebClientTourUserPreferences1")},{imageUrl:"css/images/tour/web/tourusersettings2.png",title:Globalize.translate("WebClientTourUserPreferences2")},{imageUrl:"css/images/tour/web/tourusersettings3.png",title:Globalize.translate("WebClientTourUserPreferences3")},{imageUrl:"css/images/tour/web/tourusersettings4.png",title:Globalize.translate("WebClientTourUserPreferences4")},{imageUrl:"css/images/tour/web/tourmobile1.jpg",title:Globalize.translate("WebClientTourMobile1")},{imageUrl:"css/images/tour/web/tourmobile2.png",title:Globalize.translate("WebClientTourMobile2")},{imageUrl:"css/images/tour/enjoy.jpg",title:Globalize.translate("MessageEnjoyYourStay")}];require(["slideshow"],function(a){var s=new a({slides:r,interactive:!0,loop:!1});s.show(),i(e,t),e.querySelector(".welcomeMessage").classList.add("hide")})})}function l(e,t){if(window.ApiClient){var r=Dashboard.getCurrentUserId();Dashboard.showLoadingMsg(),u("home",r).then(function(r){Dashboard.getCurrentUser().then(function(s){a(t,s,r).then(function(){AppInfo.isNativeApp||n(e,r),Dashboard.hideLoadingMsg()})})})}}function u(e,t){return ApiClient.getDisplayPreferences(e,t,s())}var c="smalllibrarytiles",b="14",d="homePageTour";return function(t,r){function a(e,a,s){var i=[];switch(a){case 0:i.push("scripts/sections");break;case 1:i.push("scripts/homenextup");break;case 2:i.push("scripts/homefavorites");break;case 3:i.push("scripts/homeupcoming");break;default:return}require(i,function(e){var i;0==a&&(i=t.querySelector(".pageTabContent[data-index='"+a+"']"),c.tabContent=i);var n=d[a];n||(i=t.querySelector(".pageTabContent[data-index='"+a+"']"),n=a?new e(t,r,i):c,d[a]=n,n.initTab&&n.initTab()),s(n)})}function s(e,t){a(e,t,function(e){-1==g.indexOf(t)&&e.preRender&&e.preRender()})}function i(e,t){a(e,t,function(e){-1==g.indexOf(t)&&(g.push(t),e.renderTab())})}function n(e,t){t.NowPlayingItem&&"Video"==t.NowPlayingItem.MediaType&&b.triggerTabChange()}function u(e,t){var r=t;"UserDataChanged"===r.MessageType&&r.Data.UserId==Dashboard.getCurrentUserId()&&(g=[])}var c=this;c.renderTab=function(){var e=t.querySelector(".pageTabContent[data-index='0']");l(t,e)};var b=t.querySelector(".libraryViewNav");e.configurePaperLibraryTabs(t,b,t.querySelectorAll(".pageTabContent"),[0,1,2,3]);var d=[],g=[];b.addEventListener("beforetabchange",function(e){s(t,parseInt(e.detail.selectedTabIndex))}),b.addEventListener("tabchange",function(e){i(t,parseInt(e.detail.selectedTabIndex))}),t.querySelector(".btnTakeTour").addEventListener("click",function(){o(t,Dashboard.getCurrentUserId())}),AppInfo.enableHomeTabs?(t.classList.remove("noSecondaryNavPage"),t.querySelector(".libraryViewNav").classList.remove("hide")):(t.classList.add("noSecondaryNavPage"),t.querySelector(".libraryViewNav").classList.add("hide")),t.addEventListener("viewshow",function(){Events.on(MediaController,"playbackstop",n),Events.on(ApiClient,"websocketmessage",u)}),t.addEventListener("viewbeforehide",function(){Events.off(MediaController,"playbackstop",n),Events.off(ApiClient,"websocketmessage",u)})}});