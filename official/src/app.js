import {content,languages} from './content.js';
import {assets} from './asset-state.js';
import {storeGuide,featured} from './store-guide.js';
import {homeMarkup} from './home-template.js';
import {initSiteControls,homeUrl} from './site-ui.js';
import {updateMetadata} from './seo.js';
let saved;try{saved=localStorage.getItem('gayoungene.language')}catch{}
const query=new URLSearchParams(location.search),pathLang=location.pathname.split('/')[1];
let lang=languages[query.get('lang')]?query.get('lang'):languages[pathLang]?pathLang:languages[saved]?saved:'ko';
let paused=false;
const site=document.querySelector('#site');
function render(){
 document.documentElement.lang=lang;document.querySelector('.skip').textContent=content[lang].skip;
 site.innerHTML=homeMarkup(lang,assets,storeGuide,featured);
 updateMetadata(lang,'home');applyMotion();
}
function applyMotion(){const t=content[lang],button=site.querySelector('[data-ribbon-toggle]');site.querySelector('.ribbon').classList.toggle('is-paused',paused);button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?t.playMotion:t.pauseMotion);button.title=paused?t.playMotion:t.pauseMotion;button.querySelector('svg').innerHTML=paused?'<path d="m7 4 12 8-12 8Z"/>':'<path d="M6 4h4v16H6zm8 0h4v16h-4z"/>';}
site.addEventListener('click',event=>{
 const choice=event.target.closest('[data-lang]');if(choice){const y=scrollY;lang=choice.dataset.lang;try{localStorage.setItem('gayoungene.language',lang)}catch{}history.replaceState(null,'',homeUrl(lang)+location.hash);render();document.querySelector('.site-language summary').focus({preventScroll:true});scrollTo(0,y);return;}
 if(event.target.closest('[data-ribbon-toggle]')){paused=!paused;applyMotion();}
});
initSiteControls();render();
