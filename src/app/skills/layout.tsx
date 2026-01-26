import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Skills',
    description: 'My technical skills, tech stack, and tools I work with.',
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
