import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

function PortfolioDetail() {
    const { id } = useParams();
    const n = Math.max(1, Math.min(7, Number(id) || 1));
    const heroSrc = `/portfolio/pic-${n}.jpg`;

    // title / date depuis l'id
    const { title, date } = useMemo(() => {
        const map: Record<number, { title: string; date: string }> = {
            1: { title: "Project 1", date: "08.25" },
            2: { title: "Project 2", date: "08.25" },
            3: { title: "Project 3", date: "08.25" },
            4: { title: "YTZ Studio", date: "08.25" },
            5: { title: "Project 5", date: "08.25" },
            6: { title: "Project 6", date: "08.25" },
            7: { title: "Project 7", date: "08.25" },
        };
        return map[n] ?? { title: `Project ${n}`, date: "" };
    }, [n]);

    return (
        <>
            <div className="relative bg-[#2C0D0F]">
                {/* HERO */}
                <img
                    src={heroSrc}
                    alt={`Projet ${n}`}
                    className="w-full h-[50rem] object-cover object-[center_35%] select-none"
                />

                {/* NAVBAR responsive */}
                <header className="absolute z-20 left-[5%] top-12 w-[90%] h-16 md:h-[4.25rem]">

                    <div className="relative h-full w-full flex items-center justify-between">
                        <Link
                            to="/portfolio"
                            aria-label="Retour"
                            className="flex items-center justify-center w-[3.125rem] h-[3.125rem] md:w-[4.25rem] md:h-[4.25rem] hover:opacity-80 cursor-pointer select-none"
                        >
                            <img src="/portfolioDetail/back.png" alt="Retour" />
                        </Link>


                        <Link
                            to="/"
                            aria-label="Accueil"
                            className="absolute left-1/2 -translate-x-1/2 select-none"
                        >
                            <img
                                src="/home/logo.png"
                                alt="Accueil"
                                className="w-[5.36625rem] h-[5.56875rem] object-contain"
                            />
                        </Link>

                        <Link
                            to="/menu"
                            aria-label="Menu"
                            className="flex items-center justify-center md:w-[4.25rem] md:h-[4.25rem] w-[3.125rem] h-[3.125rem] cursor-pointer"
                        >
                            <img
                                src="/portfolioDetail/burger-white.png"
                                alt="Ouvrir le menu"
                                className="w-full h-full object-contain"
                            />
                        </Link>
                    </div>
                </header>

                {/* Titre + date */}
                <section className="bg-[#2C0D0F]">
                    <div className="mx-auto w-[90%] pt-8">
                        <div className="flex flex-col text-center">
                            <h1
                                className="
                                  text-[#F1F1F1] font-bold uppercase leading-none
                                  tracking-tight
                                  text-[clamp(3rem,12vw,15rem)]
                                "
                            >
                                {title}
                            </h1>
                            <span className="text-[#F1F1F1] text-xl md:text-2xl mb-2 text-right pr-50">
                                {date}
                            </span>
                        </div>

                        {/* Bloc 2 colonnes */}
                        <div className="grid grid-cols-[11.875rem_minmax(0,1fr)] gap-x-24 mt-[16.25rem]">
                            {/* Colonne gauche */}
                            <ul className="hidden md:flex flex-col w-[11.875rem] space-y-8 text-[#F1F1F1] text-2xl">
                                <li><a href="#strategie">Stratégie</a></li>
                                <li><a href="#sample">Sample</a></li>
                                <li><a href="#shooting">Shooting</a></li>
                            </ul>

                            {/* Colonne droite */}
                            <div className="max-w-[76.5rem] space-y-32 flex flex-col gap-y-[12.5rem] ">

                                <section id="strategie">
                                    <h2 className="text-[#F1F1F1] font-semibold text-[2.5rem] leading-none">
                                        L’ADN en Vision
                                    </h2>

                                    {/* Texte (32px sous le titre) */}
                                    <div className="text-[#F1F1F1] text-lg mt-8 space-y-6">
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

                                    {/* Première image (96px sous le texte) */}
                                    <div className="mt-24">
                                        <img src="/portfolioDetail/4/portfoliodetail-1.png" alt="ADN en Vision" className="w-full" />
                                    </div>
                                </section>

                                <section id="sample">
                                    <h2 className="text-[#F1F1F1] font-semibold text-[2.5rem] leading-none">
                                        Esquisses de Style
                                    </h2>

                                    {/* Texte (32px sous le titre) */}
                                    <div className="text-[#F1F1F1] text-lg mt-8 space-y-6">
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


                                <section id="shooting">
                                    <h2 className="text-[#F1F1F1] font-semibold text-[2.5rem] leading-none">
                                        L’Image Signature
                                    </h2>

                                    {/* Texte (32px sous le titre) */}
                                    <div className="text-[#F1F1F1] text-lg mt-8 space-y-6">
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

                                    {/* Bloc images 2 & 3 */}
                                    <div className="mt-24 flex justify-between">
                                        <img src="/portfolioDetail/4/portfoliodetail-2.png" alt="Image 2"/>
                                        <img src="/portfolioDetail/4/portfoliodetail-3.png" alt="Image 3"/>
                                    </div>

                                    {/* Bloc images 4 & 5 */}
                                    <div className="mt-[12.25rem] flex justify-between">
                                        <img src="/portfolioDetail/4/portfoliodetail-4.png" alt="Image 4"/>
                                        <img src="/portfolioDetail/4/portfoliodetail-5.png" alt="Image 5"/>
                                    </div>

                                    {/* Bloc images 6 & 7 */}
                                    <div className="mt-[12.25rem] flex justify-between">
                                        <img src="/portfolioDetail/4/portfoliodetail-6.png" alt="Image 6"/>
                                        <img src="/portfolioDetail/4/portfoliodetail-7.png" alt="Image 7"/>
                                    </div>


                                </section>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Image finale */}
                <div className="mt-80">
                    <img
                        src="/portfolioDetail/veeesion.png"  // 🔹 tu remplaceras par ton lien
                        alt="Veeesion"
                        className="w-full select-none"
                    />
                </div>
            </div>
        </>
    );
}

export default PortfolioDetail;
