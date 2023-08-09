import { Profile as _NaverProfile } from 'passport-naver-v2';
import { Profile as _FacebookProfile } from 'passport-facebook';
import { Profile as _GoogleProfile } from 'passport-google-oauth20';

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

export interface FacebookProfile extends _FacebookProfile {
  email: string;

  username: string;
}

export interface GoogleProfile extends _GoogleProfile {}
