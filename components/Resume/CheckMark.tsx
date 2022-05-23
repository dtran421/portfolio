import { FiCheck } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

import { lgScreenQuery } from "../../configs/Breakpoints";

const CheckMark = () => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    return (
        <div className="bg-secondary rounded-full p-1">
            <FiCheck size={lgScreen ? 18 : 14} />
        </div>
    );
};

export default CheckMark;
