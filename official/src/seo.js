import {content,languages} from './content.js';
import {experience} from './experience-copy.js';
import {socialLinks} from './social-links.js';
import {siteOrigin} from './site-config.js';
import {esc} from './site-ui.js';
export const pagePath=(lang,page)=>page==='menu'?(lang==='ko'?'/menu':'/menu/'+lang+'/'):(lang==='ko'?'/':'/'+lang+'/');
export function pageMeta(lang,page='home'){
 const t=content[lang]||content.en,e=experience[lang]||experience.en;
 return {title:lang==='ko'?(page==='menu'?'가영이네 메뉴·가격 | 수유 모녀의 수제 분식집':'가영이네 | 수유 모녀의 수제 분식집 · 엄마의 손맛, 딸의 손길'):'Gayoungene · '+(page==='menu'?e.menu:t.heroA+' '+t.heroB),description:page==='menu'?e.menuIntro+' '+t.metaDescription:t.metaDescription,url:siteOrigin+pagePath(lang,page)};
}
export function businessSchema(lang){
 const meta=pageMeta(lang),t=content[lang]||content.en;
 return {'@context':'https://schema.org','@type':'Restaurant','@id':siteOrigin+'/#restaurant',name:'가영이네',alternateName:'Gayoungene',url:siteOrigin+'/',description:meta.description,image:siteOrigin+'/assets/logo.png',telephone:'0507-1477-2825',address:{'@type':'PostalAddress',streetAddress:'오패산로 397 1층',addressLocality:'강북구',addressRegion:'서울',addressCountry:'KR'},servesCuisine:['분식','Korean'],foundingDate:'2022-02-12',hasMenu:siteOrigin+pagePath(lang,'menu'),sameAs:[...socialLinks.map(s=>s.href),'https://blog.naver.com/gayoungene'],openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Wednesday','Thursday','Friday'],opens:'11:00',closes:'14:00'},{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Wednesday','Thursday','Friday'],opens:'16:00',closes:'22:00'},{'@type':'OpeningHoursSpecification',dayOfWeek:['Saturday','Sunday'],opens:'16:00',closes:'22:00'}]};
}
export function menuSchema(lang,dishes,categories,messages){
 return {'@context':'https://schema.org','@type':'Menu','@id':siteOrigin+'/menu#menu',name:'가영이네 · '+(experience[lang]||experience.en).menu,inLanguage:lang,url:siteOrigin+pagePath(lang,'menu'),hasMenuSection:categories.map(category=>({'@type':'MenuSection',name:messages[category],hasMenuItem:dishes.filter(d=>d.categoryId===category).map(d=>({'@type':'MenuItem',name:d.names[lang],description:d.descriptions[lang],image:d.photo?siteOrigin+'/menu/'+d.photo:undefined,offers:{'@type':'Offer',price:d.priceKrw,priceCurrency:'KRW'},url:siteOrigin+pagePath(lang,'menu')+'#dish-'+d.id}))}))};
}
const json=value=>JSON.stringify(value).replaceAll('<','\\u003c');
export function metadataTags(lang,page='home',menuData){
 const meta=pageMeta(lang,page),locales=page==='menu'?[...Object.keys(languages),'fr']:Object.keys(languages);
 return '<title>'+esc(meta.title)+'</title><meta name="description" content="'+esc(meta.description)+'"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="'+meta.url+'"><meta property="og:title" content="'+esc(meta.title)+'"><meta property="og:description" content="'+esc(meta.description)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+meta.url+'"><meta property="og:image" content="'+siteOrigin+'/assets/logo.png"><meta name="twitter:card" content="summary_large_image">'+locales.map(l=>'<link rel="alternate" hreflang="'+l+'" href="'+siteOrigin+pagePath(l,page)+'">').join('')+'<link rel="alternate" hreflang="x-default" href="'+siteOrigin+pagePath('ko',page)+'"><script type="application/ld+json" id="business-schema">'+json(businessSchema(lang))+'</script>'+(menuData?'<script type="application/ld+json" id="menu-schema">'+json(menuSchema(lang,...menuData))+'</script>':'');
}
export function updateMetadata(lang,page='home'){
 const meta=pageMeta(lang,page);document.title=meta.title;
 for(const [selector,attribute,value] of [['meta[name="description"]','content',meta.description],['link[rel="canonical"]','href',meta.url],['meta[property="og:title"]','content',meta.title],['meta[property="og:description"]','content',meta.description],['meta[property="og:url"]','content',meta.url]])document.querySelector(selector)?.setAttribute(attribute,value);
 const schema=document.querySelector('#business-schema');if(schema)schema.textContent=json(businessSchema(lang));
}
