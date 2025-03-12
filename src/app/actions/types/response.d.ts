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

type UserInfo = Pick<Talbes<'users'>, 'nickname' | 'profile_url' | 'description'>;
