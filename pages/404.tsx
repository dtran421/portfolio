import { motion } from "framer-motion";
import Image from "next/image";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

import MainLayout from "../components/Global/layouts/MainLayout";

const Error404 = () => (
    <MainLayout page="Page Not Found">
        <div className="max-w-xl lg:max-w-3xl xl:max-w-5xl flex justify-center items-center mx-auto mt-32">
            <div className="w-full flex justify-center gap-x-20">
                <div className="flex justify-end items-center">
                    <div className="w-2/3 space-y-6">
                        <div>
                            <div className="flex items-center space-x-3">
                                <FiAlertTriangle
                                    size={36}
                                    className="text-yellow-400"
                                />
                                <h1 className="text-4xl font-bold">Uh oh!</h1>
                            </div>
                            <p className="text-lg font-medium">
                                We couldn&apos;t find the page you were looking
                                for!
                            </p>
                        </div>
                        <button
                            type="button"
                            className="flex items-center text-2xl font-medium bg-primary text-white rounded-xl space-x-4 px-4 py-2"
                        >
                            <FiHome size={28} />
                            <span>Main Page</span>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <div className="flex items-center overflow-hidden rounded-full shadow-inner">
                        <Image
                            alt="sad peepo"
                            src="/img/sad_peepo.png"
                            width={511}
                            height={286}
                        />
                    </div>
                    <motion.div
                        animate={{ opacity: [1, 1, 0.5, 1, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            times: [0, 0.3, 0.5, 0.7, 1]
                        }}
                        className="absolute top-0 left-0 w-full h-full border-4 border-secondary rounded-full dark-transition scale-110"
                    />
                </div>
            </div>
        </div>
    </MainLayout>
);

export default Error404;
