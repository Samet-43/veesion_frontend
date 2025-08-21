const Menu = () => {
    return (
        <div className="relative w-full h-screen bg-[#2C0D0F]">
            {/* Bouton Close */}
            <a
                href="/"
                aria-label="Fermer le menu"
                className="absolute top-16 right-28 w-16 h-16"
            >
                <img
                    src="/menu/close.png"
                    alt="Fermer"
                    className="w-full h-full object-contain"
                />
            </a>

            {/* Navigation gauche */}
            <nav className="absolute left-28 top-52 flex flex-col gap-12">
                <a href="/" className="text-white text-6xl font-normal leading-none hover:opacity-80">
                    Accueil
                </a>
                <a href="/services" className="text-white text-6xl font-normal leading-none hover:opacity-80">
                    Service
                </a>
                <a href="/portfolio" className="text-white text-6xl font-normal leading-none hover:opacity-80">
                    Portfolio
                </a>
                <a href="/merch" className="text-white text-6xl font-normal leading-none hover:opacity-80">
                    Merch
                </a>
            </nav>

            {/* Image */}
            <div className="absolute top-71.5 left-1/3">
                <img
                    src="/menu/menu.png"
                    alt="Visuel menu"
                    className="w-11/13 h-auto object-cover"
                />
            </div>

            {/* Texte à droite */}
            <div className="absolute top-52 right-32 w-120 text-white text-right">
                <h2 className="font-bold text-7xl">
                    Parlons de votre projet
                </h2>

                <p className="mt-10 text-xl leading-7 text-[#F1F1F1]">
                    Chaque grande idée commence par une simple conversation. Que ce soit pour un
                    conseil, un devis ou un accompagnement complet, nous sommes prêts à vous écouter.
                </p>

                <div className="mt-32 space-y-6 text-right text-white text-4xl">
                    <p>hi@veesion.com</p>
                    <p>+32468123456</p>
                </div>

            </div>

        </div>
    );
};

export default Menu;
