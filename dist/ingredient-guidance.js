// General recipe estimates, NOT this restaurant's verified ingredient list.
// Reviewed 2026-10-04. Sources and scope are documented in INGREDIENT-REVIEW.md.
// These may exclude preference matches; they must never certify an absence.
export const recipeHints = [
 {ids:['M006','M007','M010'],keys:['wheat'],basis:'Rice/wheat option in the approved menu'},
 {ids:['M006','M007','M010','M020','M022','M032','M034'],keys:['soy','wheat'],basis:'Typical chili/soy-based sauce; actual sauce unverified'},
 {ids:['M012','M013','M014','M015','M016'],keys:['wheat'],basis:'Typical flour-based frying batter; actual batter unverified'},
 {ids:['M017','M023','M024','M025'],keys:['wheat','soy'],basis:'Typical dumpling wrapper and seasoned filling'},
 {ids:['M018','M019'],keys:['soy','wheat','sesame'],basis:'Typical seasoned gimbap fillings and sesame oil'},
 {ids:['M020'],keys:['wheat'],basis:'Typical wheat-based jjolmyeon noodles'},
 {ids:['M021','M024'],keys:['fish','shrimp'],basis:'Kimchi can use fish sauce or salted shrimp'},
 {ids:['M011'],keys:['wheat','soy','egg'],basis:'Processed fish cake binders and seasonings vary'},
 {ids:['M005'],keys:['wheat','soy'],basis:'Cookie crunch can use wheat flour and soy ingredients'},
 {ids:['M026'],keys:['dairy'],basis:'Coolpis is a cultured drink; exact can label unverified'}
];

export function ingredientStatus(dish, key) {
 const confirmed = dish.ingredients[key];
 if (confirmed === 'contains' || confirmed === 'absent_verified') return confirmed;
 // The owner's combined chicken/other-meat field cannot identify a meat species.
 if (dish.otherMeat && ['pork','beef','chicken'].includes(key)) return 'possible';
 if (recipeHints.some(h => h.ids.includes(dish.id) && h.keys.includes(key))) return 'possible';
 return 'unknown';
}
