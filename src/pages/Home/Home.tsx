function Home() {
    // Position et taille de la sphère
    const SPOT_X = "61%";   // horizontal
    const SPOT_Y = "42.4%"; // vertical
    const SPOT_R = 57;      // rayon en px

    return (
        <>
            <div className="relative h-screen w-screen overflow-hidden">
                {/* Fond flouté */}
                <img
                    src="/cottonBro.jpg"
                    alt=""
                    className="object-cover blur-[7px] h-full w-full"
                />

                {/* Cercle net */}
                <img
                    src="/cottonBro.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover blur-[1px]"
                    style={{ clipPath: `circle(${SPOT_R}px at ${SPOT_X} ${SPOT_Y})` }}
                />

                {/* Bordure floue en shadow interne */}
                <div
                    className="absolute rounded-full pointer-events-none shadow-[inset_0_0_7px_5px_rgba(255,255,255,0.8)]"
                    style={{
                        left: SPOT_X,
                        top: SPOT_Y,
                        width: `${SPOT_R * 2}px`,
                        height: `${SPOT_R * 2}px`,
                        transform: "translate(-50%, -50%)",
                    }}
                />

                {/* Logo en bas à droite */}
                <div className="absolute bottom-6 right-6 w-20 h-20 md:w-28 md:h-28">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>

                {/* NAVBAR responsive */}
                <header className="absolute z-20 left-[5%] top-8 w-[90%] h-16 md:h-[68px]">
                    <div className="relative h-full w-full flex items-center justify-between">
                        {/* Liens (gauche) */}
                        <nav className="flex gap-6 md:gap-10 text-base md:text-2xl font-bold">
                            <a href="/services" className="text-[#2C0D0F] hover:opacity-80">Service</a>
                            <a href="/portfolio" className="text-[#2C0D0F] hover:opacity-80">Portfolio</a>
                            <a href="/merch" className="text-[#2C0D0F] hover:opacity-80">Merch</a>
                        </nav>

                        {/* Logo texte centré */}
                        <div className="absolute left-1/2 -translate-x-1/2 select-none pointer-events-none">
                            <img
                                src="/logo-texte-rouge.png"
                                alt="veeesion"
                                className="h-8 md:h-10 object-contain"
                            />
                        </div>

                        {/* Burger (droite) */}
                        <a
                            href="/menu"
                            aria-label="Menu"
                            className="flex items-center justify-center md:w-[68px] md:h-[68px] w-[50px] h-[50px]"

                        >
                            <img
                                src="/burger.png"
                                alt="Ouvrir le menu"
                                className="w-full h-full object-contain"
                            />
                        </a>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Home;
