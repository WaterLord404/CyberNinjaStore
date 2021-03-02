import { CustomerI } from './customerI';

export interface UserI {
  username: string;
  password: string;
  customer?: CustomerI;
}
