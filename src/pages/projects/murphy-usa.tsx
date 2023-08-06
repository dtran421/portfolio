import FilePreview from "@/components/Projects/FilePreview";
import FinanceLayout from "@/layouts/FinanceLayout";

const MurphyUSA = () => {
  const EXCEL_ICON_DIM = 165;

  return (
    <FinanceLayout
      pageTitle="MUSA Credit Analysis"
      classProfileProps={{
        heading: "[BUAD 329] Corporate Valuation and Credit Analysis",
        dateString: "Spring 2021",
        description: `This course focuses on common methodologies for valuing
                    corporate entities used by professionals working in
                    investments, private equity, venture capital and investment
                    banking. It aims to familiarize students with various data
                    sources and software used in the financial industry.`,
      }}
      symbol="MUSA"
      purchasePrice={139.4}
    >
      <div className="w-full">
        <h1 className="text-3xl text-center font-bold mb-4 lg:mb-10">Analysis Materials</h1>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-y-6 lg:gap-x-10">
          <div>
            <FilePreview
              label="Murphy USA Presentation"
              filePath="/murphy-usa/MUSA_presentation.pdf"
              previewImgPath="/projects/murphy-usa/presentation_title_slide.png"
              width={2667}
              height={1500}
            />
          </div>
          <FilePreview
            label="Murphy USA Analysis"
            filePath="/murphy-usa/MUSA_analysis.xlsx"
            previewImgPath="/projects/excel.png"
            width={EXCEL_ICON_DIM}
            height={EXCEL_ICON_DIM}
            special
          />
        </div>
      </div>
    </FinanceLayout>
  );
};

export default MurphyUSA;
