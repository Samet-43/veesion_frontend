import { Link, useParams } from "react-router-dom";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";

function rotateArray<T>(arr: T[], n: number): T[] {
    const len = arr.length || 1;
    const k = ((n % len) + len) % len;
    return arr.slice(k).concat(arr.slice(0, k));
}

function MerchDetail() {
    const [cartOpen, setCartOpen] = useState(false);
    const { id } = useParams();
    const n = Number(id) || 1;

    // --------- Données produits ----------
    const products = useMemo(
        () => [
            {
                id: 1, title: "Coliath HMS", price: "13,99 €",
                p1: "Notre équipe de grimpeurs a conçu ce mousqueton pour relier un système d’assurage au harnais en escalade et à l’alpinisme.",
                p2: "En plus de sa fermeture automatique, ce mousqueton a une forme HMS (en poire) pour bénéficier d’avantage d’ergonomie et d’ouverture pendant la manipulation."
            },
            {
                id: 2, title: "Portefeuille en cuir", price: "20,00 €",
                p1: "Conçu en cuir grainé, il offre un toucher souple et une belle tenue dans le temps. Sa taille compacte se glisse facilement dans une poche.",
                p2: "Organisation simple et efficace : emplacements pour cartes, billets pliés et un petit compartiment sécurisé pour la monnaie."
            },
            { id: 3, title: "Veste en cuir", price: "129,00 €",
                p1: "Veste intemporelle en cuir véritable, pensée pour un tomber net et un confort durable au quotidien.",
                p2: "Doublure respirante, finitions renforcées, coupe droite : un essentiel polyvalent pour rehausser n’importe quelle tenue."
            },
            {
                id: 4, title: "Sac de frappe", price: "89,00 €",
                p1: "Sac de frappe robuste pour l’entraînement régulier, rembourrage dense pour un retour homogène des impacts.",
                p2: "Revêtement anti-abrasion, attaches métalliques renforcées et sangles épaisses pour une stabilité optimale."
            },
            {
                id: 5, title: "Veste costume", price: "149,00 €",
                p1: "Veste de costume à la coupe moderne, épaule légère et ligne propre pour un porté élégant et confortable.",
                p2: "Tissu légèrement stretch, doublure discrète et boutons teint-ton : un basique chic qui s’adapte à toutes les occasions."
            },
            {
                id: 6, title: "Lunettes de soleil", price: "59,00 €",
                p1: "Monture rectangulaire à la silhouette affirmée, verres dotés d’un traitement anti-UV pour une protection fiable.",
                p2: "Charnières souples, légères et confortables, elles complètent facilement un look urbain ou casual."
            },
        ],
        []
    );

    const product = useMemo(
        () => products.find((p) => p.id === n) ?? products[0],
        [products, n]
    );

    // --- Vignettes : 1..3 (détecte celles qui existent) ---
    const [available, setAvailable] = useState<number[]>([1, 2, 3]);
    const [items, setItems] = useState<number[]>([2, 1, 3]);
    const centerIndex = 1;

    useEffect(() => {
        setItems((prev) => {
            const inAvail = prev.filter((x) => available.includes(x));
            return inAvail.length ? inAvail : available.slice();
        });
    }, [available]);

    const handleImageError = useCallback((num: number) => {
        setAvailable((prev) =>
            prev.includes(num) ? prev.filter((x) => x !== num) : prev
        );
    }, []);

    // --- Scroll roue: seulement desktop (>=1820px) ---
    const colWheelRef = useRef<HTMLDivElement | null>(null);
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(min-width: 1820px)").matches
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia("(min-width: 1820px)");
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mql.addEventListener?.("change", onChange);
        setIsDesktop(mql.matches);
        return () => mql.removeEventListener?.("change", onChange);
    }, []);

    const rotate = useCallback(
        (dir: 1 | -1) => {
            if (available.length <= 1) return;
            setItems((prev) => rotateArray(prev, dir === 1 ? 1 : -1));
        },
        [available.length]
    );

    const slideTo = useCallback(
        (indexInColumn: number) => {
            if (available.length <= 1) return;
            const delta = indexInColumn - centerIndex;
            if (delta === 0) return;
            setItems((prev) => rotateArray(prev, delta));
        },
        [available.length]
    );

    useEffect(() => {
        const el = colWheelRef.current;
        if (!el) return;

        // n'attache la molette qu'en desktop
        if (!isDesktop) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 10) return;
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            rotate(dir);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [rotate, isDesktop]);

    const ordered = items.filter((x) => available.includes(x)).slice(0, 3);
    const centerThumbId = ordered[1] ?? ordered[0] ?? 1;

    // ---------- Interactions croix ----------
    const [activeDetail, setActiveDetail] = useState<null | "c1" | "c2">(null);
    const detailRef = useRef<HTMLDivElement | null>(null);

    const onCrossClick = useCallback(
        (which: "c1" | "c2") => {
            if (n !== 1 || centerThumbId !== 1) return;
            setActiveDetail((prev) => (prev === which ? null : which));
        },
        [n, centerThumbId]
    );

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!detailRef.current) return;
            if (!detailRef.current.contains(e.target as Node)) {
                setActiveDetail(null);
            }
        };
        if (activeDetail) document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [activeDetail]);

    return (
        <>
            <div
                className="
                          relative min-h-screen w-screen bg-cover bg-center bg-no-repeat
                          overflow-auto min-[1820px]:overflow-hidden
                        "
                style={{ backgroundImage: "url('/service/backgroundImage.png')" }}
            >
                <header className="absolute z-20 left-[5%] top-4 sm:top-6 md:top-8 w-[90%] h-[4.25rem]">
                    <div className="flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
                        {/* liens — visibles dès tablette, cachés en mobile */}
                        <nav className="hidden sm:flex items-center gap-6 md:gap-10 xl:order-1 font-bold
                                        text-sm md:text-xl xl:text-2xl">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">Service</Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">Portfolio</Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">/Merch</Link>
                        </nav>

                        {/* logo */}
                        <Link
                            to="/"
                            aria-label="Accueil"
                            className="select-none order-1 xl:order-2 xl:justify-self-center"
                        >
                            <img
                                src="/home/logo-texte-rouge.png"
                                alt="veeesion"
                                className="block h-10 object-contain"
                            />
                        </Link>

                        {/* burger + panier */}
                        <div className="order-2 xl:order-3 xl:justify-self-end relative flex items-center gap-4 md:gap-6">
                            {/* Panier masqué pour le moment */}
                            <button
                                type="button"
                                aria-label="Ouvrir le panier"
                                onClick={() => setCartOpen((v) => !v)}
                                className="relative hover:opacity-80 hidden"
                            >
                                <img src="/merch/panier.png" alt="Panier" />
                                <span className="absolute -top-1 -right-1 bg-[#65130E] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                  2
                                </span>
                            </button>

                            {/* Burger */}
                            <Link
                                to="/menu"
                                aria-label="Menu"
                                className="flex items-center justify-center h-[4.25rem] w-[4.25rem] hover:opacity-80"
                            >
                                <img
                                    src="/home/burger.png"
                                    alt="Ouvrir le menu"
                                    className="block h-full w-full object-contain"
                                />
                            </Link>

                            {/* Dropdown du panier (masqué aussi) */}
                            {cartOpen && (
                                <div className="absolute right-24 top-18 z-30 hidden">
                                    {/* contenu panier */}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ===== MAIN ===== */}
                <main className="absolute left-[5%] top-[8rem] w-[90%]">
                    <div
                        className="
                                      grid grid-cols-1 min-[900px]:grid-cols-[12.5rem_1fr]
                                      gap-16 relative
                                    "
                    >
                        {/* Grande image produit (desktop seulement) */}
                        <img
                            src={
                                n === 1 && centerThumbId === 1
                                    ? `/merchDetail/1/mousquet-bg-test.png`
                                    : `/merchDetail/${n}/productCard-${centerThumbId}.png`
                            }
                            alt=""
                            className="
                                        pointer-events-none select-none absolute right-[-5%] top-[-10rem] w-[60rem]
                                        rotate-[21deg] z-0 opacity-100
                                        max-[1819px]:hidden
                                      "
                        />

                        {/* CROIX (desktop seulement) */}
                        {n === 1 && centerThumbId === 1 && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Détails produit"
                                    onClick={() => onCrossClick("c1")}
                                    className={`
                                                absolute z-10 left-[75%] top-[17rem] select-none
                                                transition-transform duration-200 ease-out
                                                ${activeDetail === "c1" ? "rotate-45" : "rotate-0"}
                                                max-[1819px]:hidden
                                              `}
                                >
                                    <img src="/merchDetail/product-detail.png" alt="" className="block" />
                                </button>

                                <button
                                    type="button"
                                    aria-label="Détails produit"
                                    onClick={() => onCrossClick("c2")}
                                    className={`
                                                absolute z-10 left-[90%] top-[25rem] select-none
                                                transition-transform duration-200 ease-out
                                                ${activeDetail === "c2" ? "rotate-45" : "rotate-0"}
                                                max-[1819px]:hidden
                                              `}
                                >
                                    <img src="/merchDetail/product-detail.png" alt="" className="block" />
                                </button>
                            </>
                        )}

                        {/* Colonne images — visible en ≥900px, cachée en <900px (scroll roue seulement desktop via JS) */}
                        <div
                            ref={colWheelRef}
                            className="
                                        hidden min-[900px]:flex
                                        w-[12.5rem]
                                        h-[45rem]
                                        max-[1819px]:h-auto
                                        flex-col items-center gap-4
                                      "
                        >
                            <img
                                src="/merchDetail/arrow-top.png"
                                alt="Haut"
                                className="cursor-pointer"
                                onClick={() => rotate(-1)}
                            />

                            {ordered.map((num, idx) => (
                                <div
                                    key={num}
                                    className={`w-full rounded-xl p-2 ${idx === centerIndex ? "bg-white/60" : "bg-white/30"}`}
                                    onClick={() => slideTo(idx)}
                                >
                                    <img
                                        src={`/merchDetail/${n}/productCard-${num}.png`}
                                        alt={`Produit détail ${num}`}
                                        className="w-full h-auto object-contain rounded-lg cursor-pointer"
                                        onError={() => handleImageError(num)}
                                    />
                                </div>
                            ))}

                            <img
                                src="/merchDetail/arrow-bot.png"
                                alt="Bas"
                                className="cursor-pointer"
                                onClick={() => rotate(1)}
                            />
                        </div>

                        {/* --------- Partie droite (texte) --------- */}
                        <div
                            className="
                                        max-w-[39rem] pt-2 mx-35 my-20
                                        max-[1819px]:my-10
                                        max-[899px]:my-6 max-[899px]:w-[90%] max-[899px]:max-w-none max-[899px]:mx-auto
                                      "
                        >
                            {/* TITRE : tailles adaptées */}
                            <h1 className="text-[#2C0D0F] font-bold leading-[0.95] tracking-tight text-[4.5rem] max-[1819px]:text-[3.5rem] max-[899px]:text-[2.25rem]">
                                {product.title}
                            </h1>

                            <div className="mt-2 text-[#2C0D0F] text-[20px] font-bold max-[1819px]:text-[18px] max-[899px]:text-[16px]">
                                {product.price}
                            </div>

                            <p className="mt-6 text-[#2C0D0F] text-[20px] leading-[1.4] font-medium max-[1819px]:text-[18px] max-[899px]:text-[16px]">
                                {product.p1}
                            </p>
                            <p className="mt-4 text-[#2C0D0F] text-[20px] leading-[1.4] font-medium max-[1819px]:text-[18px] max-[899px]:text-[16px]">
                                {product.p2}
                            </p>

                            <div className="mt-16 max-[1819px]:mt-10 max-[899px]:mt-6 flex items-center gap-4">
                                <span className="text-[#2C0D0F] text-[20px] max-[1819px]:text-[18px] max-[899px]:text-[16px]">Taille :</span>

                                <select
                                    className="px-4 py-2 rounded-full border border-[#2C0D0F]/30 text-[20px] bg-white/80 focus:outline-none cursor-pointer max-[1819px]:text-[18px] max-[899px]:text-[16px]"
                                    defaultValue="Medium"
                                >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>

                            <div className="mt-16 max-[1819px]:mt-10 max-[899px]:mt-6 flex items-center gap-4 hidden">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-full bg-[#F1F1F1] text-[#2C0D0F] text-[20px] max-[1819px]:text-[18px] max-[899px]:text-[16px]"
                                >
                                    Ajouter au panier
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-full text-white text-[20px] max-[1819px]:text-[18px] max-[899px]:text-[16px]"
                                    style={{ backgroundColor: "#65130E" }}
                                >
                                    Acheter le produit
                                </button>
                            </div>
                        </div>

                        {/* ---------- Dropdown d'information (desktop seulement) ---------- */}
                        {activeDetail && centerThumbId === 1 && (
                            <div
                                ref={detailRef}
                                className="absolute z-30 max-[1819px]:hidden"
                                style={{
                                    left: activeDetail === "c1" ? "75%" : "90%",
                                    top: activeDetail === "c1" ? "calc(17rem + 3.75rem)" : "calc(25rem + 3.75rem)",
                                    transform: "translateX(-50%)",
                                }}
                            >
                                <div className="relative">
                                    <div className="w-[20rem] rounded-[0.75rem] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] border border-black/5">
                                        <div className="px-4 py-3 text-sm text-[#2C0D0F]/90 space-y-2">
                                            {activeDetail === "c1" ? (
                                                <p className="leading-snug">
                                                    Corps en alliage anodisé, zone large pour demi-cabestan,
                                                    résistance accrue et maniabilité fluide.
                                                </p>
                                            ) : (
                                                <p className="leading-snug">
                                                    Mousqueton avec bague automatique, peu s'ouvrir d'une main se
                                                    referme tout seul.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* petite flèche */}
                                    <div
                                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0
                                                   border-l-[10px] border-l-transparent
                                                   border-r-[10px] border-r-transparent
                                                   border-b-[10px] border-b-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

export default MerchDetail;
