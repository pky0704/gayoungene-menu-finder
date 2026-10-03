import {preferenceMessages} from './preference-messages.js?v=20261004-preferences';
import {extraMessages} from './i18n-extra.js?v=20261004-preferences';
export const languages={en:'English',ja:'日本語','zh-Hans':'中文',vi:'Tiếng Việt',mn:'Монгол',id:'Indonesia',fr:'Français'};
const keys=['menu','how','visit','categories','chooseLanguage','tteok','fried','meals','sundae','sides','dessert','drinks','ingredients','ingredientNote','details','close','zoom','photoPending','spice','notSpicy','mild','spicy','unknownSpice','seasonal','seasonNote','options','wheatOption','moreIngredients','pending','otherMeat','showStaff','staffNote','filters','avoid','filterHelp','all','reset','noResults','noResultsHelp','anySpice','upMild','recommendations','JP','VN','MN','order','delivery','self','return','hours','changes','intro','skip','translationNote','pork','beef','chicken','fish','squid','shrimp','egg','dairy','wheat','soy','sesame','contains','unknown','absent_verified'];
const values={
en:['Menu','How to order','Visit us','Menu categories','Choose your language','Tteokbokki & Rabokki','Fried favorites','Gimbap & Meals','Sundae','Fish cakes, Dumplings & Sides','Desserts · Bingsu','Drinks','Known ingredients','Icons show confirmed ingredients, not a complete ingredient list.','Ingredient details','Close','Enlarge photo','Photo coming soon','Spice level','Not spicy','Mildly spicy','Spicy','Spice level unconfirmed','Seasonal','Please check seasonal availability with staff.','Options','Rice or wheat-flour tteok available. Wheat is included when choosing wheat-flour tteok.','Ingredient information','Full ingredients in sauces, broth and processed foods are still being checked. If you have an allergy, please ask staff before ordering.','Chicken or other meat is reported in this item; the exact type has not yet been confirmed.','Show to staff','Show this name to staff. Menu numbers are for this guide and may differ from the ordering device.','Find a menu','Ingredients to avoid','Only items verified without every selected ingredient are shown. Items with unconfirmed information are excluded.','All menus','Reset','No verified matches','We cannot yet verify a menu for these conditions. Ask staff or reset the filters to browse.','Any spice level','Up to mildly spicy','Guest favorites','Japan','Vietnam','Mongolia','Order & payment','Your food','Self-service station','Returning dishes','Hours & address','Ingredient changes','About Gayoungene','Skip to menu','Translations are provided as a guide. Please ask staff if anything is unclear.','Pork','Beef','Chicken','Fish','Squid','Shrimp','Egg','Milk','Wheat','Soy','Sesame','Contains','Unconfirmed','Verified absent'],
ja:['メニュー','ご注文方法','店舗案内','メニュー分類','言語を選んでください','トッポッキ・ラッポッキ','揚げ物','キンパ・お食事','スンデ','おでん・餃子・サイド','デザート・かき氷','ドリンク','確認済みの食材','アイコンは確認済みの食材を示しています。全原材料の一覧ではありません。','食材の詳細','閉じる','写真を拡大','写真準備中','辛さ','辛くありません','やや辛い','辛口','辛さ未確認','季節限定','販売状況はスタッフにご確認ください。','選べる内容','米のトックと小麦のトックから選べます。小麦のトックを選ぶ場合は小麦を含みます。','食材について','ソース・だし・加工食品の全原材料は確認中です。アレルギーがある場合は、ご注文前にスタッフにお尋ねください。','鶏肉またはその他の肉類を含むとの情報がありますが、具体的な種類は未確認です。','スタッフに見せる','この名前をスタッフにお見せください。番号はこの案内用で、注文端末とは異なる場合があります。','条件で探す','避けたい食材','選んだ食材をすべて含まないことが確認できたメニューのみ表示します。未確認のメニューは除きます。','すべて','リセット','確認済みの該当メニューがありません','この条件でご案内できるメニューはまだ確認できていません。スタッフにご相談いただくか、条件をリセットしてください。','辛さ指定なし','やや辛いまで','海外のお客様に人気','日本','ベトナム','モンゴル','ご注文・お支払い','料理のご提供','セルフコーナー','食器の返却','営業時間・住所','食材の変更','Gayoungeneについて','メニューへ移動','翻訳はご案内のためのものです。ご不明な点はスタッフにお尋ねください。','豚肉','牛肉','鶏肉','魚','イカ','エビ','卵','乳','小麦','大豆','ごま','含む','未確認','不使用確認済み'],
'zh-Hans':['菜单','点餐方式','门店信息','菜单分类','请选择语言','辣炒年糕・拉面年糕','韩式炸物','紫菜包饭・主食','韩式米肠','鱼饼・饺子・小吃','甜品・刨冰','饮品','已确认的食材','图标仅表示已确认的食材，并非完整配料表。','食材详情','关闭','放大照片','照片待补充','辣度','不辣','微辣','辣','辣度尚未确认','季节限定','请向店员确认当季供应情况。','可选项','可选择米制或小麦制年糕。选择小麦制年糕时含有小麦。','食材信息','酱汁、高汤及加工食品的完整配料仍在确认中。如有食物过敏，请在点餐前咨询店员。','已知含有鸡肉或其他肉类，但具体种类尚未确认。','出示给店员','请将此菜名出示给店员。编号仅用于本指南，可能与点餐设备不同。','按条件查找','需要避开的食材','仅显示已确认不含所有所选食材的菜品。信息未确认的菜品将被排除。','全部菜单','重置','暂无已确认符合条件的菜品','目前还无法确认符合这些条件的菜品。请咨询店员，或重置条件浏览菜单。','不限辣度','最多微辣','海外顾客喜爱','日本','越南','蒙古','点餐与付款','餐品送达','自助区','餐具回收','营业时间与地址','食材更换','关于Gayoungene','跳至菜单','翻译仅供参考。如有疑问，请咨询店员。','猪肉','牛肉','鸡肉','鱼','鱿鱼','虾','鸡蛋','牛奶','小麦','大豆','芝麻','含有','尚未确认','已确认不含']
};
export const messages=Object.fromEntries(Object.entries(values).map(([lang,v])=>{if(v.length!==keys.length)throw Error('Translation mismatch '+lang);return [lang,Object.fromEntries(keys.map((k,i)=>[k,v[i]]))];}));

const filterUpdates={
en:{ingredientUnavailable:'Ingredient exclusion is unavailable while full recipes are being verified. Please ask staff about ingredients.',results:'{count} menus found',noResults:'No matching menus',noResultsHelp:'Try a different spice level or guest-favorite selection, or reset the filters.',spicyMax:'Spicy or less'},
ja:{ingredientUnavailable:'全原材料を確認中のため、食材の除外検索は現在ご利用いただけません。食材についてはスタッフにお尋ねください。',results:'{count}件のメニュー',noResults:'条件に合うメニューがありません',noResultsHelp:'辛さや人気メニューの条件を変更するか、リセットしてください。',spicyMax:'辛口まで'},
'zh-Hans':{ingredientUnavailable:'完整配料尚在确认中，暂不提供排除食材筛选。有关食材，请咨询店员。',results:'找到 {count} 道菜品',noResults:'暂无符合条件的菜品',noResultsHelp:'请更改辣度或顾客喜爱选项，或重置筛选条件。',spicyMax:'最多辣味'}};
for(const [lang,updates] of Object.entries(filterUpdates))Object.assign(messages[lang],updates);

const launchMessages={
 en:{quickStart:'Choose a menu',guideIntro:'Choose here, then order on the in-store device.'},
 ja:{quickStart:'メニューを選ぶ',guideIntro:'料理を選び、店内の注文端末でご注文ください。'},
 'zh-Hans':{quickStart:'选择菜品',guideIntro:'在这里选菜，再到店内点餐设备下单。'}
};
for(const [lang,updates] of Object.entries(launchMessages))Object.assign(messages[lang],updates);

const guidedMessages={
 en:{guideStart:'Help me choose',guideTeaser:'Up to 3 menu ideas',guideSpice:'How spicy?',guideResults:'Ideas for you',guideReason:'Owner recommendations appear first. These choices use only your answers here.',guideNone:'No confirmed match for these answers. Try another spice level or browse all menus.',guideBack:'Back',guideBrowse:'Browse the menu',guideNumber:'Guide no. {number}',guideNumberNote:'These numbers belong to this guide. Use the Korean name on the ordering device.',helpStart:'Ask staff about ingredients',helpTitle:'Check ingredients before choosing',helpIntro:'We cannot confirm a meat-free, fish-free or allergy-safe dish yet. Choose a question to show staff in Korean.',helpMeat:'Does anything have no meat or fish?',helpAllergy:'I need to discuss a food allergy',helpMeatText:'Is there a dish without meat or fish? Please also check the broth, sauces and processed ingredients.',helpAllergyText:'I have a food allergy. Please check all ingredients and possible cross-contact. I will tell you which food I am allergic to.',helpNote:'This is a question for staff, not confirmation that a dish is safe.'},
 ja:{guideStart:'メニュー選びをお手伝い',guideTeaser:'候補を最大3品ご案内',guideSpice:'辛さを選んでください',guideResults:'料理の候補',guideReason:'店主のおすすめを優先しています。この画面で選んだ条件だけを使います。',guideNone:'この条件に合う確認済みの候補がありません。辛さを変えるか、全メニューをご覧ください。',guideBack:'戻る',guideBrowse:'メニューを見る',guideNumber:'案内番号 {number}',guideNumberNote:'番号はこの案内用です。注文端末では韓国語の料理名をご確認ください。',helpStart:'食材をスタッフに確認',helpTitle:'料理を選ぶ前に食材を確認',helpIntro:'肉・魚の不使用やアレルギー対応をまだ確認できていません。スタッフに韓国語で見せる質問を選んでください。',helpMeat:'肉や魚を使わない料理はありますか？',helpAllergy:'食物アレルギーを相談したい',helpMeatText:'肉や魚を使わない料理はありますか？だし・ソース・加工食品の原材料も確認してください。',helpAllergyText:'食物アレルギーがあります。全原材料と調理中の交差接触について確認したいです。原因となる食品は直接お伝えします。',helpNote:'これはスタッフへの質問です。料理の安全性を確認したものではありません。'},
 'zh-Hans':{guideStart:'帮我选菜',guideTeaser:'最多推荐三道菜',guideSpice:'想要什么辣度？',guideResults:'为您提供的选项',guideReason:'优先显示店主推荐。本页面只使用您在这里选择的条件。',guideNone:'暂无已确认符合这些条件的选项。请更改辣度或浏览全部菜单。',guideBack:'返回',guideBrowse:'浏览菜单',guideNumber:'指南编号 {number}',guideNumberNote:'编号仅用于本指南。请在点餐设备上核对韩文菜名。',helpStart:'向店员确认食材',helpTitle:'选菜前请确认食材',helpIntro:'目前还无法确认哪些菜品不含肉或鱼，或适合食物过敏者。请选择要出示给店员的韩文问题。',helpMeat:'有不含肉和鱼的菜品吗？',helpAllergy:'我需要咨询食物过敏问题',helpMeatText:'有不含肉和鱼的菜品吗？请同时确认高汤、酱汁及加工食品的配料。',helpAllergyText:'我有食物过敏，需要确认完整配料及烹饪中可能的交叉接触。我会直接告知具体过敏食物。',helpNote:'这只是向店员提出的问题，不代表已确认菜品安全。'}
};
for(const [lang,updates] of Object.entries(guidedMessages))Object.assign(messages[lang],updates);

const qaUpdates={
 en:{resultsOne:'1 menu found',activeFilters:'Showing with these filters',removeFilter:'Remove filter: {filter}',activeFilterHelp:'Remove a filter to see more dishes, including sides.'},
 ja:{resultsOne:'1件のメニュー',activeFilters:'選択中の条件',removeFilter:'条件を解除：{filter}',activeFilterHelp:'条件を解除すると、サイドメニューなども探せます。'},
 'zh-Hans':{resultsOne:'找到 1 道菜品',activeFilters:'当前筛选条件',removeFilter:'取消筛选：{filter}',activeFilterHelp:'取消筛选条件，可查看更多菜品，包括小吃。'}
};
for(const [lang,updates] of Object.entries(qaUpdates))Object.assign(messages[lang],updates);

const visualUpdates={
 en:{spiceReference:'Our “Spicy” level is about as hot as Shin Ramyun, according to the owner. Your experience may vary.',countryHelp:'Menu picks for guests from each country. Choose a flag to see the recommendations.',ingredientsChecking:'Ingredient exclusion is not available yet',ingredientsCheckingShort:'Checking recipes'},
 ja:{spiceReference:'店主の目安では「辛口」は辛ラーメン程度です。辛さの感じ方には個人差があります。',countryHelp:'各国のお客様向けのおすすめです。国旗を選ぶと候補を表示します。',ingredientsChecking:'食材の除外検索は準備中です',ingredientsCheckingShort:'原材料確認中'},
 'zh-Hans':{spiceReference:'按店主的标准，“辣”约等于辛拉面的辣度。每个人对辣度的感受可能不同。',countryHelp:'为各国顾客推荐的菜品。点击国旗查看推荐。',ingredientsChecking:'暂不提供排除食材筛选',ingredientsCheckingShort:'配料确认中'}
};
for(const [lang,updates] of Object.entries(visualUpdates))Object.assign(messages[lang],updates);

const locationUpdates={
 en:{findUs:'Find Gayoungene',mapsHelp:'Find our location, photos and customer reviews on Google Maps. Opens in a new tab or the Maps app.',openGoogleMaps:'Google Maps & reviews',directions:'Get directions'},
 ja:{findUs:'ガヨンイネへのアクセス',mapsHelp:'Google マップで場所・写真・口コミをご覧いただけます。別のタブまたはマップアプリが開きます。',openGoogleMaps:'Google マップ・口コミ',directions:'ルートを検索'},
 'zh-Hans':{findUs:'找到 Gayoungene',mapsHelp:'在 Google 地图查看位置、照片和顾客评价。将在新标签页或地图应用中打开。',openGoogleMaps:'Google 地图与评价',directions:'获取路线'}
};
for(const [lang,updates] of Object.entries(locationUpdates))Object.assign(messages[lang],updates);

const giftEventMessages={
 en:{giftEventLabel:'Special event · Now on',giftEventTitle:'A special gift, exclusively for international guests',giftEventNote:'Please ask our staff in store for details.'},
 ja:{giftEventLabel:'特別イベント開催中',giftEventTitle:'外国からのお客様限定の特別なプレゼント',giftEventNote:'詳しくは店内のスタッフにお尋ねください。'},
 'zh-Hans':{giftEventLabel:'特别活动进行中',giftEventTitle:'外国顾客专属特别礼物',giftEventNote:'详情请到店咨询工作人员。'}
};
for(const [lang,updates] of Object.entries(giftEventMessages))Object.assign(messages[lang],updates);

Object.assign(messages.en,{recommended:'Recommended',tteok:'Tteokbokki & Rabokki',meals:'Gimbap & Meals',sundae:'Sundae (Korean Sausage)',dessert:'Bingsu & Desserts'});
Object.assign(messages.ja,{recommended:'おすすめ',tteok:'トッポッキ・ラッポッキ',meals:'キンパ・ご飯もの',sundae:'スンデ',dessert:'ピンス・デザート'});
Object.assign(messages['zh-Hans'],{recommended:'推荐'});
Object.assign(messages,extraMessages);

const avoidanceMessages={
 en:['No verified matches yet','We have not yet confirmed dishes without your selected ingredients. This does not mean every dish contains them. Ask staff about ingredients or clear your filters.'],
 ja:['不使用を確認できたメニューはありません','選んだ食材を含まないメニューは、まだ確認できていません。すべての料理に含まれるという意味ではありません。スタッフに確認するか、条件を解除してください。'],
 'zh-Hans':['暂无已确认不含所选食材的菜品','我们尚未确认哪些菜品不含您选择的食材。这不代表所有菜品都含有这些食材。请咨询店员或清除筛选条件。'],
 vi:['Chưa có món được xác nhận phù hợp','Chưa xác nhận được món không chứa các nguyên liệu bạn chọn. Điều này không có nghĩa là mọi món đều chứa chúng. Hãy hỏi nhân viên hoặc bỏ bộ lọc.'],
 mn:['Тохирох нь баталгаажсан хоол одоогоор алга','Сонгосон орцыг агуулаагүй хоолыг хараахан баталгаажуулаагүй. Энэ нь бүх хоолонд тухайн орц байдаг гэсэн үг биш. Ажилтнаас асуух эсвэл шүүлтүүрээ арилгана уу.'],
 id:['Belum ada kecocokan terverifikasi','Kami belum memastikan hidangan yang tidak mengandung bahan pilihan Anda. Ini bukan berarti semua hidangan mengandungnya. Tanyakan kepada staf atau hapus filter.'],
 fr:['Aucun résultat vérifié pour le moment','Nous n’avons pas encore confirmé de plats sans les ingrédients sélectionnés. Cela ne signifie pas que tous les plats en contiennent. Demandez au personnel ou effacez les filtres.']
};
for(const [lang,[title,help]] of Object.entries(avoidanceMessages))Object.assign(messages[lang],{noVerifiedResults:title,noVerifiedResultsHelp:help});

for(const [lang,copy] of Object.entries(preferenceMessages))Object.assign(messages[lang],copy);
