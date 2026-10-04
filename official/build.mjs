import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url)), root=path.dirname(base), out=path.join(base,'build');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
await fs.cp(path.join(base,'src'),out,{recursive:true});
await fs.cp(path.join(base,'assets'),path.join(out,'assets'),{recursive:true});
await fs.cp(path.join(root,'dist'),path.join(out,'menu'),{recursive:true});
await fs.copyFile(path.join(root,'dist/assets/brand-icon/gayoungene-32.png'),path.join(out,'assets/favicon.png'));
const assets={};
for(const name of ['mallang-poster.jpg','guests-privacy-edited.png','mother-daughter.jpg','learning-wall.jpg']){
 try{await fs.copyFile(path.join(base,'private-assets',name),path.join(out,'assets',name));assets[name]=true;}catch(e){if(e.code!=='ENOENT')throw e;assets[name]=false;}
}
await fs.writeFile(path.join(out,'asset-state.js'),`export const assets=${JSON.stringify(assets)};\n`);
let menu=await fs.readFile(path.join(out,'menu/index.html'),'utf8');
menu=menu.replace('<head>','<head>\n  <base href="/menu/">').replaceAll('https://gayoungene-menu-finder.vercel.app/','https://gayoungene.com/menu/');
menu=menu.replace('</head>','<link rel="stylesheet" href="/menu-shell.css"><script type="module" src="/menu-shell.js"></script></head>');
await fs.writeFile(path.join(out,'menu/index.html'),menu);
await fs.copyFile(path.join(base,'menu-locales.js'),path.join(out,'menu/official-locales.js'));
let app=await fs.readFile(path.join(out,'menu/app.js'),'utf8');
app="import './official-locales.js';\n"+app;
app=app.replace("lang:'en'","lang:(new URLSearchParams(location.search).get('lang')||'en')");
app=app.replace("${languageFlags[k]}","${languageFlags[k]||''}");
app=app.replace('state.lang=lang;render();','state.lang=lang;const url=new URL(location.href);url.searchParams.set(\'lang\',lang);history.replaceState(null,\'\',url);try{localStorage.setItem(\'gayoungene.language\',lang);}catch{}render();');
// Never modify the legacy dist app. This deployment alone includes locale extensions.
app=app.replace("const state={lang:(new URLSearchParams(location.search).get('lang')||'en')","const state={lang:(languages[new URLSearchParams(location.search).get('lang')]?new URLSearchParams(location.search).get('lang'):'en')");
await fs.writeFile(path.join(out,'menu/app.js'),app);
await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://gayoungene.com/sitemap.xml\n');
await fs.writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://gayoungene.com/</loc></url><url><loc>https://gayoungene.com/menu</loc></url></urlset>');
console.log('Built official homepage and reused menu; private website assets:',assets);
