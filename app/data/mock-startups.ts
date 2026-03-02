export interface StartupProject {
    id: string;
    name: string;
    tagline: string;
    originalProblemId: string;
    teamSize: number;
    traction: string;
    stage: 'Idea' | 'Prototype' | 'MVP' | 'Revenue';
    seekingFunding: boolean;
}

export const mockStartups: StartupProject[] = [
    {
        id: 's1',
        name: 'NeighborDash',
        tagline: 'Zero-commission community delivery network powered by locals.',
        originalProblemId: 'p1',
        teamSize: 4,
        traction: '150 active daily users, 5 partnered local restaurants',
        stage: 'MVP',
        seekingFunding: true
    },
    {
        id: 's2',
        name: 'PillSync Hardware',
        tagline: 'Foolproof medication adherence hardware with simple light-cues.',
        originalProblemId: 'p3',
        teamSize: 2,
        traction: 'Working prototype tested with 20 elderly patients',
        stage: 'Prototype',
        seekingFunding: true
    }
];
