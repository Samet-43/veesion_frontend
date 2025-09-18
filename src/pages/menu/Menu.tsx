import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="relative w-full h-screen bg-[#2C0D0F] overflow-auto xl:overflow-hidden flex flex-col">


            <div className="flex justify-center">
                {/* Bouton Close */}
                <div className="w-[90%] h-[4.25rem] flex items-center justify-end mt-6 xl:mt-10">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.back();
                        }}
                        href="#"
                        aria-label="Fermer le menu"
                        className="cursor-pointer"
                    >
                        <img src="/menu/close.png" alt="Fermer" className="w-[80%] xl:w-full"/>
                    </a>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col justify-around h-screen xl:h-auto xl:justify-between xl:flex-row fullhd:mt-24 2k:mt-60 ">
                {/* Navigation gauche */}
                <nav className="grid grid-cols-2 gap-6 text-center xl:flex xl:flex-col xl:gap-12 xl:pl-30 xl:text-left">
                    <Link to="/" className="text-white text-3xl sm:text-4xl xl:text-6xl font-normal hover:opacity-80">Accueil</Link>
                    <Link to="/services" className="text-white text-3xl sm:text-4xl xl:text-6xl font-normal hover:opacity-80">Service</Link>
                    <Link to="/portfolio" className="text-white text-3xl sm:text-4xl xl:text-6xl font-normal hover:opacity-80">Portfolio</Link>
                    <Link to="/merch" className="text-white text-3xl sm:text-4xl xl:text-6xl font-normal hover:opacity-80">Merch</Link>
                </nav>

                {/* Texte à droite */}
                <div className="flex flex-col items-center justify-center text-center px-6 sm:px-10 text-white xl:items-end xl:text-right xl:px-0 fullhd:max-w-[30%] 2k:max-w-[25%] xl:pr-30">
                    <h2 className="font-bold text-3xl sm:text-5xl xl:text-7xl">
                        Parlons de votre projet
                    </h2>
                    <p className="mt-6 sm:mt-8 xl:mt-12 text-base sm:text-lg xl:text-xl leading-7 text-[#F1F1F1]">
                        Chaque grande idée commence par une simple conversation. Que ce soit pour un
                        conseil, un devis ou un accompagnement complet, nous sommes prêts à vous écouter.
                    </p>
                    <div className="mt-10 sm:mt-14 xl:mt-26 space-y-4 sm:space-y-6 text-lg sm:text-xl xl:text-4xl">
                        <p>hi@veesion.com</p>
                        <p>+32468123456</p>
                    </div>
                </div>

            </div>

            {/* Image décorative — reste en absolute */}
            <div className="absolute bottom-0 left-1/3 hidden xl:block">
                <img src="/menu/menu.png" alt="Visuel menu" className="fullhd:w-11/12 2k:w-[40rem] h-auto object-cover" />
            </div>
        </div>
    );
};

export default Menu;
