function Service() {
    return (
        <>
            <div className="relative h-screen w-screen">
                {/* Background */}
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

                {/* Bloc gauche */}
                <div className="absolute top-48 left-32 w-[60.875rem] h-[42.625rem] bg-transparent space-y-12">

                    <div className="flex items-start gap-4">
                        <span className="mt-2 inline-flex h-8 w-7 items-center justify-center text-[#65130E] font-bold text-2xl leading-none">
                            01
                        </span>
                        <h3 className="uppercase font-bold text-[#65130E] leading-none text-5xl max-w-[57rem]">
                            STRATÉGIE ET DIRECTION<br />ARTISTIQUE DE MARQUE
                        </h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center text-[#2C0D0F] font-bold text-2xl leading-none">
                            02
                        </span>
                        <h3 className="uppercase font-normal text-[#2C0D0F] leading-none text-5xl">
                            SIMPLE
                        </h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center text-[#2C0D0F] font-bold text-2xl leading-none">
                            03
                        </span>
                        <h3 className="uppercase font-normal text-[#2C0D0F] leading-none text-5xl">
                            PRODUCTION
                        </h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center text-[#2C0D0F] font-bold text-2xl leading-none">
                            04
                        </span>
                        <h3 className="uppercase font-normal text-[#2C0D0F] leading-none text-5xl">
                            STRATÉGIE MAKETING
                        </h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center text-[#2C0D0F] font-bold text-2xl leading-none">
                            05
                        </span>
                        <h3 className="uppercase font-normal text-[#2C0D0F] leading-none text-5xl">
                            CRÉATION DE CONTENU
                        </h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center text-[#2C0D0F] font-bold text-2xl leading-none">
                            06
                        </span>
                        <h3 className="uppercase font-normal text-[#2C0D0F] leading-none text-5xl">
                            SUIVI DE CROISSANCE
                        </h3>
                    </div>
                </div>

                {/* Bloc droit */}
                <div className="absolute top-48 left-[69.5rem] w-[43rem] h-auto bg-transparent space-y-8">

                    <img
                        src="/service/service.png"
                        alt="service"
                        className="w-full h-auto object-cover"
                    />

                    <div className="text-[#2C0D0F] font-medium text-[1.25rem] leading-[1.35] space-y-0">
                       <span>
                        Nous aidons chaque créateur à poser les fondations solides de sa marque
                        en définissant votre positionnement, votre cible et vos valeurs.
                      </span>
                      <br />
                      <span>
                        Nous élaborons une vision créative globale et cohérente, que nous traduisons
                        sur tous les supports : moodboards, univers de couleurs, matériaux, formes,
                        et supervision des shootings photo/vidéo.
                      </span>
                      <br/><br/>
                      <span>
                        Nous assurons une conception graphique adaptée à tous les formats
                        (web, réseaux sociaux, lookbooks, print) pour renforcer votre identité.
                      </span>
                      <br/><br/>
                      <span>
                        Chaque projet est conçu sur mesure pour créer un univers visuel qui vous
                        ressemble, en élaborant vos gammes, votre storytelling, votre image de marque
                        et votre stratégie de création de communauté.
                      </span>

                      <button className="bg-[#65130E] text-white font-bold text-[1.25rem] tracking-[-0.02em] px-8 py-3 mt-6 rounded-full hover:opacity-90 transition">
                          Contactez-nous
                      </button>

                    </div>

                </div>


            </div>
        </>
    )
}

export default Service
