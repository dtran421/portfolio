"use client";

import Image from "next/image";
import Typewriter from "typewriter-effect";
import { cn } from "utils-toolkit";

import { useCarouselControl } from "@/hooks/useCarouselControl";

import carouselData from "@/public/json/carousel.json";

const Carousel = () => {
  const carousel = carouselData.imgs;
  const { currentImage, phase, typewriterRef } = useCarouselControl(carousel);

  const labels = carousel.map((img) => img.label);
  const imageData = carousel[currentImage - 1];

  return (
    <div id="carousel" className="md:w-full lg:w-1/2 flex flex-col justify-start items-center space-y-4 mx-8">
      <figure className="w-full flex justify-center items-center xl:items-start">
        {!!currentImage && (
          <Image
            key={currentImage}
            alt={`pic of me ${currentImage}`}
            src={`/img/carousel/${imageData.pic}`}
            width={imageData.width}
            height={imageData.height}
            className={cn(
              "rounded-xl transition duration-200 ease-linear",
              phase === "visible" ? "opacity-100" : "opacity-0"
            )}
            priority
          />
        )}
      </figure>
      <div className="w-full flex flex-col md:flex-row justify-center text-lg md:text-xl xl:text-3xl dark:text-white dark-transition">
        <p className="inline-block text-center">I am</p>
        <div ref={typewriterRef} className="flex justify-center items-center">
          <Typewriter
            options={{
              strings: labels,
              autoStart: true,
              loop: true,
              pauseFor: 5000,
              wrapperClassName: "font-medium border-b-2 border-secondary ml-2 mr-1",
              cursorClassName: "text-primary animate-pulse",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
