/*     User     */
export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  followers: Array<string>;
  following: Array<string>;
}

export interface User {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  gender: string;
  mobile: string;
  address: string;
  story: string;
  website: string;
  followers: Array<IUser>;
  following: Array<IUser>;
  post: Array<string>;
  saved: Array<string>;
  token: string;
}

export interface ClassNameProps {
  className?: string;
}

/* FaceBookLoginProps  */
export interface FaceBookLoginProps {
  title: string;
}

/* HelmetProps  */
export interface HelmetProps {
  title: string;
  children: React.ReactNode;
}

/* PostProps  */
export interface PostProps {
  post: IPost;
}

/*     Post    */
export interface IPost {
  user: User;
  content: string;
  images: string[];
  likes: string[];
  comments: string[];
  _id: string;
  createdAt: string;
}
