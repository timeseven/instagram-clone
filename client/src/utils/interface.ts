import { Socket } from "socket.io-client";
/*     User     */
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  username: string;
  fullname: string;
  faceBookId?: string;
  avatar?: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}

export interface IUserInfo {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
}

export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  followers: Array<string>;
  following: Array<string>;
}

export interface IUserRegister {
  email: string;
  password: string;
  username: string;
  fullname: string;
  faceBookId?: string;
  avatar?: string;
}

export interface IAuthState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
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
  medias: string[];
  likes: string[];
  comments: string[];
  _id: string;
  createdAt: string;
}

/* Upload Img */
export interface uploadImgState {
  iData: string[];
  imgObj: Object;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
export interface ICreatePost {
  content: string;
  medias: File[];
}

export interface postUpdate {
  content: string;
  postId: string;
}

export interface postState {
  pData: IPost[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/** Comment */

export interface IComment {
  _id: string;
  postId: string;
  content: string;
  tag: string[];
  reply: string;
  likes: string[];
  user: User;
  createdAt: string;
}

export interface Comment {
  content: string;
  tag?: string[];
  reply?: string;
  postId: string;
}

export interface ICommentState {
  cData: IComment[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/* CommentProps  */
export interface CommentProps {
  cmt: IComment;
  setReplyComment: (value: IComment) => void;
  deleteComment: (id: string) => void;
}

export interface ReplyCommentProps {
  reply: IComment;
  setReplyComment: (value: IComment) => void;
  deleteComment: (id: string) => void;
}

/* suggestionUserState */
export interface suggestionUserState {
  sUser: User[] | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
/* userState */
export interface userState {
  users: User[] | null;
  userData: User | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

export interface UserEdit {
  fullname: string;
  username: string;
  avatar: string;
  mobile: string;
  gender: string;
  address: string;
  story: string;
  website: string;
}

/* GlobalState  */

export interface IGlobalState {
  isCreatePostGlobal: boolean;
  isDeletePostGlobal: boolean;
  isEditPostGlobal: boolean;
  isCreateMessageGlobal: boolean;
  isCreateConversationGlobal: boolean;
  isDeleteConversationGlobal: boolean;

  isSearchGlobal: boolean;
  isNotificationGlobal: boolean;
  isAvatarEditGlobal: boolean;

  postModalId: string | null; // Add postId to the GlobalState interface
  conversationModalId: string | null;
}

/* Notification  */
export interface ICreateNotification {
  id: string;
  recipients: Array<string>;
  images: string;
  url: string;
  content: string;
  user: string;
}

export interface INotification {
  _id: string;
  id: string;
  user: User;
  recipients: Array<string>;
  images: string;
  url: string;
  content: string;
  isRead: boolean;
}

export interface NotificationState {
  nData: INotification[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

export interface UpLoadContent {
  url: string;
  type: string;
}

export interface AvatarProps {
  confirmAvatar: (value: string) => void;
}

/* Messages  */
export interface Call {
  start: string;
  end: string;
  video: boolean;
  audio: boolean;
}
export interface ICreateMessage {
  conversation: string;
  sender: string;
  call?: Call;
  recipient: string;
  text?: string;
  media?: string;
}
export interface IMessage {
  _id: string;
  conversation: string;
  sender: User;
  call: Call;
  recipient: User;
  text: string;
  media: string;
  createdAt: string;
}

export interface messagesState {
  mData: IMessage[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

/* Conversation  */
export interface INewMessageConversation {
  _id: string;
  recipients: User[];
  lastMessages: string;
  updatedAt: string;
}
export interface IConversation {
  _id: string;
  recipients: User[];
  isRead: boolean;
  lastMessages: string;
  updatedAt: string;
}

export interface conversationState {
  csData: IConversation[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ChatBoxProps {
  id: string;
}

/* Socket  */
export interface SocketState {
  sData: Socket | null;
}
