import { Profile as _NaverProfile } from 'passport-naver-v2';
import { Profile as _FacebookProfile } from 'passport-facebook';
import { Profile as _GoogleProfile } from 'passport-google-oauth20';
import { Profile as _KakaoProfile } from 'passport-kakao';

export interface KakaoProfile extends _KakaoProfile {
  id: string;
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

export interface NaverProfile extends _NaverProfile {}

export interface FacebookProfile extends _FacebookProfile {}

export interface GoogleProfile extends _GoogleProfile {}
