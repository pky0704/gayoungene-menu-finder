// Local SVG flag illustrations. Country names remain visible as text.
const flag = body => `<svg class="country-flag" viewBox="0 0 48 34" aria-hidden="true"><svg x="2" y="2" width="44" height="30" viewBox="0 0 44 30">${body}</svg><rect x="1" y="1" width="46" height="32" rx="5" fill="none" stroke="#d8cfc5" stroke-width="2"/></svg>`;
export const flags={
 GB:flag('<rect width="44" height="30" fill="#012169"/><path d="m0 0 44 30m0-30L0 30" stroke="#fff" stroke-width="7"/><path d="m0 0 44 30m0-30L0 30" stroke="#c8102e" stroke-width="2.5"/><path d="M22 0v30M0 15h44" stroke="#fff" stroke-width="11"/><path d="M22 0v30M0 15h44" stroke="#c8102e" stroke-width="6"/>'),
 CN:flag('<rect width="44" height="30" fill="#de2910"/><g fill="#ffde00"><path d="m9 4 1.7 5.2h5.4l-4.4 3.2 1.7 5.2L9 14.4l-4.4 3.2 1.7-5.2-4.4-3.2h5.4Z"/><path d="m19 2 .6 1.8h1.9L20 4.9l.6 1.8L19 5.6l-1.6 1.1.6-1.8-1.5-1.1h1.9Z"/><path d="m24 7 .5 1.5H26l-1.3 1 .5 1.5-1.2-.9-1.3.9.5-1.5-1.3-1h1.6ZM24 14l.5 1.5H26l-1.3 1 .5 1.5-1.2-.9-1.3.9.5-1.5-1.3-1h1.6ZM19 19l.5 1.5H21l-1.3 1 .5 1.5-1.2-.9-1.3.9.5-1.5-1.3-1h1.6Z"/></g>'),
 ID:flag('<rect width="44" height="30" fill="#fff"/><rect width="44" height="15" fill="#e70011"/>'),
 FR:flag('<rect width="44" height="30" fill="#fff"/><rect width="14.67" height="30" fill="#002395"/><rect x="29.33" width="14.67" height="30" fill="#ed2939"/>'),
 JP:flag('<rect width="44" height="30" fill="#fff"/><circle cx="22" cy="15" r="8" fill="#bc002d"/>'),
 VN:flag('<rect width="44" height="30" fill="#da251d"/><path d="m22 5 2.4 7.4h7.8l-6.3 4.6 2.4 7.4-6.3-4.6-6.3 4.6 2.4-7.4-6.3-4.6h7.8Z" fill="#ffde00"/>'),
 MN:flag('<rect width="44" height="30" fill="#c4272f"/><path fill="#015197" d="M14.67 0h14.66v30H14.67z"/><g fill="#f9cf02"><path d="M7.3 3c-1 2-2 2.3-1 3.5h2c1-1.2 0-1.5-1-3.5Z"/><circle cx="7.3" cy="8.2" r="1.7"/><path d="M5.1 10a2.4 2.4 0 0 0 4.4 0 2.4 2.4 0 0 1-4.4 0M3.1 12h1.5v13H3.1zm7 0h1.5v13h-1.5zM5.3 12h4l-2 1.5zm0 2.4h4v1h-4zm0 7h4v1h-4zm0 2h4l-2 1.5z"/><circle cx="7.3" cy="18.5" r="2.1"/></g><path d="M7.3 16.4c-2 0-2 2.1 0 2.1s2 2.1 0 2.1" fill="none" stroke="#c4272f" stroke-width=".6"/><circle cx="7.3" cy="17.5" r=".35" fill="#c4272f"/><circle cx="7.3" cy="19.5" r=".35" fill="#c4272f"/>')
};
// Decorative language cues only: names, not flags, identify the language.
export const languageFlags={en:flags.GB,ja:flags.JP,'zh-Hans':flags.CN,vi:flags.VN,mn:flags.MN,id:flags.ID,fr:flags.FR};
export const lockArt='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>';
