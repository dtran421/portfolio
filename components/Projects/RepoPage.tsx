import projects from "../../public/json/projects.json";

import ProjectLayout from "../Global/layouts/ProjectLayout";
import RepoCard from "./RepoCard";

type RepoPageProps = {
    bannerHeading: string;
    heading: string;
    dateString: string;
    description: string;
    data: {
        name: string;
        url: string;
        tags: string[];
    }[];
};

const RepoPage = ({
    bannerHeading,
    heading,
    dateString,
    description,
    data
}: RepoPageProps) => {
    const { accentColor } = projects.coding[bannerHeading];

    return (
        <ProjectLayout page={bannerHeading} type="coding">
            <div className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl flex flex-col mx-8 md:mx-auto">
                <div className="flex flex-col space-y-2 mt-10">
                    <h1 className="font-semibold text-2xl lg:text-3xl">
                        {heading}
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-300">
                        {dateString}
                    </p>
                    <p className="lg:text-lg">{description}</p>
                </div>
                <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-y-10 lg:gap-6 md:px-10 lg:px-0 mt-20">
                    {data.map(({ name, url, tags }) => (
                        <RepoCard
                            key={name}
                            {...{
                                name,
                                url,
                                tags,
                                accentColor
                            }}
                        />
                    ))}
                </div>
            </div>
        </ProjectLayout>
    );
};

export default RepoPage;
