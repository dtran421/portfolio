import Image from "next/image";

type PhoneDemoProps = {
  page: string;
  ImagePlaceholder: JSX.Element;
  activeParagraph: number;
  active: boolean;
};

const PhoneDemo = ({ page, ImagePlaceholder, activeParagraph, active }: PhoneDemoProps) => (
  <div className="w-1/2 relative hidden lg:block">
    <div className="sticky top-1/4 flex justify-center">
      <div className="w-3/5 relative">
        <div className="w-full absolute left-0 top-0 z-20 flex justify-center">
          <div className="w-1/2 h-7 bg-zinc-800 dark:bg-zinc-200 dark-transition rounded-b-xl" />
        </div>
        <div className="w-full z-10 absolute left-0 top-0 p-2">
          <div className="w-full relative rounded-3xl overflow-hidden">
            <Image
              alt={`${page} video ${activeParagraph + 1 || 1}`}
              src={`/img/projects/${page}/${page}${activeParagraph + 1 || 1}.gif`}
              className={`transition duration-200 ease-linear ${active ? "opacity-100" : "opacity-0"}`}
              width={1170}
              height={2532}
            />
          </div>
        </div>
        {ImagePlaceholder}
      </div>
    </div>
  </div>
);

export default PhoneDemo;
