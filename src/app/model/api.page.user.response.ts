import { User } from './user.model';
export class ApiPageUserResponse {

  content: User[];
  size?: number;
  totalPages: any;
  totalElements?: number;
  constructor(){
    this.content = [];
  }
}
