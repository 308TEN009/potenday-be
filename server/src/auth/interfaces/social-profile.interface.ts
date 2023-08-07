import { Profile as _NaverProfile } from 'passport-naver-v2';

export interface KakaoProfile {
  id: number;
  connected_at: string;
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
    gender_needs_agreement: boolean;
  };
}

export interface NaverProfile extends _NaverProfile {
  name: string;
  email: string;
  mobile: string;
}
