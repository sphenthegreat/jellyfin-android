define(["libraryBrowser","cardBuilder","emby-itemscontainer","emby-tabs","emby-button"],function(e,a){function n(n){Dashboard.showLoadingMsg(),r.UserId=Dashboard.getCurrentUserId(),ApiClient.getJSON(ApiClient.getUrl("Channels",r)).then(function(t){window.scrollTo(0,0);var s="",i="Thumb";"Thumb"==i?s=a.getCardsHtml({items:t.Items,shape:"backdrop",context:"channels",showTitle:!0,lazy:!0,centerText:!0,preferThumb:!0}):"ThumbCard"==i&&(s=a.getCardsHtml({items:t.Items,shape:"backdrop",preferThumb:!0,context:"channels",lazy:!0,cardLayout:!0,showTitle:!0}));var l=n.querySelector("#items");l.innerHTML=s,ImageLoader.lazyChildren(l),e.saveQueryValues("channels",r),Dashboard.hideLoadingMsg()})}function t(a,t){switch(t){case 1:e.loadSavedQueryValues("channels",r),n(a)}}var r={StartIndex:0};pageIdOn("pageinit","channelsPage",function(){var a=this,n=a.querySelector(".libraryViewNav");e.configurePaperLibraryTabs(a,n,a.querySelectorAll(".pageTabContent"),[0,1]),n.addEventListener("tabchange",function(e){t(a,parseInt(e.detail.selectedTabIndex))})})});