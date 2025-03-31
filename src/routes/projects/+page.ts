import type { PageLoad } from './$types';
import { PUBLIC_GITHUB_TOKEN } from '$env/static/public';

interface Language {
  id: string;
  name: string;
  color: string;
}

interface Repository {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  homepageUrl: string | null;
  url: string;
  languages: {
    nodes: Language[];
  };
}

interface PinnedItems {
  nodes: Repository[];
}

interface User {
  pinnedItems: PinnedItems;
}

interface Data {
  user: User;
}

interface Response {
  data: Data;
}

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PUBLIC_GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      query: `
query {
  user(login: "DerekNMartin") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          id,
          name,
          createdAt,
          description,
          homepageUrl,
          url,
          languages(first: 3) {
            nodes { id, name, color}
          }
          }
        }
      }
    }
}
      `
    })
  });
  const { data } = (await res.json()) as Response;
  return data;
};
