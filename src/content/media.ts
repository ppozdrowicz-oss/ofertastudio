export type AssetId =
  | "perfume"
  | "perfumeSource"
  | "perfumeIsolated"
  | "perfumeRetouched"
  | "perfumeLit"
  | "sneaker"
  | "sneakerBefore"
  | "watch"
  | "watchPrecision"
  | "serum"
  | "headphones"
  | "leather"
  | "olive"
  | "candle"
  | "drill"
  | "packaging";
export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  finalPath: string;
  category: string;
  material: string;
  isStudy: boolean;
  /** Nondestructive similarity registration of the image canvas, never a geometry warp. */
  registration?: string;
};

function photograph(
  src: string,
  size: number,
  alt: string,
  category: string,
  material: string,
): MediaAsset {
  return {
    src,
    alt,
    width: size,
    height: size,
    finalPath: src,
    category,
    material,
    isStudy: false,
  };
}

/** Approved web photographs; keep dimensions and descriptions in sync when replacing a file. */
export const media: Record<AssetId, MediaAsset> = {
  perfume: photograph(
    "/media/hero/perfume-final.webp",
    3200,
    "szklany flakon perfum w miękkim świetle studyjnym",
    "Perfumy",
    "Szkło / światło / transparentność",
  ),
  perfumeSource: {
    ...photograph(
      "/media/hero/perfume-source.webp",
      3200,
      "flakon perfum na kamiennym blacie w świetle dziennym",
      "Perfumy",
      "Materiał wyjściowy",
    ),
    // SIFT/RANSAC against the final frame, 1300px analysis canvas; see FINAL_VISUAL_AUDIT.md.
    registration: "translate(0.1801%, -0.9324%) rotate(0.2176deg) scale(1.169046)",
  },
  perfumeIsolated: photograph(
    "/media/hero/perfume-isolated.webp",
    3200,
    "flakon po oddzieleniu od tła",
    "Perfumy",
    "Izolacja",
  ),
  perfumeRetouched: photograph(
    "/media/hero/perfume-retouched.webp",
    3200,
    "flakon po uporządkowaniu powierzchni",
    "Perfumy",
    "Retusz",
  ),
  perfumeLit: photograph(
    "/media/hero/perfume-lit.webp",
    3200,
    "flakon z dopracowanym światłem",
    "Perfumy",
    "Światło",
  ),
  sneaker: photograph(
    "/media/before-after/sneaker-after.webp",
    2600,
    "sneaker z widoczną fakturą tkaniny i podeszwą",
    "Moda",
    "Tkanina / geometria / faktura",
  ),
  sneakerBefore: photograph(
    "/media/before-after/sneaker-before.webp",
    2600,
    "srebrno-biały sneaker na stole, na tle wnętrza",
    "Moda",
    "Prezentacja w otoczeniu",
  ),
  watch: photograph(
    "/media/portfolio/watch/watch.webp",
    3000,
    "zegarek z metalową bransoletą i precyzyjną tarczą",
    "Zegarki",
    "Metal / precyzja / refleksy",
  ),
  watchPrecision: photograph(
    "/media/portfolio/watch/watch-detail.webp",
    3000,
    "Makrofotografia chronografu Breitling — stalowa koperta, czarna tarcza, trzy subtarcze i czerwone detale.",
    "Zegarki",
    "Makro / metal / precyzja",
  ),
  serum: photograph(
    "/media/portfolio/cosmetics/serum.webp",
    2400,
    "bursztynowa butelka serum z pipetą i złotą nakrętką",
    "Kosmetyki",
    "Szkło / etykieta / detal",
  ),
  headphones: photograph(
    "/media/portfolio/electronics/headphones.webp",
    2400,
    "słuchawki nauszne z matowymi powierzchniami",
    "Elektronika",
    "Mat / kształt / wykończenie",
  ),
  leather: photograph(
    "/media/portfolio/fashion/leather-bag.webp",
    2400,
    "skórzana torba z wyraźnymi szwami",
    "Akcesoria",
    "Skóra / szew / miękkość",
  ),
  olive: photograph(
    "/media/portfolio/food/olive-oil.webp",
    2200,
    "złota butelka oliwy z zieloną etykietą",
    "Żywność",
    "Opakowanie / kolor / etykieta",
  ),
  candle: photograph(
    "/media/portfolio/home/candle.webp",
    2200,
    "świeca w szklanym naczyniu ze złotą pokrywką",
    "Dom",
    "Szkło / wosk / subtelność",
  ),
  drill: photograph(
    "/media/portfolio/technical/power-tool.webp",
    2400,
    "wiertarka akumulatorowa z detalami konstrukcji",
    "Narzędzia",
    "Konstrukcja / materiał / detal",
  ),
  packaging: photograph(
    "/media/portfolio/packaging/packaging-set.webp",
    2600,
    "pudełko i produkt we wspólnej kompozycji",
    "Opakowania",
    "Zestaw / proporcje / spójność",
  ),
};

export const editorialPairs: AssetId[] = ["serum", "headphones"];
export const categoryShelf: AssetId[] = ["leather", "olive", "candle", "drill", "packaging"];
export const studioFrames: AssetId[] = [
  "perfumeSource",
  "perfumeIsolated",
  "perfumeRetouched",
  "perfumeLit",
  "perfume",
];
export const hasStudies = Object.values(media).some((asset) => asset.isStudy);
