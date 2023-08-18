"use client";

import BackgroundMotivation from "@/components/Projects/AppProject/BackgroundMotivation";
import FilePreview from "@/components/Projects/FilePreview";

const UAV = () => (
  <section className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col xl:flex-row justify-between space-y-10 xl:space-y-0 xl:space-x-20 py-20 mx-10 md:mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-20 gap-y-10 xl:gap-y-0">
      <BackgroundMotivation>
        Over the summer of 2021, I interned for a research program under the National Science Foundation (NSF) to do
        research in VR. My specific project pertained to UAV swarm security and involved simulating algorithms that
        would enable swarms to be resilient to adversarial UAVs. Within the span of 10 weeks, I successfully developed
        and simulated algorithms in Unity 3D that empowered UAVs within swarms to eject away from adversaries while
        maintaining the appropriate distance to their target/objective and ran 27 comprehensive simulations to gather
        data on the efficiency of the algorithm. The results of the study are summarized in the adjacent paper, which
        can be viewed in full screen.
      </BackgroundMotivation>
      <figure>
        <FilePreview
          label="UAV Paper"
          filePath="/uav/uav_paper.pdf"
          previewImgPath="/projects/uav/cover_page.jpg"
          width={1700}
          height={2200}
        />
      </figure>
    </div>
  </section>
);

export default UAV;
