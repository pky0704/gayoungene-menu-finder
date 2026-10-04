(async()=>{
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const settle=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 const click=async s=>{$(s).click();await settle();};
 const check=(ok,label)=>{if(!ok)throw Error(label);};
 let choices=0;
 for(const lang of ['en','ja','zh-Hans','vi','mn','id','fr']){
  await click('#app [data-lang="'+lang+'"]');await click('[data-home]');await click('[data-reset]');
  $('.filter-panel').open=false;await settle();
  check(!$('#country').closest('details'),'country hidden in filter');
  check(all('#app [data-lang]').every(b=>b.querySelectorAll('.country-flag').length===1&&b.textContent.trim()),'language flags');
  check(all('[data-quick-spice]').length===0,'duplicate spice controls');
  for(const [code,count] of [['JP',3],['VN',1],['MN',1],['all',32]]){
   await click('[data-country="'+code+'"]');
   check(all('.dish').length===count,lang+' '+code+' results');
   check(!$('.filter-panel').open,'country opened filter');
   check(document.activeElement.id==='menu-results','result focus');
   check(document.documentElement.scrollWidth<=innerWidth,'overflow');
   const stickyBottom=$('.primary-nav').getBoundingClientRect().bottom;
   check($('#menu-results').getBoundingClientRect().top>=stickyBottom-1,'results behind navigation');
   if(code!=='all'){
    check($('[data-country="'+code+'"]').querySelectorAll('.country-flag').length===1,'country flag');
    await click('[data-country-back]');check(document.activeElement.dataset.country===code,'return focus');
   }
   choices++;
  }
  await click('[data-detail=M006]');check(all('#detail [data-lang] .country-flag').length===7,'dialog flags');await click('#detail [data-close]');
  $('.event-teaser').open=true;await settle();check($('.event-teaser .gift-event').checkVisibility(),'event');
 }
 await click('#app [data-lang=en]');await click('[data-reset]');$('.filter-panel').open=false;
 await click('[data-country=JP]');await click('[data-avoid=pork]');check(all('.dish').length===2,'ingredient intersection');
 await click('[data-country=VN]');check(all('.dish').length===0&&!!$('.empty [data-reset]'),'empty recovery control');
 await click('[data-reset]');$('.filter-panel').open=false;window.scrollTo({top:0,behavior:'instant'});
 return {languages:7,countryChoices:choices,width:innerWidth,passed:true};
})();
