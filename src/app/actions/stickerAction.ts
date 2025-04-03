'use server';

import { createClient } from '@/supabase/server';
import { AllStickers, ApiResponse } from './types/response';

/* Drawer에 사용할 모든 스티커 가져오기 */
export async function getAllStickers(): Promise<ApiResponse<AllStickers>> {
  try {
    const supabase = createClient();
    // 버킷
    const { data: storageFiles, error: getStorageError } = await supabase.storage.from('stickers').list('', {
      sortBy: { column: 'name', order: 'asc' },
    });
    if (getStorageError) throw getStorageError;
    // 파일 이름만 가진 배열
    const fileNames = storageFiles.map((file) => file.name);
    return { status: 'success', data: fileNames };
  } catch (e) {
    console.error('스티커 가져오기 실패:', e);
    return { status: 'error', data: [] };
  }
}

// signedUrl로 변환
export async function getSignedUrl(path: string) {
  try {
    const supabase = createClient();
    const { data } = await supabase.storage.from('stickers').getPublicUrl(path);
    return data?.publicUrl;
  } catch (e) {
    console.error('스티커 signedUrl 변환 실패:', e);
  }
}

// 모든 스티커의 signedUrl 가져오기
export async function getAllSignedStickers() {
  try {
    const stickerResult = await getAllStickers();
    if (stickerResult.status === 'error') throw new Error('스티커 목록을 가져오지 못함');

    const signedUrls = await Promise.all(
      stickerResult.data.map(async (fileName) => {
        const url = await getSignedUrl(fileName);
        return { name: fileName, url };
      })
    );

    return { status: 'success', data: signedUrls };
  } catch (e) {
    console.error('모든 스티커 signedUrl 변환 실패:', e);
    return { status: 'error', data: [] };
  }
}
