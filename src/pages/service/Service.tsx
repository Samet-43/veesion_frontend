import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

type ServiceItem = {
    id: number;
    title: string;
    img: string;
    lines: string[];
    leftVariant: "first" | "normal";
};

function Service() {
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
                    "Nous prenons en charge le développement de vos prototypes : sourcing et sélection de tissus, et réalisation de prototypes.",
                    "Nous effectuons des tests des matières, couleurs, texture, résistance, tombé, mouvement et ajustement pour garantir qualité, fonctionnalité et confort.",
                    "Nous créons des cartes de coloris et nuanciers sur mesure.",
                    "Ce processus minimise les risques et coûts, assurant que vos produits répondent aux standards de qualité visés et s'alignent parfaitement avec l'identité de votre marque et les attentes des consommateurs."
                ],
                leftVariant: "normal",
            },
            {
                id: 3,
                title: "PRODUCTION",
                img: "/service/service-test.png",
                lines: [
                    "Nous vous proposons deux options distinctes pour donner vie à vos collections :",
                    "Production en Atelier : Pour les petites productions, nous pouvons utiliser notre atelier en Belgique. Cela garantit un contrôle qualité constant et le label \"Made in Belgium\".",
                    "Production en Usine : Pour les volumes plus importants, nous proposons la production en usine. Cela inclut la sélection des meilleures usines pour chaque projet,",
                    "l'élaboration de fiches techniques détaillées par pièce, et un suivi de production rigoureux (contrôle qualité, logistique, etc.)."
                ],
                leftVariant: "normal",
            },
            {
                id: 4,
                title: "STRATÉGIE MARKETING",
                img: "/service/service-test.png",
                lines: [
                    "Une feuille de route viable et impactante. Nous définissons votre proposition de valeur et positionnement. Création d'une histoire de marque captivante et d'une vision claire.",
                    "Segmentation précise de l'audience pour maximiser les conversions.",
                    "Tactiques : SEO/SEA, marketing d'influence, gestion des réseaux sociaux (Instagram, TikTok), campagnes publicitaires percutantes (print/digital).",
                    "Conseils sur les canaux de distribution optimaux (e-commerce, retail) pour une cohérence de marque maximale."
                ],
                leftVariant: "normal",
            },
            {
                id: 5,
                title: "CRÉATION DE CONTENU",
                img: "/service/service-test.png",
                lines: [
                    "Le contenu est le cœur de votre visibilité. Nous créons tous les contenus de marque : photos de campagne, photos produit, et vidéos promotionnelles (à définir selon le budget).",
                    "Nous produisons du contenu dynamique pour les réseaux sociaux (Reels, TikTok, BTS, etc.).",
                    "Notre équipe inclut un Community Manager pour engager votre audience.",
                    "Un contenu percutant pour développer votre visibilité et transmettre la valeur de vos produits."
                ],
                leftVariant: "normal",
            },
            {
                id: 6,
                title: "SUIVI DE CROISSANCE",
                img: "/service/service-test.png",
                lines: [
                    "Nous proposons un suivi post-création pour assurer une croissance continue.",
                    "Ce service comprend l'analyse de données pour comprendre les performances, l'établissement d'un plan de croissance stratégique, et l'optimisation continue de vos actions pour maximiser votre impact et votre rentabilité."
                ],
                leftVariant: "normal",
            },
        ],
        []
    );

    const [active, setActive] = useState(0);
    const [phase, setPhase] = useState<
        "" | "leave-left" | "leave-right" | "enter-left" | "enter-right"
    >("");
    const [isAnimating, setIsAnimating] = useState(false);

    function animateTo(targetIndex: number) {
        if (targetIndex === active || isAnimating) return;
        const dir = targetIndex > active ? 1 : -1;
        setIsAnimating(true);
        setPhase(dir === 1 ? "leave-left" : "leave-right");
        window.setTimeout(() => {
            setActive(targetIndex);
            setPhase(dir === 1 ? "enter-right" : "enter-left");
            window.setTimeout(() => {
                setPhase("");
                setIsAnimating(false);
            }, 300);
        }, 250);
    }

    function next() {
        animateTo((active + 1) % items.length);
    }

    function prev() {
        animateTo((active - 1 + items.length) % items.length);
    }

    useEffect(() => {
        // breakpoint desktop = xl (1280px)
        const mq = window.matchMedia("(min-width: 1280px)");
        let attached = false;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 10) return;
            if (isAnimating) return;
            e.preventDefault();
            if (e.deltaY > 0) next();
            else prev();
        };

        const attach = () => {
            if (!attached) {
                window.addEventListener("wheel", onWheel, { passive: false });
                attached = true;
            }
        };
        const detach = () => {
            if (attached) {
                window.removeEventListener("wheel", onWheel);
                attached = false;
            }
        };

        const sync = () => {
            if (mq.matches) attach();
            else detach();
        };

        sync();
        mq.addEventListener("change", sync);

        return () => {
            detach();
            mq.removeEventListener("change", sync);
        };
    }, [isAnimating, active]);

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

    return (
        <div className="relative w-screen min-h-full">
            <header className="absolute z-20 left-[5%] top-4 sm:top-6 md:top-8 w-[90%] h-[4.25rem]">
                <div className="flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
                    <nav className="hidden sm:flex items-center gap-6 md:gap-10 xl:order-1 font-bold text-sm md:text-xl xl:text-2xl">
                        <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">
                            /Service
                        </Link>
                        <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">
                            Portfolio
                        </Link>
                        <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">
                            Merch
                        </Link>
                    </nav>

                    <Link
                        to="/"
                        aria-label="Accueil"
                        className="select-none order-1 xl:order-2 xl:justify-self-center"
                    >
                        <img
                            src="/home/logo-texte-rouge.png"
                            alt="veeesion"
                            className="block h-10 object-contain"
                        />
                    </Link>

                    <div className="order-2 xl:order-3 xl:justify-self-end">
                        <Link
                            to="/menu"
                            aria-label="Menu"
                            className="flex items-center justify-center h-[4.25rem] w-[4.25rem] hover:opacity-80"
                        >
                            <img
                                src="/home/burger.png"
                                alt="Ouvrir le menu"
                                className="block h-full w-full object-contain"
                            />
                        </Link>
                    </div>
                </div>
            </header>
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10 bg-[url('/service/backgroundImage.png')] bg-cover bg-center bg-no-repeat"
            />


            {/* Desktop (xl et +) */}
            <div className="hidden xl:block">
                <div className="absolute top-48 2k:top-60 3xl:top-64 left-[5%] w-[90%]
                    grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
                    gap-10 items-start">

                    {/* Colonne gauche (liste) */}
                    <div className="w-full">
                        <div className="space-y-10 fullhd:space-y-10 2k:space-y-24 4k:space-y-28">
                            {items.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => animateTo(index)}
                                    className="flex items-start gap-4 text-left cursor-pointer"
                                >
                                    <span
                                        className={`inline-flex h-8 w-7 items-center justify-center font-bold leading-none
                                            text-[clamp(1rem,1.2vw,1.5rem)] ${
                                            active === index ? "text-[#65130E]" : "text-[#2C0D0F] blur-[1px]"
                                        }`}
                                    >
                                        {String(item.id).padStart(2, "0")}
                                    </span>

                                    <h3
                                        className={`uppercase tracking-tight max-w-[60ch]
                                                    leading-[1.08] text-[clamp(2rem,3vw,3.25rem)] ${
                                            active === index ? "font-bold text-[#65130E]" : "font-normal text-[#2C0D0F] blur-[1px]"
                                        }`}
                                    >
                                        {item.title.split("\n").map((line, i) => (
                                            <span key={i} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <div className="w-full min-w-0 flex flex-col space-y-6">
                        <img
                            key={`img-${items[active].id}`}
                            src={items[active].img}
                            alt="service"
                            className={`w-full h-auto object-contain max-h-[42vh] transition-all duration-300 ease-out ${rightAnimClass}`}
                        />

                        <div
                            key={`text-${items[active].id}`}
                            className={`text-[#2C0D0F] font-medium leading-[1.35] 
                            text-[clamp(1rem,1.05vw,1.15rem)] max-w-[68ch] 
                            transition-all duration-300 ease-out ${rightAnimClass}`}
                        >
                            {items[active].lines.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br /> <br className="hidden 2k:inline"/>
                                    {i < items[active].lines.length - 1 && <br />}
                                </span>
                            ))}

                            {/* Bouton */}
                            <div className="pt-4">
                                <button className="bg-[#65130E] text-white font-bold rounded-full
                                                   text-[clamp(1rem,1.05vw,1.25rem)]
                                                   px-[clamp(1rem,1.6vw,2rem)]
                                                   py-[clamp(0.5rem,0.8vw,0.9rem)]
                                                   hover:opacity-90 transition">
                                    Contactez-nous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile / tablette (inchangé) */}
            <div className="block xl:hidden">
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] flex flex-col gap-6 pb-12">
                    {items.map((item) => (
                        <Disclosure key={item.id}>
                            {({ open }) => (
                                <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-md overflow-hidden">
                                    <DisclosureButton className="w-full flex justify-between items-center px-5 py-4 text-left">
                                        <div className="flex items-center gap-4">
                                          <span
                                              className={`inline-flex h-8 w-8 items-center justify-center font-bold text-xl sm:text-2xl ${
                                                  open ? "text-[#65130E]" : "text-[#2C0D0F]"
                                              }`}
                                          >
                                            {String(item.id).padStart(2, "0")}
                                          </span>
                                            <h3
                                                className={`uppercase leading-tight text-lg sm:text-xl font-bold ${
                                                    open ? "text-[#65130E]" : "text-[#2C0D0F]"
                                                }`}
                                            >
                                                {item.title}
                                            </h3>
                                        </div>
                                        <span className="text-2xl">{open ? "-" : "+"}</span>
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-5 pb-4 space-y-4 text-[#2C0D0F] text-sm sm:text-base">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-auto object-cover rounded-lg"
                                        />
                                        {item.lines.map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                        <button className="bg-[#65130E] text-white font-bold text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 mt-4 rounded-full hover:opacity-90 transition">
                                            Contactez-nous
                                        </button>
                                    </DisclosurePanel>
                                </div>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Service;
