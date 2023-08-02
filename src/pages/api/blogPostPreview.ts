import BlogPostQuery from "../../graphql/BlogPostQuery";
import getContentfulAccessToken from "../../lib/getContentfulAccessToken";

const getPost = async (postId) => {
  try {
    const preview = true;
    const accessToken = getContentfulAccessToken(preview);

    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: BlogPostQuery,
          variables: { postId },
        }),
      }
    );
    const {
      data: {
        blogPostCollection: { items: postData },
      },
    } = await response.json();

    return postData[0];
  } catch (exception) {
    console.error(`Something went wrong with fetching blog post: ${exception.message}`);
    return null;
  }
};

const handler = async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.PREVIEW_SECRET_KEY || !req.query.postId) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `postId` exists
  // getPost implements the required fetching logic to the headless CMS
  const post = await getPost(req.query.postId);

  // If the postId doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid postId" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // Don't redirect to req.query.postId as that might lead to open redirect vulnerabilities
  return res.redirect(`/blog/${post.postId}`);
};

export default handler;
