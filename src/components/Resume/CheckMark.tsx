import { HiBadgeCheck } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";

import { lgScreenQuery } from "../../lib/Breakpoints";

const CheckMark = () => {
  const lgScreen = useMediaQuery(lgScreenQuery);

  return <HiBadgeCheck color="#9333EA" size={lgScreen ? 28 : 20} />;
};

export default CheckMark;
