export interface User {
  fullName: string;
  email: string;
  password: string;
  joinDate: string;
  profilePicture?: string; // <-- add this line, optional
}
