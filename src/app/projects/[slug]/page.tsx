
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { ProjectPageContent } from '@/components/projects/ProjectPageContent';

export async function generateStaticParams() {
    return portfolioData.projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // console.log('ProjectPage slug:', slug);
    const project = portfolioData.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectPageContent project={project} />;
}
