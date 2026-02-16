import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GitHub Token not found' }, { status: 500 });
  }

  const query = `
    query {
      viewer {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
    `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error('GitHub API Errors:', json.errors);
      return NextResponse.json({ error: json.errors[0].message }, { status: 500 });
    }

    const repos = json.data.viewer.repositories.nodes;
    const languageStats: Record<string, { size: number, color: string }> = {};
    let totalSize = 0;

    repos.forEach((repo: any) => {
      if (repo.languages.edges) {
        repo.languages.edges.forEach((edge: any) => {
          const { size, node } = edge;
          const { name, color } = node;

          if (!languageStats[name]) {
            languageStats[name] = { size: 0, color };
          }
          languageStats[name].size += size;
          totalSize += size;
        });
      }
    });

    const languages = Object.entries(languageStats)
      .map(([name, { size, color }]) => ({
        name,
        size,
        color,
        percent: totalSize > 0 ? (size / totalSize) * 100 : 0
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 6) // Top 6 languages
      .map(lang => ({
        ...lang,
        percent: Math.round(lang.percent * 100) / 100 // Round to 2 decimals
      }));

    return NextResponse.json({ data: languages });

  } catch (error) {
    console.error('Error fetching GitHub languages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
