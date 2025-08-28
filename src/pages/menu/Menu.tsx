import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <div className="relative w-full h-screen bg-[#2C0D0F] overflow-auto xl:overflow-hidden">
                {/* Bouton Close */}
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        window.history.back();
                    }}
                    href="#"
                    aria-label="Fermer le menu"
                    className="absolute top-6 right-6 w-10 h-10 cursor-pointer xl:top-16 xl:right-28 xl:w-16 xl:h-16"
                >
                    <img src="/menu/close.png" alt="Fermer" className="w-full h-full object-contain" />
                </a>

                {/* Navigation gauche */}
                <nav
                    className="
            absolute left-6 top-24 flex flex-col gap-6
            xl:left-28 xl:top-52 xl:gap-12
          "
                >
                    <Link
                        to="/"
                        className="text-white font-normal leading-none hover:opacity-80 text-3xl sm:text-4xl xl:text-6xl"
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/services"
                        className="text-white font-normal leading-none hover:opacity-80 text-3xl sm:text-4xl xl:text-6xl"
                    >
                        Service
                    </Link>
                    <Link
                        to="/portfolio"
                        className="text-white font-normal leading-none hover:opacity-80 text-3xl sm:text-4xl xl:text-6xl"
                    >
                        Portfolio
                    </Link>
                    <Link
                        to="/merch"
                        className="text-white font-normal leading-none hover:opacity-80 text-3xl sm:text-4xl xl:text-6xl"
                    >
                        Merch
                    </Link>
                </nav>

                {/* Image — visible uniquement en desktop large */}
                <div className="absolute bottom-0 left-1/3 hidden xl:block">
                    <img src="/menu/menu.png" alt="Visuel menu" className="w-11/13 h-auto object-cover" />
                </div>

                {/* Texte à droite */}
                <div
                    className="
            absolute left-1/2 -translate-x-1/2 bottom-10 w-[90%] text-white text-center
            sm:bottom-14
            xl:translate-x-0 xl:left-auto xl:bottom-auto xl:top-52 xl:right-32 xl:w-120 xl:text-right
          "
                >
                    <h2 className="font-bold text-3xl sm:text-5xl xl:text-7xl">
                        Parlons de votre projet
                    </h2>

                    <p className="mt-6 sm:mt-8 xl:mt-10 text-base sm:text-lg xl:text-xl leading-7 text-[#F1F1F1]">
                        Chaque grande idée commence par une simple conversation. Que ce soit pour un
                        conseil, un devis ou un accompagnement complet, nous sommes prêts à vous écouter.
                    </p>

                    <div className="mt-10 sm:mt-16 xl:mt-32 space-y-3 sm:space-y-5 xl:space-y-6 text-xl sm:text-2xl xl:text-4xl">
                        <p>hi@veesion.com</p>
                        <p>+32468123456</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
