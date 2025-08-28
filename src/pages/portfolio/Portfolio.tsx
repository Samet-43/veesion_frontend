import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Item = { id: number; src: string; title: string; date: string };

function Portfolio() {
    const itemsInit: Item[] = useMemo(
        () => [
            { id: 1, src: "/portfolio/pic-1.jpg", title: "Project 1", date: "08.25" },
            { id: 2, src: "/portfolio/pic-2.jpg", title: "Project 2", date: "08.25" },
            { id: 3, src: "/portfolio/pic-3.jpg", title: "Project 3", date: "08.25" },
            { id: 4, src: "/portfolio/pic-4.jpg", title: "YTZ Studio", date: "08.25" },
            { id: 5, src: "/portfolio/pic-5.jpg", title: "Project 5", date: "08.25" },
            { id: 6, src: "/portfolio/pic-6.jpg", title: "Project 6", date: "08.25" },
            { id: 7, src: "/portfolio/pic-7.jpg", title: "Project 7", date: "08.25" },
        ],
        []
    );

    const [items, setItems] = useState(itemsInit);
    const [anim, setAnim] = useState(false);
    const [shift, setShift] = useState(0);

    const centerIndex = 3;

    function rotateArray<T>(arr: T[], n: number): T[] {
        const len = arr.length;
        const k = ((n % len) + len) % len;
        return arr.slice(k).concat(arr.slice(0, k));
    }

    function slideBy(delta: number) {
        if (anim || delta === 0) return;
        setAnim(true);
        setShift(delta);
    }

    function slideTo(indexInRow: number) {
        if (anim) return;
        const delta = indexInRow - centerIndex;
        if (delta === 0) return;
        slideBy(delta);
    }

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1820px)");
        let attached = false;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 10 || anim) return;
            e.preventDefault();
            slideBy(e.deltaY > 0 ? 1 : -1);
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
    }, [anim]);

    const galleryRef = useRef<HTMLDivElement | null>(null);
    const firstCardRef = useRef<HTMLDivElement | null>(null);
    const [stepPx, setStepPx] = useState(352);

    useEffect(() => {
        const el = galleryRef.current;
        const card = firstCardRef.current;
        if (!el || !card) return;

        const measure = () => {
            const styles = window.getComputedStyle(el);
            const gap =
                parseFloat((styles as any).columnGap || styles.gap || "0") || 0;
            const width = card.offsetWidth;
            setStepPx(width + gap);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        ro.observe(card);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    const baseTranslate = -(stepPx * shift);

    return (
        <>
            <div className="relative h-screen w-screen">
                <img
                    src="/service/backgroundImage.png"
                    alt=""
                    className="object-cover h-full w-full"
                />

                <header className="absolute z-20 left-[5%] top-8 w-[90%]">
                    <div className="flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
                        <nav className="hidden xl:flex items-center gap-6 md:gap-10 text-base md:text-2xl font-bold xl:order-1">
                            <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">
                                Service
                            </Link>
                            <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">
                                /Portfolio
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
                                className="h-6 sm:h-7 lg:h-8 xl:h-10 object-contain block"
                            />
                        </Link>

                        <div className="order-2 xl:order-3 xl:justify-self-end">
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

                    <nav className="mt-4 flex justify-center gap-6 font-bold text-sm sm:text-base lg:text-lg xl:hidden">
                        <Link to="/services" className="text-[#2C0D0F] hover:opacity-80">
                            Service
                        </Link>
                        <Link to="/portfolio" className="text-[#2C0D0F] hover:opacity-80">
                            /Portfolio
                        </Link>
                        <Link to="/merch" className="text-[#2C0D0F] hover:opacity-80">
                            Merch
                        </Link>
                    </nav>
                </header>

                <div className="absolute top-80 w-full flex items-center justify-center overflow-hidden">
                    <div
                        ref={galleryRef}
                        className="flex items-end justify-center gap-10 sm:gap-16 md:gap-20 lg:gap-24 px-4"
                        style={{
                            transform: `translateX(${baseTranslate}px)`,
                            transition: anim ? "transform 500ms ease-out" : "none",
                            willChange: "transform",
                        }}
                        onTransitionEnd={() => {
                            if (!anim) return;
                            setItems((prev) => rotateArray(prev, shift));
                            setAnim(false);
                            setShift(0);
                        }}
                    >
                        {items.map(({ id, src, title, date }, idx) => {
                            const isCenter = idx === centerIndex;
                            return (
                                <div
                                    key={id}
                                    ref={idx === 0 ? firstCardRef : undefined}
                                    className="w-36 xs:w-40 sm:w-48 md:w-56 lg:w-64 flex flex-col"
                                >
                                    {isCenter ? (
                                        <Link to={`/portfolio/${id}`} className="block">
                                            <img
                                                src={src}
                                                alt={title}
                                                className="w-full h-[14rem] xs:h-[15rem] sm:h-[17rem] md:h-[20rem] lg:h-[22.5rem] object-cover transition-all duration-300 ease-out blur-0 opacity-100 -translate-y-px"
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
                                                className="w-full h-[14rem] xs:h-[15rem] sm:h-[17rem] md:h-[20rem] lg:h-[22.5rem] object-cover transition-all duration-300 ease-out blur-sm opacity-90 translate-y-0"
                                            />
                                        </button>
                                    )}

                                    <div
                                        className={[
                                            "mt-5 flex items-center justify-between transition-all duration-300 ease-out",
                                            isCenter
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 -translate-y-1",
                                        ].join(" ")}
                                    >
                                        <span className="text-[#2C0D0F] font-bold text-base sm:text-lg md:text-xl leading-none pb-1">
                                          {title}
                                        </span>
                                        <span className="text-[#2C0D0F] text-base sm:text-lg md:text-xl leading-none">
                                          {date}
                                        </span>
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
