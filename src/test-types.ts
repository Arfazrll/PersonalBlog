import { Achievement, PortfolioData } from '@/types';

export const testAchievement: Achievement = {
    id: 'test',
    title: 'Test',
    issuer: 'Test',
    date: '2024-01-01',
    category: 'award'
};

export const testPortfolio: Partial<PortfolioData> = {
    achievements: [testAchievement]
};
