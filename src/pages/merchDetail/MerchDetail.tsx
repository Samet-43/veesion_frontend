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
                id: 1,
                title: "Coliath HMS",
                price: "13,99 €",
                p1:
                    "Notre équipe de grimpeurs a conçu ce mousqueton pour relier un système d’assurage au harnais en escalade et à l’alpinisme.",
                p2:
                    "En plus de sa fermeture automatique, ce mousqueton a une forme HMS (en poire) pour bénéficier d’avantage d’ergonomie et d’ouverture pendant la manipulation.",
            },
            {
                id: 2,
                title: "Portefeuille en cuir",
                price: "20,00 €",
                p1:
                    "Conçu en cuir grainé, il offre un toucher souple et une belle tenue dans le temps. Sa taille compacte se glisse facilement dans une poche.",
                p2:
                    "Organisation simple et efficace : emplacements pour cartes, billets pliés et un petit compartiment sécurisé pour la monnaie.",
            },
            {
                id: 3,
                title: "Veste en cuir",
                price: "129,00 €",
                p1:
                    "Veste intemporelle en cuir véritable, pensée pour un tomber net et un confort durable au quotidien.",
                p2:
                    "Doublure respirante, finitions renforcées, coupe droite : un essentiel polyvalent pour rehausser n’importe quelle tenue.",
            },
            {
                id: 4,
                title: "Sac de frappe",
                price: "89,00 €",
                p1:
                    "Sac de frappe robuste pour l’entraînement régulier, rembourrage dense pour un retour homogène des impacts.",
                p2:
                    "Revêtement anti-abrasion, attaches métalliques renforcées et sangles épaisses pour une stabilité optimale.",
            },
            {
                id: 5,
                title: "Veste costume",
                price: "149,00 €",
                p1:
                    "Veste de costume à la coupe moderne, épaule légère et ligne propre pour un porté élégant et confortable.",
                p2:
                    "Tissu légèrement stretch, doublure discrète et boutons teint-ton : un basique chic qui s’adapte à toutes les occasions.",
            },
            {
                id: 6,
                title: "Lunettes de soleil",
                price: "59,00 €",
                p1:
                    "Monture rectangulaire à la silhouette affirmée, verres dotés d’un traitement anti-UV pour une protection fiable.",
                p2:
                    "Charnières souples, légères et confortables, elles complètent facilement un look urbain ou casual.",
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

    const colWheelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = colWheelRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 10) return;
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            rotate(dir);
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [rotate]);

    const ordered = items.filter((x) => available.includes(x)).slice(0, 3);
    const centerThumbId = ordered[1] ?? ordered[0] ?? 1;

    // ---------- Interactions croix ----------
    const [activeDetail, setActiveDetail] = useState<null | "c1" | "c2">(null);
    const detailRef = useRef<HTMLDivElement | null>(null);

    const onCrossClick = useCallback(
        (which: "c1" | "c2") => {
            if (centerThumbId !== 1) return; // actif uniquement si productCard-1 est au centre
            setActiveDetail((prev) => (prev === which ? null : which));
        },
        [centerThumbId]
    );

    // Fermer au clic extérieur
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
            <div className="relative h-screen w-screen">
                <img
                    src="/service/backgroundImage.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <header className="absolute z-20 left-[5%] top-8 w-[90%]">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                        <nav className="flex items-center gap-6 md:gap-10 text-base md:text-2xl font-bold">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">
                                Service
                            </Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">
                                Portfolio
                            </Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">
                                /Merch
                            </Link>
                        </nav>

                        <Link
                            to="/"
                            aria-label="Accueil"
                            className="justify-self-center select-none"
                        >
                            <img
                                src="/home/logo-texte-rouge.png"
                                alt="veeesion"
                                className="h-8 md:h-10 object-contain block"
                            />
                        </Link>

                        <div className="justify-self-end relative flex items-center gap-4 md:gap-6">
                            {/* Panier (toggle) */}
                            <button
                                type="button"
                                aria-label="Ouvrir le panier"
                                onClick={() => setCartOpen((v) => !v)}
                                className="relative hover:opacity-80"
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
                                className="flex items-center justify-center h-10 w-10 md:h-[4.25rem] md:w-[4.25rem] hover:opacity-80"
                            >
                                <img
                                    src="/home/burger.png"
                                    alt="Ouvrir le menu"
                                    className="h-full w-full object-contain block"
                                />
                            </Link>

                            {/* Cart dropdown */}
                            {cartOpen && (
                                <div className="absolute right-24 top-18 z-30">
                                    <div className="relative">
                                        <div className="w-[18rem] rounded-[0.75rem] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                                            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-black/10">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-black/10 grid place-items-center">
                                                        <img
                                                            src="/merchDetail/1/productCard-1.png"
                                                            alt=""
                                                            className="h-6 w-6 object-contain"
                                                        />
                                                    </div>
                                                    <div className="leading-tight">
                                                        <div className="text-base">Coliath HMS</div>
                                                        <div className="text-base font-semibold">13,99 €</div>
                                                    </div>
                                                </div>
                                                <button aria-label="Retirer">
                                                    <img src="/merch/remove.png" alt="" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-black/10 grid place-items-center">
                                                        <img
                                                            src="/merch/productCard-2.png"
                                                            alt=""
                                                            className="h-6 w-6 object-contain"
                                                        />
                                                    </div>
                                                    <div className="leading-tight">
                                                        <div className="text-base">Portefeuille en cuir</div>
                                                        <div className="text-base font-semibold">20,00 €</div>
                                                    </div>
                                                </div>
                                                <button aria-label="Retirer">
                                                    <img src="/merch/remove.png" alt="" />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)] w-[18rem] rounded-full py-2 text-white text-center"
                                            style={{ backgroundColor: "#65130E" }}
                                        >
                                            <span className="text-[20px] font-semibold">Continuer</span>{" "}
                                            <span className="text-[18px] font-normal ml-2">(33,99€)</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="absolute left-[5%] top-[8rem] w-[90%]">
                    <div className="grid grid-cols-[12.5rem_1fr] gap-16 relative">
                        {/* Grande image produit (vignette du milieu) */}
                        <img
                            src={
                                n === 1 && centerThumbId === 1
                                    ? `/merchDetail/1/moursquet-bg-test.png`
                                    : `/merchDetail/${n}/productCard-${centerThumbId}.png`
                            }
                            alt=""
                            className="pointer-events-none select-none absolute
                         right-[-5%] top-[-10rem] w-[60rem]
                         rotate-[21deg] z-0 opacity-100"
                        />

                        {centerThumbId === 1 && (
                            <>
                                {/* Croix 1 */}
                                <button
                                    type="button"
                                    aria-label="Détails produit"
                                    onClick={() => onCrossClick("c1")}
                                    className={`absolute z-10 left-[75%] top-[17rem] select-none
                                              transition-transform duration-200 ease-out
                                              ${activeDetail === "c1" ? "rotate-45" : "rotate-0"}`}
                                >
                                    <img src="/merchDetail/product-detail.png" alt="" className="block" />
                                </button>

                                {/* Croix 2 */}
                                <button
                                    type="button"
                                    aria-label="Détails produit"
                                    onClick={() => onCrossClick("c2")}
                                    className={`absolute z-10 left-[90%] top-[25rem] select-none
                                              transition-transform duration-200 ease-out
                                              ${activeDetail === "c2" ? "rotate-45" : "rotate-0"}`}
                                >
                                    <img src="/merchDetail/product-detail.png" alt="" className="block" />
                                </button>
                            </>
                        )}

                        {/* Colonne images (200 × 800) */}
                        <div
                            ref={colWheelRef}
                            className="w-[12.5rem] h-[45rem] flex flex-col items-center gap-4"
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
                                    className={`w-full rounded-xl p-2 ${
                                        idx === centerIndex ? "bg-white/60" : "bg-white/30"
                                    }`}
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
                        <div className="max-w-[39rem] pt-2 mx-35 my-20">
                            <h1 className="text-[#2C0D0F] font-bold leading-[0.95] tracking-tight text-[4.5rem]">
                                {product.title}
                            </h1>

                            <div className="mt-2 text-[#2C0D0F] text-[20px] font-bold">
                                {product.price}
                            </div>

                            <p className="mt-6 text-[#2C0D0F] text-[20px] leading-[1.4] font-medium">
                                {product.p1}
                            </p>
                            <p className="mt-4 text-[#2C0D0F] text-[20px] leading-[1.4] font-medium">
                                {product.p2}
                            </p>

                            <div className="mt-16 flex items-center gap-4">
                                <span className="text-[#2C0D0F] text-[20px]">Taille :</span>

                                <select
                                    className="px-4 py-2 rounded-full border border-[#2C0D0F]/30 text-[20px] bg-white/80 focus:outline-none cursor-pointer"
                                    defaultValue="Medium"
                                >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>

                            <div className="mt-16 flex items-center gap-4">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-full bg-[#F1F1F1] text-[#2C0D0F] text-[20px]"
                                >
                                    Ajouter au panier
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-full text-white text-[20px]"
                                    style={{ backgroundColor: "#65130E" }}
                                >
                                    Acheter le produit
                                </button>
                            </div>
                        </div>

                        {/* ---------- Dropdown d'information (ancré sous la croix active) ---------- */}
                        {activeDetail && centerThumbId === 1 && (
                            <div
                                ref={detailRef}
                                className="absolute z-30"
                                style={{
                                    left: activeDetail === "c1" ? "75%" : "90%",
                                    top:
                                        activeDetail === "c1"
                                            ? "calc(17rem + 3.75rem)" // 48px icône + marge ≈ 3.75rem
                                            : "calc(25rem + 3.75rem)",
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
