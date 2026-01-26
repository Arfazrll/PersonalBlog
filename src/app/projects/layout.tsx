import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of projects and work.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
