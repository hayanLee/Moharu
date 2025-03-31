'use server';
import { createClient } from '@/supabase/server';

/*
 * 유저 액션
 * 로그인, 로그아웃, 회원가입
 * 프로필 수정
 */

/* 1. 회원가입 */
export async function signUp({ email, password, nickname }: { email: string; password: string; nickname?: string }) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('등록 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 2. 로그인 */
export async function logIn({ email, password }: { email: string; password: string }) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error('등록 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 3. 로그아웃 */
export async function logOut() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return { success: true };
  } catch (e) {
    console.error('로그아웃 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 4. 회원정보 수정 */
export async function updateUserProfile(formData: FormData) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const newNickname = formData.get('nickname');
    const newProfile = formData.get('profileUrl') as File;
    const newDescription = formData.get('description');

    if (newProfile) await updateProfileImage(user.id, newProfile);
    if (newNickname) await updateUserField(user.id, 'nickname', newNickname);
    if (newDescription) await updateUserField(user.id, 'description', newDescription);
    return { success: true };
  } catch (e) {
    console.error('프로필 업데이트 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 4.2 유저 필드 업데이트 */
async function updateUserField(userId: string, field: string, value: any) {
  const supabase = createClient();
  const { error } = await supabase
    .from('users')
    .update({ [field]: value })
    .eq('id', userId);
  if (error) throw new Error(`${field} 업데이트 실패: ${error.message}`);
}

/* 4.3 유저 프로필 이미지 업데이트 */
async function updateProfileImage(userId: string, newProfile: File) {
  try {
    const supabase = createClient();
    const fileExtension = newProfile.name.split('.').pop(); // 확장자
    const { error: ImageUploadError } = await supabase.storage
      .from('profile')
      .update(`${userId}/profile.${fileExtension}`, newProfile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (ImageUploadError) throw new Error(`이미지 스토리지 업로드 실패: ${ImageUploadError.message}`);
    const profileUrl = `profile/${userId}/profile.${fileExtension}`;

    // db 갱신
    await updateUserField(userId, 'profile_url', profileUrl);
  } catch (e) {
    console.error('프로필 이미지 업데이트 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 5. 회원정보 조회 */
export async function getUserInfo() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { data, error } = await supabase
      .from('users')
      .select('nickname, profile_url, description')
      .eq('id', user.id)
      .single();
    if (error) throw new Error(`유저 정보 조회 실패 : : ${error.message}`);
    return { success: true, data };
  } catch (e) {
    console.error('등록 실패:', e);
    return { success: false, data: { nickname: '', profile_url: '', description: '' } };
  }
}
