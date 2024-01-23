import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User, VerifyEmail } from "../../../app/models/account";
import { router } from "../../../app/layout/Routes";
import { FieldValues } from "react-hook-form";
import agent from "../../../app/api/agent";
import {
  idle,
  loginPending,
  pending,
  registerPending,
} from "../../../app/common/options/sliceOpt";
import { toast } from "react-toastify";
import { error } from "console";

interface AccountState {
  user: User | null;
  accountStatus: string;
  error: string;
}

const initialState: AccountState = {
  user: null,
  accountStatus: idle,
  error: "",
};

export const registerUser = createAsyncThunk<void, FieldValues>(
  "account/registeruser",
  async (data, thunkAPI) => {
    try {
      await agent.Account.register(data);
      toast.success("You have succefully registered");
    } catch (error: any) {
      toast.error(error.data);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const verifyEmail = createAsyncThunk<void, VerifyEmail>(
  "account/verifyemail",
  async (data, thunkAPI) => {
    try {
      console.log("verified values are", data);
      await agent.Account.verifyEmail(data.token, data.email);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signinuser",
  async (data, thunkAPI) => {
    try {
      const response = await agent.Account.login(data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentuser", response.username);
      console.log("response is::::", response);
      router.navigate("/activities");
      return response;
    } catch (error: any) {
      console.log("errorr data is::", JSON.stringify(error));
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchRefreshToken = createAsyncThunk<User>(
  "account/fetchRefreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Account.refreshToken();
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentuser", response.username);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fbSignInUser = createAsyncThunk<User, string>(
  "account/fbsigninuser",
  async (accessToken, thunkAPI) => {
    try {
      const response = await agent.Account.fbLogin(accessToken);
      localStorage.setItem("token", response.token);
      router.navigate("/activities");
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const userDto = await agent.Account.currentUser();
      localStorage.setItem("token", userDto.token);
      localStorage.setItem("currentuser", userDto.username);
      return userDto;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("token")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("currentuser");
      router.navigate("/");
    },

    // setUser: (state, action) => {
    //   let claims = JSON.parse(atob(action.payload.token.split('.')[1]))
    //   let roles =
    //     claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    //   state.user = {
    //     ...action.payload,
    //     roles: typeof roles === 'string' ? [roles] : roles,
    //   }
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.accountStatus = registerPending;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.accountStatus = idle;
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.accountStatus = pending;
    });

    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.accountStatus = idle;
    });

    builder.addCase(signInUser.pending, (state) => {
      state.accountStatus = loginPending;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.accountStatus = idle;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      console.log("erroor at rejection is::", JSON.stringify(action.error));
      // state.error=action.error;
      state.accountStatus = idle;
    });

    builder.addCase(fetchRefreshToken.pending, (state) => {
      state.accountStatus = loginPending;
    });
    builder.addCase(fetchRefreshToken.fulfilled, (state, action) => {
      state.user = action.payload;
      state.accountStatus = idle;
    });

    builder.addCase(fbSignInUser.pending, (state) => {
      state.accountStatus = pending;
    });
    builder.addCase(fbSignInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.accountStatus = idle;
    });

    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.accountStatus = idle;
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.accountStatus = pending;
    });

    builder.addMatcher(
      isAnyOf(
        fetchCurrentUser.rejected,
        fbSignInUser.rejected,
        fetchRefreshToken.rejected,
        // signInUser.rejected,
        verifyEmail.rejected,
        registerUser.rejected
      ),
      (state, action) => {
        state.user = null;
        state.accountStatus = idle;
        localStorage.removeItem("token");
        localStorage.removeItem("currentuser");
        // throw action.error;
      }
    );
  },
});

export const { signOut } = accountSlice.actions;
