"use client";

import Link from "next/link";
import { SVG } from "../ui/svgs";

export function Footer() {
  const socials = [
    {
      label: "Discord",
      url: "/images/assets/discord.png",
    },
    {
      label: "Facebook",
      url: "/images/assets/facebook.png",
    },
    {
      label: "Instagram",
      url: "/images/assets/instagram.png",
    },
  ];
  return (
    <footer className="mx-auto px-6">
      <div className=" py-14 px-6  pb-0! bg-sky-blue-500 rounded-tl-4xl rounded-tr-4xl">
        {/* content */}
        <div className="flex items-center justify-between gap-3  p-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center justify-center h-8.75 w-fit overflow-hidden bg-neutral-500 py-2 px-3 rounded-[96px_32px_32px_0] border border-solid border-[#2C2D2F] shadow-[1px_1px_0_0_#373737]  rounded-tl-4xl!">
              <span className="text-base leading-5 text-[#2C2D2F] font-semibold font-pangram">
                Did we miss any game?
              </span>
            </div>
            <h6 className="text-[#2C2D2F] text-[28px] leading-normal font-black [text-shadow:0_2px_#fff,0_-2px_#fff,2px_0_#fff,-2px_0_#fff,1px_1px_#fff,-1px_-1px_#fff,1px_-1px_#fff,-1px_1px_#fff] font-mori">
              what are you waiting for? <br />
              tell us!
            </h6>
            <Link
              href="#"
              className="text-base font-semibold leading-5 font-pangram italic text-[#141414] relative"
            >
              Whatsapp
              <SVG.BottomLine className="absolute -bottom-1 left-0" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center justify-center h-8.75 w-fit overflow-hidden bg-neutral-500 py-2 px-3 rounded-[96px_32px_32px_0] border border-solid border-[#2C2D2F] shadow-[1px_1px_0_0_#373737]  rounded-tl-4xl!">
              <span className="text-base leading-5 text-[#2C2D2F] font-semibold font-pangram">
                Join our team?
              </span>
            </div>
            <h6 className="text-[#2C2D2F] text-[28px] leading-normal font-black [text-shadow:0_2px_#fff,0_-2px_#fff,2px_0_#fff,-2px_0_#fff,1px_1px_#fff,-1px_-1px_#fff,1px_-1px_#fff,-1px_1px_#fff] font-mori">
              no budget for hiring <br />
              right now :(
            </h6>
            <Link
              href="#"
              className="text-base font-semibold leading-5 font-pangram italic text-[#141414] relative"
            >
              Whatsapp
              <SVG.BottomLine className="absolute -bottom-1 left-0" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center justify-center h-8.75 w-fit overflow-hidden bg-neutral-500 py-2 px-3 rounded-[96px_32px_32px_0] border border-solid border-[#2C2D2F] shadow-[1px_1px_0_0_#373737] rounded-tl-4xl!">
              <span className="text-base leading-5 text-[#2C2D2F] font-semibold font-pangram">
                Contact
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h6 className="text-[#2C2D2F] text-[28px] leading-normal font-black [text-shadow:0_2px_#fff,0_-2px_#fff,2px_0_#fff,-2px_0_#fff,1px_1px_#fff,-1px_-1px_#fff,1px_-1px_#fff,-1px_1px_#fff] font-mori">
                <Link
                  href="mailto:hello@nsfw.co"
                  className="hover:text-camelia-500 duration-200 transition-colors"
                >
                  hello@nsfw.co
                </Link>{" "}
                <br /> send us an email or whatsapp
              </h6>
              <p className="text-base font-medium leading-5 font-pangram text-[#141414] relative">
                We’re millennials and gen-z: please do not call us.
              </p>
            </div>
          </div>
        </div>

        {/* frame */}
        <div className="relative h-200 p-8">
          {/* <img
            src="/images/assets/snick-frame-footer.png"
            alt="frame"
            className="absolute top-0 left-0 w-full h-full object-cover select-none"
          /> */}
        </div>

        {/* license */}
        <p className="py-6 text-center w-full text-base leading-5 text-grey-900 font-medium font-pangram">
          All rights reserved © 2026 . My team worked hard on this, please don’t{" "}
          <strong className="italic">snick</strong> it.
        </p>
      </div>
    </footer>
  );
}
