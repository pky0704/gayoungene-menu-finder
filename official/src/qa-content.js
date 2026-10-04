const rows = {
  "ko": [
    "메뉴",
    "문의",
    "가맹·사업 문의",
    "가영이네에 대해 더 궁금하신가요?",
    "가맹 모집 여부와 구체적인 비용·조건은 매장에 직접 확인해 주세요.",
    "매장에 문의하기",
    "영업시간 확인"
  ],
  "en": [
    "Menu",
    "Contact",
    "Franchise & business enquiries",
    "Want to know more about Gayoungene?",
    "Please contact the shop directly to check franchise availability, costs and terms.",
    "Contact the shop",
    "View opening hours"
  ],
  "zh-Hans": [
    "菜单",
    "联系",
    "加盟与商务咨询",
    "想进一步了解佳映家吗？",
    "加盟是否开放及具体费用、条件，请直接向门店确认。",
    "联系门店",
    "查看营业时间"
  ],
  "ja": [
    "メニュー",
    "お問い合わせ",
    "加盟・事業のお問い合わせ",
    "カヨンイネについて、もっと知りたいですか？",
    "加盟募集の有無や費用・条件は、店舗へ直接ご確認ください。",
    "店舗に問い合わせる",
    "営業時間を見る"
  ],
  "vi": [
    "Menu",
    "Liên hệ",
    "Hỏi về nhượng quyền và kinh doanh",
    "Bạn muốn biết thêm về Gayoungene?",
    "Vui lòng liên hệ trực tiếp với quán để xác nhận việc nhượng quyền, chi phí và điều kiện.",
    "Liên hệ với quán",
    "Xem giờ mở cửa"
  ],
  "mn": [
    "Цэс",
    "Холбоо",
    "Франчайз ба бизнесийн лавлагаа",
    "Гаёнгенэгийн талаар илүү ихийг мэдмээр байна уу?",
    "Франчайзын боломж, зардал, нөхцөлийг дэлгүүрээс шууд лавлана уу.",
    "Дэлгүүртэй холбогдох",
    "Ажиллах цаг харах"
  ],
  "th": [
    "เมนู",
    "ติดต่อ",
    "สอบถามแฟรนไชส์และธุรกิจ",
    "อยากรู้จักกายองเนมากขึ้นไหม?",
    "โปรดติดต่อร้านโดยตรงเพื่อสอบถามการเปิดรับแฟรนไชส์ ค่าใช้จ่าย และเงื่อนไข",
    "ติดต่อร้าน",
    "ดูเวลาเปิดร้าน"
  ],
  "ru": [
    "Меню",
    "Контакты",
    "Франшиза и деловые вопросы",
    "Хотите узнать больше о Gayoungene?",
    "Уточните возможность франшизы, стоимость и условия непосредственно в заведении.",
    "Связаться с заведением",
    "Часы работы"
  ],
  "id": [
    "Menu",
    "Kontak",
    "Pertanyaan waralaba & bisnis",
    "Ingin mengenal Gayoungene lebih jauh?",
    "Hubungi kedai langsung untuk memastikan ketersediaan waralaba, biaya, dan ketentuannya.",
    "Hubungi kedai",
    "Lihat jam buka"
  ]
};
const keys = ["navMenu","contactNav","contactTitle","contactIntro","contactText","contactCta","hoursCta"];
export const qaContent = Object.fromEntries(Object.entries(rows).map(([lang, row]) => [lang, Object.fromEntries(keys.map((key, index) => [key, row[index]]))]));
