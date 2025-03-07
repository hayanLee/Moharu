import { Tables } from './supabase';

type Challenge = Tables<'challenges'>;

export type NewChallenge = Pick<Tables<'challenges'>, 'category' | 'challenge_name' | 'start_day' | 'period'>;
export type NewProgress = Pick<Tables<'progress'>, 'sticker_img'>;
