import { useEffect } from "react";
import dynamic from "next/dynamic";

import timelineData from "../../public/json/timeline.json";

const Event = dynamic(import("./Event"), { ssr: false });

const query = `
{
  blogPostCollection {
    items {
      title
    }
  }
}
`;

const Timeline = () => {
    const { events } = timelineData;

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch(
                    "https://graphql.contentful.com/content/v1/spaces/tyqot91f5gwl/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer DiOnKXPdIGUog67V32hULM9NfvDKSPyZVqQ3J4UzZpc"
                        },
                        body: JSON.stringify({ query })
                    }
                );

                if (!response.ok) {
                    throw response.status;
                }

                const { data } = await response.json();

                console.log(data);
            } catch (err) {
                console.error(
                    `Something went wrong with fetching posts: ${err}`
                );
            }
        };

        // fetchBlogPosts();
    });

    return (
        <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden h-full">
                <div className="absolute left-0 md:left-1/2 h-full border border-zinc-600/75 dark:border-zinc-400/75 dark-transition mx-3.5 md:mx-0" />
                <div className="space-y-8">
                    {events.map((event, idx) => (
                        <Event
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            side={idx % 2 === 0 ? "L" : "R"}
                            data={event}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
