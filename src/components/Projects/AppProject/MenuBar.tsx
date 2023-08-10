import { LayoutGroup, motion } from "framer-motion";

type NavButtonProps = {
  heading: string;
  scrollToParagraph: (paragraphNum: number) => void;
  idx: number;
  active: boolean;
};

const NavButton = ({ heading, scrollToParagraph, idx, active }: NavButtonProps) => (
  <button
    type="button"
    onClick={() => scrollToParagraph(idx)}
    className="relative flex justify-center text-xl rounded-full hover:bg-zinc-300/40 dark:hover:bg-zinc-700/40 transition duration-100 ease-linear cursor-pointer px-6 py-1"
  >
    {heading}
    {active ? <motion.div className="active" layoutId="active" transition={{ duration: 0.2, ease: "easeIn" }} /> : null}
  </button>
);

type MenuBarProps = {
  paragraphs: string[];
  activeParagraph: number;
  scrollToParagraph: (paragraphNum: number) => void;
};

const MenuBar = ({ paragraphs, activeParagraph, scrollToParagraph }: MenuBarProps) => (
  <div className="sticky top-24 z-10 rounded-full hidden lg:flex bg-zinc-100/75 dark:bg-zinc-900/75 backdrop-blur-lg border-2 border-zinc-300 dark:border-zinc-700 dark-transition mt-10">
    <LayoutGroup>
      {paragraphs.map((heading, idx) => (
        <NavButton
          key={heading}
          heading={heading}
          scrollToParagraph={scrollToParagraph}
          idx={idx}
          active={idx === activeParagraph}
        />
      ))}
    </LayoutGroup>
  </div>
);

export default MenuBar;
