(function(){
  function cleanParams(params){
    var out={page_path:window.location.pathname};
    if(!params)return out;
    Object.keys(params).forEach(function(key){
      var value=params[key];
      if(value!==undefined&&value!==null&&value!=='')out[key]=value;
    });
    return out;
  }

  window.trackEvent=function(name,params){
    if(!name)return;
    var payload=cleanParams(params);
    try{
      if(typeof window.gtag==='function'){
        window.gtag('event',name,payload);
      }
      if(Array.isArray(window.dataLayer)){
        window.dataLayer.push(Object.assign({event:name},payload));
      }
    }catch(e){}
  };

  function paramsFrom(el){
    return {
      location:el.dataset.location,
      package:el.dataset.package,
      platform:el.dataset.platform
    };
  }

  document.addEventListener('click',function(event){
    var el=event.target.closest('[data-event],a[href]');
    if(!el)return;
    var name=el.dataset.event;
    if(!name&&el.href){
      if(el.href.indexOf('https://wa.me/')===0)name='whatsapp_click';
      else if(el.href.indexOf('tel:')===0)name='phone_click';
      else if(el.href.indexOf('mailto:')===0)name='email_click';
      else{
        try{
          var url=new URL(el.href);
          if(url.pathname.replace(/\/$/,'')==='/realizacje'&&url.hash)name='case_study_click';
        }catch(e){}
      }
    }
    if(!name)return;
    var params=paramsFrom(el);
    if(!params.location){
      if(name==='whatsapp_click'||name==='phone_click'||name==='email_click')params.location='contact';
      if(name==='case_study_click')params.location='case_study';
      if(name==='pricing_cta_click')params.location='pricing';
    }
    window.trackEvent(name,params);
  },true);

  function initSectionViews(){
    var seen=new WeakSet();
    var targets=document.querySelectorAll('[data-view-event]');
    if(!targets.length)return;
    if(!('IntersectionObserver' in window)){
      targets.forEach(function(el){
        if(seen.has(el))return;
        seen.add(el);
        window.trackEvent(el.dataset.viewEvent,paramsFrom(el));
      });
      return;
    }
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting||seen.has(entry.target))return;
        seen.add(entry.target);
        window.trackEvent(entry.target.dataset.viewEvent,paramsFrom(entry.target));
        observer.unobserve(entry.target);
      });
    },{threshold:0.35});
    targets.forEach(function(el){observer.observe(el)});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initSectionViews);
  }else{
    initSectionViews();
  }
})();
