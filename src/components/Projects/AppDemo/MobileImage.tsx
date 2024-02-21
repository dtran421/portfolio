import Image from "next/image";

type MobileImageProps = {
  page: string | null;
  num: number;
};

const MobileImage = ({ page, num }: MobileImageProps) => (
  <div className="flex lg:hidden justify-center pt-6">
    <Image
      alt={`${page} video ${num}`}
      src={`/img/projects/${page}/${page}${num}.gif`}
      className="z-10 relative rounded-xl"
      width={240}
      height={520}
    />
  </div>
);

export default MobileImage;
