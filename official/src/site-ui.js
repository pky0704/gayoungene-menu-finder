import {content,languages} from './content.js';
import {experience} from './experience-copy.js';
import {socialLinks} from './social-links.js';

export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const lines=value=>esc(value).replaceAll('\n','<br> ');
export const homeUrl=lang=>lang==='ko'?'/':lang==='fr'?'/en/':`/${lang}/`;
export const flagCodes={ko:'kr',en:'gb','zh-Hans':'cn',ja:'jp',vi:'vn',mn:'mn',th:'th',ru:'ru',id:'id',fr:'fr'};
export const flag=lang=>`<span class="round-flag" aria-hidden="true"><img src="/assets/flags/${flagCodes[lang]||'gb'}.svg" width="28" height="28" alt=""></span>`;
export function siteHeader(lang,page='home'){
 const t=content[lang]||content.en,x=experience[lang]||experience.en,home=homeUrl(lang),locales=page==='menu'?{...languages,fr:'Français'}:languages;
 const nav=[[home+'#story',lang==='fr'?'Notre histoire':t.story],[`/menu?lang=${lang}`,x.menu],[home+'#characters',x.friends],[home+'#visit',x.visit]];
 return `<header class="site-masthead"><div class="masthead-inner"><a class="brand" href="${home}" aria-label="${esc(t.home)}"><img src="/assets/logo.png" width="1417" height="502" alt="가영이네 Gayoungene"></a><nav class="site-links" id="site-navigation" aria-label="${esc(x.navMenu)}">${nav.map(([href,label],i)=>`<a href="${href}" ${page==='menu'&&i===1?'aria-current="page"':''}>${esc(label)}</a>`).join('')}</nav><div class="site-controls"><details class="language-picker site-language"><summary aria-label="${esc(t.language+': '+locales[lang])}">${flag(lang)}<span lang="${lang}">${locales[lang]}</span><span aria-hidden="true">⌄</span></summary><div class="site-language-list" role="group" aria-label="${esc(t.language)}">${Object.entries(locales).map(([key,name])=>`<button type="button" data-lang="${key}" lang="${key}" aria-pressed="${key===lang}">${flag(key)}<span>${name}</span></button>`).join('')}</div></details><button type="button" class="site-nav-toggle" aria-controls="site-navigation" aria-expanded="false">${esc(x.navMenu)}</button></div></div></header>`;
}
export function socialItems(lang){
 const x=experience[lang]||experience.en;
 return [{name:x.phone,href:'tel:050714772825',type:'phone'},...socialLinks,{name:x.blog,href:'https://blog.naver.com/gayoungene',type:'blog'}].map(item=>`<a class="social-link" href="${esc(item.href)}" ${item.type==='phone'?'':`target="_blank" rel="noopener noreferrer" aria-label="${esc(item.name+' · '+x.newWindow)}"`}><span class="social-symbol social-${item.type}" aria-hidden="true">${item.type==='phone'?'↗':item.type==='instagram'?'◎':item.type==='kakao'?'톡':'N'}</span><span>${esc(item.name)}</span><span aria-hidden="true">↗</span></a>`).join('');
}
export function siteFooter(lang){
 const t=content[lang]||content.en,x=experience[lang]||experience.en;
 return `<footer class="site-footer"><div class="footer-main"><a class="brand" href="${homeUrl(lang)}" aria-label="${esc(t.home)}"><img src="/assets/logo.png" width="1417" height="502" alt="가영이네 Gayoungene" loading="lazy"></a><p>${esc(t.footer)}</p><div class="footer-contacts">${socialItems(lang)}</div></div><div class="footer-fine"><span>© ${new Date().getFullYear()} GAYOUNGENE · SEOUL, SUYU</span><a href="https://gayoungene-prepay.vercel.app/" target="_blank" rel="noopener noreferrer">${esc(x.prepay)} · ${esc(x.newWindow)} ↗</a><a href="${homeUrl(lang)}#guide">${esc(x.guide)}</a></div></footer>`;
}
export function initSiteControls(){
 document.documentElement.classList.add('js');
 document.addEventListener('click',event=>{
  const toggle=event.target.closest('.site-nav-toggle');
  if(toggle){const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));document.querySelector('.site-links')?.classList.toggle('is-open',open);}
  if(event.target.closest('.site-links a')){document.querySelector('.site-links')?.classList.remove('is-open');document.querySelector('.site-nav-toggle')?.setAttribute('aria-expanded','false');}
  if(!event.target.closest('.language-picker'))document.querySelectorAll('.language-picker[open]').forEach(el=>el.open=false);
 });
 document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const picker=document.querySelector('.site-language[open]');if(picker){picker.open=false;picker.querySelector('summary').focus();}const nav=document.querySelector('.site-links.is-open');if(nav){nav.classList.remove('is-open');const button=document.querySelector('.site-nav-toggle');button.setAttribute('aria-expanded','false');button.focus();}});
}
