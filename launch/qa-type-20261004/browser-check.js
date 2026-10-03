(async()=>{
 const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];let screens=0,minimum=Infinity;
 const settle=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 const click=async s=>{$(s).click();await settle();};
 const inspect=label=>{
  if(document.documentElement.scrollWidth>document.documentElement.clientWidth)throw Error(label+' page overflow');
  if($('#detail').open&&$('#detail').scrollWidth>$('#detail').clientWidth)throw Error(label+' dialog overflow');
  for(const el of all('#app *,#detail *')){
   if(!el.checkVisibility()||!Array.from(el.childNodes).some(n=>n.nodeType===3&&n.textContent.trim()))continue;
   const size=parseFloat(getComputedStyle(el).fontSize);minimum=Math.min(minimum,size);
   if(size<16)throw Error(label+' font '+size+' '+el.className+' '+el.textContent.slice(0,35));
  }
  for(const el of all('button'))if(el.checkVisibility()&&el.scrollWidth>el.clientWidth+1)throw Error(label+' button text overflow '+el.textContent);
  screens++;
 };
 if($('#detail').open)await click('#detail [data-close]');
 for(const lang of ['en','ja','zh-Hans','vi','mn','id','fr']){
  await click('#app [data-lang="'+lang+'"]');await click('[data-home]');await click('[data-reset]');
  $('.filter-panel').open=false;inspect(lang+' menu');
  $('.filter-panel').open=true;await settle();inspect(lang+' filters');
  await click('[data-avoid="pork"]');inspect(lang+' empty');await click('[data-reset]');
  await click('[data-detail="M018"]');inspect(lang+' details');await click('#detail [data-staff]');inspect(lang+' staff');await click('#detail [data-close]');
  await click('[data-photo="M006"]');inspect(lang+' photo');await click('#detail [data-close]');
  await click('[data-guide]');inspect(lang+' guide');await click('[data-guide-spice="0"]');inspect(lang+' choices');await click('#detail [data-close]');
  await click('[data-ingredient-help]');await click('[data-ingredient-question="allergy"]');inspect(lang+' question');await click('#detail [data-close]');
  for(const page of ['how','visit']){await click('[data-page="'+page+'"]');inspect(lang+' '+page);}
  await click('[data-home]');
 }
 await click('#app [data-lang="en"]');$('.filter-panel').open=false;window.scrollTo({top:0,behavior:'instant'});
 return {screens,minimumFontPx:minimum,width:innerWidth,height:innerHeight};
})();
