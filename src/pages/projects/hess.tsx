import FilePreview from "@/components/Projects/FilePreview";
import FinanceLayout from "@/layouts/FinanceLayout";
import fetchStockData from "@/lib/fetchStockData";
import { Company, Quote } from "@/lib/types";

type HessProps = {
  quoteData: Quote;
  companyData: Company;
};

const Hess = ({ quoteData, companyData }: HessProps) => (
  <FinanceLayout
    page="HES Pitch"
    classProfileProps={{
      heading: "[BUAD 421] Student Managed Investment Fund",
      dateString: "Spring 2022",
      description: `This course provides a hands-on experience with portfolio
                management and security analysis through the management of the
                Mason School Student Managed Investment Fund (SMIF). Students
                must select companies from an S&P stock universe, do research on
                their business model and competitive environment, make forecasts
                of future financial performance and conduct valuation analyses,
                write an investment report, and present an oral recommendation
                to colleagues and faculty for inclusion in a real endowment
                portfolio of common stocks.`,
    }}
    {...{ quoteData, companyData }}
    purchasePrice={107.63}
  >
    <div>
      <h1 className="text-3xl text-center font-bold mb-4 lg:mb-10">Pitch Materials</h1>
      <div className="flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-16 gap-y-6 lg:gap-y-0">
        <div className="row-span-2 flex items-center">
          <FilePreview
            label="HES Report"
            filePath="/hess/HES_report.pdf"
            previewImgPath="/projects/hess/report_cover_page.png"
            width={1700}
            height={2200}
          />
        </div>
        <div>
          <FilePreview
            label="HES Presentation"
            filePath="/hess/HES_presentation.pdf"
            previewImgPath="/projects/hess/presentation_title_slide.png"
            width={2667}
            height={1500}
          />
        </div>
        <div className="flex">
          <FilePreview
            label="HES Valuation"
            filePath="/hess/HES_valuation.xlsx"
            previewImgPath="/projects/excel.png"
            width={165}
            height={165}
            special
          />
        </div>
      </div>
    </div>
  </FinanceLayout>
);

export const getServerSideProps = () => fetchStockData("HES");

export default Hess;
