import Image from "next/image";
import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

import { lgScreenQuery } from "../../../lib/Breakpoints";

type PhoneDemoProps = {
    activeP: number;
    page: string;
    imgClass: string;
    placeholder: ReactNode;
};

const PhoneDemo = ({
    activeP,
    page,
    imgClass,
    placeholder
}: PhoneDemoProps) => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    return lgScreen ? (
        <div className="w-1/2 relative flex flex-col space-y-32">
            <div className="h-min sticky right-1/4 inset-y-1/4 flex justify-center items-start">
                <div className="relative flex items-center bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-3xl p-2">
                    <div className="absolute left-0 top-0 z-20 w-full flex justify-center">
                        <div className="w-1/2 h-7 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-b-xl" />
                    </div>
                    {activeP >= 0 && (
                        <Image
                            alt={`${page} video ${activeP + 1}`}
                            src={`/img/projects/${page}/${page}${
                                activeP + 1
                            }.gif`}
                            className={imgClass}
                            width={240}
                            height={520}
                        />
                    )}
                    {placeholder}
                </div>
            </div>
        </div>
    ) : null;
};

export default PhoneDemo;
