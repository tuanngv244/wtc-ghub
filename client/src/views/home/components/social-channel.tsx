"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export function SocialChannel() {
  const socialsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const socials = [
    {
      label: "Discord",
      url: "#",
      imageUrl: "/images/assets/discord-social.png",
    },
    {
      label: "Facebook",
      url: "#",
      imageUrl: "/images/assets/facebook-social.png",
    },
    {
      label: "Instagram",
      url: "#",
      imageUrl: "/images/assets/instagram-social.png",
    },
  ];

  /* ── Playful infinite "fighting" animation for social icons ──
     Icons actually travel the full distance between each other so they
     visually collide. Responsive STEP is measured from DOM at runtime. */
  useEffect(() => {
    const container = socialsRef.current;
    if (!container) return;

    const icons = container.querySelectorAll<HTMLElement>(".social-icon");
    if (icons.length < 3) return;

    const [discord, facebook, instagram] = Array.from(icons);

    const ctx = gsap.context(() => {
      // Measure actual pixel gap between icon centers at runtime so it's
      // responsive. Falls back to 205 (125px icon + 80px gap) if unavailable.
      const discordRect = discord.getBoundingClientRect();
      const facebookRect = facebook.getBoundingClientRect();
      const STEP = facebookRect.left - discordRect.left || 205;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tlRef.current = tl;

      /* ── Phase 1: Idle wobble — everyone bounces lightly (0s–1s) ── */
      tl.to(
        discord,
        {
          y: -8,
          rotateZ: -5,
          duration: 0.3,
          ease: "power1.out",
          transformOrigin: "center bottom",
        },
        0,
      )
        .to(
          discord,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.3,
            ease: "bounce.out",
            transformOrigin: "center bottom",
          },
          0.3,
        )
        .to(
          facebook,
          {
            y: -6,
            rotateZ: 4,
            duration: 0.3,
            ease: "power1.out",
            transformOrigin: "center bottom",
          },
          0.15,
        )
        .to(
          facebook,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.3,
            ease: "bounce.out",
            transformOrigin: "center bottom",
          },
          0.45,
        )
        .to(
          instagram,
          {
            y: -8,
            rotateZ: -3,
            duration: 0.3,
            ease: "power1.out",
            transformOrigin: "center bottom",
          },
          0.3,
        )
        .to(
          instagram,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.3,
            ease: "bounce.out",
            transformOrigin: "center bottom",
          },
          0.6,
        );

      /* ── Phase 2: Discord charges into Facebook (1s–2.2s) ──
         No full spin — just a quick forward tilt to avoid jank */
      tl.to(
        discord,
        {
          x: STEP,
          rotateZ: 15,
          duration: 0.45,
          ease: "power2.in",
          transformOrigin: "center center",
        },
        1,
      )
        // Impact: Facebook squishes and flies right
        .to(
          facebook,
          {
            x: STEP * 0.4,
            rotateZ: -18,
            scaleX: 0.85,
            scaleY: 1.15,
            duration: 0.18,
            ease: "power3.out",
            transformOrigin: "center bottom",
          },
          1.42,
        )
        // Discord bounces back with a little rebound tilt
        .to(
          discord,
          { x: STEP * 0.6, rotateZ: -8, duration: 0.2, ease: "power1.out" },
          1.58,
        )
        // Facebook wobbles and settles
        .to(
          facebook,
          {
            x: STEP * 0.35,
            rotateZ: 6,
            scaleX: 1,
            scaleY: 1,
            duration: 0.35,
            ease: "elastic.out(1,0.4)",
            transformOrigin: "center bottom",
          },
          1.6,
        )
        // Discord settles just behind Facebook, snaps straight
        .to(
          discord,
          {
            x: STEP * 0.5,
            rotateZ: 0,
            duration: 0.3,
            ease: "elastic.out(1,0.5)",
          },
          1.8,
        );

      /* ── Phase 3: Facebook charges into Instagram (2.3s–3.2s) ── */
      tl.to(
        facebook,
        {
          x: STEP,
          rotateZ: -12,
          duration: 0.35,
          ease: "power2.in",
          transformOrigin: "center bottom",
        },
        2.3,
      )
        // Impact: Instagram squishes and flies right
        .to(
          instagram,
          {
            x: STEP * 0.4,
            rotateZ: 22,
            scaleX: 0.85,
            scaleY: 1.15,
            duration: 0.18,
            ease: "power3.out",
            transformOrigin: "center bottom",
          },
          2.62,
        )
        // Instagram bounces back with wobble
        .to(
          instagram,
          {
            x: STEP * 0.3,
            rotateZ: -10,
            scaleX: 1,
            scaleY: 1,
            duration: 0.4,
            ease: "elastic.out(1,0.3)",
            transformOrigin: "center bottom",
          },
          2.8,
        )
        // Facebook bounces back
        .to(
          facebook,
          {
            x: STEP * 0.7,
            rotateZ: 5,
            duration: 0.25,
            ease: "elastic.out(1,0.4)",
          },
          2.8,
        );

      /* ── Phase 4: Instagram retaliates — chain reaction left (3.3s–4.4s) ── */
      tl.to(
        instagram,
        {
          x: -STEP * 0.15,
          rotateZ: -18,
          duration: 0.35,
          ease: "power2.in",
          transformOrigin: "center bottom",
        },
        3.3,
      )
        // Facebook gets knocked left into Discord
        .to(
          facebook,
          {
            x: -STEP * 0.1,
            rotateZ: 14,
            scaleX: 0.85,
            scaleY: 1.15,
            duration: 0.18,
            ease: "power3.out",
            transformOrigin: "center bottom",
          },
          3.62,
        )
        .to(
          facebook,
          {
            x: STEP * 0.1,
            rotateZ: -4,
            scaleX: 1,
            scaleY: 1,
            duration: 0.35,
            ease: "elastic.out(1,0.4)",
            transformOrigin: "center bottom",
          },
          3.78,
        )
        // Discord gets bumped further left
        .to(
          discord,
          {
            x: -STEP * 0.4,
            rotateZ: -22,
            scaleX: 0.85,
            scaleY: 1.15,
            duration: 0.18,
            ease: "power3.out",
            transformOrigin: "center bottom",
          },
          3.78,
        )
        .to(
          discord,
          {
            x: -STEP * 0.2,
            rotateZ: 6,
            scaleX: 1,
            scaleY: 1,
            duration: 0.35,
            ease: "elastic.out(1,0.3)",
            transformOrigin: "center bottom",
          },
          3.94,
        )
        // Instagram settles
        .to(
          instagram,
          {
            x: STEP * 0.1,
            rotateZ: 5,
            duration: 0.3,
            ease: "elastic.out(1,0.4)",
          },
          3.78,
        );

      /* ── Phase 5: Everyone bounces back to origin (4.5s–5.4s) ── */
      tl.to(
        discord,
        {
          x: 0,
          y: -10,
          rotateZ: 8,
          duration: 0.25,
          ease: "power1.out",
          transformOrigin: "center bottom",
        },
        4.5,
      )
        .to(
          discord,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.35,
            ease: "bounce.out",
            transformOrigin: "center bottom",
          },
          4.75,
        )
        .to(
          facebook,
          {
            x: 0,
            y: -12,
            rotateZ: -6,
            duration: 0.25,
            ease: "power1.out",
            transformOrigin: "center bottom",
          },
          4.6,
        )
        .to(
          facebook,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.35,
            ease: "bounce.out",
            transformOrigin: "center bottom",
          },
          4.85,
        )
        .to(
          instagram,
          {
            x: 0,
            y: -8,
            rotateZ: 5,
            duration: 0.25,
            ease: "power1.out",
            transformOrigin: "center bottom",
          },
          4.7,
        )
        .to(
          instagram,
          {
            y: 0,
            rotateZ: 0,
            duration: 0.35,
            ease: "bounce.out",
            transformOrigin: "center bottom",
          },
          4.95,
        );
    }, socialsRef);

    // Pause infinite animation when section is off-screen to save CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tlRef.current?.resume();
        } else {
          tlRef.current?.pause();
        }
      },
      { threshold: 0 },
    );
    if (socialsRef.current) observer.observe(socialsRef.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <SectionWrapper
      id="social-channel"
      className="mt-10 mb-16 md:mt-18 md:mb-24 mx-auto"
    >
      <div className="flex flex-col items-center justify-center relative">
        <h3 className="relative z-2  mb-1.5 text-black [text-shadow:2px_0_#fff,-2px_0_#fff,0_2px_#fff,0_-2px_#fff,1px_1px_#fff,-1px_-1px_#fff,1px_-1px_#fff,-1px_1px_#fff,4px_4px_0_#ADCBFF] text-2xl sm:text-3xl md:text-5xl leading-tight md:leading-14.5 font-black text-center px-4 font-mori">
          Need party? We got you cover
        </h3>
        <img
          src="/images/assets/social-hand-brush.png"
          alt=""
          className="w-40 sm:w-53.25 h-auto absolute left-1/2 -translate-x-1/2 bottom-3 z-1"
        />
        <p className="text-grey-500 relative z-2 leading-5 font-medium font-pangram text-center">
          Join our Comunity for latest updated and make friends over the world
        </p>
      </div>
      <div
        ref={socialsRef}
        className="flex items-center justify-center gap-8 sm:gap-12 md:gap-20 mt-8"
      >
        {socials.map((social, index) => (
          <Link key={index} target="_blank" href={social.url}>
            <img
              src={social.imageUrl}
              alt={social.label}
              className="social-icon w-16 h-16 sm:w-20 sm:h-20 md:w-[125px] md:h-[125px]"
            />
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
