'use server';
import { createClient } from '@/supabase/server';
import { ColorChip } from '../(root)/settings/theme/page';

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
    if (error) {
      if (error.message.includes('User already registered'))
        return { success: false, error: '이미 존재하는 이메일입니다.' };
      else return { success: false, error: '회원가입에 실패하였습니다.' };
    }
    return { success: true, data };
  } catch (e) {
    return { success: false, error: '회원가입 중 오류가 발생하였습니다.' };
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
    if (error) {
      if (error.message.includes('Invalid login credentials'))
        return { success: false, error: '이메일 또는 비밀번호가 일치하지 않습니다.' };
      else return { success: false, error: '로그인이 실패하였습니다.' };
    }
    return { success: true, data };
  } catch (e) {
    return { success: false, error: '로그인 중 오류가 발생하였습니다.' };
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
    const newProfile = formData.get('profileUrl');
    const newDescription = formData.get('description');

    const updateTasks: Promise<any>[] = [];

    if (newProfile) updateTasks.push(updateUserField(user.id, 'profile_url', newProfile));
    if (newNickname) updateTasks.push(updateUserField(user.id, 'nickname', newNickname));
    if (newDescription) updateTasks.push(updateUserField(user.id, 'description', newDescription));

    const results = await Promise.allSettled(updateTasks);
    const hasError = results.some((r) => r.status === 'rejected'); // 실패한 거 있으면
    if (hasError) {
      results.forEach((result) => {
        if (result.status === 'rejected') console.error('업데이트 실패:', result.reason);
      });
      return { success: false, error: '일부 항목 업데이트 실패' };
    }
    return { success: true };
  } catch (e) {
    console.error('프로필 업데이트 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 4.2 유저 필드 업데이트 */
async function updateUserField(userId: string, field: string, value: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .update({ [field]: value })
    .eq('id', userId)
    .select();
  if (error) throw new Error(`${field} 업데이트 실패: ${error.message}`);
}

/* 4.3 유저 프로필 이미지 업데이트 */
async function updateProfileImage(userId: string, newProfile: File) {
  try {
    const supabase = createClient();
    const fileExtension = newProfile.name.split('.').pop()?.toLocaleLowerCase(); // 확장자
    const { error: ImageUploadError } = await supabase.storage
      .from('profile')
      .update(`${userId}/profile.${fileExtension}`, newProfile, {
        upsert: true,
        contentType: newProfile.type,
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
      .select('nickname, profile_url, description, color')
      .eq('id', user.id)
      .single();
    if (error) throw new Error(`유저 정보 조회 실패 : : ${error.message}`);
    return { success: true, data };
  } catch (e) {
    console.error('등록 실패:', e);
    return { success: false, data: { nickname: '', profile_url: '', description: '', color: '' } };
  }
}

/* 6. 메인 컬러 변경 */
export async function setMainColor(color: ColorChip) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { error } = await supabase.from('users').update({ color: color }).eq('id', user.id);
    if (error) throw new Error(`컬러 변경 실패 : : ${error.message}`);
    return { success: true };
  } catch (e) {
    console.error('변경 실패:', e);
    return { success: false };
  }
}
