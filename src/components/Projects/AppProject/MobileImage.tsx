import Image from "next/image";
import { useMediaQuery } from "react-responsive";

import { lgScreenQuery } from "../../../lib/Breakpoints";

type MobileImageProps = {
    page: string;
    idx: number;
};

const MobileImage = ({ page, idx }: MobileImageProps) => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    return (
        !lgScreen && (
            <div className="flex justify-center pt-6">
                <Image
                    alt={`${page} video ${idx + 1}`}
                    src={`/img/projects/${page}/${page}${idx + 1}.gif`}
                    className="z-10 relative rounded-xl"
                    width={240}
                    height={520}
                />
            </div>
        )
    );
};

export default MobileImage;
