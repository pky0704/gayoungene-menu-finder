import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {homeMarkup} from './src/home-template.js';
import {menuMarkup} from './src/menu-template.js';
import {metadataTags,pagePath} from './src/seo.js';
import {siteOrigin} from './src/site-config.js';
import {content,languages} from './src/content.js';
import {esc} from './src/site-ui.js';
export async function compose(out,root,base,assets){
 await fs.copyFile(path.join(base,'menu-locales.js'),path.join(out,'menu/official-locales.js'));
 await import(pathToFileURL(path.join(out,'menu/official-locales.js')));
 const {dishes,categories,storeInfo}=await import(pathToFileURL(path.join(out,'menu/data.js'))+'?v=20261004-country');
 const {messages}=await import(pathToFileURL(path.join(out,'menu/i18n.js'))+'?v=20261004-country');
 const storeGuide=Object.fromEntries(Object.keys(languages).map(lang=>[lang,['order','delivery','self','return','changes'].map(key=>({key,title:messages[lang][key],text:storeInfo.find(row=>row.key===key)[lang]}))]));
 const featured=['M006','M013','M018'].map(id=>dishes.find(d=>d.id===id));
 await fs.writeFile(path.join(out,'store-guide.js'),'export const storeGuide='+JSON.stringify(storeGuide)+';\nexport const featured='+JSON.stringify(featured)+';\n');
 const homeTemplate=await fs.readFile(path.join(base,'src/index.html'),'utf8');
 for(const lang of Object.keys(languages)){
  const html=homeTemplate.replace('<html lang="ko">','<html lang="'+lang+'">').replace('<!--PAGE_METADATA-->',metadataTags(lang)).replace('<!--PAGE_CONTENT-->',homeMarkup(lang,assets,storeGuide,featured)).replace('>본문으로 바로가기<','>'+esc(content[lang].skip)+'<');
  const dir=lang==='ko'?out:path.join(out,lang);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'index.html'),html);
 }
 let app=await fs.readFile(path.join(root,'dist/app.js'),'utf8');
 const replace=(old,next)=>{if(!app.includes(old))throw Error('Legacy adapter anchor missing: '+old.slice(0,80));app=app.replace(old,next);};
 replace("lang:'en'","lang:(languages[new URLSearchParams(location.search).get('lang')]?new URLSearchParams(location.search).get('lang'):(languages[document.documentElement.lang]?document.documentElement.lang:'ko'))");
 replace("filtersOpen:false","filtersOpen:false,discoveryOpen:false");
 // Keep the card concise; the existing detail dialog contains all ingredient facts.
 replace('${ingredients(d,true)}</div></div></article>', '</div></div></article>');
 replace("document.querySelector('#country-recommendations').open=true;", "state.discoveryOpen=true;document.querySelector('.menu-discovery').open=true;document.querySelector('#country-recommendations').open=true;");
 replace('<div class="menu-tools">${quickStart()}<div class="discovery-tools">${countryRecommendations()}${filters()}</div><div id="menu-results"', '<details class="menu-tools menu-discovery" ${state.discoveryOpen?\'open\':\'\'}><summary>${esc(officialExperience[state.lang].recommend)} <span aria-hidden="true">＋</span></summary><div class="discovery-content">${quickStart()}<div class="discovery-tools">${countryRecommendations()}${filters()}</div></div></details><div id="menu-results"');
 replace('</div></div><div class="menu-sections">','</div><div class="menu-sections">');
 const start=app.indexOf('function render(){'),end=app.indexOf('function renderDialog()',start);
 if(start<0||end<0)throw Error('Missing legacy render boundary');
 app=app.slice(0,start)+"function render(){document.documentElement.lang=state.lang;document.querySelector('.skip').textContent=t('skip');app.innerHTML=menuMarkup(state.lang,categories.filter(c=>visibleDishes().some(d=>d.categoryId===c)).map(id=>({id,name:t(id)})),menu());document.querySelector('#category-menu').open=matchMedia('(min-width:901px)').matches;updateMetadata(state.lang,'menu');document.querySelector('#menu-schema').textContent=JSON.stringify(menuSchema(state.lang,dishes,categories,messages[state.lang]));document.querySelector('.menu-discovery')?.addEventListener('toggle',e=>{if(e.target.isConnected)state.discoveryOpen=e.target.open;});document.querySelector('.filter-panel')?.addEventListener('toggle',e=>{if(e.target.isConnected)state.filtersOpen=e.target.open;});}\n"+app.slice(end);
 replace("state.lang=lang;render();","state.lang=lang;const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);try{localStorage.setItem('gayoungene.language',lang);}catch{}render();");
 app=app.replaceAll('${languageFlags[k]}','${flag(k)}').replace("${icon('language')}<span lang=","${flag(state.lang)}<span lang=");
 app=app.replace('<h1 class="sr-only">${esc(t(\'menu\'))}</h1>','');
 app="import './official-locales.js';\nimport {experience as officialExperience} from '/experience-copy.js';\nimport {menuMarkup} from '/menu-template.js';\nimport {flag} from '/site-ui.js';\nimport {updateMetadata,menuSchema} from '/seo.js';\n"+app;
 await fs.writeFile(path.join(out,'menu/app.js'),app);
 const legacy=await fs.readFile(path.join(root,'dist/index.html'),'utf8');
 const originalHead=legacy.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'').replace(/<link\s+rel="(?:canonical|alternate)"[^>]*>/g,'');
 for(const lang of [...Object.keys(languages),'fr']){
  const categoryItems=categories.map(id=>({id,name:messages[lang][id]}));
  const body='<div class="menu-sections">'+categories.map(cat=>'<section class="menu-section" id="category-'+cat+'"><div class="section-heading"><h2>'+esc(messages[lang][cat])+'</h2></div>'+dishes.filter(d=>d.categoryId===cat).map(d=>'<article class="dish" id="dish-'+d.id+'"><h3>'+esc(d.names[lang])+'</h3><p class="price-row"><strong class="price">₩'+d.priceKrw.toLocaleString('en-US')+'</strong></p>'+(d.photo?'<img src="/menu/'+d.photo+'" alt="'+esc(d.names[lang])+'" width="1280" height="960" loading="lazy">':'')+'<p>'+esc(d.descriptions[lang])+'</p></article>').join('')+'</section>').join('')+'</div>';
  const html='<!doctype html><html lang="'+lang+'"><head><base href="/menu/">'+originalHead+metadataTags(lang,'menu',[dishes,categories,messages[lang]])+'<link rel="stylesheet" href="/fonts.css"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/menu-shell.css"><link rel="stylesheet" href="/cursor.css"><link rel="stylesheet" href="/back-to-top.css"><script type="module" src="/menu-shell.js"></script><script type="module" src="/back-to-top.js"></script></head><body class="official-menu"><a class="skip" href="#main">'+esc(messages[lang].skip)+'</a><div id="app">'+menuMarkup(lang,categoryItems,body)+'</div><dialog id="detail" aria-labelledby="detail-title"></dialog></body></html>';
  const dir=lang==='ko'?path.join(out,'menu'):path.join(out,'menu',lang);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'index.html'),html);
 }
 await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: '+siteOrigin+'/sitemap.xml\n');
 const paths=[...Object.keys(languages).map(l=>pagePath(l,'home')),...[...Object.keys(languages),'fr'].map(l=>pagePath(l,'menu'))];
 await fs.writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+siteOrigin+p+'</loc></url>').join('')+'</urlset>');
 console.log('Prerendered 9 homepages, 10 menus, shared navigation and search metadata.');
}
