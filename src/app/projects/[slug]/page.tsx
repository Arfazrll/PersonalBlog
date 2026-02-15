
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { ProjectPageContent } from '@/components/projects/ProjectPageContent';

export async function generateStaticParams() {
    return portfolioData.projects.map((project) => ({
        slug: project.slug,
    }));
}

import { getProjectImages } from '@/app/actions/getProjectImages'; // Import server action

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = portfolioData.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    // Fetch dynamic images from public/project folder
    const galleryImages = await getProjectImages(slug, project.title);

    // If dynamic images found, override the project data
    const updatedProject = {
        ...project,
        image: galleryImages.length > 0 ? galleryImages[0] : project.image, // First image as Hero
        galleryImages: galleryImages.length > 0 ? galleryImages : project.galleryImages // All images for gallery
    };

    return <ProjectPageContent project={updatedProject} />;
}
