import { FaCheck } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";

const CheckMark = () => (
  <div className="relative w-min">
    <FaCheck
      size={14}
      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white bg-secondary"
    />
    <HiBadgeCheck color="#9333EA" className="w-6 h-6 lg:w-8 lg:h-8" />
  </div>
);

export default CheckMark;
