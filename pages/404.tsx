import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

import MainLayout from "../components/Global/layouts/MainLayout";

const Error404 = () => (
    <MainLayout page="Page Not Found">
        <div className="max-w-xl lg:max-w-3xl xl:max-w-5xl max-h-screen flex justify-center items-center mx-auto mt-40 lg:mt-32">
            <div className="w-full flex flex-col lg:flex-row justify-center xl:gap-x-20 gap-y-10 lg:gap-y-0">
                <div className="flex justify-center lg:justify-end items-center">
                    <div className="xl:w-2/3 space-y-6 px-10 md:px-0">
                        <div>
                            <div className="flex items-center space-x-3">
                                <FiAlertTriangle
                                    size={36}
                                    className="text-yellow-500 dark:text-yellow-400 dark-transition"
                                />
                                <h1 className="text-3xl md:text-4xl font-bold">
                                    Uh oh!
                                </h1>
                            </div>
                            <p className="md:text-lg font-medium">
                                We couldn&apos;t find the page you were looking
                                for!
                            </p>
                        </div>
                        <Link href="/" passHref>
                            <button
                                type="button"
                                className="flex items-center text-xl md:text-2xl font-medium bg-primary text-white rounded-xl space-x-4 px-3 md:px-4 py-1 md:py-2"
                            >
                                <FiHome size={28} />
                                <span>Main Page</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="relative flex justify-center items-center">
                    <div className="overflow-hidden rounded-full shadow-inner mx-8 md:mx-0">
                        <Image
                            alt="sad peepo"
                            src="/img/sad_peepo.png"
                            width={511}
                            height={286}
                        />
                    </div>
                    <motion.div
                        animate={{ opacity: [1, 1, 0.4, 1, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            times: [0, 0.3, 0.5, 0.7, 1]
                        }}
                        className="absolute top-1/2 left-1/2 w-4/5 lg:w-full h-full border-4 border-secondary rounded-full dark-transition transform scale-110 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
            </div>
        </div>
    </MainLayout>
);

export default Error404;
