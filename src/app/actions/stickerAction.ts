'use server';

import { createClient } from '@/supabase/server';
import { GetAllStickerResponse } from './types/response';

// Drawer에 사용할 모든 스티커 가져오기
export async function getAllSticker(): Promise<GetAllStickerResponse> {
  try {
    const supabase = createClient();
    // 버킷
    const { data: storageFiles, error: getStorageError } = await supabase.storage.from('stickers').list('', {
      sortBy: { column: 'name', order: 'asc' },
    });
    if (getStorageError) throw getStorageError;

    // 파일 이름만 가진 배열
    const fileNames = storageFiles.map((file) => file.name);

    // signedUrl 만들기
    const { data: signedUrls, error: getSignedUrlError } = await supabase.storage
      .from('stickers')
      .createSignedUrls([...fileNames], 60, { download: false });

    if (getSignedUrlError) throw getStorageError;

    const filteredSignedUrls = signedUrls.map((signedUrlObj) => ({
      signedUrlObj: signedUrlObj.signedUrl,
      path: signedUrlObj.path ?? '',
    }));

    return { success: true, signedUrls: filteredSignedUrls };
  } catch (e) {
    console.error('스티커 가져오기 실패:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error occurred' };
  }
}
