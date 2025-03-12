'use server';

import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache';
import { HabitType } from './(root)/page';

export async function addChallenge(newChallenge: Omit<HabitType, 'id'>) {
  try {
    const res = await fetch('http://localhost:8000/challenges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChallenge),
    });
    if (!res.ok) throw new Error('챌린지 추가 실패');
    revalidatePath('/challenges');
    return { success: true };
  } catch (e) {
    console.error('등록 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

export async function submitSticker(sticker: string, goalId: string) {
  // 서버에서 sticker 처리하기 (예: DB에 저장)
  try {
    const now = dayjs();

    // 해당 아이디 데이터 가져오기
    const getRes = await fetch(`http://localhost:8000/challenges/${goalId}`);
    if (!getRes.ok) throw new Error(`fail to get : ${getRes.statusText}`);

    const challenge = await getRes.json();

    // 새로운 progress 배열
    const updatedProgress = [...challenge.progress, { date: now.format('YYYY/MM/DD'), sticker }];
    const isLastProcess = updatedProgress.length === challenge.period;

    // 업데이트 하기
    const patchRes = await fetch(`http://localhost:8000/challenges/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        progress: updatedProgress,
        isFinished: isLastProcess,
        endDay: isLastProcess && now.format('YYYY/MM/DD'),
      }),
    });
    if (!patchRes.ok) throw new Error(`Failed to update: ${patchRes.statusText}`);
    revalidatePath(`/challenges/${goalId}`);
    console.log('업데이트 성공:');
  } catch (e) {
    console.error('업데이트 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}

export async function deleteChallenge(goalId: number) {
  try {
    const delteRes = await fetch(`http://localhost:8000/challenges/${goalId}`, {
      method: 'DELETE',
    });
    if (!delteRes.ok) throw new Error(`Failed to delete: ${delteRes.statusText}`);
    revalidatePath(`/challenges`);
    return { success: true };
  } catch (e) {
    console.error('삭제 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}
