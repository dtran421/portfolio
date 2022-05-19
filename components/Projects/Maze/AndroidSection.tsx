import ScrollContainer, { ContainerBody, MazeDemo } from "./ScrollContainer";

const AndroidSection = () => (
    <div className="w-full snap-x snap-mandatory scroll-smooth flex flex-nowrap overflow-x-scroll">
        <ScrollContainer>
            <ContainerBody heading="Introduction">
                <div className="flex flex-col lg:flex-row text-lg lg:text-xl text-left leading-relaxed space-y-4 lg:space-y-0 lg:space-x-24">
                    <p className="w-full lg:w-1/2">
                        In order to run the Android version, you must have the
                        Java Development Kit (JDK) Version 1.8 installed on your
                        device. You can compile the project using Android Studio
                        and emulate the game with an Android SDK of at least
                        version 29.
                    </p>
                    <p className="w-full lg:w-1/2">
                        Many of the command line parameters from the desktop
                        version are adjustable within the game straight from the
                        main menu. For example, the maze generation algorithm
                        can be selected before beginning the game. The feature
                        to load in a predefined file is implemented to load in
                        the maze generated from the previous playthrough of the
                        game.
                    </p>
                </div>
            </ContainerBody>
        </ScrollContainer>
        <ScrollContainer>
            <ContainerBody heading="Gameplay">
                The maze gameplay is pretty much the exact same as the desktop
                version. In this version, you also have the ability to jump by
                pressing the button at the bottom left of the maze screen.
                Before maze generation, you can set the maze generation
                algorithm and the difficulty level from the main menu by sliding
                the crossed swords. You also have the option to modify the
                gameplay (changing the driver and sensor reliability) before
                entering the maze. If you need a little help to beat a maze,
                there are options in the menu at the top left of the maze screen
                to toggle the map, solution, and maze walls. The background
                color also fades to a brighter blue on the top half of the
                screen as you get closer to the exit.
            </ContainerBody>
            <MazeDemo type="Android" img="amaze1" />
        </ScrollContainer>
        <ScrollContainer>
            <ContainerBody heading="Automated Gameplay">
                Similar to the desktop version, you can choose to play using an
                automated robot driver. The options are still the same with
                Wizard and WallFollower. As for sensor reliability, there are 4
                choices you can choose from, ranging from most reliable to most
                unreliable: Demigod, Warrior, Captain, Soldier. The
                Demigod&apos;s sensors will never fail. One of the
                Warrior&apos;s sensors will periodically fail, as will two of
                the Captain&apos;s. All four of the Soldier&apos;s sensors are
                susceptible to failing. You also have the options to start/stop
                the animation, adjust the animation speed, and view the
                operational status of the sensors.
            </ContainerBody>
            <div className="w-full flex flex-col md:flex-row justify-around items-center">
                <MazeDemo type="Android" img="amaze2" />
                <MazeDemo type="Android" img="amaze3" />
            </div>
        </ScrollContainer>
        <ScrollContainer>
            <ContainerBody heading="Revisiting a Maze">
                The Android version re-implements the desktop version&#39;s
                feature to load in a maze in a slightly different way. Instead
                of storing the maze generation data, it stores the seed used to
                generate the maze within the Android device&#39;s local storage.
                If you want to revisit a previously generated maze, change the
                generation settings to match that of a previous maze and then
                click the Revisit button. This will fetch the previous seed that
                matches the same settings and use it to re-generate the maze.
            </ContainerBody>
            <MazeDemo type="Android" img="amaze4" />
        </ScrollContainer>
    </div>
);

export default AndroidSection;
