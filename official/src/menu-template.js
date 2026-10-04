import {content} from './content.js';
import {experience} from './experience-copy.js';
import {esc,siteHeader,siteFooter,homeUrl} from './site-ui.js';
export function menuMarkup(lang,categoryItems,body){
 const e=experience[lang]||experience.en;
 return siteHeader(lang,'menu')+'<main id="main"><section class="menu-intro"><div><p class="eyebrow">GAYOUNGENE · MENU</p><h1>'+esc(e.menuTitle)+'</h1><p>'+esc(e.menuIntro)+'</p></div><a class="text-link" href="'+homeUrl(lang)+'#guide">'+esc(e.guide)+' ↗</a></section><div class="site-layout"><aside class="category-nav"><details id="category-menu"><summary>'+esc(e.menu)+' <span aria-hidden="true">⌄</span></summary><div class="category-links">'+categoryItems.map((c,i)=>'<a href="#category-'+c.id+'" data-category="'+c.id+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(c.name)+'</a>').join('')+'</div></details></aside><div class="menu-content">'+body+'</div></div></main>'+siteFooter(lang);
}
