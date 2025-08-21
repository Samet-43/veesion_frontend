function Service() {
    return (
            <>
                <div className="relative h-screen w-screen">
                    <img
                        src="/service/backgroundImage.png"
                        alt=""
                        className="object-cover h-full w-full"
                    />

                    {/* NAVBAR responsive */}
                    <header className="absolute z-20 left-[5%] top-8 w-[90%] h-16 md:h-[68px]">
                        <div className="relative h-full w-full flex items-center justify-between">
                            {/* Liens (gauche) */}
                            <nav className="flex gap-6 md:gap-10 text-base md:text-2xl font-bold">
                                <a href="/services" className="text-[#2C0D0F] hover:opacity-80">/Service</a>
                                <a href="/portfolio" className="text-[#2C0D0F] hover:opacity-80">Portfolio</a>
                                <a href="/merch" className="text-[#2C0D0F] hover:opacity-80">Merch</a>
                            </nav>

                            {/* Logo texte centré */}
                            <div className="absolute left-1/2 -translate-x-1/2 select-none pointer-events-none">
                                <img
                                    src="/home/logo-texte-rouge.png"
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
                                    src="/home/burger.png"
                                    alt="Ouvrir le menu"
                                    className="w-full h-full object-contain"
                                />
                            </a>
                        </div>
                    </header>
                </div>
        </>
    )
}

export default Service
