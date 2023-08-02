import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import * as _ from "lodash";

import { Company, Quote } from "../../lib/types";
import fetchStockData from "../../lib/fetchStockData";
import { lgScreenQuery, mdScreenQuery, xlScreenQuery } from "../../lib/Breakpoints";

import FinanceLayout from "../../layouts/FinanceLayout";

const FilePreview = dynamic(import("../../components/Projects/FilePreview"), {
  ssr: false,
});

type AdvancedInvestmentsProps = {
  quoteData: Quote;
  companyData: Company;
};

const AdvancedInvestments = ({ quoteData, companyData }: AdvancedInvestmentsProps) => {
  const mgScreen = useMediaQuery(mdScreenQuery);
  const lgScreen = useMediaQuery(lgScreenQuery);
  const xlScreen = useMediaQuery(xlScreenQuery);

  let smallExcelIconDim = 83;
  if (mgScreen) {
    smallExcelIconDim = 165;
  }
  if (lgScreen) {
    smallExcelIconDim = 83;
  }
  if (xlScreen) {
    smallExcelIconDim = 165;
  }

  let largeExcelIconDim = 165;
  if (mgScreen) {
    largeExcelIconDim = 248;
  }
  if (lgScreen) {
    largeExcelIconDim = 186;
  }

  return (
    <FinanceLayout
      page="Advanced Investments"
      classProfileProps={{
        heading: "[BUAD 427] Advanced Investments",
        dateString: "Fall 2021",
        description: `This course focuses on advanced topics relating to equity
                    and fixed-income investments. It covers various
                    sophisticated debt instruments such as corporate and
                    treasury bonds, mortgage-backed securities (MBS), commercial
                    mortage-backed securities (CMBS), agency MBS, asset-backed
                    securities (ABS), STRIPS, and floating rate notes (FRN).
                    Other financial instruments covered include Eurodollar
                    futures, credit spreads, mortgage loans, mortgage
                    pass-through securities, and interest rate swaps.`,
      }}
      {...{ quoteData, companyData }}
      purchasePrice={108.06}
    >
      <div className="space-y-2">
        <h1 className="text-3xl text-center font-bold">Course Materials</h1>
        <div className="w-full space-y-10">
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-lg md:text-2xl font-medium">Homework</h2>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4">
              <div className="h-full grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-4 gap-x-2 lg:gap-x-10 gap-y-2 lg:gap-y-4">
                {_.range(1, 5).map((num) => (
                  <FilePreview
                    key={`HW${num}`}
                    label={`HW${num}`}
                    filePath={`/advanced-investments/HW${num}.xlsx`}
                    previewImgPath="/projects/excel.png"
                    width={smallExcelIconDim}
                    height={smallExcelIconDim}
                    special
                  />
                ))}
              </div>
              <div>
                <FilePreview
                  label="HW4 Report"
                  filePath="/advanced-investments/HW4_report.pdf"
                  previewImgPath="/projects/advanced-investments/hw4_report_cover_page.png"
                  width={1700}
                  height={2200}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-lg md:text-2xl font-medium">Fixed Income Portfolio</h2>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-8 gap-y-4">
              <div>
                <FilePreview
                  label="Portfolio Report"
                  filePath="/advanced-investments/Portfolio_report.pdf"
                  previewImgPath="/projects/advanced-investments/portfolio_report_cover_page.png"
                  width={1700}
                  height={2200}
                />
              </div>
              <div className="h-full grid lg:grid-rows-2 gap-x-2 lg:gap-x-10 gap-y-4">
                <FilePreview
                  label="Portfolio Inception"
                  filePath="/advanced-investments/Portfolio_inception.xlsx"
                  previewImgPath="/projects/excel.png"
                  width={largeExcelIconDim}
                  height={largeExcelIconDim}
                  special
                />
                <FilePreview
                  label="Portfolio Performance"
                  filePath="/advanced-investments/Portfolio_performance.xlsx"
                  previewImgPath="/projects/excel.png"
                  width={largeExcelIconDim}
                  height={largeExcelIconDim}
                  special
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FinanceLayout>
  );
};

export const getServerSideProps = () => fetchStockData("RBLX");

export default AdvancedInvestments;
