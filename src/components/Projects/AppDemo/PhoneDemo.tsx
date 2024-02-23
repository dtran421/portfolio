import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { cn } from "utils-toolkit";

const DefaultPlaceholder = ({ visible }: { visible: boolean }) => (
  <figure
    className={cn(
      "w-full h-full absolute top-0 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-3xl transition duration-200 ease-linear",
      visible ? "opacity-100" : "opacity-0"
    )}
  >
    <div className="w-full h-full relative">
      <FaApple size={64} className="absolute left-1/2 top-1/4 -translate-x-1/2 dark-transition" />
    </div>
  </figure>
);

type PhoneDemoProps = {
  page: string | null;
  activeParagraph: number;
  active: boolean;
  ImagePlaceholder?: ({ visible }: { visible: boolean }) => JSX.Element;
};

const PhoneDemo = ({ page, activeParagraph, active, ImagePlaceholder = DefaultPlaceholder }: PhoneDemoProps) => (
  <div className="w-1/2 relative hidden lg:block">
    <div className="sticky top-1/4 flex justify-center">
      <div className="w-3/5 relative">
        <div className="w-full absolute left-0 top-0 z-20 flex justify-center">
          <div className="w-1/2 h-7 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-b-xl" />
        </div>
        <div className="w-full z-10 absolute left-0 top-0 rounded-3xl">
          <figure className="w-full relative bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-3xl p-2">
            <Image
              alt={`${page} video ${activeParagraph + 1 || 1}`}
              src={`/img/projects/${page}/${page}${activeParagraph + 1 || 1}.gif`}
              className={cn("transition duration-200 ease-linear rounded-3xl", active ? "opacity-100" : "opacity-0")}
              width={1170}
              height={2532}
            />
          </figure>
          <ImagePlaceholder visible={!active} />
        </div>
      </div>
    </div>
  </div>
);

export default PhoneDemo;
