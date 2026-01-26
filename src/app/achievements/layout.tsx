import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Achievements',
    description: 'My certifications, awards, and accomplishments.',
};

export default function AchievementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
