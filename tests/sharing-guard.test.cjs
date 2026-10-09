const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const source=fs.readFileSync('dist/kakao-browser-guide.js','utf8');
const iPhone='Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) KAKAOTALK 26';
function setup(ua,{lang='ko',clipboard,dialog=true,url='https://example.com/menu?lang=en#dish-M006'}={}){
 const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM('<html lang="'+lang+'"><head></head><body><main id="original"><input id="untouched" value="keep"></main></body></html>',{url,runScripts:'outside-only',virtualConsole:vc});
 const w=dom.window;Object.defineProperty(w.navigator,'userAgent',{value:ua});
 if(clipboard)Object.defineProperty(w.navigator,'clipboard',{value:clipboard});
 if(dialog){w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};}
 w.eval(source);w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
 return {w,d:w.document,errors,close:()=>w.close()};
}
for(const ua of ['Mozilla/5.0 Safari/605.1','Mozilla/5.0 Android Chrome/130','KAKAOTALK Scrap Bot'])test('normal browser/crawler unchanged: '+ua,()=>{
 const a=setup(ua);assert.equal(a.d.querySelector('#kakao-browser-guide'),null);assert.equal(a.d.documentElement.classList.contains('kakao-guide-active'),false);a.close();
});
for(const ua of [iPhone,'Mozilla/5.0 (Linux; Android 15) KAKAOTALK 26'])test('guide with no automatic app navigation: '+ua,()=>{
 const a=setup(ua);assert.ok(a.d.querySelector('#kakao-browser-guide'));assert.ok(a.d.querySelector('dialog').open);assert.equal(a.errors.length,0);
 assert.equal(a.d.querySelector('#kg-url').value,'https://example.com/menu?lang=en#dish-M006');assert.equal(a.d.querySelector('#untouched').value,'keep');
 a.d.querySelector('#kg-cancel').click();assert.equal(a.d.querySelector('dialog').open,false);assert.ok(a.d.documentElement.classList.contains('kakao-guide-active'));assert.equal(a.errors.length,0);
 a.d.querySelector('#kg-open').click();assert.match(a.d.querySelector('#kg-status').textContent,/이동하지/);assert.equal(a.errors.filter(x=>/navigation/i.test(x)).length,1);a.close();
});
test('iPhone names Safari and supports manual copy without clipboard API',()=>{
 const a=setup(iPhone);assert.match(a.d.querySelector('#kg-fallback').textContent,/Safari/);a.d.querySelector('#kg-copy').click();assert.match(a.d.querySelector('#kg-copy-status').textContent,/길게/);assert.equal(a.d.querySelector('#kg-url').selectionEnd,a.d.querySelector('#kg-url').value.length);a.close();
});
test('clipboard success copies original deep link',async()=>{
 let copied;const a=setup(iPhone,{clipboard:{writeText:async value=>{copied=value}}});a.d.querySelector('#kg-copy').click();await Promise.resolve();assert.equal(copied,a.w.location.href);assert.match(a.d.querySelector('#kg-copy-status').textContent,/복사했어요/);a.close();
});
test('clipboard rejection remains usable',async()=>{
 const a=setup(iPhone,{clipboard:{writeText:async()=>{throw Error('denied')}}});a.d.querySelector('#kg-copy').click();await Promise.resolve();assert.match(a.d.querySelector('#kg-copy-status').textContent,/길게/);a.close();
});
test('older browser without dialog still offers both actions',()=>{
 const a=setup(iPhone,{dialog:false});assert.equal(a.d.querySelector('dialog'),null);assert.ok(a.d.querySelector('#kg-open'));assert.ok(a.d.querySelector('#kg-copy'));a.close();
});
test('foreign-language menu has English guidance',()=>{
 const a=setup(iPhone,{lang:'ja'});assert.equal(a.d.querySelector('#kakao-browser-guide').lang,'en');assert.match(a.d.querySelector('#kg-title').textContent,/Continue/);a.close();
});
test('repeated script initialization does not duplicate modal or guide',()=>{
 const a=setup(iPhone);a.w.eval(source);assert.equal(a.d.querySelectorAll('#kakao-browser-guide').length,1);assert.equal(a.d.querySelectorAll('dialog').length,1);a.close();
});
