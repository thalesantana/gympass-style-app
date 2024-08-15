import { CheckIn } from "@prisma/client";

export interface FetchCheckInsResponseType {
  checkIns: CheckIn[];
}
