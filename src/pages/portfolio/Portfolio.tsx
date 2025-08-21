function Portfolio() {
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
                            <a href="/services" className="text-[#2C0D0F] hover:opacity-80">Service</a>
                            <a href="/portfolio" className="text-[#2C0D0F] hover:opacity-80">/Portfolio</a>
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

                <div className="absolute top-80 w-full h-96 flex items-center justify-center">

                    <div className="flex items-end justify-center gap-24">
                        {[
                            { id: 1, src: "/portfolio/pic-1.jpg", title: "Project 1", date: "08.25" },
                            { id: 2, src: "/portfolio/pic-2.jpg", title: "Project 2", date: "08.25" },
                            { id: 3, src: "/portfolio/pic-3.jpg", title: "Project 3", date: "08.25" },
                            { id: 4, src: "/portfolio/pic-4.jpg", title: "YTZ Studio", date: "08.25" },
                            { id: 5, src: "/portfolio/pic-5.jpg", title: "Project 5", date: "08.25" },
                            { id: 6, src: "/portfolio/pic-6.jpg", title: "Project 6", date: "08.25" },
                            { id: 7, src: "/portfolio/pic-7.jpg", title: "Project 7", date: "08.25" },
                        ].map(({ id, src, title, date }) => (
                            <div key={id} className="w-64 flex flex-col">
                                {id === 4 ? (
                                    /* Seul le centre est cliquable + légende */
                                    <>
                                        <a href={`/portfolio/${id}`} className="block">
                                            <img src={src} alt={title} className="w-64 h-[22.5rem] object-cover" />
                                        </a>
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-[#2C0D0F] font-bold text-xl leading-none border-b border-[#2C0D0F] pb-1">
                                              {title}
                                            </span>
                                            <span className="text-[#2C0D0F] text-xl leading-none">{date}</span>
                                        </div>
                                    </>
                                ) : (
                                    /* Autres : désactivés, floutés, texte invisible pour garder la hauteur */
                                    <div className="pointer-events-none">
                                        <img
                                            src={src}
                                            alt=""
                                            aria-hidden="true"
                                            className="w-64 h-[22.5rem] object-cover blur-sm opacity-90"
                                        />
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="invisible text-xl leading-none border-b pb-1">placeholder</span>
                                            <span className="invisible text-xl leading-none">00.00</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>



                </div>
            </div>
        </>
    )
}

export default Portfolio
