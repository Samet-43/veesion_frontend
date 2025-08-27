import {Link} from "react-router-dom";

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
                    src="/home/cottonBro.jpg"
                    alt=""
                    className="object-cover blur-[7px] h-full w-full"
                />

                {/* Cercle net */}
                <img
                    src="/home/cottonBro.jpg"
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
                    <img src="/home/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>

                <header className="absolute z-20 left-[5%] top-8 w-[90%]">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                        <nav className="flex items-center gap-6 md:gap-10 text-base md:text-2xl font-bold">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">Service</Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">Portfolio</Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">Merch</Link>
                        </nav>

                        <Link to="/" aria-label="Accueil" className="justify-self-center select-none">
                            <img
                                src="/home/logo-texte-rouge.png"
                                alt="veeesion"
                                className="h-8 md:h-10 object-contain block"
                            />
                        </Link>

                        <div className="justify-self-end">
                            <Link
                                to="/menu"
                                aria-label="Menu"
                                className="flex items-center justify-center h-10 w-10 md:h-[4.25rem] md:w-[4.25rem] hover:opacity-80"
                            >
                                <img
                                    src="/home/burger.png"
                                    alt="Ouvrir le menu"
                                    className="h-full w-full object-contain block"
                                />
                            </Link>
                        </div>
                    </div>
                </header>

            </div>
        </>
    );
}

export default Home;
