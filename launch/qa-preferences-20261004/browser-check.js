(async()=>{
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],ids=()=>all('.dish').map(e=>e.id);
 const settle=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 const click=async s=>{const e=$(s);if(!e)throw Error('Missing '+s);e.click();await settle();};
 const check=(ok,label)=>{if(!ok)throw Error(label);};
 const expected={pork:23,beef:27,chicken:27,fish:25,squid:30,shrimp:29,egg:25,dairy:24,wheat:12,soy:16,sesame:25};
 let selections=0;
 for(const lang of ['en','ja','zh-Hans','vi','mn','id','fr']){
  await click('#app [data-lang="'+lang+'"]');await click('[data-reset]');
  const sets={};
  for(const [key,count] of Object.entries(expected)){
   await click('[data-avoid="'+key+'"]');check(ids().length===count,lang+' '+key+' count');sets[key]=ids();
   check(all('.dish .preference-caution').length===count,'candidate warning');
   check(!!$('.preference-notice button'),'staff help');$('.filter-panel').open=false;await settle();
   check($('.preference-notice').checkVisibility(),'collapsed warning');
   check(document.documentElement.scrollWidth<=innerWidth,'horizontal overflow');
   await click('[data-avoid="'+key+'"]');check(ids().length===32,'restore');selections++;
  }
  await click('[data-avoid=pork]');await click('[data-avoid=egg]');
  check(JSON.stringify(ids())===JSON.stringify(sets.pork.filter(id=>sets.egg.includes(id))),'intersection');
  await click('[data-clear-filter=avoid-pork]');check(ids().length===25,'clear one');await click('[data-reset]');
  await click('[data-avoid=pork]');await click('[data-show-staff=M018]');
  check($('#detail').open&&$('#detail [lang=ko].preference-caution').textContent.includes('돼지고기'),'Korean request');
  await click('#detail [data-close]');await click('[data-reset]');
  await click('[data-country=VN]');await click('[data-avoid=pork]');check(ids().length===0&&!!$('.empty [data-reset]'),'empty result');
  await click('[data-reset]');check(ids().length===32,'empty recovery');
 }
 await click('#app [data-lang=en]');await click('[data-avoid=pork]');await click('#app [data-lang=ja]');
 check(ids().length===23&&$('[data-avoid=pork]').getAttribute('aria-pressed')==='true','language persistence');
 await click('#app [data-lang=en]');await click('[data-reset]');
 return {selections,languages:7,width:innerWidth,expected,passed:true};
})();
