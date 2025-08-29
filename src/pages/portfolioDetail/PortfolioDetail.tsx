import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

function PortfolioDetail() {
    const { id } = useParams();
    const n = Math.max(1, Math.min(7, Number(id) || 1));
    const heroSrc = `/portfolio/pic-${n}.jpg`;

    const { title, date, color } = useMemo(() => {
        const map: Record<number, { title: string; date: string; color: string }> = {
            1: { title: "Project 1", date: "08.25", color: "#0D0221" },
            2: { title: "Project 2", date: "08.25", color: "#121417" },
            3: { title: "Project 3", date: "08.25", color: "#6B5F52" },
            4: { title: "YTZ Studio", date: "08.25", color: "#2C0D0F" },
            5: { title: "Project 5", date: "08.25", color: "#0A0A0A" },
            6: { title: "Project 6", date: "08.25", color: "#A78B73" },
            7: { title: "Project 7", date: "08.25", color: "#123456" },
        };
        return map[n];
    }, [n]);

    return (
        <>
            <div className="relative"
                 style={{ backgroundColor: color }}
            >
                {/* NAVBAR */}
                <header className="sticky top-0 z-20 w-[90%] mx-auto h-14 md:h-[4.25rem] pt-10">
                    <div className="relative h-full w-full flex items-center justify-between">
                        <Link
                            to="/portfolio"
                            aria-label="Retour"
                            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-[4.25rem] md:h-[4.25rem] hover:opacity-80 select-none"
                        >
                            <img src="/portfolioDetail/back.png" alt="Retour" className="w-full h-full object-contain" />
                        </Link>

                        <Link
                            to="/"
                            aria-label="Accueil"
                            className="absolute left-1/2 -translate-x-1/2 select-none"
                        >
                            <img
                                src="/home/logo.png"
                                alt="Accueil"
                                className="object-contain
                  w-16 h-16 sm:w-20 sm:h-20 md:w-[5.36625rem] md:h-[5.56875rem]"
                            />
                        </Link>

                        <Link
                            to="/menu"
                            aria-label="Menu"
                            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-[4.25rem] md:h-[4.25rem] hover:opacity-80"
                        >
                            <img
                                src="/portfolioDetail/burger-white.png"
                                alt="Ouvrir le menu"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    </div>
                </header>

                {/* HERO */}
                <img
                    src={heroSrc}
                    alt={`Projet ${n}`}
                    className="
                                w-full object-cover object-[center_35%] select-none
                                h-[22rem] sm:h-[28rem] md:h-[36rem] lg:h-[44rem] xl:h-[50rem]
                                mt-14 md:-mt-[4.25rem]
                              "
                />


                {/* CONTENU */}
                <section style={{ backgroundColor: color }}>
                    <div className="mx-auto w-[90%] pt-6 sm:pt-10 md:pt-12">
                        {/* Titre + date */}
                        <div className="flex flex-col text-center">
                            <h1
                                className="
                                          text-[#F1F1F1] font-bold uppercase leading-[0.9]
                                          tracking-tight
                                          text-[clamp(2.25rem,10vw,15rem)]
                                        "
                            >
                                {title}
                            </h1>
                            <span className="text-[#F1F1F1] text-base sm:text-lg md:text-2xl mb-2 text-right pr-4 sm:pr-10 md:pr-20">
                              {date}
                            </span>
                        </div>

                        {/* 2 colonnes (nav + contenu) */}
                        <div
                            className="
                                    grid gap-x-10
                                    md:grid-cols-[11.875rem_minmax(0,1fr)]
                                    md:gap-x-16 lg:gap-x-24
                                    mt-16 sm:mt-24 md:mt-[16.25rem]
                                  "
                        >
                            {/* Colonne gauche - ancres (cachée en < md) */}
                            <ul className="hidden md:flex flex-col w-[11.875rem] space-y-6 lg:space-y-8 text-[#F1F1F1] text-lg lg:text-2xl sticky top-28">
                                <li><a href="#strategie" className="hover:opacity-90">Stratégie</a></li>
                                <li><a href="#sample" className="hover:opacity-90">Sample</a></li>
                                <li><a href="#shooting" className="hover:opacity-90">Shooting</a></li>
                            </ul>

                            {/* Colonne droite - contenu */}
                            <div className="max-w-[76.5rem] flex flex-col gap-y-16 sm:gap-y-20 md:gap-y-[12.5rem]">
                                {/* ===== Stratégie ===== */}
                                <section id="strategie">
                                    <h2 className="text-[#F1F1F1] font-semibold text-2xl sm:text-3xl md:text-[2.5rem] leading-none">
                                        L’ADN en Vision
                                    </h2>

                                    <div className="text-[#F1F1F1] text-base sm:text-lg mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                                        <p>
                                            Nous avons débuté par une immersion complète dans l’univers de la marque,
                                            en explorant son ADN, ses inspirations et sa vision stylistique. L’objectif
                                            était clair : construire une direction artistique capable de refléter son
                                            identité unique tout en affirmant son positionnement haut de gamme et tendance.
                                        </p>
                                        <p>
                                            Nous avons analysé les tendances actuelles du marché de la mode, étudié les codes
                                            visuels de la concurrence et identifié les éléments différenciateurs. Cette réflexion
                                            stratégique nous a permis de définir une palette de couleurs audacieuse, des
                                            typographies affirmées et un style visuel qui respire l’élégance et la modernité.
                                        </p>
                                        <p>
                                            Chaque choix a été pensé pour sublimer la marque et séduire un public sensible
                                            à l’esthétique et au raffinement.
                                        </p>
                                    </div>

                                    <div className="mt-12 sm:mt-16 md:mt-24">
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-1.png"
                                            alt="ADN en Vision"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </section>

                                {/* ===== Sample ===== */}
                                <section id="sample">
                                    <h2 className="text-[#F1F1F1] font-semibold text-2xl sm:text-3xl md:text-[2.5rem] leading-none">
                                        Esquisses de Style
                                    </h2>

                                    <div className="text-[#F1F1F1] text-base sm:text-lg mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                                        <p>
                                            Afin de donner vie à cette vision, nous avons conçu une série de maquettes et
                                            échantillons visuels inspirés des moodboards élaborés en amont. Les compositions
                                            mélangeaient textures textiles, motifs graphiques et ambiances chromatiques en
                                            lien direct avec l’univers de la mode contemporaine.
                                        </p>
                                        <p>
                                            Ce travail préparatoire a permis de tester plusieurs déclinaisons créatives :
                                            jeux de typographies minimalistes, superpositions élégantes et mises en page
                                            inspirées des magazines haut de gamme.
                                        </p>
                                        <p>
                                            Chaque sample a été pensé comme une vitrine de l’ADN de la marque, permettant de
                                            valider le ton, le rythme et l’esthétique générale avant le passage en production.
                                        </p>
                                    </div>
                                </section>

                                {/* ===== Shooting ===== */}
                                <section id="shooting">
                                    <h2 className="text-[#F1F1F1] font-semibold text-2xl sm:text-3xl md:text-[2.5rem] leading-none">
                                        L’Image Signature
                                    </h2>

                                    <div className="text-[#F1F1F1] text-base sm:text-lg mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                                        <p>
                                            Pour capturer l’essence de la marque, nous avons organisé un shooting mêlant
                                            sophistication et spontanéité. Les modèles, soigneusement sélectionnés, ont été
                                            mis en scène dans des décors urbains et architecturaux qui soulignent l’audace
                                            et l’élégance des pièces.
                                        </p>
                                        <p>
                                            Nous avons travaillé la lumière pour créer des contrastes subtils : douceur diffuse
                                            pour révéler les textures, éclats lumineux pour mettre en valeur les coupes et les
                                            détails. Chaque cliché a été pensé comme une page d’éditorial mode : expressif,
                                            immersif et parfaitement aligné avec la direction artistique définie.
                                        </p>
                                        <p>
                                            Le résultat final est un ensemble d’images à fort impact visuel, prêtes à habiller
                                            campagnes, réseaux sociaux et lookbooks.
                                        </p>
                                    </div>

                                    {/* Grilles d'images (stack en mobile, 2 colonnes dès sm) */}
                                    <div className="mt-12 sm:mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-2.png"
                                            alt="Image 2"
                                            className="w-full h-auto object-cover"
                                        />
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-3.png"
                                            alt="Image 3"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>

                                    <div className="mt-16 sm:mt-20 md:mt-[12.25rem] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-4.png"
                                            alt="Image 4"
                                            className="w-full h-auto object-cover"
                                        />
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-5.png"
                                            alt="Image 5"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>

                                    <div className="mt-16 sm:mt-20 md:mt-[12.25rem] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-6.png"
                                            alt="Image 6"
                                            className="w-full h-auto object-cover"
                                        />
                                        <img
                                            src="/portfolioDetail/4/portfoliodetail-7.png"
                                            alt="Image 7"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bandeau final */}
                <div className="mt-24 sm:mt-40 md:mt-80">
                    <img
                        src="/portfolioDetail/veeesion.png"
                        alt="Veeesion"
                        className="w-full h-auto select-none object-cover"
                    />
                </div>
            </div>
        </>
    );
}

export default PortfolioDetail;
