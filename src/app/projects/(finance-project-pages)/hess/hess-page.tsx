"use client";

import FilePreview from "@/components/Projects/FilePreview";
import ExcelFilePreview from "@/components/Projects/Finance/ExcelFilePreview";

const Hess = () => (
  <section>
    <h1 className="text-3xl text-center font-bold mb-4 lg:mb-10">Pitch Materials</h1>
    <div className="flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-16 gap-y-6 lg:gap-y-0">
      <figure className="row-span-2 flex items-center">
        <FilePreview
          label="HES Report"
          filePath="/hess/HES_report.pdf"
          previewImgPath="/projects/hess/report_cover_page.png"
          width={1700}
          height={2200}
        />
      </figure>
      <figure>
        <FilePreview
          label="HES Presentation"
          filePath="/hess/HES_presentation.pdf"
          previewImgPath="/projects/hess/presentation_title_slide.png"
          width={2667}
          height={1500}
        />
      </figure>
      <figure className="flex">
        <ExcelFilePreview label="HES Valuation" filePath="/hess/HES_valuation.xlsx" />
      </figure>
    </div>
  </section>
);

export default Hess;
