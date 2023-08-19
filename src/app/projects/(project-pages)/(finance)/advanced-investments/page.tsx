import { Metadata } from "next";
import range from "lodash/range";

import FilePreview from "@/components/Projects/FilePreview";
import ExcelFilePreview from "@/components/Projects/Finance/ExcelFilePreview";

export const metadata: Metadata = {
  title: "Advanced Investments",
};

const AdvancedInvestmentsPage = () => (
  <div className="space-y-2">
    <h1 className="text-3xl text-center font-bold">Course Materials</h1>
    <div className="w-full space-y-10">
      <section className="space-y-2 lg:space-y-4">
        <h2 className="text-lg md:text-2xl font-medium">Homework</h2>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4">
          <figure className="h-full grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-4 gap-x-2 lg:gap-x-10 gap-y-2 lg:gap-y-4">
            {range(1, 5).map((num) => (
              <ExcelFilePreview key={`HW${num}`} label={`HW${num}`} filePath={`/advanced-investments/HW${num}.xlsx`} />
            ))}
          </figure>
          <figure>
            <FilePreview
              label="HW4 Report"
              filePath="/advanced-investments/HW4_report.pdf"
              previewImgPath="/projects/advanced-investments/hw4_report_cover_page.png"
              width={1700}
              height={2200}
            />
          </figure>
        </div>
      </section>
      <section className="space-y-2 lg:space-y-4">
        <h2 className="text-lg md:text-2xl font-medium">Fixed Income Portfolio</h2>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4">
          <figure>
            <FilePreview
              label="Portfolio Report"
              filePath="/advanced-investments/Portfolio_report.pdf"
              previewImgPath="/projects/advanced-investments/portfolio_report_cover_page.png"
              width={1700}
              height={2200}
            />
          </figure>
          <figure className="h-full grid lg:grid-rows-2 gap-x-2 lg:gap-x-10 gap-y-4">
            <ExcelFilePreview label="Portfolio Inception" filePath="/advanced-investments/Portfolio_inception.xlsx" />
            <ExcelFilePreview
              label="Portfolio Performance"
              filePath="/advanced-investments/Portfolio_performance.xlsx"
            />
          </figure>
        </div>
      </section>
    </div>
  </div>
);

export default AdvancedInvestmentsPage;
