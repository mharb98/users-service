import { Gender } from '@prisma/client';

export interface UpdateSocialProfileInput {
  banned?: boolean;
  gender?: Gender;
}
