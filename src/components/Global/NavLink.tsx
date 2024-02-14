import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { startCase } from "lodash";

export const TABS = ["Portfolio", "Resume", "Blog", "Projects"] as const;

type NavlinkProps = {
  link: (typeof TABS)[number];
  mobile?: boolean;
};

const NavLink = ({ link, mobile = false }: NavlinkProps) => {
  const segment = useSelectedLayoutSegment() ?? "";
  const active = startCase(segment) === link;

  return mobile ? (
    <Link href={`/${link.toLowerCase()}`} passHref>
      <button
        type="button"
        className={`w-full flex justify-center text-xl border-2 rounded-lg ${
          active
            ? "dark:text-white dark:bg-zinc-500/20 border-black/40 dark:border-white/40 border-opacity-100"
            : "border-transparent focus:border-primary text-primary hover:border-primary"
        } dark-transition px-6 py-1`}
      >
        {link}
      </button>
    </Link>
  ) : (
    <div className="w-full flex justify-center">
      <Link href={`/${link.toLowerCase()}`} passHref>
        <button
          type="button"
          className={`w-full flex justify-center text-xl border-b-4 ${
            active
              ? "dark:text-white border-black dark:border-white border-opacity-100"
              : "border-b-transparent text-primary hover:border-primary"
          } dark-transition px-5 py-3`}
        >
          {link}
        </button>
      </Link>
    </div>
  );
};

export default NavLink;
