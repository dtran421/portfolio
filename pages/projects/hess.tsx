import { Company, Quote } from "../../types";

import ProjectLayout from "../../components/Global/layouts/ProjectLayout";
import FilePreview from "../../components/Projects/FilePreview";
import ClassProfile from "../../components/Projects/ClassProfile";
import StockCard from "../../components/Projects/StockCard";

type HessProps = {
    quoteData: Quote;
    companyData: Company;
};

const Hess = ({ quoteData, companyData }: HessProps) => (
    <ProjectLayout page="HES Pitch" type="finance">
        <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-center space-y-10 lg:space-y-14 mx-10 md:mx-auto mt-10">
            <ClassProfile
                heading="[BUAD 421] Student Managed Investment Fund"
                dateString="Spring 2022"
            >
                This course provides a hands-on experience with portfolio
                management and security analysis through the management of the
                Mason School Student Managed Investment Fund (SMIF). Students
                must select companies from an S&P stock universe, do research on
                their business model and competitive environment, make forecasts
                of future financial performance and conduct valuation analyses,
                write an investment report, and present an oral recommendation
                to colleagues and faculty for inclusion in a real endowment
                portfolio of common stocks.
            </ClassProfile>
            <StockCard {...{ quoteData, companyData }} />
            <div>
                <h1 className="text-3xl text-center font-bold mb-4 lg:mb-10">
                    Pitch Materials
                </h1>
                <div className="flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-20 gap-y-6 lg:gap-y-0">
                    <div className="row-span-2 flex items-center">
                        <FilePreview
                            filePath="/hess/HES_report.pdf"
                            altText="hess report cover page"
                            previewImgPath="/projects/hess/report_cover_page.png"
                            width={1700}
                            height={2200}
                            imgPosition="items-center"
                        />
                    </div>
                    <FilePreview
                        filePath="/hess/HES_presentation.pdf"
                        altText="hess presentation title slide"
                        previewImgPath="/projects/hess/presentation_title_slide.png"
                        width={2667}
                        height={1500}
                        imgPosition="items-center lg:items-start"
                    />
                    <div className="flex items-end">
                        <FilePreview
                            filePath="/hess/HES_valuation.xlsx"
                            altText="hess valuation excel icon"
                            previewImgPath="/projects/hess/excel.png"
                            width={330}
                            height={330}
                            imgPosition="items-end"
                        />
                    </div>
                </div>
            </div>
        </div>
    </ProjectLayout>
);

export async function getStaticProps() {
    const quoteResponse = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=HES&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "request"
            }
        }
    );
    if (!quoteResponse.ok) {
        console.error(
            `Something went wrong with fetching stock quote: ${quoteResponse.status}`
        );
    }

    const {
        "Global Quote": {
            "01. symbol": symbol,
            "05. price": price,
            "09. change": change,
            "10. change percent": changePct,
            "07. latest trading day": latestBusinessDay
        }
    } = await quoteResponse.json();

    const overviewResponse = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=HES&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "request"
            }
        }
    );
    if (!overviewResponse.ok) {
        console.error(
            `Something went wrong with fetching company overview: ${overviewResponse.status}`
        );
    }

    const {
        Name: name,
        Exchange: exchange,
        Sector: sector,
        Industry: industry,
        MarketCapitalization: marketCap,
        DividendYield: dividendYield,
        EPS: eps,
        "52WeekHigh": high52Weeks,
        "52WeekLow": low52Weeks
    } = await overviewResponse.json();

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    return {
        props: {
            quoteData: {
                symbol,
                price: formatter.format(parseFloat(price)),
                change: parseFloat(change),
                changePct: parseFloat(changePct.replace("%", "")),
                latestBusinessDay
            },
            companyData: {
                name,
                exchange,
                sector,
                industry,
                marketCap: parseInt(marketCap, 10),
                dividendYield: dividendYield * 100,
                eps: formatter.format(parseFloat(eps)),
                high52Weeks: formatter.format(parseFloat(high52Weeks)),
                low52Weeks: formatter.format(parseFloat(low52Weeks))
            }
        }
    };
}

export default Hess;
