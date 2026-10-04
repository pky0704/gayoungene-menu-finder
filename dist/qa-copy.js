const rows = {
  "ko": [
    "표시된 재료 외에도 다른 재료가 들어갈 수 있어요.",
    "알레르기가 있다면 주문 전 직원에게 확인해 주세요.",
    "추가로 확인할 재료"
  ],
  "en": [
    "Other ingredients may be present besides those shown.",
    "Food allergy? Ask staff before ordering.",
    "Other ingredients to check"
  ],
  "zh-Hans": [
    "除已列出的食材外，还可能含有其他食材。",
    "如有食物过敏，请在点餐前向店员确认。",
    "需要进一步确认的食材"
  ],
  "ja": [
    "表示以外の食材が含まれる場合があります。",
    "アレルギーがある方は、注文前にスタッフへご確認ください。",
    "追加で確認したい食材"
  ],
  "vi": [
    "Có thể có các nguyên liệu khác ngoài những nguyên liệu được ghi.",
    "Nếu bị dị ứng thực phẩm, hãy hỏi nhân viên trước khi gọi món.",
    "Nguyên liệu cần kiểm tra thêm"
  ],
  "mn": [
    "Жагсааснаас өөр орц агуулж болно.",
    "Хүнсний харшилтай бол захиалахаасаа өмнө ажилтнаас асуугаарай.",
    "Нэмж шалгах орц"
  ],
  "th": [
    "อาจมีส่วนผสมอื่นนอกเหนือจากที่แสดง",
    "หากแพ้อาหาร โปรดสอบถามพนักงานก่อนสั่ง",
    "ส่วนผสมที่ควรตรวจสอบเพิ่มเติม"
  ],
  "ru": [
    "Возможны другие ингредиенты, кроме указанных.",
    "При пищевой аллергии уточните состав у сотрудника до заказа.",
    "Что ещё уточнить о составе"
  ],
  "id": [
    "Bahan lain selain yang ditampilkan mungkin juga ada.",
    "Punya alergi makanan? Tanyakan kepada staf sebelum memesan.",
    "Bahan lain yang perlu diperiksa"
  ],
  "fr": [
    "D’autres ingrédients peuvent être présents.",
    "Allergie alimentaire ? Consultez le personnel avant de commander.",
    "Autres ingrédients à vérifier"
  ]
};
const keys = ["ingredientShort","allergyShort","possibleLabel"];
export const qaCopy = Object.fromEntries(Object.entries(rows).map(([lang, row]) => [lang, Object.fromEntries(keys.map((key, index) => [key, row[index]]))]));
