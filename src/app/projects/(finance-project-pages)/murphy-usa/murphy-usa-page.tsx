"use client";

import FilePreview from "@/components/Projects/FilePreview";
import ExcelFilePreview from "@/components/Projects/Finance/ExcelFilePreview";

const MurphyUSAPage = () => (
  <section className="w-full">
    <h1 className="text-3xl text-center font-bold mb-4 lg:mb-10">Analysis Materials</h1>
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-y-6 lg:gap-x-10">
      <figure>
        <FilePreview
          label="Murphy USA Presentation"
          filePath="/murphy-usa/MUSA_presentation.pdf"
          previewImgPath="/projects/murphy-usa/presentation_title_slide.png"
          width={2667}
          height={1500}
        />
      </figure>
      <ExcelFilePreview label="Murphy USA Analysis" filePath="/murphy-usa/MUSA_analysis.xlsx" />
    </div>
  </section>
);

export default MurphyUSAPage;
