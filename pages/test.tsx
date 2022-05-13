import Image from "next/image";

import { LanguageGroup } from "../types";

import MainLayout from "../components/Global/layouts/MainLayout";

type TestProps = {
    languageGroupsData: LanguageGroup[];
};

const Test = ({ languageGroupsData }: TestProps) => {
    const { name, img, accentColor, darkText } =
        languageGroupsData[0].languages[0];

    return (
        <MainLayout page="test">
            <div className="mt-44">
                <div
                    key={languageGroupsData[0].heading}
                    className="flex flex-col items-center"
                >
                    <div className="flex justify-center mt-4 mb-2 bg-zinc-300/30 dark:bg-zinc-700/30 dark-transition backdrop-blur-md rounded-full shadow-xl p-5 lg:p-6 w-20 h-20 lg:w-24 lg:h-24">
                        <div className="flex justify-center items-center">
                            <Image
                                src={img.url}
                                alt="test"
                                {...{
                                    width: img.width,
                                    height: img.height
                                }}
                            />
                        </div>
                    </div>
                    <p
                        className={`w-5/6 rounded-full bg-[${accentColor}] ${
                            darkText ? "text-zinc-900" : "text-zinc-100"
                        } font-semibold text-sm lg:text-md text-center py-1 my-2`}
                    >
                        {name}
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

const query = /* GraphQL */ `
    {
        languageGroupCollection(limit: 3) {
            items {
                heading
                languagesCollection {
                    items {
                        name
                        img {
                            url(
                                transform: { width: 100, resizeStrategy: SCALE }
                            )
                            width
                            height
                        }
                        accentColor
                        darkText
                    }
                }
            }
        }
    }
`;

export async function getStaticProps() {
    const response = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
            },
            body: JSON.stringify({ query })
        }
    );
    if (!response.ok) {
        console.error(
            `Something went wrong with fetching resume data: ${response.status}`
        );
        return {
            props: {
                languageGroupsData: null
            }
        };
    }

    const {
        data: {
            languageGroupCollection: { items: languageData }
        }
    } = await response.json();

    const languageGroupsData = languageData.map(
        ({ heading, languagesCollection: { items: languages } }) => ({
            heading,
            languages
        })
    );

    return {
        props: {
            languageGroupsData
        }
    };
}

export default Test;
