const TimelineAndLanguageQuery = /* GraphQL */ `
  query {
    timelineEventCollection(order: startDate_ASC) {
      items {
        heading
        type
        startDate
        endDate
        currentlyWorking
        description {
          json
        }
      }
    }
    languageGroupCollection(limit: 3, order: order_ASC) {
      items {
        heading
        description
        emoji
        emojiLabel
        languagesCollection {
          items {
            name
            img {
              url(transform: { width: 50, resizeStrategy: SCALE })
            }
            accentColor
            darkText
          }
        }
      }
    }
  }
`;

export default TimelineAndLanguageQuery;
