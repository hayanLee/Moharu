'use server';
/*
 * 챌린지 추가, 수정, 삭제
 * 업데이트
 */

import { createClient } from '@/supabase/server';
import { ModifyChallenge, NewChallenge } from '@/types/challenge.type';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { AllChallenges, ApiResponse, SingleChallenge } from './types/response';

/* 1. 챌린지 추가 */
export async function createChallenge(newChallenge: NewChallenge) {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { error } = await supabase.from('challenges').insert(newChallenge);
    if (error) throw error;

    revalidatePath('/', 'page');
    return { success: true };
  } catch (e) {
    console.error('등록 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

/* 2. 챌린지 스티커 붙이기 */
export async function addStickerToChallenge(goalId: number, sticker: string): Promise<ApiResponse<null>> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { data, error } = await supabase
      .from('challenges')
      .select('completed_days, period')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();
    if (error) throw new Error(`챌린지 데이터 가져오기 실패: ${error.message}`);
    if (!data) throw new Error('챌린지 데이터가 존재하지 않습니다.');

    const [{ error: insertError }, { error: updateError }] = await Promise.all([
      supabase.from('progress').insert({ challenge_id: goalId, sticker_img: sticker }),
      supabase
        .from('challenges')
        .update({
          last_updated: dayjs().format('YYYY-MM-DD'),
          completed_days: (data['completed_days'] + 1) as number,
          end_day: data['completed_days'] + 1 === data['period'] ? dayjs().format('YYYY-MM-DD') : null,
        })
        .eq('id', goalId),
    ]);

    if (insertError) throw new Error(`진행 상태 삽입 실패: ${insertError.message}`);
    if (updateError) throw new Error(`챌린지 업데이트 실패: ${updateError.message}`);

    revalidatePath(`/goals/${goalId}`);

    return { status: 'success', data: null };
  } catch (e) {
    console.error('스티커 등록 실패:', e);
    return { status: 'error', data: null };
  }
}

/* 2.2 챌린지 정보 수정 */
export async function updateChallengeInfo({
  id,
  category,
  challenge_name,
}: ModifyChallenge): Promise<ApiResponse<null>> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { error } = await supabase.from('challenges').update({ challenge_name, category }).eq('id', id).select();
    if (error) throw new Error(`업데이트 실패: ${error.message}`);
    return { status: 'success', data: null };
  } catch (e) {
    console.error('수정 실패:', e);
    return { status: 'error', data: null };
  }
}

/* 3. 챌린지 삭제 */
export async function deleteChallenge(goalId: number): Promise<ApiResponse<null>> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const response = await supabase.from('challenges').delete().eq('id', goalId);
    if (response.status === 204) return { status: 'success', data: null };
    else throw new Error('삭제 실패');
  } catch (e) {
    console.error('삭제 실패:', e);
    return { status: 'error', data: null };
  }
}

/* 4. 모든 챌린지 정보 가져오기 */
export async function fetchChallenges(): Promise<ApiResponse<AllChallenges>> {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const now = dayjs().format('YYYY-MM-DD');
    // 안 끝난 챌린지들
    const { data, error } = await supabase.from('challenges').select('*').eq('user_id', user.id).is('end_day', null);
    // 오늘 안 끝난 챌린지들
    const todayUntillDone = data?.filter((goal) => goal.last_updated !== now) ?? [];
    // 오늘 끝난
    const todayDone = data?.filter((goal) => goal.last_updated === now) ?? [];
    if (error) throw error;

    return {
      status: 'success',
      data: { todayUntillDone, todayDone },
    };
  } catch (e) {
    console.error('조회 실패:', e);
    return { status: 'error', data: { todayUntillDone: [], todayDone: [] } };
  }
}

/* 5. 특정 챌린지 정보 가져오기 */
export async function fetchChallengeById(id: number): Promise<ApiResponse<SingleChallenge>> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { data, error } = await supabase
      .from('challenges')
      .select(
        `
        *,
        progress(*)
        `
      )
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return {
      status: 'success',
      data: {
        challenge: data,
        progress: data?.progress ?? [],
      },
    };
  } catch (e) {
    console.error('조회 실패:', e);
    return {
      status: 'error',
      data: {
        challenge: null,
        progress: [],
      },
    };
  }
}

/* 7. 종료된 챌린지 데이터 가져오기 */
export async function getEndedChallenge(): Promise<ApiResponse<Tables<'challenges'>[]>> {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('user_id', user.id)
      .not('end_day', 'is', null);
    if (error) throw error;

    return {
      status: 'success',
      data,
    };
  } catch (e) {
    console.error('조회 실패:', e);
    return { status: 'error', data: [] };
  }
}
