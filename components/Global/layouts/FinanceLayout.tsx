import { ReactNode } from "react";

import { Quote, Company } from "../../../types";

import ClassProfile from "../../Projects/ClassProfile";
import StockCard from "../../Projects/Finance/StockCard";
import ProjectLayout from "./ProjectLayout";

type FinanceLayoutProps = {
    page: string;
    classProfileProps: {
        heading: string;
        dateString: string;
        description: string;
    };
    quoteData: Quote;
    companyData: Company;
    purchasePrice: number;
    children: ReactNode;
};

const FinanceLayout = ({
    page,
    classProfileProps: { heading, dateString, description },
    quoteData,
    companyData,
    purchasePrice,
    children
}: FinanceLayoutProps) => (
    <ProjectLayout {...{ page }} type="finance">
        <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-center space-y-10 lg:space-y-14 mx-10 md:mx-auto">
            <ClassProfile {...{ heading, dateString }}>
                {description}
            </ClassProfile>
            <StockCard {...{ quoteData, companyData, purchasePrice }} />
            {children}
        </div>
    </ProjectLayout>
);

export default FinanceLayout;
