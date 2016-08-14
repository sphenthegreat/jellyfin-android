define(["imageLoader","itemShortcuts","connectionManager","layoutManager"],function(a,r,e,t){function d(a,r){var t="card "+(r.shape||"portrait")+"Card personCard";(r.block||r.rows)&&(t+=" block");for(var d="",i=0,o=r.serverId,s=e.getApiClient(o),c=0,l=a.length;l>c;c++){r.rows&&0==i&&(d+='<div class="cardColumn">');var v=a[c];d+=n(v,s,o,r,t),i++,r.rows&&i>=r.rows&&(i=0,d+="</div>")}return d}function i(a,r,e){return a.PrimaryImageTag?e.getScaledImageUrl(a.Id,{maxWidth:r,tag:a.PrimaryImageTag,type:"Primary"}):null}function n(a,r,e,d,n){n+=" itemAction scalableCard";var o=i(a,d.width,r),s="cardImageContainer";d.coverImage&&(s+=" coveredImage");var c=o?'<div class="'+s+' lazy" data-src="'+o+'">':'<div class="'+s+'">';o||(c+='<i class="md-icon cardImageIcon">person</i>');var l="";l+='<div class="cardText">'+a.Name+"</div>",l+=a.Role?'<div class="cardText cardText-secondary">as '+a.Role+"</div>":a.Type?'<div class="cardText cardText-secondary">'+Globalize.translate("core#"+a.Type)+"</div>":'<div class="cardText cardText-secondary">&nbsp;</div>';var v="visualCardBox cardBox";t.tv&&(v+=" cardBox-focustransform");var m='<button type="button" data-isfolder="'+a.IsFolder+'" data-type="'+a.Type+'" data-action="link" data-id="'+a.Id+'" data-serverid="'+e+'" raised class="'+n+'"> <div class="'+v+'"><div class="cardScalable"><div class="cardPadder-portrait"></div><div class="cardContent">'+c+'</div></div></div><div class="cardFooter">'+l+"</div></div></button>";return m}function o(e,t){if(t.parentContainer){if(!document.body.contains(t.parentContainer))return;if(!e.length)return void t.parentContainer.classList.add("hide");t.parentContainer.classList.remove("hide")}var i=d(e,t);t.itemsContainer.innerHTML=i,a.lazyChildren(t.itemsContainer),r.off(t.itemsContainer),r.on(t.itemsContainer)}return{buildPeopleCards:o}});