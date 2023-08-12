import { ContentfulQuery } from "@/utils/Contentful";

import { ContentfulResource } from "./Resources";

const ResumeSectionsQuery = /* GraphQL */ `
  query {
    resumeTabSectionCollection(order: order_ASC) {
      items {
        heading
        subsectionsCollection {
          items {
            ... on ResumeTabSubsection {
              title
              organization
              startDate
              endDate
              currentlyWorking
              description {
                json
              }
            }
          }
        }
      }
    }
    resumeBubblesSectionCollection(order: order_ASC) {
      items {
        heading
        items
      }
    }
  }
`;

const q: ContentfulQuery = {
  resources: [ContentfulResource.ResumeTabSection, ContentfulResource.ResumeBubblesSection],
  query: ResumeSectionsQuery,
};

export default q;
