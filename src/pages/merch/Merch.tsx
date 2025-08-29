import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

function Merch() {
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

    const [cartOpen, setCartOpen] = useState(false);

    return (
        <>
            <div
                className="relative min-h-screen w-screen bg-cover bg-center bg-no-repeat"
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

                <main className="relative z-10 max-w-[90%] mx-auto pt-36 xl:pt-30">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
                        {items.map(({ id, src, title }) => (
                            <Link key={id} to={`/merch/${id}`} aria-label={title} className="block">
                                <img src={src} alt={title} className="block w-full h-auto" />
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Merch;
