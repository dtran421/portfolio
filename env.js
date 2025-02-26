const zod = require("zod");

const envSchema = zod.object({
  ALPHAVANTAGE_API_KEY: zod.string().required(),
  CHROMATIC_PROJECT_TOKEN: zod.string().required(),
  CONTENTFUL_DELIVERY_ACCESS_TOKEN: zod.string().required(),
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: zod.string().required(),
  CONTENTFUL_SPACE_ID: zod.string().required(),
  PREVIEW_SECRET_KEY: zod.string().required(),
  VERCEL_ENV: zod.union([zod.literal("production"), zod.literal("preview"), zod.literal("development")]),
});

// can't destructure `process.env` as a regular object, so we're doing it manually here
export const env = envSchema.parse({
  ALPHAVANTAGE_API_KEY: process.env.ALPHAVANTAGE_API_KEY,
  CHROMATIC_PROJECT_TOKEN: process.env.CHROMATIC_PROJECT_TOKEN,
  CONTENTFUL_DELIVERY_ACCESS_TOKEN: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  PREVIEW_SECRET_KEY: process.env.PREVIEW_SECRET_KEY,
  VERCEL_ENV: process.env.VERCEL_ENV,
});
