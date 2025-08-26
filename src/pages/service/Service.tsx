import { useEffect, useMemo, useState } from "react";

type ServiceItem = {
    id: number;
    title: string;
    img: string;
    // lignes de texte (chaque entrée sera rendue dans un <span> suivi de <br/>)
    lines: string[];
    // variante de style pour la colonne gauche (le 01 est spécial dans ta maquette)
    leftVariant: "first" | "normal";
};

function Service() {
    // --- Données (titres, images, textes) ---
    const items: ServiceItem[] = useMemo(
        () => [
            {
                id: 1,
                title: "STRATÉGIE ET DIRECTION\nARTISTIQUE DE MARQUE",
                img: "/service/service.png",
                lines: [
                    "Nous aidons chaque créateur à poser les fondations solides de sa marque en définissant votre positionnement, votre cible et vos valeurs.",
                    "Nous élaborons une vision créative globale et cohérente, que nous traduisons sur tous les supports : moodboards, univers de couleurs, matériaux, formes, et supervision des shootings photo/vidéo.",
                    "Nous assurons une conception graphique adaptée à tous les formats (web, réseaux sociaux, lookbooks, print) pour renforcer votre identité.",
                    "Chaque projet est conçu sur mesure pour créer un univers visuel qui vous ressemble, en élaborant vos gammes, votre storytelling, votre image de marque et votre stratégie de création de communauté."
                ],
                leftVariant: "first",
            },
            {
                id: 2,
                title: "SIMPLE",
                img: "/service/service-test.png",
                lines: [
                    "Nous clarifions vos priorités et votre ton de marque pour aller à l’essentiel sans compromis.",
                    "Des livrables concrets et prêts à l’emploi pour gagner du temps au quotidien."
                ],
                leftVariant: "normal",
            },
            {
                id: 3,
                title: "PRODUCTION",
                img: "/service/service-test.png",
                lines: [
                    "Pré-production, tournage et post-production : nous pilotons chaque étape avec des équipes adaptées.",
                    "Des contenus optimisés pour vos canaux clés (site, réseaux, campagnes)."
                ],
                leftVariant: "normal",
            },
            {
                id: 4,
                title: "STRATÉGIE MAKETING",
                img: "/service/service-test.png",
                lines: [
                    "Nous définissons un plan d’actions mesurable : objectifs, messages, canaux et calendrier.",
                    "Un suivi clair pour itérer sans alourdir vos process."
                ],
                leftVariant: "normal",
            },
            {
                id: 5,
                title: "CRÉATION DE CONTENU",
                img: "/service/service-test.png",
                lines: [
                    "Des formats cohérents avec votre identité : visuels, éditorial, vidéo, print.",
                    "Chaque contenu sert vos objectifs de marque et de performance."
                ],
                leftVariant: "normal",
            },
            {
                id: 6,
                title: "SUIVI DE CROISSANCE",
                img: "/service/service-test.png",
                lines: [
                    "Indicateurs simples, points réguliers et apprentissages actionnables.",
                    "Nous ajustons en continu pour maximiser l’impact."
                ],
                leftVariant: "normal",
            },
        ],
        []
    );

    // --- State ---
    const [active, setActive] = useState(0); // index 0..5
    const [phase, setPhase] = useState<"" | "leave-left" | "leave-right" | "enter-left" | "enter-right">("");
    const [isAnimating, setIsAnimating] = useState(false);

    // --- helpers animation ---
    function animateTo(targetIndex: number) {
        if (targetIndex === active || isAnimating) return;
        const dir = targetIndex > active ? 1 : -1;

        // phase 1 : on sort (slide léger + fade)
        setIsAnimating(true);
        setPhase(dir === 1 ? "leave-left" : "leave-right");

        // après la sortie, on change de contenu puis on entre
        window.setTimeout(() => {
            setActive(targetIndex);
            setPhase(dir === 1 ? "enter-right" : "enter-left");
            // fin d'entrée → reset phase
            window.setTimeout(() => {
                setPhase("");
                setIsAnimating(false);
            }, 300); // doit matcher duration-300
        }, 250); // doit matcher ~ duration-300
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function next() {
        animateTo((active + 1) % items.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function prev() {
        animateTo((active - 1 + items.length) % items.length);
    }

    // --- Scroll global (haut/bas) ⇒ précédent/suivant ---
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            // seuil pour trackpads
            if (Math.abs(e.deltaY) < 10) return;
            if (isAnimating) return;
            e.preventDefault(); // on “consomme” le scroll pendant l’anim
            if (e.deltaY > 0) next(); else prev();
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel, { capture: false });
    }, [isAnimating, active, next, prev]);

    // --- classes d’animation pour le bloc de droite ---
    const rightAnimClass =
        phase === "leave-left"
            ? "opacity-0 -translate-x-2"
            : phase === "leave-right"
                ? "opacity-0 translate-x-2"
                : phase === "enter-left"
                    ? "opacity-0 -translate-x-2"
                    : phase === "enter-right"
                        ? "opacity-0 translate-x-2"
                        : "opacity-100 translate-x-0";

    // === RENDER ===
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

                {/* Bloc gauche (liste cliquable) */}
                <div className="absolute top-48 left-32 w-[60.875rem] h-[42.625rem] bg-transparent space-y-12">
                    {/* 01 */}
                    <button
                        type="button"
                        onClick={() => animateTo(0)}
                        className="flex items-start gap-4 text-left focus:outline-none cursor-pointer"
                    >
                        <span
                            className={`mt-2 inline-flex h-8 w-7 items-center justify-center font-bold text-2xl leading-none ${
                                active === 0 ? "text-[#65130E]" : "text-[#2C0D0F]"
                            }`}
                        >
                          01
                        </span>

                        <h3
                            className={`uppercase leading-none text-5xl max-w-[57rem] ${
                                active === 0 ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F]"
                            }`}
                        >
                            STRATÉGIE ET DIRECTION<br />ARTISTIQUE DE MARQUE
                        </h3>
                    </button>

                    {/* 02 */}
                    <button
                        type="button"
                        onClick={() => animateTo(1)}
                        className="flex items-center gap-4 text-left focus:outline-none cursor-pointer"
                    >
                        <span className={`inline-flex h-8 w-8 items-center justify-center font-bold text-2xl leading-none ${active === 1 ? "text-[#65130E]" : "text-[#2C0D0F]"}`}>
                          02
                        </span>
                        <h3 className={`uppercase leading-none text-5xl ${active === 1 ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F]"}`}>
                            SIMPLE
                        </h3>
                    </button>

                    {/* 03 */}
                    <button
                        type="button"
                        onClick={() => animateTo(2)}
                        className="flex items-center gap-4 text-left focus:outline-none cursor-pointer"
                    >
                        <span className={`inline-flex h-8 w-8 items-center justify-center font-bold text-2xl leading-none ${active === 2 ? "text-[#65130E]" : "text-[#2C0D0F]"}`}>
                          03
                        </span>
                        <h3 className={`uppercase leading-none text-5xl ${active === 2 ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F]"}`}>
                            PRODUCTION
                        </h3>
                    </button>

                    {/* 04 */}
                    <button
                        type="button"
                        onClick={() => animateTo(3)}
                        className="flex items-center gap-4 text-left focus:outline-none cursor-pointer"
                    >
                        <span className={`inline-flex h-8 w-8 items-center justify-center font-bold text-2xl leading-none ${active === 3 ? "text-[#65130E]" : "text-[#2C0D0F]"}`}>
                          04
                        </span>
                        <h3 className={`uppercase leading-none text-5xl ${active === 3 ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F]"}`}>
                            STRATÉGIE MAKETING
                        </h3>
                    </button>

                    {/* 05 */}
                    <button
                        type="button"
                        onClick={() => animateTo(4)}
                        className="flex items-center gap-4 text-left focus:outline-none cursor-pointer"
                    >
                        <span className={`inline-flex h-8 w-8 items-center justify-center font-bold text-2xl leading-none ${active === 4 ? "text-[#65130E]" : "text-[#2C0D0F]"}`}>
                          05
                        </span>
                        <h3 className={`uppercase leading-none text-5xl ${active === 4 ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F]"}`}>
                            CRÉATION DE CONTENU
                        </h3>
                    </button>

                    {/* 06 */}
                    <button
                        type="button"
                        onClick={() => animateTo(5)}
                        className="flex items-center gap-4 text-left focus:outline-none cursor-pointer"
                    >
                        <span className={`inline-flex h-8 w-8 items-center justify-center font-bold text-2xl leading-none ${active === 5 ? "text-[#65130E]" : "text-[#2C0D0F]"}`}>
                          06
                        </span>
                        <h3 className={`uppercase leading-none text-5xl ${active === 5 ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F]"}`}>
                            SUIVI DE CROISSANCE
                        </h3>
                    </button>
                </div>

                {/* Bloc droit (contenu dynamique) */}
                <div className="absolute top-48 left-[69.5rem] w-[43rem] h-auto bg-transparent space-y-8">
                    {/* Image */}
                    <img
                        key={`img-${items[active].id}`}
                        src={items[active].img}
                        alt="service"
                        className={`w-full h-auto object-cover transition-all duration-300 ease-out will-change-transform ${rightAnimClass}`}
                    />

                    {/* Texte + bouton (même structure/tailles) */}
                    <div
                        key={`text-${items[active].id}`}
                        className={`text-[#2C0D0F] font-medium text-[1.25rem] leading-[1.35] space-y-0 transition-all duration-300 ease-out will-change-transform ${rightAnimClass}`}
                    >
                        {items[active].lines.map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                                {i < items[active].lines.length - 1 && <br />}
                            </span>
                        ))}

                        <button className="bg-[#65130E] text-white font-bold text-[1.25rem] tracking-[-0.02em] px-8 py-3 mt-6 rounded-full hover:opacity-90 transition cursor-pointer">
                            Contactez-nous
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Service;
