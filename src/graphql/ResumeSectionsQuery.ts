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

export default ResumeSectionsQuery;
