const names={ko:'가영이네 공식 홈페이지',en:'Gayoungene · Official home','zh-Hans':'佳映家 · 官方首页',ja:'カヨンイネ · 公式ホーム',vi:'Gayoungene · Trang chính thức',mn:'Гаёнгенэ · Албан ёсны нүүр',th:'กายองเน · หน้าหลัก',ru:'Gayoungene · Главная',id:'Gayoungene · Beranda',fr:'Gayoungene · Accueil'};
const bar=document.createElement('div');bar.className='official-return';document.body.prepend(bar);
function update(){const l=document.documentElement.lang;bar.innerHTML=`<a href="/?lang=${l==='fr'?'en':l}">← ${names[l]||names.en}</a>`;}
new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});update();
