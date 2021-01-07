import { TiledHexagons } from "tiled-hexagons";

export interface SocialsProps {}

const Socials: React.FunctionComponent<SocialsProps> = () => {
   return (
      <div className="flex justify-center py-5">
         <TiledHexagons
            maxHorizontal={5}
            tileSideLengths={50}
            tileElevations={10}
            tileGap={20}
            tileBorderRadii={12}
            tiles={[
               {
                  img: "/github.svg",
                  fill: "#FCFBF9",
                  shadow: "#5B6A7A",
                  href: "https://github.com/dtran421"
               },
               {
                  img: "/linkedin.svg",
                  fill: "#2B77B9",
                  shadow: "#0E1F42",
                  href: "https://www.linkedin.com/in/dtran421/"
               },
               {
                  img: "/facebook.svg",
                  fill: "#4267b2",
                  shadow: "#1a2947",
                  href: "https://facebook.com/awes0mexpert21"
               },
               {
                  img: "/twitter.svg",
                  fill: "#1dcaff",
                  shadow: "#0084b4",
                  href: "https://twitter.com/dtran421"
               }
            ]}
         />
      </div>
   );
};

export default Socials;
