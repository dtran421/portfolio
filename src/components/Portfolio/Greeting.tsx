"use client";

import { useCallback, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

import Emoji from "../Global/Emoji";

const waveAnimation = {
  scale: [1, 1.75, 1.75, 1.75, 1.75, 1.75, 1.75, 1],
  rotate: [0, 10, 180, -140, 180, -140, 10, 0],
};

const waveTransition = {
  duration: 1.75,
  times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 1],
};

const Greeting = () => {
  const [scope, animate] = useAnimate();

  const animateWave = useCallback(() => animate(scope.current, waveAnimation, waveTransition), [animate, scope]);

  useEffect(() => {
    animateWave();
  }, [animate, animateWave, scope]);

  return (
    <div className="flex justify-start py-5 text-2xl lg:text-3xl text-center">
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-start md:items-center lg:items-start xl:items-center space-y-2 md:space-y-0 lg:space-y-2 xl:space-y-0 mb-2">
        <p className="inline dark:text-white dark-transition py-1">Hi there! My name is </p>
        <div className="flex items-center space-x-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "linear",
            }}
            className="font-medium text-white bg-gradient-to-tr from-primary to-secondary rounded-lg px-3 py-1 md:ml-3 lg:ml-0 xl:ml-3"
          >
            Duke Tran
          </motion.p>
          <motion.div
            ref={scope}
            onHoverStart={() => animateWave()}
            className="transition origin-bottom-right ease-in-out duration-300 hover:scale-110 hover:rotate-12 cursor-default"
          >
            <Emoji label="wave" symbol="👋🏼" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
