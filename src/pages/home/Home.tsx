import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="relative h-screen w-screen overflow-hidden">
                <img
                    src="/home/background.png"
                    alt=""
                    className="h-full w-full object-cover"
                />

                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28">
                    <img
                        src="/home/logo.png"
                        alt="Logo"
                        className="h-full w-full object-contain"
                    />
                </div>

                <header className="absolute z-20 left-[5%] top-4 sm:top-6 md:top-8 w-[90%]">
                    {/* top bar (mobile/tablette: logo gauche, burger droite) */}
                    <div className="flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
                        {/* liens gauche — visibles seulement en desktop ≥ xl */}
                        <nav className="hidden xl:flex items-center gap-6 md:gap-10 text-base md:text-2xl font-bold xl:order-1">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">
                                Service
                            </Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">
                                Portfolio
                            </Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">
                                Merch
                            </Link>
                        </nav>

                        {/* logo — gauche en mobile/tablette, centré en ≥ xl */}
                        <Link
                            to="/"
                            aria-label="Accueil"
                            className="select-none order-1 xl:order-2 xl:justify-self-center"
                        >
                            <img
                                src="/home/logo-texte-rouge.png"
                                alt="veeesion"
                                className="block h-7 sm:h-8 md:h-10 object-contain"
                            />
                        </Link>

                        {/* burger — toujours à droite */}
                        <div className="order-2 xl:order-3 xl:justify-self-end">
                            <Link
                                to="/menu"
                                aria-label="Menu"
                                className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-[4.25rem] md:w-[4.25rem] hover:opacity-80"
                            >
                                <img
                                    src="/home/burger.png"
                                    alt="Ouvrir le menu"
                                    className="block h-full w-full object-contain"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* liens mobile/tablette — sous le logo, en ligne */}
                    <nav className="mt-4 flex justify-center gap-6 font-bold text-sm sm:text-base lg:text-lg xl:hidden">
                        <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">
                            Service
                        </Link>
                        <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">
                            Portfolio
                        </Link>
                        <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">
                            Merch
                        </Link>
                    </nav>
                </header>
            </div>
        </>
    );
}

export default Home;
