import {Link} from "react-router-dom";

function Merch() {
    return (
        <>
            <div className="relative h-screen w-screen">
                <img
                    src="/service/backgroundImage.png"
                    alt=""
                    className="object-cover h-full w-full"
                />

                {/* NAVBAR responsive */}
                <header className="absolute z-20 left-[5%] top-8 w-[90%] h-16 md:h-[4.25rem]">
                    <div className="relative h-full w-full flex items-center justify-between">
                        {/* Liens (gauche) */}
                        <nav className="flex gap-6 md:gap-10 text-base md:text-2xl font-bold">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80 cursor-pointer">Service</Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80 cursor-pointer">Portfolio</Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80 cursor-pointer">/Merch</Link>
                        </nav>

                        {/* Logo texte centré → Home */}
                        <Link
                            to="/"
                            aria-label="Accueil"
                            className="absolute left-1/2 -translate-x-1/2 select-none"
                        >
                            <img
                                src="/home/logo-texte-rouge.png"
                                alt="veeesion"
                                className="h-8 md:h-10 object-contain"
                            />
                        </Link>

                        {/* Burger (droite) */}
                        <Link
                            to="/menu"
                            aria-label="Menu"
                            className="flex items-center justify-center md:w-[4.25rem] md:h-[4.25rem] w-[3.125rem] h-[3.125rem] cursor-pointer"
                        >
                            <img
                                src="/home/burger.png"
                                alt="Ouvrir le menu"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    </div>
                </header>

            </div>
        </>
    )
}

export default Merch
