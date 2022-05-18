import { ReactNode } from "react";

type ClassProfileProps = {
    heading: string;
    dateString: string;
    children: ReactNode;
};

const ClassProfile = ({ heading, dateString, children }: ClassProfileProps) => (
    <div className="flex flex-col space-y-2 mt-10">
        <h1 className="font-semibold text-2xl lg:text-3xl">{heading}</h1>
        <p className="text-xl lg:text-2xl text-gray-300">{dateString}</p>
        <p className="lg:text-lg">{children}</p>
    </div>
);

export default ClassProfile;
