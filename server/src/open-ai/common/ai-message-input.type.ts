export const AIMessageInput = {
  EXPERIENCE: 'exp',
  EMPLOYMENT_OPPORTUNITY: 'emp',
  JOB_DESCRIPTION: 'jd',
  QUESTION: 'question',
  ROLE: 'role',
} as const;

export type AIMessageInputType =
  (typeof AIMessageInput)[keyof typeof AIMessageInput];
