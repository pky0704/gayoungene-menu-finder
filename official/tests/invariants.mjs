import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {content,languages} from '../src/content.js';import {extras} from '../src/extras.js';
import {characters} from '../src/characters.js';
import {qaContent} from '../src/qa-content.js';
import {qaCopy} from '../../dist/qa-copy.js';
import {assets as assetState} from '../build/asset-state.js';
import {dishes as before} from '../../dist/data.js';
import {dishes as after,ingredientStatus} from '../build/menu/data.js?v=20261004-country';
import {messages} from '../build/menu/i18n.js?v=20261004-country';import '../build/menu/official-locales.js';
assert.deepEqual(Object.keys(languages),['ko','en','zh-Hans','ja','vi','mn','th','ru','id']);
for(const lang of Object.keys(languages)){assert.ok(content[lang]&&extras[lang]);for(const dish of after){assert.ok(dish.names[lang]);assert.ok(dish.descriptions[lang]);assert.equal(typeof dish.units[lang],'string');}}
assert.deepEqual(Object.keys(characters),Object.keys(languages));
for(const lang of Object.keys(languages)){assert.deepEqual(Object.keys(content[lang]),Object.keys(content.ko));for(const text of Object.values(content[lang]))assert.ok(typeof text==='string'&&text.trim(),lang+': empty brand copy');assert.ok(content[lang].pauseMotion&&content[lang].playMotion);}

assert.deepEqual(Object.keys(qaContent),Object.keys(languages));
for(const lang of [...Object.keys(languages),'fr'])for(const value of Object.values(qaCopy[lang]))assert.ok(typeof value==='string'&&value.trim());
for(const lang of Object.keys(languages))for(const key of Object.keys(qaContent.ko))assert.ok(qaContent[lang][key]?.trim(),lang+': '+key);
for(const lang of Object.keys(languages))for(const key of Object.keys(characters.ko))assert.ok(typeof characters[lang][key]==='string'&&characters[lang][key].trim(),lang+': '+key);
for(const l of ['ko','th','ru'])for(const k of Object.keys(messages.en))assert.equal(typeof messages[l][k],'string',l+': '+k);
assert.equal(before.length,after.length);
for(let i=0;i<before.length;i++)for(const k of ['id','menuNumber','priceKrw','ingredients','contains','spiceLevel','photo'])assert.deepEqual(after[i][k],before[i][k]);
const hash=p=>createHash('sha256').update(fs.readFileSync(new URL(p,import.meta.url))).digest('hex');
assert.equal(hash('../build/assets/logo.png'),hash('../../dist/assets/gayoungene-logo.png'));
assert.equal(hash('../build/assets/favicon.png'),hash('../../dist/assets/brand-icon/gayoungene-32.png'));
for(const [name,exists] of Object.entries(assetState))if(exists)assert.equal(hash('../build/assets/'+name),hash('../private-assets/'+name));
if(process.env.REQUIRE_PRIVATE_ASSETS==='1')assert.ok(Object.values(assetState).every(Boolean),'All approved assets required for deployment');
assert.ok(messages.fr&&after.every(dish=>dish.names.fr),'Preserve French menu');
const config=JSON.parse(fs.readFileSync(new URL('../vercel.json',import.meta.url)));
assert.equal(config.redirects[0].destination,'https://gayoungene-prepay.vercel.app/:path*');
assert.equal(config.redirects[0].permanent,false);
assert.equal(config.outputDirectory,'official/build');
const assets=fs.readdirSync(new URL('../build/assets/',import.meta.url));
assert.ok(!assets.includes('guests-privacy-edited.png'));
assert.ok(!assets.some(x=>/welcome-illustration|shared-table|image\(2\)/.test(x)));
console.log('PASS official invariants: locale order/completeness, unchanged menu facts, exact original logo, safe prepay route and asset exclusions.');
