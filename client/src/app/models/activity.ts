import { User } from "./account";
export interface ActivityAttendee {
  bio: string;
  displayName: string;
  followersCount: number;
  following: boolean;
  followingCount: number;
  image: string;
  username: string;
}
export interface ActivityDetail {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  attendees: ActivityAttendee[];
  comments: string[];
}

// export interface Items {
//   id: string;
//   title: string;
//   date: string;
//   description: string;
//   category: string;
//   city: string;
//   venue: string;
//   hostUsername: string;
//   isCancelled: boolean;
//   attendees: [];
//   comments: [];
// }
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
export interface Activity {
  items: ActivityDetail[];
  pagination: Pagination;
}

export interface ActivityParams {
  isGoing: boolean;
  isHost: boolean;
  all: boolean;
  startDate: Date;
}
export interface ActivityAttendee {
  username: string;
  displayName: string;
  bio: string;
  image: string;
  following: boolean;
}
export interface AttendActivityData {
  id: string;
  user: User;
}

export interface FormActivity {
  id: string;
  title: string;
  // title1: string;
  nutritionFacts: string;
  // nutritionFacts1: string;
  category: string;
  city: string;
  venue: string;
  country: string;
  hostName: string;
  isCancelled: boolean;
  protienSource: string;
  source1: string;
  source2: string;
  source3: string;
  source4: string;
  source5: string;
}
