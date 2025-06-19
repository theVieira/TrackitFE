import { iTech } from '@features/tech/models/tech.model';

export interface iSignInResponse {
  token: string;
  tech: iTech;
}
