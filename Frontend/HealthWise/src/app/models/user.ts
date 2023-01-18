export interface User {
  client_full_names:string;
  client_phone_no:string;
  description: string;
  appointment_date:Date;
}

export interface UpdateInfor {
  first_name:string;
  last_name:string;
  email: string;
}

export class Users {
  email_sddress: string;
  password:string;
}
