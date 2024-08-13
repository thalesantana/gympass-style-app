import { CheckIn } from '@prisma/client';

export interface FetchUserCheckInsResponseType {
  checkIns: CheckIn[]
}