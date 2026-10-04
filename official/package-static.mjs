// Prepare the verified static output for the existing official Vercel project.
// This directory includes website-approved private assets and must stay out of Git.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.dirname(fileURLToPath(import.meta.url));
const {assets}=await import('./build/asset-state.js');
if(Object.values(assets).length!==5||!Object.values(assets).every(Boolean))throw new Error('Restore all five approved private assets and rebuild before packaging');
const tmp=path.join(path.dirname(base),'tmp');
await fs.mkdir(tmp,{recursive:true});
const target=await fs.mkdtemp(path.join(tmp,'official-deploy-'));
await fs.cp(path.join(base,'build'),target,{recursive:true});
const config=JSON.parse(await fs.readFile(path.join(base,'vercel.json'),'utf8'));
Object.assign(config,{buildCommand:null,installCommand:null,outputDirectory:'.'});
await fs.writeFile(path.join(target,'vercel.json'),JSON.stringify(config,null,2)+'\n');
console.log(target);
