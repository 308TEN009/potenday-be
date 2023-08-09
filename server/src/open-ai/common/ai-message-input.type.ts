export const AIMessageInput = {
  EXPERIENCE: 'exp',
  EMPLOYMENT_OPPORTUNITY: 'emp',
  QUESTION: 'question',
  ROLE: 'role',
} as const;

export type AIMessageInputType =
  (typeof AIMessageInput)[keyof typeof AIMessageInput];
