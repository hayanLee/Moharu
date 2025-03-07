import { Challenge } from '@/types/challenge.type';

interface Response {
  success: boolean;
  error?: string;
}

interface FetchChallengesResponse extends Response {
  todayUntillDone?: Challenge[];
  todayDone?: Challenge[];
}
