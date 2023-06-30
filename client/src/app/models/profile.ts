export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  image: string;
  following: boolean;
  followersCount: number;
  followingCount: number;
  photos: Photo[];
}
export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: string;
}
export interface UserPredicate{
  username: string;
  predicate:string;
}
export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}