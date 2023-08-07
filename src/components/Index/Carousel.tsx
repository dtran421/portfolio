import { useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import Typewriter from "typewriter-effect";

import carouselData from "@/public/json/carousel.json";

const Carousel = () => {
  const carousel = carouselData.imgs;
  const pics = carousel.length;
  const strings = carousel.map((entry) => entry.label);

  const [imgClass, setImgClass] = useState("rounded-xl opacity-0 transition duration-200 ease-linear");
  const [[pic, picData, init], cyclePics] = useState([1, carousel[0], true]);
  const typewriter = useRef(null);
  const typewriterListener = () => {
    const cyclePicture = () => {
      const loop = pic + 1 > pics;
      const newPic = loop ? 1 : pic + 1;
      setImgClass(imgClass.replace("opacity-100", "opacity-0"));
      setTimeout(() => cyclePics([newPic, carousel[newPic - 1], loop]), 250);
      setTimeout(() => setImgClass(imgClass.replace("opacity-0", "opacity-100")), 250);
    };

    const typewriterText = typewriter.current.children[0].innerText;

    if (typewriterText.length === 1) {
      if (init) {
        setTimeout(() => setImgClass(imgClass.replace("opacity-0", "opacity-100")), 250);
        cyclePics([pic, picData, false]);
      } else {
        cyclePicture();
      }
    }
  };

  useEffect(() => {
    const typewriterObserver = new MutationObserver(typewriterListener);
    if (typewriter.current) {
      typewriterObserver.observe(typewriter.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      typewriterObserver.disconnect();
    };
  });

  return (
    <div className="md:w-full lg:w-1/2 flex flex-col justify-start items-center space-y-4 mx-8">
      <div className="w-full h-full lg:h-5/6 xl:h-1/2 flex justify-center items-center xl:items-start">
        <Image
          key={pic}
          alt={`pic of me ${pic}`}
          src={`/img/carousel/${picData.pic}`}
          width={picData.width}
          height={picData.height}
          className={imgClass}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center text-3xl dark:text-white dark-transition">
        <p className="inline-block text-center">I am</p>
        <div ref={typewriter} className="flex justify-center items-center">
          <Typewriter
            options={{
              strings,
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
