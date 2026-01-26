import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'My professional journey and educational background.',
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
