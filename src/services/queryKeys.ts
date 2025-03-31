export const queryKeys = {
  challeges: ['challenges', 'list'],
  milestones: () => [...queryKeys.challeges, 'done'] as const,
  challenge_detail: (id: string) => ['challenge', id] as const,
  stickers: ['stickers'],
  profile: ['profile'],
};
