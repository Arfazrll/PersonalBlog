import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GitHub Token not found' }, { status: 500 });
  }

  const query = `
    query {
      viewer {
        login
        followers {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes {
            name
            stargazerCount
            forkCount
          }
        }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
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

    const data = json.data.viewer;
    const username = data.login;
    const repos = data.repositories.nodes;

    // Calculate Total Stars
    const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);
    const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forkCount, 0);

    // Contributions
    const contributions = data.contributionsCollection;
    const totalCommits = contributions.totalCommitContributions;
    const totalPRs = contributions.totalPullRequestContributions;
    const totalContributions = contributions.contributionCalendar.totalContributions;

    // Calculate "This Week" and "Best Day" from calendar
    const weeks = contributions.contributionCalendar.weeks;
    const flatDays = weeks.flatMap((w: any) => w.contributionDays);

    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeekContributions = flatDays
      .filter((d: any) => new Date(d.date) >= oneWeekAgo)
      .reduce((acc: number, d: any) => acc + d.contributionCount, 0);

    const bestDay = flatDays.reduce((max: number, d: any) => Math.max(max, d.contributionCount), 0);

    // --- FETCH RECENT ACTIVITY (REST API) ---
    let recentActivity = [];
    try {
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=20`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (eventsRes.ok) {
        const events = await eventsRes.json();
        recentActivity = events
          .filter((e: any) => e.type === 'PushEvent' || e.type === 'PullRequestEvent')
          .slice(0, 6)
          .map((e: any) => {
            if (e.type === 'PushEvent') {
              return {
                type: 'push',
                repo: e.repo.name,
                branch: e.payload.ref.replace('refs/heads/', ''),
                message: e.payload.commits?.[0]?.message || 'No commit message',
                date: e.created_at,
              };
            } else if (e.type === 'PullRequestEvent') {
              return {
                type: 'pr',
                repo: e.repo.name,
                title: e.payload.pull_request.title,
                status: e.payload.action, // opened, closed, etc.
                merged: e.payload.pull_request.merged,
                date: e.created_at,
                url: e.payload.pull_request.html_url
              };
            }
            return null;
          });
      }
    } catch (eventError) {
      console.error('Failed to fetch events:', eventError);
      // Don't fail the whole request, just return empty activity
    }

    return NextResponse.json({
      data: {
        username, // Return retrieved username
        totalStars,
        totalForks,
        totalCommits,
        totalPRs,
        totalContributions,
        thisWeek: thisWeekContributions,
        bestDay,
        followers: data.followers.totalCount,
        recentActivity // Activity feed
      }
    });

  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
