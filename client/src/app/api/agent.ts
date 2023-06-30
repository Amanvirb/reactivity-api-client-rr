import axios, { AxiosError, AxiosResponse } from "axios";
import { User } from "../models/account";
// import { toast } from 'react-toastify';
// import { history } from '../..';
// import { Activity, ActivityFormValues } from '../models/activity';
// import { PaginatedResponse } from '../models/pagination';
// import { Photo, Profile, UserActivity } from '../models/profile';
// import { User, UserFormValues } from '../models/user';
// import { store } from '../stores/store';
import { Activity, ActivityDetail } from "../models/activity";
import { PaginatedResponse } from "../models/pagination";
import { Photo, Profile, UserActivity } from "../models/profile";
import { useNavigate } from "react-router";
import { router } from "../layout/Routes";
import { AppDispatch, useAppDispatch } from "../store/configureStore";
import { signOut } from "../../features/users/account/accountSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// const dispatch = useAppDispatch();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(500);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResponse<any>>;
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith(
            'Bearer error="invalid_token"'
          )
        ) {
          // dispatch(signOut());
          toast.error("Session expired - please login again");
        }
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        // store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  // get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {

  createActivity: (activity: Partial<ActivityDetail>) =>
    requests.post<void>("/activities", activity),
  updateActivity: (activity: Partial<ActivityDetail>) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  getActivityList: (params: URLSearchParams) =>
    axios.get<Activity[]>("/activities", { params }).then(responseBody),

  getActivityDetail: (id: string) =>
    requests.get<ActivityDetail>(`/activities/${id}`),

  activityAttend: (id: string) =>
    requests.post<void>(`/activities/${id}/attend`, {}),

  deleteActivity: (id: string) => requests.del<void>(`/activities/${id}`),
  // attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
};

const Account = {
  currentUser: () => requests.get<User>("/account/currentUser"),
  login: (user: any) => requests.post<User>("/account/login", user),
  register: (user: any) => requests.post<void>("/account/register", user),
  fbLogin: (accessToken: string) =>
    requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
  // refreshToken: () => requests.post<User>('/account/refreshToken', {}),
  verifyEmail: (token: string, email: string) =>
    requests.post<void>(
      `/account/verifyEmail?token=${token}&email=${email}`,
      {}
    ),
  resendEmailConfirm: (email: string) =>
    requests.get(`/account/resendEmailConfirmationLink?email=${email}`),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  userActivitiesList: (username: string, predicate: string) =>
    requests.get<UserActivity[]>(
      `/profiles/${username}/activities?predicate=${predicate}`
    ),
};

const agent = {
  Activities,
  Account,
  Profiles,
};

export default agent;
