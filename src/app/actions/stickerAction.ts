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
    const { data, error } = await supabase.storage.from('stickers').createSignedUrl(path, 60, {
      download: false,
    });

    if (error) throw error;
    return data?.signedUrl;
  } catch (e) {
    console.error('스티커 signedUrl 변환 실패:', e);
  }
}
