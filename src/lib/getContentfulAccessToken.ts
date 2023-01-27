const getContentfulAccessToken = (preview) =>
    preview
        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;

export default getContentfulAccessToken;
