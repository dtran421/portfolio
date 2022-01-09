import { FC } from "react";

interface EmojiProps {
   label: string;
   symbol: string;
   className: string;
}

const Emoji: FC<EmojiProps> = ({ label, symbol, className }) => (
   <span className={className} role="img" aria-label={label ? label : ""} aria-hidden={label ? "false" : "true"}>
      {symbol}
   </span>
);
export default Emoji;
