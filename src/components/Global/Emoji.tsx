interface Props {
  label: string;
  symbol: string;
  className?: string;
}

const Emoji = ({ label, symbol, className }: Props) => (
  <span className={className || ""} role="img" aria-label={label || ""} aria-hidden={label ? "false" : "true"}>
    {symbol}
  </span>
);
export default Emoji;
