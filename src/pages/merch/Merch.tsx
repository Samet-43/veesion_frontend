import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

function Merch() {
    // 1) Déclare la liste des articles une seule fois
    const items = useMemo(
        () => [
            { id: 1, src: "/merch/productCard-1.png", title: "Coliath HMS" },
            { id: 2, src: "/merch/productCard-2.png", title: "Portefeuille en cuir" },
            { id: 3, src: "/merch/productCard-3.png", title: "Veste en cuir" },
            { id: 4, src: "/merch/productCard-4.png", title: "Sac de frappe" },
            { id: 5, src: "/merch/productCard-5.png", title: "Veste costume" },
            { id: 6, src: "/merch/productCard-6.png", title: "Lunettes de soleil" },

        ],
        []
    );

    // (on garde ton dropdown panier tel quel si tu l’utilises ici)
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <>
            <div className="relative h-screen w-screen">
                <img src="/service/backgroundImage.png" alt="" className="absolute inset-0 h-full w-full object-cover" />

                <header className="absolute z-20 left-[5%] top-8 w-[90%]">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                        <nav className="flex items-center gap-6 md:gap-10 text-base md:text-2xl font-bold">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">Service</Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">Portfolio</Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">/Merch</Link>
                        </nav>

                        <Link to="/" aria-label="Accueil" className="justify-self-center select-none">
                            <img src="/home/logo-texte-rouge.png" alt="veeesion" className="h-8 md:h-10 object-contain block" />
                        </Link>

                        <div className="justify-self-end relative flex items-center gap-4 md:gap-6">
                            <button
                                type="button"
                                aria-label="Ouvrir le panier"
                                onClick={() => setCartOpen(v => !v)}
                                className="relative hover:opacity-80"
                            >
                                <img src="/merch/panier.png" alt="Panier" />
                                {/* 🔹 Badge compteur */}
                                <span className="absolute -top-1 -right-1 bg-[#65130E] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                    2
                                </span>
                            </button>


                            <Link to="/menu" aria-label="Menu" className="flex items-center justify-center h-10 w-10 md:h-[4.25rem] md:w-[4.25rem] hover:opacity-80">
                                <img src="/home/burger.png" alt="Ouvrir le menu" className="h-full w-full object-contain block" />
                            </Link>

                            {cartOpen && (
                                <div className="absolute right-24 top-18 z-30">
                                    <div className="relative">
                                        <div className="w-[18rem] rounded-[0.75rem] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                                            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-black/10">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-black/10 grid place-items-center">
                                                        <img src="/merchDetail/1/productCard-1.png" alt="" className="h-6 w-6 object-contain" />
                                                    </div>
                                                    <div className="leading-tight">
                                                        <div className="text-base">Coltath HMS</div>
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
                                                        <img src="/merch/productCard-2.png" alt="" className="h-6 w-6 object-contain" />
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

                {/* 2) Mappe la liste pour créer les liens dynamiquement */}
                <main className="relative z-10 max-w-[90%] mx-auto py-30">
                    <div className="grid grid-cols-3 gap-16 place-items-center">
                        {items.map(({ id, src, title }) => (
                            <Link key={id} to={`/merch/${id}`} aria-label={title}>
                                <img src={src} alt={title} className="block" />
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Merch;
