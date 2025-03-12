import { Challenge } from '@/types/challenge.type';
import { Tables } from '@/types/supabase';

type ApiResponse<T> = {
  status: 'success' | 'error';
  data: T;
};

type AllChallenges = {
  todayUntillDone: Challenge[];
  todayDone: Challenge[];
};

type SingleChallenge = {
  challenge: Tables<'challenges'> | null;
  progress: Tables<'progress'>[];
};

type AllStickers = string[];

interface SignedUrlObj {
  signedUrlObj: string;
  path: string;
}

interface GetAllStickerResponse extends Response {
  signedUrls?: SignedUrlObj[];
}

interface ChallengeDeatil extends Tables<'challenges'> {
  progress: Tables<'progress'>[];
}
