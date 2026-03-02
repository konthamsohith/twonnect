export interface UserProfile {
    id: string;
    name: string;
    role: 'Giver' | 'Builder' | 'Investor';
    avatar?: string;
    skills: string[];
    bio: string;
    projectsContributed: number;
    availableForTeams: boolean;
}

export const mockBuilders: UserProfile[] = [
    {
        id: 'u1',
        name: 'Alex Martinez',
        role: 'Builder',
        skills: ['React', 'Node.js', 'System Architecture'],
        bio: 'Full-stack developer looking to build MVPs for logistics and healthcare problems. Let\'s team up!',
        projectsContributed: 4,
        availableForTeams: true,
    },
    {
        id: 'u2',
        name: 'Samantha Li',
        role: 'Builder',
        skills: ['UX/UI Design', 'Figma', 'User Research'],
        bio: 'Passionate about accessible design. I turn messy problem statements into intuitive user flows.',
        projectsContributed: 12,
        availableForTeams: false,
    },
    {
        id: 'u3',
        name: 'David Okafor',
        role: 'Builder',
        skills: ['Hardware', 'PCB Design', 'IoT'],
        bio: 'Hardware engineer with a small lab. Interested in smart health devices and ag-tech.',
        projectsContributed: 2,
        availableForTeams: true,
    }
];
