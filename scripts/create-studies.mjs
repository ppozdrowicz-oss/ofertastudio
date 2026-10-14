/** Original vector maquettes. These are composition studies, never client photographs. */
import { mkdirSync, writeFileSync } from "node:fs";
const root = "public/media/studies";
mkdirSync(root, { recursive: true });
const defs = `<defs>
<linearGradient id="glass" x1="0" x2="1"><stop stop-color="#b6b9b2"/><stop offset=".04" stop-color="#f4f4ed"/><stop offset=".09" stop-color="#e2e4db" stop-opacity=".3"/><stop offset=".35" stop-color="#fff" stop-opacity=".65"/><stop offset=".74" stop-color="#ddd9c7" stop-opacity=".18"/><stop offset=".93" stop-color="#b6b5a5" stop-opacity=".5"/><stop offset=".96" stop-color="#fff"/><stop offset="1" stop-color="#b7bab3"/></linearGradient>
<linearGradient id="metal" x1="0" x2="1"><stop stop-color="#535654"/><stop offset=".13" stop-color="#d9dcda"/><stop offset=".32" stop-color="#f8f8f5"/><stop offset=".51" stop-color="#a1a4a2"/><stop offset=".67" stop-color="#e0e2df"/><stop offset=".88" stop-color="#737773"/><stop offset="1" stop-color="#dededa"/></linearGradient>
<linearGradient id="dark" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#66675e"/><stop offset=".28" stop-color="#292c27"/><stop offset=".7" stop-color="#131612"/><stop offset="1" stop-color="#3f4338"/></linearGradient>
<linearGradient id="cream" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#faf9f5"/><stop offset=".55" stop-color="#dedcd3"/><stop offset="1" stop-color="#a3a398"/></linearGradient>
<linearGradient id="liquid" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="#e9dbb8" stop-opacity=".3"/><stop offset=".78" stop-color="#c4ae79" stop-opacity=".55"/><stop offset="1" stop-color="#8d784d" stop-opacity=".75"/></linearGradient>
<linearGradient id="leather" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#8a6551"/><stop offset=".52" stop-color="#5e4538"/><stop offset="1" stop-color="#382a23"/></linearGradient>
<radialGradient id="dial"><stop stop-color="#52544c"/><stop offset="1" stop-color="#1d221b"/></radialGradient>
<filter id="blur"><feGaussianBlur stdDeviation="12"/></filter>
<filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
<pattern id="mesh" width="6" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#787c6c" opacity=".38"/></pattern>
<pattern id="grain" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M1 1l1 1M4 3l-1 1" stroke="#161610" stroke-opacity=".15" stroke-width=".6"/></pattern>
</defs>`;
const shadow = (cx = 500, cy = 835, rx = 220, ry = 18) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#24261e" opacity=".16" filter="url(#blur)"/>`;
const svg = (body, view = "0 0 1000 1000") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" fill="none">${defs}${body}</svg>`;
const label = (x, y, large, small) =>
  `<text x="${x}" y="${y}" text-anchor="middle" fill="#272a24" font-family="Georgia,serif" font-size="28" letter-spacing="9">${large}</text><text x="${x}" y="${y + 32}" text-anchor="middle" fill="#55584f" font-family="Arial,sans-serif" font-size="8" letter-spacing="3">${small}</text>`;
const perfume = `${shadow(520, 845, 225, 16)}<g transform="rotate(-7 500 500)">
<path d="M347 305L620 289Q655 290 662 324L689 771Q691 812 650 821L365 830Q332 830 331 795L311 347Q310 315 347 305Z" fill="url(#glass)" stroke="#b8bbae" stroke-width="1.3"/>
<path d="M333 347L628 326L658 774Q659 798 636 802L363 810Q351 809 350 792Z" fill="url(#liquid)"/>
<path d="M335 347Q478 332 631 327" stroke="#ac9d77" stroke-opacity=".55" stroke-width="2"/>
<path d="M328 342L348 787Q349 817 377 818M654 325L676 776Q678 804 653 808" stroke="#fff" stroke-opacity=".9" stroke-width="5"/>
<path d="M365 799L640 789" stroke="#c6c3ae" stroke-width="7"/>
<path d="M334 312L364 321L632 303L619 290Z" fill="#f1f2ec" opacity=".7"/>
<path d="M360 351L376 775" stroke="#fff" stroke-width="18" opacity=".24"/>
<path d="M502 327L520 715" stroke="#b3ac8d" stroke-width="2" opacity=".36"/>
<path d="M447 255L548 250L552 304L450 311Z" fill="url(#metal)"/>
<path d="M420 141Q420 133 432 132L551 128Q565 128 567 139L574 253L426 261Z" fill="url(#dark)"/>
<path d="M428 143L433 246" stroke="#bbbeb1" stroke-width="2" opacity=".38"/>
<path d="M435 139L551 135" stroke="#9c9f91" stroke-width="2"/>
<path d="M426 256L574 248" stroke="#070907" stroke-width="8"/>
<path d="M368 474L626 462L638 662L377 675Z" fill="#f9f8f1" opacity=".96"/>
<g transform="rotate(-2 504 570)">${label(503, 546, "OBJET", "ÉTUDE DE LUMIÈRE")}<text x="503" y="628" text-anchor="middle" fill="#626357" font-family="Arial,sans-serif" font-size="10" letter-spacing="2">01 — EAU DE PARFUM</text></g></g>`;
const shoeBody = `<path d="M152 547Q179 534 209 490L266 333Q284 306 319 341L391 425L459 425Q481 370 520 327Q535 313 547 337L598 452Q687 505 800 535Q878 559 892 604L884 643L176 642Q138 619 152 547Z" fill="url(#cream)" stroke="#93958a" stroke-width="2"/>
<path d="M216 486L267 346L336 424L374 471L331 530L245 537Z" fill="#dadbd0"/><path d="M220 486L270 356L328 423L365 470L328 520L248 529Z" fill="url(#mesh)"/>
<path d="M283 349Q300 320 321 345L387 422L352 448Z" fill="#646c5b"/><path d="M300 350L360 428" stroke="#bec2b3" stroke-width="5"/>
<path d="M354 477L448 429L535 357L589 469L542 521L445 559L344 553Z" fill="#cbcec0"/><path d="M355 477L448 429L533 371L579 467L536 511L444 549L347 546Z" fill="url(#mesh)"/>
<path d="M578 478Q672 521 788 547L823 584L555 590L530 553Z" fill="#eeeae1"/><path d="M580 490Q692 538 778 558L798 577L563 580L543 553Z" fill="url(#mesh)"/>
<path d="M228 513L302 508L370 554L522 544L584 485L621 505L545 582L352 600L289 552L217 558Z" fill="#88927b"/>
<path d="M239 523L298 518L367 565L524 555L586 497" stroke="#b8bfae" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M179 540L225 504L222 571L182 593Z" fill="#b3b7a7"/>
<path d="M157 576Q268 603 396 599L534 592Q626 603 747 586Q824 577 883 603L893 633Q897 659 866 670L183 669Q145 658 146 627Z" fill="#f5f1e6" stroke="#afada1" stroke-width="2"/>
<path d="M150 635Q270 653 392 640L531 632Q691 650 890 627L887 653Q883 673 858 680L183 679Q150 670 150 652Z" fill="#737966"/>
<path d="M167 620L339 632M365 633L515 619M553 617Q724 631 868 611" stroke="#d5d2c6" stroke-width="3"/>
${Array.from({ length: 15 }, (_, i) => `<path d="M${192 + i * 45} 655v18" stroke="#3f4837" stroke-width="3" opacity=".45"/>`).join("")}
${Array.from({ length: 5 }, (_, i) => `<circle cx="${419 + i * 25}" cy="${452 - i * 19}" r="7" fill="#909884"/><path d="M${397 + i * 26} ${470 - i * 16}Q${430 + i * 25} ${457 - i * 20} ${461 + i * 24} ${490 - i * 18}" stroke="#8c9181" stroke-width="12" stroke-linecap="round"/><path d="M${397 + i * 26} ${467 - i * 16}Q${430 + i * 25} ${454 - i * 20} ${461 + i * 24} ${487 - i * 18}" stroke="#f4f1e6" stroke-width="8" stroke-linecap="round"/>`).join("")}
<path d="M466 410Q478 370 450 372Q427 381 466 410Q508 382 517 408Q518 433 466 410M466 410L503 453" stroke="#eeeadd" stroke-width="7" stroke-linecap="round"/>
<path d="M803 542Q848 555 860 576" stroke="#c0bdb0" stroke-width="2" stroke-dasharray="4 4"/>`;
const shoe = `${shadow(517, 706, 342, 16)}<g transform="rotate(-8 500 500)">${shoeBody}</g>`;
const watch = `${shadow(505, 891, 190, 12)}<g transform="rotate(18 500 500)"><path d="M386 107Q502 91 615 108L590 353H411Z" fill="url(#metal)" stroke="#797d78" stroke-width="2"/><path d="M412 632H590L615 885Q500 913 387 885Z" fill="url(#metal)" stroke="#797d78" stroke-width="2"/>
${Array.from({ length: 8 }, (_, i) => `<path d="M${391 + i * 2.5} ${127 + i * 27}H${610 - i * 2.5}M${412 - i * 3} ${663 + i * 28}H${589 + i * 3}" stroke="#555c55" stroke-width="4"/><path d="M${391 + i * 2.5} ${130 + i * 27}H${610 - i * 2.5}M${412 - i * 3} ${667 + i * 28}H${589 + i * 3}" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`).join("")}
<path d="M464 110L470 325M537 110L530 325M470 670L460 900M531 670L541 900" stroke="#6d756b" stroke-width="3"/>
<rect x="701" y="475" width="36" height="49" rx="8" fill="url(#metal)" stroke="#757970"/>
<circle cx="500" cy="500" r="216" fill="url(#metal)" stroke="#7d8479" stroke-width="2"/><circle cx="500" cy="500" r="199" stroke="#fff" stroke-opacity=".8" stroke-width="3"/><circle cx="500" cy="500" r="185" fill="url(#dial)" stroke="#6e7768" stroke-width="6"/>
${Array.from({ length: 60 }, (_, i) => `<path d="M500 327v${i % 5 === 0 ? 25 : 8}" stroke="${i % 5 === 0 ? "#edeedc" : "#a1ac98"}" stroke-width="${i % 5 === 0 ? 5 : 1.2}" transform="rotate(${i * 6} 500 500)"/>`).join("")}
<text x="500" y="425" text-anchor="middle" fill="#d4d9c9" font-family="Georgia,serif" font-size="17" letter-spacing="5">TEMPO</text><text x="500" y="584" text-anchor="middle" fill="#959e8e" font-family="Arial,sans-serif" font-size="9" letter-spacing="3">ÉTUDE — 03</text>
<path d="M501 500L420 432" stroke="#10160e" stroke-width="14"/><path d="M501 500L420 432" stroke="#e7e5d4" stroke-width="9"/><path d="M500 500L592 399" stroke="#e8e8da" stroke-width="6"/><path d="M461 562L551 420" stroke="#b9ae83" stroke-width="2"/><circle cx="500" cy="500" r="9" fill="url(#metal)"/>
<path d="M374 367Q505 272 642 393Q585 348 394 602Q330 516 374 367Z" fill="#fff" opacity=".045"/></g>`;
const serum = `${shadow(500, 850, 140, 15)}<rect x="390" y="424" width="220" height="404" rx="36" fill="url(#glass)" stroke="#bcbeb2"/><rect x="407" y="460" width="186" height="348" rx="22" fill="url(#liquid)"/><path d="M500 400V774" stroke="#c0b599" stroke-width="7"/><rect x="395" y="324" width="210" height="123" rx="13" fill="url(#metal)"/><path d="M444 327V217Q444 166 500 166Q556 166 556 217V327Z" fill="url(#cream)"/><rect x="416" y="556" width="168" height="170" fill="#f8f7ed"/>${label(500, 611, "SÉRUM", "ESSENTIEL — 02")}<text x="500" y="700" fill="#55594c" text-anchor="middle" font-family="Arial" font-size="12">30 ml</text><path d="M416 481V805" stroke="#fff" stroke-opacity=".8" stroke-width="8"/>`;
const headphones = `${shadow(500, 840, 260, 17)}<path d="M255 567V421C255 96 745 96 745 421V567" stroke="#6e726b" stroke-width="77"/><path d="M255 529V419C255 113 745 113 745 419V529" stroke="url(#dark)" stroke-width="62"/><path d="M280 396C293 174 696 174 720 396" stroke="#9d9f97" stroke-width="8"/><path d="M251 475L265 609M747 475L733 609" stroke="url(#metal)" stroke-width="30"/><g transform="rotate(-13 277 664)"><rect x="168" y="490" width="179" height="313" rx="88" fill="url(#dark)"/><rect x="203" y="503" width="160" height="287" rx="80" fill="#282c25"/><rect x="220" y="522" width="125" height="251" rx="60" fill="url(#grain)" stroke="#50544b" stroke-width="3"/></g><g transform="rotate(13 727 664)"><rect x="650" y="490" width="182" height="313" rx="88" fill="url(#dark)"/><rect x="627" y="503" width="160" height="287" rx="80" fill="#282c25"/><rect x="643" y="522" width="124" height="251" rx="60" fill="url(#grain)" stroke="#50544b" stroke-width="3"/></g>`;
const bag = `${shadow(500, 833, 258, 19)}<path d="M355 374V303C355 107 645 107 645 303V374" stroke="#403027" stroke-width="34"/><path d="M355 374V303C355 117 645 117 645 303V374" stroke="#946f55" stroke-width="22"/><path d="M278 351L722 351L787 793Q499 858 212 793Z" fill="url(#leather)" stroke="#44332b" stroke-width="3"/><path d="M278 351L722 351L787 793Q499 858 212 793Z" fill="url(#grain)"/><path d="M294 374L707 374L761 775Q500 829 238 775Z" stroke="#ab8467" stroke-width="2" stroke-dasharray="4 5"/><path d="M272 367Q497 435 727 367" stroke="#392921" stroke-width="7"/><path d="M351 363V471M649 363V471" stroke="#48352a" stroke-width="28"/><rect x="336" y="379" width="30" height="31" rx="3" stroke="#c1ab75" stroke-width="5"/><rect x="634" y="379" width="30" height="31" rx="3" stroke="#c1ab75" stroke-width="5"/><text x="500" y="655" text-anchor="middle" fill="#c4ad84" font-family="Georgia" letter-spacing="5" font-size="16">FORME</text>`;
const olive = `${shadow(500, 875, 130, 14)}<path d="M450 155H550V317Q550 361 598 389Q633 410 633 451V828Q633 851 609 858H391Q367 851 367 828V451Q367 410 402 389Q450 361 450 317Z" fill="url(#dark)" stroke="#444c34" stroke-width="2"/><path d="M398 444V815" stroke="#9aa984" stroke-width="13" opacity=".18"/><rect x="444" y="151" width="112" height="132" rx="7" fill="#555945"/><path d="M453 160V272M465 160V272M477 160V272M489 160V272M501 160V272M513 160V272M525 160V272M537 160V272M549 160V272" stroke="#959781" stroke-opacity=".4" stroke-width="2"/><rect x="384" y="486" width="232" height="241" fill="#eeeade"/>${label(500, 544, "OLIVA", "EXTRA VIRGIN")}<path d="M475 635Q520 590 527 658M493 626Q463 603 465 634M510 628Q540 606 535 641" stroke="#707962" stroke-width="3"/><text x="500" y="698" text-anchor="middle" fill="#55594c" font-family="Arial" font-size="10" letter-spacing="3">500 ML</text>`;
const candle = `${shadow(500, 832, 228, 18)}<path d="M296 339H704L682 788Q680 824 642 828H359Q322 824 320 788Z" fill="url(#glass)" stroke="#b6b7a9" stroke-width="2"/><path d="M314 351H686L664 780Q660 802 640 802H363Q340 802 338 780Z" fill="#e5dfcc"/><ellipse cx="500" cy="349" rx="193" ry="40" fill="#f2ecdb" stroke="#c8c3b1" stroke-width="3"/><path d="M500 348V316" stroke="#4b4839" stroke-width="5" stroke-linecap="round"/><rect x="370" y="483" width="259" height="210" fill="#f8f6ed"/>${label(500, 553, "CALME", "BOUGIE PARFUMÉE")}<text x="500" y="653" text-anchor="middle" fill="#777564" font-family="Arial" font-size="11" letter-spacing="2">SANTAL — 190 G</text><path d="M329 403L349 773" stroke="#fff" stroke-width="9" opacity=".48"/>`;
const drill = `${shadow(496, 860, 255, 16)}<g transform="rotate(-12 500 500)"><path d="M295 310H641L694 367V462L595 495H514L570 723L419 754L386 489H280Q249 489 249 451V355Q249 310 295 310Z" fill="#78816b" stroke="#4d5545" stroke-width="3"/><path d="M271 332H520V458H275Z" fill="url(#dark)"/><path d="M524 326H626L671 374V440L588 475H524Z" fill="#939b83"/><path d="M650 356H740L780 382V433L737 459H650Z" fill="url(#metal)"/><path d="M734 365H779V450H734Z" fill="url(#dark)"/><path d="M781 394H901V421H781Z" fill="url(#metal)"/><path d="M399 490H504L558 719L431 744Z" fill="url(#dark)"/><path d="M461 490H508L521 545H471Z" fill="#151a12"/><path d="M400 723L582 692L620 794L390 833L367 775Z" fill="url(#dark)"/><path d="M388 776L602 740L615 790L395 824Z" fill="#879078"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${299 + i * 26} 352V432" stroke="#707767" stroke-width="6"/>`).join("")}<path d="M429 562L520 545M435 585L525 568M441 608L531 591M447 631L537 614M453 654L543 637" stroke="#535b49" stroke-width="4"/></g>`;
const packaging = `${shadow(500, 840, 298, 20)}<path d="M221 274L390 215L682 269L515 333Z" fill="#edebe2"/><path d="M221 274L515 333V813L221 738Z" fill="#dad8cd"/><path d="M515 333L682 269V747L515 813Z" fill="#b2b5a4"/><path d="M239 298L494 352V780L239 723Z" stroke="#f7f5ec" stroke-opacity=".6"/><text x="363" y="459" text-anchor="middle" transform="rotate(12 363 459)" fill="#525646" font-family="Georgia" font-size="29" letter-spacing="5">FORME</text><path d="M261 577L465 626M261 590L419 628" stroke="#96998a" stroke-width="2"/><g transform="translate(330 220) scale(.65)">${serum.replace(shadow(500, 850, 140, 15), "")}</g>`;
const assets = {
  perfume,
  sneaker: shoe,
  watch,
  serum,
  headphones,
  leather: bag,
  olive,
  candle,
  drill,
  packaging,
};
for (const [name, body] of Object.entries(assets)) writeFileSync(`${root}/${name}.svg`, svg(body));
writeFileSync(
  `${root}/sneaker-before.svg`,
  svg(
    `<rect width="1000" height="1000" fill="#deddd5"/><path d="M0 742L1000 682" stroke="#cccac0" stroke-width="2"/><ellipse cx="580" cy="722" rx="365" ry="35" fill="#686951" opacity=".27" filter="url(#blur)"/><g opacity=".82">${shoe}</g><rect width="1000" height="1000" fill="#88784c" opacity=".11"/>`,
  ),
);
writeFileSync(
  `${root}/perfume-source.svg`,
  svg(
    `<rect width="1000" height="1000" fill="#dfddd4"/><path d="M0 869L1000 829" stroke="#c3c0b5"/><g opacity=".75">${perfume}</g><rect width="1000" height="1000" fill="#aa9770" opacity=".13"/>`,
  ),
);
console.log(`Created ${Object.keys(assets).length + 2} original vector studies.`);
