export interface AutoDeleteEmploymentOpportunityJob {
  /** 지원공고 PK */
  readonly eopId: string;
}

/** 지원공고 자동삭제 Job Name */
export const AutoDeleteEmploymentOpportunityJobName =
  'AutoDeleteEmploymentOpportunity';

/**
 * 지원공고 자동삭제일은 생성일로부터 6개월
 */
export const AutoDeleteEmploymentOpportunityDelay = 2629800000 * 6;
