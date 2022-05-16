import Image from "next/image";

import { FiMaximize2 } from "react-icons/fi";
import ProjectLayout from "../../components/Global/layouts/ProjectLayout";

const UAV = () => (
    <ProjectLayout
        page="UAV Swarms"
        accentColor="bg-uav"
        darkText={false}
        github="https://github.com/dtran421/3D-SHARKS"
    >
        <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-7xl flex flex-col xl:flex-row justify-between space-y-10 xl:space-y-0 xl:space-x-20 py-20 mx-10 md:mx-auto">
            <div className="flex flex-col space-y-6">
                <h1 className="text-4xl font-bold">Background & Motivation</h1>
                <p className="text-xl leading-relaxed">
                    Over the summer of 2021, I interned for a research program
                    under the National Science Foundation (NSF) to do research
                    in VR. My specific project pertained to UAV swarm security
                    and involved simulating algorithms that would enable swarms
                    to be resilient to adversarial UAVs. Within the span of 10
                    weeks, I successfully developed and simulated algorithms in
                    Unity 3D that empowered UAVs within swarms to eject away
                    from adversaries while maintaining the appropriate distance
                    to their target/objective and ran 27 comprehensive
                    simulations to gather data on the efficiency of the
                    algorithm. The results of the study are summarized in the
                    adjacent paper, which can be viewed in full screen.
                </p>
            </div>
            <div className="relative w-full flex justify-center">
                <a
                    href="/files/uav/uav_paper.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-0 top-0 z-10 w-full h-full flex justify-center items-center rounded-xl group hover:bg-zinc-500/50 transition duration-150 ease-linear"
                >
                    <FiMaximize2 className="w-12 h-12 group-hover:bg-zinc-200/75 rounded-xl text-transparent group-hover:text-secondary transition duration-150 ease-linear p-2" />
                </a>
                <Image
                    alt="uav paper page 1"
                    src="/img/projects/uav/cover_page.jpg"
                    width={574}
                    height={743}
                    layout="fixed"
                    className="rounded-xl"
                />
            </div>
        </div>
    </ProjectLayout>
);

export default UAV;
