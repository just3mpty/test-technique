import { fetchGraphQL } from '@/lib/strapi/fetchGraphql';

const homeQuery = /* GRAPHQL ;) */ ``;

export default async function Homepage() {
  const data = await fetchGraphQL<{
    home: {
      title: string;
      description: string;
      // ETC
    };
  }>(homeQuery, {});

  return (
    <>
      <p>TEST TECHNIQUE</p>
    </>
  );
}
