import PortfolioClient from '@/components/Portfolio';

const QUERY = `
  query Projets($filters: ProjetFiltersInput) {
    projets(filters: $filters) {
      title
      years
      description
      lastWord
      url
      police_connection {
        nodes {
          title
          policeName
        }
      }
      colors_connection {
        nodes {
          title
          hex
        }
      }
      tags {
        tag
      }
    }
  }
`;

async function fetchProjets() {
  const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { filters: {} },
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des projets');
  }

  const { data } = await res.json();

  return data.projets;
}

export default async function PortfolioPage() {
  const projects = await fetchProjets();

  return <PortfolioClient projects={projects} />;
}
