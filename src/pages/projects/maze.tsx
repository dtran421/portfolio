import AndroidSection from "@/components/Projects/Maze/AndroidSection";
import JavaSection from "@/components/Projects/Maze/JavaSection";
import ProjectLayout from "@/layouts/ProjectLayout";

const Maze = () => (
  <ProjectLayout pageTitle="Maze Game" type="coding" github="https://github.com/dtran421/MazeByDukeTran">
    <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl flex mx-10 md:mx-auto">
      <div className="w-full flex flex-col items-center space-y-20">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl text-center font-bold">Background & Motivation</h1>
          <p className="text-xl text-center leading-relaxed">
            This project was completed as a part of a semester-long project for my CSCI 301 Software Development course
            at William & Mary. The project is split into two parts, one implemented for desktop use and the other for an
            Android app. Both parts were coded in Java and thorougly documented through Github with periodic tags.
            Below, the two parts of the project are explained separately with details outlining the different aspects of
            the game.
          </p>
        </div>
        <JavaSection />
        <AndroidSection />
      </div>
    </div>
  </ProjectLayout>
);

export default Maze;
