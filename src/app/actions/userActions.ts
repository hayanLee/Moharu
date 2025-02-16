'use server';
import { createClient } from '@/supabase/server';

/*
 * 유저 액션
 * 로그인, 로그아웃, 회원가입
 * 프로필 수정
 */

// 1. 회원가입
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

// 2. 로그인
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

// 3. 로그아웃
export async function logOut() {
    try {
        const supabase = createClient();
    } catch (e) {
        console.error('등록 실패:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
    }
}

// 4. 회원정보 수정
export async function updateUserProfile() {
    try {
        const supabase = createClient();
    } catch (e) {
        console.error('등록 실패:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
    }
}
