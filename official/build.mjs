import {compose} from './compose.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url)), root=path.dirname(base), out=path.join(base,'build');
if(path.dirname(path.resolve(out))!==path.resolve(base)||path.basename(out)!=='build')throw new Error('Build output must stay inside official/build');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
await fs.cp(path.join(base,'src'),out,{recursive:true,filter:file=>!['qa-content.js','game-preview-link.js'].includes(path.basename(file))});
await fs.cp(path.join(base,'assets'),path.join(out,'assets'),{recursive:true});
await fs.cp(path.join(root,'dist'),path.join(out,'menu'),{recursive:true});
await fs.copyFile(path.join(root,'dist/assets/brand-icon/gayoungene-32.png'),path.join(out,'assets/favicon.png'));
const assets={};
for(const name of ['mallang-poster.jpg','mother-daughter.jpg','learning-wall.jpg','mallang-gayoung.png','rabbit-companion.png','cursor-image.png']){
 try{await fs.copyFile(path.join(base,'private-assets',name),path.join(out,'assets',name));assets[name]=true;}catch(e){if(e.code!=='ENOENT')throw e;assets[name]=false;}
}
await fs.writeFile(path.join(out,'asset-state.js'),`export const assets=${JSON.stringify(assets)};\n`);
if(assets['cursor-image.png']){
 const cursor=(await fs.readFile(path.join(base,'private-assets/cursor-image.png'))).toString('base64');
 // Keep the owner's 46px size reference and preserve the supplied transparent artwork.
 await fs.writeFile(path.join(out,'cursor.svg'),`<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><image x="2" y="2" width="46" height="46" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${cursor}"/></svg>`);
}else{
 // Public checkouts without the private artwork use the browser's native cursor.
 await fs.writeFile(path.join(out,'cursor.css'),'');
}
await compose(out,root,base,assets);
console.log('Built official site; approved private assets:',assets);
