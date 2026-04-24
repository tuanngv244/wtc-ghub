"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/button";
import { CardGameMini } from "@/components/ui/card-game-mini";
import { ControlSlider } from "@/components/ui/control-slider";
import { SVG } from "@/components/ui/svgs";
import { ALL_GAMES } from "@/constants/mock-data";
import { useGameDrawerStore } from "@/stores/use-game-drawer-store";
import { IGame } from "@/types/game";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { Splide as SplideCore } from "@splidejs/splide";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NextFavoriteGames() {
  const { openWithGame } = useGameDrawerStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleView = (data: IGame) => {
    openWithGame(data);
  };

  /* ── GSAP scroll-triggered entrance animation ────────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const scroller = document.querySelector(".main-wrapper");

    const ctx = gsap.context(() => {
      /* Title + subtitle fade up */
      const title = el.querySelector(".fav-title");
      const subtitle = el.querySelector(".fav-subtitle");

      if (title) {
        gsap.set(title, { opacity: 0, y: 30 });
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
        });
      }

      if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: 20 });
        gsap.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title || subtitle,
            start: "top 80%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
        });
      }

      /* Street light — slide up from bottom, then infinite gentle sway */
      const streetLight = el.querySelector(".fav-street-light");
      if (streetLight) {
        gsap.set(streetLight, { opacity: 0, y: 60 });
        gsap.to(streetLight, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
          onComplete: () => {
            /* Infinite subtle spotlight sway after entrance */
            gsap.to(streetLight, {
              rotateZ: 2,
              duration: 2.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              transformOrigin: "top center",
            });
          },
        });
      }

      /* Person — slide in from left */
      const person = el.querySelector(".fav-person");
      if (person) {
        gsap.set(person, { opacity: 0, x: -60 });
        gsap.to(person, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
        });
      }

      /* Content card — fade up */
      const contentCard = el.querySelector(".fav-content-card");
      if (contentCard) {
        gsap.set(contentCard, { opacity: 0, y: 40 });
        gsap.to(contentCard, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentCard,
            start: "top 80%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
        });
      }

      /* Slider — slide in from right */
      const slider = el.querySelector(".fav-slider");
      if (slider) {
        gsap.set(slider, { opacity: 0, x: 60 });
        gsap.to(slider, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slider,
            start: "top 80%",
            once: true,
            ...(scroller ? { scroller } : {}),
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="favorite-games" className="mt-3 w-full px-0">
      <div
        ref={sectionRef}
        className="frame py-15 md:py-20 lg:py-50 relative w-full overflow-hidden"
      >
        {/* cloud top */}
        <img
          src="/images/assets/cloud-top.png"
          alt="cloud top"
          className="absolute w-full h-15 md:h-35 z-2  top-0 left-0"
        />

        {/* street light */}
        <img
          src="/images/assets/street-light.png"
          alt="street light"
          className="fav-street-light absolute bottom-0 left-0 z-2 w-1/2 h-1/2"
        />
        {/* person */}
        <img
          src="/images/assets/favorite-person.png"
          alt="person"
          className="fav-person absolute z-3 hidden md:block  w-[180px] h-auto sm:w-[250px] md:w-[300px]  lg:w-[400px]  2xl:w-[450px] bottom-0 left-0"
        />

        <div className="absolute z-1 bottom-0 left-0 w-full bg-[#CEE1FF]   h-[calc(100%-60px)] md:h-[calc(100%-140px)]"></div>

        <div className="relative z-2 flex flex-col items-center ">
          {/* intro */}
          <h3 className="fav-title relative text-black  [text-shadow:2px_0_#fff,-2px_0_#fff,0_2px_#fff,0_-2px_#fff,1px_1px_#fff,-1px_-1px_#fff,1px_-1px_#fff,-1px_1px_#fff,4px_4px_0_#ADCBFF] text-2xl sm:text-4xl md:text-5xl leading-tight md:leading-14.5 font-bold text-center">
            Your next{" "}
            <span className="text-(--color-camelia-500)">favorite</span> games
          </h3>
          <p className="fav-subtitle mt-1.5 text-[18px] leading-5.5 font-pangram font-medium text-grey-500">
            We pick the game base on your interest
          </p>
        </div>

        <div className="relative z-2 flex flex-col md:flex-row md:items-center md:pl-[36%] mt-2 md:mt-8 px-4 md:px-0 gap-6 md:gap-0">
          {/* content */}
          <div className="fav-content-card flex items-center gap-8 w-full md:max-w-70 md:min-w-70 p-3">
            <div className="flex flex-col">
              <h5 className="text-[28px] font-bold leading-[100%] font-pangram text-[#302F2B]">
                Codenames
              </h5>
              <p className="text-sm leading-5 font-normal text-grey-500 mt-1.5 mb-3">
                Easy to learn and endlessly replayable, Codenames inspires
                clever clues, bold guesses, and memorable game experiences.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <SVG.User size={12} />
                  <span className="text-[13px] leading-3 font-pangram font-semibold text-[#343434]">
                    Multiplayers
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <SVG.Subtract size={12} />
                  <span className="text-[13px] leading-3 font-pangram font-semibold text-[#343434]">
                    10-15 mins
                  </span>
                </div>
              </div>

              <div className=" mt-5 flex items-center justify-start gap-1.5 ">
                <Button
                  variant="tertiary"
                  shape="circle"
                  onClick={() => handleView(ALL_GAMES[0])}
                >
                  <SVG.Eye />
                </Button>
                <Button
                  variant="secondary"
                  shape="pill-shape"
                  onClick={() => {}}
                >
                  GAME ON!
                </Button>
              </div>
            </div>
          </div>

          {/* slider */}
          <FavoriteSlider data={ALL_GAMES} />
        </div>

        {/* cloud bottom */}
        <img
          src="/images/assets/cloud-bottom.png"
          alt="cloud bottom"
          className="absolute z-4 w-full  h:15 md:h-35 bottom-0 left-0"
        />
      </div>
    </SectionWrapper>
  );
}

const FavoriteSlider = ({ data }: { data: IGame[] }) => {
  const splideRef = useRef<SplideCore | null>(null);

  const onPrev = () => {
    splideRef.current!.go("<");
  };
  const onNext = () => {
    splideRef.current!.go(">");
  };

  return (
    <div className="fav-slider relative p-4 sm:p-6 pb-8 sm:pb-12 bg-white border w-full border-solid border-[#8AB5FE] rounded-[24px] sm:rounded-[48px] drop-shadow-[8px_4px_0_#8AB5FE]">
      <Splide
        hasTrack={false}
        ref={splideRef}
        options={{
          rewind: true,
          gap: "1.5rem",
          perPage: 3,
          perMove: 1,
          type: "loop",
          arrows: false,
          pagination: false,
          autoHeight: true,
          breakpoints: {
            1560: {
              perPage: 3,
            },
            1024: {
              perPage: 3,
            },
            768: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }}
      >
        <SplideTrack>
          {data.map((item, index) => (
            <SplideSlide key={index}>
              <div className="flex flex-col gap-2">
                <CardGameMini
                  isCardTitleOutside
                  imageUrl={item.url}
                  gameData={{
                    name: item.name,
                    url: item.url,
                    description: item.description,
                    minPlayers: item.minPlayers,
                    maxPlayers: item.maxPlayers,
                    minTimes: item.minTimes,
                    maxTimes: item.maxTimes,
                    years: item.years,
                    types: item.types,
                    providers: item.providers,
                  }}
                />
                <h5 className="text-sm leading-4.5 text-grey-900 font-pangram font-bold line-clamp-1">
                  {item.name}
                </h5>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
      <div className="mt-4 sm:absolute sm:-bottom-6 sm:left-6">
        <ControlSlider onNext={onNext} onPrev={onPrev} />
      </div>
    </div>
  );
};
