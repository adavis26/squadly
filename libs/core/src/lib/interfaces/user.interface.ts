export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface AddUserToChatDTO {
  chatId: number;
  userId: number;
}
