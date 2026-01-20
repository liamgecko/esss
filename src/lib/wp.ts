type GraphQLError = { message: string };
type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[] };

function getWpEndpoint() {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new Error("Missing env var WP_GRAPHQL_ENDPOINT.");
  }
  return endpoint;
}

async function wpRequest<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables: TVariables
): Promise<TData> {
  const res = await fetch(getWpEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "WPGraphQL error");
  }
  if (!json.data) {
    throw new Error("WPGraphQL: missing data");
  }

  return json.data;
}

export type WpLink = {
  url?: string | null;
  title?: string | null;
  target?: string | null;
};

export type WpMedia = {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
};

export type HeroBlock = {
  __typename: "ContentBlocksContentBlocksHeroLayout";
  heroHeading?: string | null;
  heroText?: string | null;
  heroImage?: { node: WpMedia } | null;
  primaryButton?: WpLink | null;
  secondaryButton?: WpLink | null;
};

export type ImageTextBlock = {
  __typename: "ContentBlocksContentBlocksImageTextLayout";
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  primaryButton?: WpLink | null;
  image?: { node: WpMedia } | null;
};

export type CardGridCard = {
  heading?: string | null;
  content?: string | null;
  icon?: string | null;
};

export type CardGridBlock = {
  __typename: "ContentBlocksContentBlocksCardGridLayout";
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  cards?: CardGridCard[] | null;
};

export type GalleryImage = WpMedia & { id: string };

export type GalleryBlock = {
  __typename: "ContentBlocksContentBlocksGalleryLayout";
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  galleryImages?: { nodes: GalleryImage[] } | null;
};

export type ContentBlock = HeroBlock | ImageTextBlock | CardGridBlock | GalleryBlock;

export type PageWithBlocks = {
  id: string;
  title?: string | null;
  uri?: string | null;
  contentBlocks?: { contentBlocks?: ContentBlock[] | null } | null;
};

const PAGE_BLOCKS_QUERY = /* GraphQL */ `
  query PageBlocks($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      uri
      contentBlocks {
        contentBlocks {
          __typename

          ... on ContentBlocksContentBlocksHeroLayout {
            heroHeading
            heroText
            heroImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            primaryButton {
              url
              title
              target
            }
            secondaryButton {
              url
              title
              target
            }
          }

          ... on ContentBlocksContentBlocksImageTextLayout {
            heading
            mainHeading
            content
            primaryButton {
              url
              title
              target
            }
            image {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }

          ... on ContentBlocksContentBlocksCardGridLayout {
            heading
            mainHeading
            content
            cards {
              heading
              content
              icon
            }
          }

          ... on ContentBlocksContentBlocksGalleryLayout {
            heading
            mainHeading
            content
            galleryImages {
              nodes {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getPageByUri(uri: string): Promise<PageWithBlocks | null> {
  const data = await wpRequest<{ pageBy: PageWithBlocks | null }, { uri: string }>(
    PAGE_BLOCKS_QUERY,
    { uri }
  );

  return data.pageBy;
}

export type TestimonialsOptionQuote = {
  quote?: string | null;
  name?: string | null;
  roleAndCompany?: string | null;
};

export type TestimonialsOptions = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  quotes?: TestimonialsOptionQuote[] | null;
};

const TESTIMONIALS_OPTIONS_QUERY = /* GraphQL */ `
  query TestimonialsOptions {
    testimonials {
      testimonialsFields {
        heading
        mainHeading
        content
        quotes {
          quote
          name
          roleAndCompany
        }
      }
    }
  }
`;

/**
 * Fetch testimonials from the ACF Options Page named "testimonials".
 * Returns null if not configured (component should render nothing).
 */
export async function getTestimonialsOptions(): Promise<TestimonialsOptions | null> {
  try {
    const data = await wpRequest<
      { testimonials: { testimonialsFields: TestimonialsOptions | null } | null },
      Record<string, never>
    >(TESTIMONIALS_OPTIONS_QUERY, {});

    return data.testimonials?.testimonialsFields ?? null;
  } catch (err) {
    // If the ACF option page fields aren't available yet, render nothing.
    return null;
  }
}

export type ContactOptions = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  telephoneNumber?: string | null;
  emailAddress?: string | null;
};

const CONTACT_OPTIONS_QUERY = /* GraphQL */ `
  query ContactOptions {
    contact {
      contactFields {
        heading
        mainHeading
        content
        telephoneNumber
        emailAddress
      }
    }
  }
`;

/**
 * Fetch contact details from the ACF Options Page named "contact".
 *
 * Note: your ACF field group attached to this options page must have a GraphQL
 * field name that does NOT collide with the options page name. Set it to
 * `contactFields` (similar to `testimonialsFields`) in ACF → GraphQL settings.
 */
export async function getContactOptions(): Promise<ContactOptions | null> {
  try {
    const data = await wpRequest<
      { contact: { contactFields: ContactOptions | null } | null },
      Record<string, never>
    >(CONTACT_OPTIONS_QUERY, {});

    return data.contact?.contactFields ?? null;
  } catch {
    return null;
  }
}

