import { useEffect, useMemo, useState } from "react";
import {Link} from "react-router-dom";

function Portfolio() {
    const itemsInit = useMemo(
        () => [
            { id: 1, src: "/portfolio/pic-1.jpg", title: "Project 1", date: "08.25" },
            { id: 2, src: "/portfolio/pic-2.jpg", title: "Project 2", date: "08.25" },
            { id: 3, src: "/portfolio/pic-3.jpg", title: "Project 3", date: "08.25" },
            { id: 4, src: "/portfolio/pic-4.jpg", title: "YTZ Studio", date: "08.25" }, // centre par défaut
            { id: 5, src: "/portfolio/pic-5.jpg", title: "Project 5", date: "08.25" },
            { id: 6, src: "/portfolio/pic-6.jpg", title: "Project 6", date: "08.25" },
            { id: 7, src: "/portfolio/pic-7.jpg", title: "Project 7", date: "08.25" },
        ],
        []
    );

    const [items, setItems] = useState(itemsInit);
    const [shift, setShift] = useState(0);
    const [anim, setAnim] = useState(false);

    const centerIndex = 3; // l’élément visuel du centre (0..6)
    const stepSize = "22rem"; // largeur carte (16rem w-64) + gap (6rem gap-24)
    const translate = shift === 0 ? "0rem" : `calc(${stepSize} * ${shift})`;

    function rotateArray<T>(arr: T[], n: number): T[] {
        const len = arr.length;
        const k = ((n % len) + len) % len; // positif = rotation à gauche
        return arr.slice(k).concat(arr.slice(0, k));
    }

    function slideTo(indexInRow: number) {
        if (anim) return;
        const delta = indexInRow - centerIndex; // ex : cliquer l’index 4 → +1
        if (delta === 0) return;
        setAnim(true);
        setShift(delta);
    }

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 10) return;
            if (anim) return;
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            setAnim(true);
            setShift(dir);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel, { capture: false });
    }, [anim]);


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
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80 cursor-pointer">/Portfolio</Link>
                            <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80 cursor-pointer">Merch</Link>
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

                {/* Galerie avec slide */}
                <div className="absolute top-80 w-full h-100 flex items-center justify-center overflow-hidden">
                    <div
                        className="flex items-end justify-center gap-24"
                        style={{
                            transform: `translateX(calc(${translate} * -1))`,
                            transition: anim ? "transform 500ms ease-out" : "none",
                        }}
                        onTransitionEnd={() => {
                            if (!anim) return;
                            setItems(prev => rotateArray(prev, shift));
                            setAnim(false);
                            setShift(0);
                        }}
                    >
                        {items.map(({ id, src, title, date }, idx) => {
                            const isCenter = idx === centerIndex;

                            return (
                                <div key={id} className="w-64 flex flex-col">
                                    {isCenter ? (
                                        <Link to={`/portfolio/${id}`} className="block">
                                            <img
                                                src={src}
                                                alt={title}
                                                className="w-64 h-[22.5rem] object-cover transition-all duration-300 ease-out blur-0 opacity-100 -translate-y-px"
                                            />
                                        </Link>

                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => slideTo(idx)}
                                            className="block focus:outline-none"
                                        >
                                            <img
                                                src={src}
                                                alt=""
                                                aria-hidden="true"
                                                className="w-64 h-90 object-cover transition-all duration-300 ease-out blur-sm opacity-90 translate-y-0"
                                            />
                                        </button>
                                    )}

                                    <div
                                        className={[
                                            "mt-5 flex items-center justify-between transition-all duration-300 ease-out",
                                            isCenter ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
                                        ].join(" ")}
                                    >
                                        <span className="text-[#2C0D0F] font-bold text-xl leading-none pb-1">
                                          {title}
                                        </span>
                                        <span className="text-[#2C0D0F] text-xl leading-none">{date}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Portfolio;
