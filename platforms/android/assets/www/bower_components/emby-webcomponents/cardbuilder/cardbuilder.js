define(["datetime","imageLoader","connectionManager","itemHelper","mediaInfo","focusManager","indicators","globalize","layoutManager","apphost","dom","emby-button","css!./card","paper-icon-button-light","clearButtonStyle"],function(e,a,t,r,n,i,o,s,d,l,u){function c(e){return e.replace(/&/g,"&amp;").replace(U,function(e){var a=e.charCodeAt(0),t=e.charCodeAt(1);return"&#"+(1024*(a-55296)+(t-56320)+65536)+";"}).replace(G,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function m(e,a){var r=t.currentApiClient();1==arguments.length&&(a=arguments[0],e=a.items);var n=y(e,r,a);return n}function h(e,a){switch(e){case"portrait":return a>=2200?10:a>=2100?9:a>=1600?8:a>=1400?7:a>=1200?6:a>=800?5:a>=640?4:3;case"square":return a>=2100?9:a>=1800?8:a>=1400?7:a>=1200?6:a>=900?5:a>=700?4:a>=500?3:2;case"banner":return a>=2200?4:a>=1200?3:a>=800?2:1;case"backdrop":return a>=2500?6:a>=2100?5:a>=1200?4:a>=770?3:a>=420?2:1;case"smallBackdrop":return a>=1440?8:a>=1100?6:a>=800?5:a>=600?4:a>=540?3:a>=420?2:1;case"overflowPortrait":return a>=1e3?100/23:a>=640?100/36:2.5;case"overflowSquare":return a>=1e3?100/22:a>=640?100/30:100/42;case"overflowBackdrop":return a>=1e3?2.5:a>=640?100/60:100/84;default:return 4}}function p(e){var a=window.screen;if(a){var t=a.availWidth;if(t-e>20)return!0}return!1}function g(e){var a=u.getWindowSize().innerWidth;if(p(a)){var t=100;a=Math.ceil(a/t)*t}window.screen&&(a=Math.min(a,screen.availWidth||a));var r=h(e,a),n=a/r;return Math.round(n)}function v(e,t){t.shape=t.shape||"auto";var r=a.getPrimaryImageAspectRatio(e),n=r&&Math.abs(r-1.777777778)<.3,i=r&&Math.abs(r-1)<.33||r&&Math.abs(r-1.3333334)<.01;("auto"==t.shape||"autohome"==t.shape||"autooverflow"==t.shape||"autoVertical"==t.shape)&&(t.preferThumb||n?t.shape="autooverflow"==t.shape?"overflowBackdrop":"backdrop":i?(t.coverImage=!0,t.shape="autooverflow"==t.shape?"overflowSquare":"square"):r&&r>1.9?(t.shape="banner",t.coverImage=!0):t.shape=r&&Math.abs(r-.6666667)<.2?"autooverflow"==t.shape?"overflowPortrait":"portrait":t.defaultShape||("autooverflow"==t.shape?"overflowSquare":"square")),t.uiAspect=f(t.shape),t.primaryImageAspectRatio=r,!t.width&&t.widths&&(t.width=t.widths[t.shape]),t.rows&&"number"!=typeof t.rows&&(t.rows=t.rows[t.shape]),d.tv&&("backdrop"==t.shape?t.width=t.width||500:"portrait"==t.shape?t.width=t.width||243:"square"==t.shape&&(t.width=t.width||243)),t.width=t.width||g(t.shape)}function y(a,t,r){var n;if("autoVertical"==r.shape&&(n=!0),v(a,r),"Genres"==r.indexBy)return I(a,t,r);var i="card";r.shape&&(i+=" "+r.shape+"Card");for(var o,s,d,l="",u=0,c=r.sectionTitleTagName||"div",m=0,h=a.length;h>m;m++){var p=a[m];if(r.indexBy){var g="";if("PremiereDate"==r.indexBy){if(p.PremiereDate)try{g=T(e.parseISO8601Date(p.PremiereDate))}catch(y){}}else"Genres"==r.indexBy?g=p.Name:"ProductionYear"==r.indexBy?g=p.ProductionYear:"CommunityRating"==r.indexBy&&(g=p.CommunityRating?Math.floor(p.CommunityRating)+(p.CommunityRating%1>=.5?.5:0)+"+":null);g!=o&&(s&&(l+="</div>",s=!1,u=0),d&&(l+="</div>",n&&(l+="</div>"),d=!1),l+=n?'<div class="verticalSection">':'<div class="horizontalSection">',l+="<"+c+' class="sectionTitle">'+g+"</"+c+">",n&&(l+='<div class="itemsContainer vertical-wrap">'),o=g,d=!0)}r.rows&&0==u&&(s&&(l+="</div>",s=!1),l+='<div class="cardColumn">',s=!0);var f=i;l+=B(m,p,t,r,f),u++,r.rows&&u>=r.rows&&(l+="</div>",s=!1,u=0)}return s&&(l+="</div>"),d&&(l+="</div>",n&&(l+="</div>")),l}function I(e,a,t){var r="card";t.shape&&(r+=" "+t.shape+"Card");for(var n="",i=t.genres,o=0,d=i.length;d>o;o++){var l=i[o],u=l.Name.toLowerCase(),c=e.filter(function(e){return e.Genres.filter(function(e){return e.toLowerCase()==u}).length>0});if(c.length){n+='<div class="horizontalSection focuscontainer-down">',n+='<div class="sectionTitle">'+l.Name+"</div>";var m=!1;c.length>t.indexLimit&&(c.length=Math.min(c.length,t.indexLimit),m=!0);var h=0,p=!1;n+=c.map(function(e){var n="";t.rows&&0==h&&(p&&(n+="</div>",p=!1),n+='<div class="cardColumn">',p=!0);var i=r;return n+=B(o,e,a,t,i),h++,t.rows&&h>=t.rows&&(n+="</div>",p=!1,h=0),n}).join(""),m&&(n+='<div class="listItemsMoreButtonContainer">',n+='<button is="emby-button" class="listItemsMoreButton raised" data-parentid="'+t.parentId+'" data-indextype="Genres" data-indexvalue="'+l.Id+'">'+s.translate("sharedcomponents#More")+"</button>",n+="</div>"),n+="</div>",n+="</div>"}}return n}function T(e){var a=[];a[0]=s.translate("sharedcomponents#Sunday"),a[1]=s.translate("sharedcomponents#Monday"),a[2]=s.translate("sharedcomponents#Tuesday"),a[3]=s.translate("sharedcomponents#Wednesday"),a[4]=s.translate("sharedcomponents#Thursday"),a[5]=s.translate("sharedcomponents#Friday"),a[6]=s.translate("sharedcomponents#Saturday");var t=a[e.getDay()];return e=e.toLocaleDateString(),-1==e.toLowerCase().indexOf(t.toLowerCase())?t+" "+e:e}function f(e){if(e){if(e=e.toLowerCase(),-1!=e.indexOf("portrait"))return 2/3;if(-1!=e.indexOf("backdrop"))return 16/9;if(-1!=e.indexOf("square"))return 1}return null}function C(e,t,r){var n=e.ProgramInfo||e;e=n;var i=r.width,o=null,s=a.getPrimaryImageAspectRatio([e]),d=!1,l=null,u=!1;if(r.autoThumb&&e.ImageTags&&e.ImageTags.Primary&&e.PrimaryImageAspectRatio&&e.PrimaryImageAspectRatio>=1.34)o=s?Math.round(i/s):null,l=ApiClient.getScaledImageUrl(e.Id,{type:"Primary",maxHeight:o,maxWidth:i,tag:e.ImageTags.Primary}),s&&c&&Math.abs(s-c)<=.2&&(u=!0);else if(r.autoThumb&&e.ImageTags&&e.ImageTags.Thumb)l=ApiClient.getScaledImageUrl(e.Id,{type:"Thumb",maxWidth:i,tag:e.ImageTags.Thumb});else if(r.preferThumb&&e.ImageTags&&e.ImageTags.Thumb)l=t.getScaledImageUrl(e.Id,{type:"Thumb",maxWidth:i,tag:e.ImageTags.Thumb});else if(r.preferBanner&&e.ImageTags&&e.ImageTags.Banner)l=t.getScaledImageUrl(e.Id,{type:"Banner",maxWidth:i,tag:e.ImageTags.Banner});else if(r.preferThumb&&e.SeriesThumbImageTag&&r.inheritThumb!==!1)l=t.getScaledImageUrl(e.SeriesId,{type:"Thumb",maxWidth:i,tag:e.SeriesThumbImageTag});else if(r.preferThumb&&e.ParentThumbItemId&&r.inheritThumb!==!1)l=t.getScaledImageUrl(e.ParentThumbItemId,{type:"Thumb",maxWidth:i,tag:e.ParentThumbImageTag});else if(r.preferThumb&&e.BackdropImageTags&&e.BackdropImageTags.length)l=t.getScaledImageUrl(e.Id,{type:"Backdrop",maxWidth:i,tag:e.BackdropImageTags[0]}),d=!0;else if(e.ImageTags&&e.ImageTags.Primary){if(o=i&&s?Math.round(i/s):null,l=t.getScaledImageUrl(e.Id,{type:"Primary",maxHeight:o,maxWidth:i,tag:e.ImageTags.Primary}),r.preferThumb&&r.showTitle!==!1&&(d=!0),s){var c=f(r.shape);c&&(u=Math.abs(s-c)<=.2)}}else if(e.PrimaryImageTag){if(o=i&&s?Math.round(i/s):null,l=t.getScaledImageUrl(e.Id||e.ItemId,{type:"Primary",maxHeight:o,maxWidth:i,tag:e.PrimaryImageTag}),r.preferThumb&&r.showTitle!==!1&&(d=!0),s){var c=f(r.shape);c&&(u=Math.abs(s-c)<=.2)}}else if(e.ParentPrimaryImageTag)l=t.getScaledImageUrl(e.ParentPrimaryImageItemId,{type:"Primary",maxWidth:i,tag:e.ParentPrimaryImageTag});else if(e.AlbumId&&e.AlbumPrimaryImageTag){if(i=s?Math.round(o*s):null,l=t.getScaledImageUrl(e.AlbumId,{type:"Primary",maxHeight:o,maxWidth:i,tag:e.AlbumPrimaryImageTag}),s){var c=f(r.shape);c&&(u=Math.abs(s-c)<=.2)}}else"Season"==e.Type&&e.ImageTags&&e.ImageTags.Thumb?l=t.getScaledImageUrl(e.Id,{type:"Thumb",maxWidth:i,tag:e.ImageTags.Thumb}):e.BackdropImageTags&&e.BackdropImageTags.length?l=t.getScaledImageUrl(e.Id,{type:"Backdrop",maxWidth:i,tag:e.BackdropImageTags[0]}):e.ImageTags&&e.ImageTags.Thumb?l=t.getScaledImageUrl(e.Id,{type:"Thumb",maxWidth:i,tag:e.ImageTags.Thumb}):e.SeriesThumbImageTag?l=t.getScaledImageUrl(e.SeriesId,{type:"Thumb",maxWidth:i,tag:e.SeriesThumbImageTag}):e.ParentThumbItemId&&(l=t.getThumbImageUrl(e.ParentThumbItemId,{type:"Thumb",maxWidth:i,tag:e.ParentThumbImageTag}));return{imgUrl:l,forceName:d,coverImage:u}}function b(e,a){return Math.floor(Math.random()*(a-e+1))+e}function S(e){if(e){for(var a=Math.floor(e.length/2),t=String(e.substr(a,1).charCodeAt()),r=0,n=0;n<t.length;n++)r+=parseInt(t.charAt(n));var i=String(r).substr(-1);return i%E+1}return b(1,E)}function P(e){return"defaultCardColor"+S(e)}function w(e,a,t,r){var n,i,o="",s=0;for(n=0,i=e.length;i>n;n++){var d=e[n];1==n&&r&&(a+=" cardText-secondary"),d&&(o+="<div class='"+a+"'>",o+=d,o+="</div>",s++)}if(t)for(;i>s;)o+="<div class='"+a+"'>&nbsp;</div>",s++;return o}function x(a,t,n,i,o,u,m){var h="",p=m?!t.overlayText:t.overlayText;if(m&&t.cardLayout&&!d.tv){var g="dots-horiz"==l.moreIcon?"&#xE5D3;":"&#xE5D4;";h+='<button is="paper-icon-button-light" class="itemAction btnCardOptions autoSize" data-action="menu"><i class="md-icon">'+g+"</i></button>"}var v=t.centerText&&!t.cardLayout?"cardText cardTextCentered":"cardText",y=[];if(p){var I="MusicAlbum"==a.Type||"Audio"==a.Type||"MusicVideo"==a.Type;t.showParentTitle&&!I&&y.push(m&&"Episode"==a.Type&&a.SeriesName&&a.SeriesId?A({Id:a.SeriesId,Name:a.SeriesName,Type:"Series",IsFolder:!0}):a.EpisodeTitle?a.Name:a.SeriesName||a.Album||a.AlbumArtist||a.GameSystem||"")}if(n){var T="auto"!=t.showTitle||a.IsFolder||"Photo"!=a.MediaType?r.getDisplayName(a):"";y.push(c(T))}if(p){if(t.showParentTitle&&I&&(m&&a.AlbumArtists&&a.AlbumArtists.length?(a.AlbumArtists[0].Type="MusicArtist",a.AlbumArtists[0].IsFolder=!0,y.push(A(a.AlbumArtists[0]))):y.push(a.EpisodeTitle?a.Name:a.SeriesName||a.Album||a.AlbumArtist||a.GameSystem||"")),t.showItemCounts){var f=M(t,a);y.push(f)}if(t.textLines)for(var C=t.textLines(a),b=0,S=C.length;S>b;b++)y.push(C[b]);if(t.showSongCount){var P="";a.SongCount&&(P=1==a.SongCount?s.translate("sharedcomponents#ValueOneSong"):s.translate("sharedcomponents#ValueSongCount",a.SongCount)),y.push(P)}if(t.showPremiereDate)if(a.PremiereDate)try{y.push(getPremiereDateText(a))}catch(x){y.push("")}else y.push("");if(t.showYear&&y.push(a.ProductionYear||""),t.showChannelName&&y.push(a.ChannelName||""),t.showAirTime){var B;if(a.StartDate)try{var D=e.parseISO8601Date(a.StartDate);B=D.toLocaleDateString(),B+=", "+e.getDisplayTime(D),a.EndDate&&(D=e.parseISO8601Date(a.EndDate),B+=" - "+e.getDisplayTime(D))}catch(L){}y.push(B||"")}if("TvChannel"==a.Type&&y.push(a.CurrentProgram?r.getDisplayName(a.CurrentProgram):""),t.showSeriesYear&&y.push("Continuing"==a.Status?s.translate("sharedcomponents#SeriesYearToPresent",a.ProductionYear||""):a.ProductionYear||""),t.showProgramAirInfo){var D=e.parseISO8601Date(a.StartDate,!0),V=a.StartDate?D.toLocaleString():"";y.push(V||"&nbsp;"),y.push(a.ChannelName||"&nbsp;")}}return h+=w(y,v,!t.overlayText,m),u&&(h+=u),h&&(h='<div class="'+o+'">'+h,h+="</div>"),h}function A(e,a){a||(a=r.getDisplayName(e));var t='<button data-id="'+e.Id+'" data-type="'+e.Type+'" data-mediatype="'+e.MediaType+'" data-channelid="'+e.ChannelId+'" data-isfolder="'+e.IsFolder+'" type="button" class="itemAction textActionButton" data-action="link">';return t+=a,t+="</button>"}function M(e,a){var t,r=[];if("Playlist"==a.Type){if(t="",a.CumulativeRunTimeTicks){var n=a.CumulativeRunTimeTicks/6e8;n=n||1,t+=s.translate("ValueMinutes",Math.round(n))}else t+=s.translate("ValueMinutes",0);r.push(t)}else"Genre"==a.Type||"Studio"==a.Type?(a.MovieCount&&(t=1==a.MovieCount?s.translate("ValueOneMovie"):s.translate("ValueMovieCount",a.MovieCount),r.push(t)),a.SeriesCount&&(t=1==a.SeriesCount?s.translate("ValueOneSeries"):s.translate("ValueSeriesCount",a.SeriesCount),r.push(t)),a.EpisodeCount&&(t=1==a.EpisodeCount?s.translate("ValueOneEpisode"):s.translate("ValueEpisodeCount",a.EpisodeCount),r.push(t)),a.GameCount&&(t=1==a.GameCount?s.translate("ValueOneGame"):s.translate("ValueGameCount",a.GameCount),r.push(t))):"GameGenre"==a.Type?a.GameCount&&(t=1==a.GameCount?s.translate("sharedcomponents#ValueOneGame"):s.translate("sharedcomponents#ValueGameCount",a.GameCount),r.push(t)):("MusicGenre"==a.Type||"MusicArtist"==e.context)&&(a.AlbumCount&&(t=1==a.AlbumCount?s.translate("sharedcomponents#ValueOneAlbum"):s.translate("sharedcomponents#ValueAlbumCount",a.AlbumCount),r.push(t)),a.SongCount&&(t=1==a.SongCount?s.translate("sharedcomponents#ValueOneSong"):s.translate("sharedcomponents#ValueSongCount",a.SongCount),r.push(t)),a.MusicVideoCount&&(t=1==a.MusicVideoCount?s.translate("sharedcomponents#ValueOneMusicVideo"):s.translate("sharedcomponents#ValueMusicVideoCount",a.MusicVideoCount),r.push(t)));return r.join(", ")}function B(e,a,t,n,i){var s=n.action||"link",u=n.scalable!==!1;u&&(i+=" scalableCard");var c=C(a,t,n),m=c.imgUrl,h=c.forceName,p="auto"==n.showTitle?!0:n.showTitle||"PhotoAlbum"==a.Type||"Folder"==a.Type,g=n.overlayText;h&&!n.cardLayout&&(p=m,null==g&&(g=!0));var v="cardImageContainer";(n.coverImage||c.coverImage)&&(v+=" coveredImage",("Photo"==a.MediaType||"PhotoAlbum"==a.Type||"Folder"==a.Type)&&(v+=" noScale")),m||(v+=" "+P(a.Name));var y=u,I=n.cardLayout?"cardBox visualCardBox":"cardBox";I+=d.tv?" cardBox-focustransform":" cardBox-mobile";var T,f=o.getProgressBarHtml(a),b="",S=!1;g?(T=f?"innerCardFooter fullInnerCardFooter":"innerCardFooter",b+=x(a,n,p,m,T,f,!1),S=!0):f&&(b+='<div class="innerCardFooter fullInnerCardFooter innerCardFooterClear">',b+=f,b+="</div>",f="");var w=a.MediaSourceCount||1;w>1&&(b+='<div class="mediaSourceIndicator">'+w+"</div>");var A="";g||S||(T=n.cardLayout?"cardFooter":"cardFooter transparent",A=x(a,n,p,m,T,f,!0)),A&&!n.cardLayout&&n.allowBottomPadding!==!1&&(I+=" cardBox-bottompadded"),y||(v+=" "+I);var M="";if(!d.tv){var B=n.overlayPlayButton;if(null!=B||n.overlayMoreButton||n.cardLayout||(B="Video"==a.MediaType),!B||a.IsPlaceHolder||"Virtual"==a.LocationType&&a.MediaType&&"Program"!=a.Type||"Person"==a.Type||"Full"!=a.PlayAccess||(M+='<button is="paper-icon-button-light" class="cardOverlayButton itemAction autoSize" data-action="playmenu" onclick="return false;"><i class="md-icon">play_arrow</i></button>'),n.overlayMoreButton){var D="dots-horiz"==l.moreIcon?"&#xE5D3;":"&#xE5D4;";M+='<button is="paper-icon-button-light" class="cardOverlayButton itemAction autoSize" data-action="menu" onclick="return false;"><i class="md-icon">'+D+"</i></button>"}}n.showChildCountIndicator&&a.ChildCount&&(i+=" groupedCard");var L,V="",k="",N="",F="";if(y){var U;d.tv?(U='<div class="cardContent">',N="</div>"):(U='<button type="button" class="clearButton cardContent itemAction" data-action="'+s+'">',N="</button>"),L=m?'<div class="'+v+' lazy" data-src="'+m+'">':'<div class="'+v+'">',L='<div class="'+I+'"><div class="cardScalable"><div class="cardPadder-'+n.shape+'"></div>'+U+L,k="</div>",F="</div>",V="</div>"}else M&&!y?(v+=" cardImageContainerClass-button",L=m?'<button type="button" data-action="'+s+'" class="itemAction '+v+' lazy" data-src="'+m+'">':'<button type="button" data-action="'+s+'" class="itemAction '+v+'">',V="</button>",i+=" forceRelative"):(L=m?'<div class="'+v+' lazy" data-src="'+m+'">':'<div class="'+v+'">',V="</div>");var G="";if(G+=o.getSyncIndicator(a),G+=o.getTimerIndicator(a),G+=n.showGroupCount?o.getChildCountIndicatorHtml(a,{minCount:1}):o.getPlayedIndicatorHtml(a),G&&(L+='<div class="cardIndicators '+n.shape+'CardIndicators">'+G+"</div>"),!m){var E=a.EpisodeTitle?a.Name:r.getDisplayName(a);L+='<div class="cardText cardCenteredText">'+E+"</div>"}var W=!d.tv&&u||M?"div":"button",O=(a.SortName||a.Name||"")[0];O&&(O=O.toUpperCase());var q="";a.TimerId&&(q+=' data-timerid="'+a.TimerId+'"'),a.SeriesTimerId&&(q+=' data-seriestimerid="'+a.SeriesTimerId+'"');var H;"button"==W?(i+=" itemAction",H=' data-action="'+s+'"'):H="";var z=a.UserData&&a.UserData.PlaybackPositionTicks?' data-positionticks="'+a.UserData.PlaybackPositionTicks+'"':"",R=n.collectionId?' data-collectionid="'+n.collectionId+'"':"",Y=n.playlistId?' data-playlistid="'+n.playlistId+'"':"",j=a.MediaType?' data-mediatype="'+a.MediaType+'"':"",_=a.CollectionType?' data-collectiontype="'+a.CollectionType+'"':"",J=a.ChannelId?' data-channelid="'+a.ChannelId+'"':"";return"<"+W+' data-index="'+e+'"'+q+H+' data-isfolder="'+(a.IsFolder||!1)+'" data-serverid="'+a.ServerId+'" data-id="'+(a.Id||a.ItemId)+'" data-type="'+a.Type+'"'+j+_+J+z+R+Y+' data-prefix="'+O+'" class="'+i+'"> '+L+b+V+N+M+F+A+k+"</"+W+">"}function D(e,r){if(document.body.contains(r.itemsContainer)){if(r.parentContainer){if(!e.length)return void r.parentContainer.classList.add("hide");r.parentContainer.classList.remove("hide")}var n=t.currentApiClient(),o=y(e,n,r);o?(r.itemsContainer.cardBuilderHtml!=o&&(r.itemsContainer.innerHTML=o,r.itemsContainer.cardBuilderHtml=e.length<50?o:null),a.lazyChildren(r.itemsContainer)):(r.itemsContainer.innerHTML=o,r.itemsContainer.cardBuilderHtml=null),r.autoFocus&&i.autoFocus(r.itemsContainer,!0),"Genres"==r.indexBy&&r.itemsContainer.addEventListener("click",V)}}function L(e,a){for(;!e.classList||!e.classList.contains(a);)if(e=e.parentNode,!e)return null;return e}function V(e){var a=L(e.target,"listItemsMoreButton");if(a){var t=a.getAttribute("data-indexvalue"),r=a.getAttribute("data-parentid");Emby.Page.showGenre({ParentId:r,Id:t})}}function k(e,a){if(a)return a;if(a=e.querySelector(".indicators"),!a){var t=e.querySelector(".cardImageContainer");a=document.createElement("div"),a.classList.add("indicators"),t.appendChild(a)}return a}function N(e,a){var t,r=e.getAttribute("data-type"),n="Series"==r||"BoxSet"==r||"Season"==r;if(a.Played){var i=e.querySelector(".playedIndicator");i||(i=document.createElement("div"),i.classList.add("playedIndicator"),t=k(e,t),t.appendChild(i)),i.innerHTML='<i class="md-icon">check</i>'}else{var i=e.querySelector(".playedIndicator");i&&i.parentNode.removeChild(i)}if(a.UnplayedItemCount){var s=e.querySelector(".countIndicator");s||(s=document.createElement("div"),s.classList.add("countIndicator"),t=k(e,t),t.appendChild(s)),s.innerHTML=a.UnplayedItemCount}else if(n){var s=e.querySelector(".countIndicator");s&&s.parentNode.removeChild(s)}var d=o.getProgressBarHtml({Type:r,UserData:a,MediaType:"Video"});if(d){var l=e.querySelector(".itemProgressBar");if(!l){l=document.createElement("div"),l.classList.add("itemProgressBar");var u=e.querySelector(".innerCardFooter");if(!u){u=document.createElement("div"),u.classList.add("innerCardFooter");var c=e.querySelector(".cardImageContainer");c.appendChild(u)}u.appendChild(l)}l.innerHTML=d}else{var l=e.querySelector(".itemProgressBar");l&&l.parentNode.removeChild(l)}}function F(e){for(var a=document.querySelectorAll('.card[data-id="'+e.ItemId+'"]'),t=0,r=a.length;r>t;t++)N(a[t],e)}var U=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,G=/([^\#-~| |!])/g,E=5;return{getCardsHtml:m,buildCards:D,onUserDataChanged:F,getDefaultColorClass:P}});