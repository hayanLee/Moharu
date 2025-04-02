'use server';

import fs from 'fs/promises'; // 서버 모듈
import path from 'path';

export const getStickersAction = async () => {
  try {
    const STICKER_DIRECTORY = path.join(process.cwd(), 'public/stickers');
    const files = await fs.readdir(STICKER_DIRECTORY);

    return files.map((file) => `/stickers/${file}`); // 파일 경로 배열 반환
  } catch (error) {
    console.error('스티커 파일을 불러올 수 없습니다:', error);
    return [];
  }
};
