import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";

import { Company, Quote } from "../../types";
import fetchStockData from "../../lib/fetchStockData";
import { lgScreenQuery } from "../../configs/Breakpoints";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";
import ClassProfile from "../../components/Projects/ClassProfile";
import StockCard from "../../components/Projects/StockCard";

const FilePreview = dynamic(import("../../components/Projects/FilePreview"), {
    ssr: false
});

type HessProps = {
    quoteData: Quote;
    companyData: Company;
};

const Hess = ({ quoteData, companyData }: HessProps) => {
    const lgScreen = useMediaQuery(lgScreenQuery);

    return (
        <ProjectLayout page="HES Pitch" type="finance">
            <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-center space-y-10 lg:space-y-14 mx-10 md:mx-auto mt-10">
                <ClassProfile
                    heading="[BUAD 421] Student Managed Investment Fund"
                    dateString="Spring 2022"
                >
                    This course provides a hands-on experience with portfolio
                    management and security analysis through the management of
                    the Mason School Student Managed Investment Fund (SMIF).
                    Students must select companies from an S&P stock universe,
                    do research on their business model and competitive
                    environment, make forecasts of future financial performance
                    and conduct valuation analyses, write an investment report,
                    and present an oral recommendation to colleagues and faculty
                    for inclusion in a real endowment portfolio of common
                    stocks.
                </ClassProfile>
                <StockCard
                    {...{ quoteData, companyData }}
                    purchasePrice={107.63}
                />
                <div>
                    <h1 className="text-3xl text-center font-bold mb-4 lg:mb-10">
                        Pitch Materials
                    </h1>
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
                                width={lgScreen ? 248 : 165}
                                height={lgScreen ? 248 : 165}
                                special
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
};

export const getStaticProps = () => fetchStockData("HES");

export default Hess;
