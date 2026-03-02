export interface Problem {
    id: string;
    title: string;
    description: string;
    author: string;
    authorRole: 'Giver' | 'Builder';
    category: string;
    upvotes: number;
    status: 'Open' | 'In Progress' | 'Solved';
    solutionsCount: number;
    createdAt: string;
}

export const mockProblems: Problem[] = [
    {
        id: 'p1',
        title: 'Local businesses struggle to manage deliveries during peak hours',
        description: 'During lunch rushes or weekends, small local restaurants can\'t afford dedicated drivers but delivery apps take 30% commission. We need a way for neighborhood residents to voluntarily pick up food for their neighbors on their way home.',
        author: 'Sarah Jenkins',
        authorRole: 'Giver',
        category: 'Logistics',
        upvotes: 142,
        status: 'Open',
        solutionsCount: 3,
        createdAt: '2026-03-01T10:00:00Z',
    },
    {
        id: 'p2',
        title: 'Finding reliable freelance hardware engineers is too hard',
        description: 'There are platforms for software developers (Upwork, Toptal), but when building a physical prototype, finding a mechanical engineer or PCB designer who can do small freelance components is nearly impossible. Current solutions are fragmented.',
        author: 'Tech Innovator',
        authorRole: 'Builder',
        category: 'Hardware',
        upvotes: 89,
        status: 'In Progress',
        solutionsCount: 1,
        createdAt: '2026-02-28T14:30:00Z',
    },
    {
        id: 'p3',
        title: 'Elderly patients forget complicated medication schedules',
        description: 'My grandfather has to take 6 different pills at 4 different times a day. Existing pill organizers are easily confused, and apps are too complex for non-tech-savvy seniors. We need a zero-friction, foolproof hardware/software combo.',
        author: 'Marcus Chen',
        authorRole: 'Giver',
        category: 'Healthcare',
        upvotes: 215,
        status: 'Open',
        solutionsCount: 5,
        createdAt: '2026-02-25T09:15:00Z',
    }
];
