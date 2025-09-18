import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <>
            <div className="relative h-screen w-screen overflow-hidden"
                 onMouseMove={handleMouseMove}
            >

                {/* Image nette */}
                <img
                    src="/home/background.jpg"
                    alt=""
                    className="absolute inset-0 h-auto w-full"
                />

                {/* Image floutée avec un "trou" qui suit la souris */}
                <img
                    src="/home/background.jpg"
                    alt=""
                    className="absolute inset-0 h-auto w-full blur-[8px] pointer-events-none"
                    style={{
                        WebkitMaskImage: `radial-gradient(circle 80px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskSize: "100% 100%",
                        maskImage: `radial-gradient(circle 80px at ${pos.x}px ${pos.y}px, transparent 0%, black 100%)`,
                        maskRepeat: "no-repeat",
                        maskSize: "100% 100%",
                    }}
                />

                {/* Cercle avec bordure */}
                <div
                    className="pointer-events-none absolute rounded-full"
                    style={{
                        width: "120px",
                        height: "120px",
                        left: `${pos.x - 60}px`,
                        top: `${pos.y - 60}px`,
                        boxShadow: "inset 0 0 10px 10px rgba(255,255,255,0.6)",
                    }}
                />

                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28">
                    <img
                        src="/home/logo.png"
                        alt="Logo"
                        className="h-full w-full object-contain"
                    />
                </div>

                <header className="absolute z-20 left-[5%] top-4 sm:top-6 md:top-8 w-[90%] h-[4.25rem]">
                    {/* top bar */}
                    <div className="flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
                        {/* liens — cachés UNIQUEMENT en mobile, visibles dès tablette */}
                        <nav className="hidden sm:flex items-center gap-6 md:gap-10 xl:order-1 font-bold
                                        text-sm md:text-xl xl:text-2xl">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">Service</Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">Portfolio</Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">Merch</Link>
                        </nav>

                        {/* logo — gauche en mobile/tablette, centré en ≥ xl */}
                        <Link to="/" aria-label="Accueil"
                              className="select-none order-1 xl:order-2 xl:justify-self-center">
                            <img src="/home/logo-texte-rouge.png" alt="veeesion"
                                 className="block h-6 xl:h-10 object-contain" />
                        </Link>

                        {/* burger — toujours à droite */}
                        <div className="order-2 xl:order-3 xl:justify-self-end">
                            <Link to="/menu" aria-label="Menu"
                                  className="flex items-center justify-center mt-1 h-[4.25rem] w-[4.25rem] hover:opacity-80">
                                <img src="/home/burger.png" alt="Ouvrir le menu"
                                     className="block h-10 w-auto object-contain" />
                            </Link>
                        </div>
                    </div>

                    {/* liens mobile/tablette sous le logo — SUPPRIMÉS (on ne les affiche plus) */}
                </header>

            </div>
        </>
    );
}

export default Home;