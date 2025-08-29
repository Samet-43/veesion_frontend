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
        const mq = window.matchMedia("(min-width: 1820px)");
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
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10 bg-[url('/service/backgroundImage.png')] bg-cover bg-center bg-no-repeat"
            />

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

            {/* Desktop */}
            <div className="hidden min-[1820px]:block">
                <div className="absolute top-48 left-32 w-[60.875rem] h-[42.625rem] space-y-12">
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => animateTo(index)}
                            className="flex items-start gap-4 text-left cursor-pointer"
                        >
                            <span
                                className={`mt-2 inline-flex h-8 w-7 items-center justify-center font-bold text-2xl leading-none ${
                                    active === index ? "text-[#65130E]" : "text-[#2C0D0F]"
                                }`}
                            >
                              {String(item.id).padStart(2, "0")}
                            </span>
                            <h3
                                className={`uppercase leading-none text-5xl max-w-[57rem] ${
                                    active === index
                                        ? "font-bold text-[#65130E]"
                                        : "font-normal text-[#2C0D0F]"
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

                <div className="absolute top-48 left-[69.5rem] w-[43rem] space-y-8">
                    <img
                        key={`img-${items[active].id}`}
                        src={items[active].img}
                        alt="service"
                        className={`w-full h-auto object-cover transition-all duration-300 ease-out ${rightAnimClass}`}
                    />

                    <div
                        key={`text-${items[active].id}`}
                        className={`text-[#2C0D0F] font-medium text-[1.25rem] leading-[1.35] space-y-0 transition-all duration-300 ease-out ${rightAnimClass}`}
                    >
                        {items[active].lines.map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                                {i < items[active].lines.length - 1 && <br />}
                            </span>
                        ))}

                        <button className="bg-[#65130E] text-white font-bold text-[1.25rem] px-8 py-3 mt-6 rounded-full hover:opacity-90 transition">
                            Contactez-nous
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile / tablette avec accordéon */}
            <div className="block min-[1820px]:hidden">
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
