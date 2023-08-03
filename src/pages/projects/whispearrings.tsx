import { FaApple } from "react-icons/fa";

import AppProjectLayout from "../../layouts/AppProjectLayout";

import whispearringsData from "../../../public/json/whispearrings.json";

const Whispearrings = () => (
  <AppProjectLayout
    page="Whispearrings"
    github="https://github.com/dtran421/Whispearrings-swift"
    projectData={whispearringsData}
    placeholder={
      <div className="absolute left-0 top-1/4 w-full h-full flex justify-center items-start">
        <FaApple size={48} className="text-zinc-300/50 dark:text-zinc-700/50 dark-transition" />
      </div>
    }
  >
    For my summer internship with Whispearrings, I was the sole mobile app developer tasked with spearheading the
    development of their iOS app. Since this was my first time doing mobile app development, I needed to research
    various new technologies, including XCode, Swift (Objective-C), and SQLite for the database. After two short but
    grueling months, I was able to produce an app that incorporated all of the techniques and coding concepts that I had
    been learning and performed the basic functions that my supervisors had asked for.
  </AppProjectLayout>
);

export default Whispearrings;
