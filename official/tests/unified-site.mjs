import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import {languages} from '../src/content.js';
import {siteOrigin} from '../src/site-config.js';
import {pagePath} from '../src/seo.js';
import {socialLinks,storyLink} from '../src/social-links.js';
import {dishes} from '../../dist/data.js';

const locales=Object.keys(languages);
let pages=0;
for(const page of ['home','menu']) for(const lang of page==='menu'?[...locales,'fr']:locales){
 const route=pagePath(lang,page);
 const file='../build'+(route==='/menu'?'/menu/':route)+'index.html';
 const html=fs.readFileSync(new URL(file,import.meta.url),'utf8');
 const dom=new JSDOM(html,{url:siteOrigin+route}),doc=dom.window.document;
 assert.equal(doc.documentElement.lang,lang);
 assert.equal(doc.querySelectorAll('h1').length,1);
 assert.ok(doc.querySelector('main').textContent.length>500);
 assert.ok(!/undefined|\[object Object\]/.test(doc.body.textContent));
 assert.equal(doc.querySelectorAll('link[rel=canonical]').length,1);
 assert.equal(doc.querySelector('link[rel=canonical]').href,siteOrigin+route);
 assert.equal(doc.querySelectorAll('link[hreflang]').length,page==='menu'?11:10);
 assert.equal(doc.querySelectorAll('.site-links a').length,4);
 assert.ok(!/가맹|franchise|선결제/.test(doc.querySelector('.site-links').textContent));
 assert.equal(doc.querySelectorAll('.site-language-list button').length,page==='menu'?10:9);
 for(const flag of doc.querySelectorAll('.round-flag img'))assert.ok(fs.existsSync(new URL('../build'+flag.getAttribute('src'),import.meta.url)));
 for(const {href} of socialLinks){
  const links=[...doc.querySelectorAll('a')].filter(a=>a.href===href);
  assert.ok(links.length>0,href);
  for(const link of links){assert.equal(link.target,'_blank');assert.ok(link.rel.includes('noopener'));}
 }
 for(const link of doc.querySelectorAll('a[href*="gayoungene-prepay"]')){assert.equal(link.target,'_blank');assert.ok(!link.closest('.site-masthead'));}
 const business=JSON.parse(doc.querySelector('#business-schema').textContent);
 assert.equal(business['@type'],'Restaurant');
 assert.equal(business.telephone,'0507-1477-2825');
 assert.equal(business.address.streetAddress,'오패산로 397 1층');
 assert.equal(business.foundingDate,'2022-02-12');
 if(page==='menu'){
  assert.equal(doc.querySelectorAll('.dish').length,32);
  const menu=JSON.parse(doc.querySelector('#menu-schema').textContent);
  const items=menu.hasMenuSection.flatMap(s=>s.hasMenuItem);
  assert.equal(items.length,dishes.length);
  for(const dish of dishes){
   const item=items.find(i=>i.url.endsWith('#dish-'+dish.id));
   assert.equal(item.offers.price,dish.priceKrw);
   assert.equal(item.offers.priceCurrency,'KRW');
   assert.ok(doc.querySelector('#dish-'+dish.id));
  }
 }else{
  assert.equal(doc.querySelectorAll('#guide .guide-list details').length,5);
  assert.ok([...doc.querySelectorAll('a')].some(a=>a.href===storyLink));
  assert.ok(!doc.querySelector('#business'));
 }
 dom.window.close();pages++;
}
const sitemap=fs.readFileSync(new URL('../build/sitemap.xml',import.meta.url),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,19);
assert.ok(sitemap.includes('<loc>'+siteOrigin+'/</loc>'));
console.log('PASS unified site: '+pages+' readable static pages, shared navigation, exact prices, schema, flags, official social links and secondary external prepay.');
