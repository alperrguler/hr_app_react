import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOnWaitCustomers } from "../../models/IOnWaitCustomers";
import apis from "../../config/RestApis";
import { IBaseResponse } from "../../models/Response/IBaseResponse";
import { ICustomers } from "../../models/Response/ICustomersResponse";
import { IUserIdRequest } from "../../models/Request/IUSerIdRequest";
import { IUserAuthorize } from "../../models/IUserAuthorize";
import { IUpdateCustomerRequest } from "../../models/Request/IUpdateCustomerRequest";

interface IAdminPanelState {
  onWaitCustomerList: IOnWaitCustomers[];
  isOnWaitCustomerListLoading: boolean;
  customerList: ICustomers[];
  isCustomerListLoading: boolean;
  

}

const initialWaitCustomerState: IAdminPanelState = {
  onWaitCustomerList: [],
  isOnWaitCustomerListLoading: false,
  customerList: [],
  isCustomerListLoading: false,
};

export const fetchListUserOnWait = createAsyncThunk(
  "adminpanel/fetchListUserOnWait",
  async () => {
    const adminToken = localStorage.getItem("adminToken");
    return await fetch(
      apis.adminPanelService + "/list-user-on-wait?token=" + adminToken
    ).then((data) => data.json());
  }
);

export const fetchCustomerList = createAsyncThunk(
  "adminpanel/fetchCustomerList ",
  async () => {
    const adminToken = localStorage.getItem("adminToken");
    return await fetch(
      apis.adminPanelService + "/list-customer?token=" + adminToken
    ).then((data) => data.json());
  }
);
export const fetchUserAuthorisation = createAsyncThunk(
  "adminpanel/fetchUserAuthorisation",
  async (payload: IUserAuthorize) => {
    const adminToken = localStorage.getItem("adminToken");
    const requestBody = {
      ...payload,
      adminToken: adminToken,
    };
    const response = await fetch(
      apis.adminPanelService + "/user-authorisation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    ).then((data) => data.json());
    return response;
  }
);

const adminPanelSlice = createSlice({
  name: "adminpanel",
  initialState: initialWaitCustomerState,
  reducers: {
    removeUserFromList: (state, action: PayloadAction<number>) => {
      state.onWaitCustomerList = state.onWaitCustomerList.filter(
        (user) => user.userId !== action.payload
      );
    },
    emptyCustomerList: (state) => {
      state.customerList = [];
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchListUserOnWait.pending, (state) => {
      state.isOnWaitCustomerListLoading = true;
    });
    build.addCase(
      fetchListUserOnWait.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isOnWaitCustomerListLoading = false;
        if (action.payload.code === 200) {
          state.onWaitCustomerList = action.payload.data;
        }
      }
    );

    build.addCase(fetchCustomerList.pending, (state) => {
      state.isCustomerListLoading = true;
    });
    build.addCase(
      fetchCustomerList.fulfilled,
      (state, action: PayloadAction<IBaseResponse>) => {
        state.isCustomerListLoading = false;
        if (action.payload.code === 200) {
          state.customerList = action.payload.data;
        } else {
          console.error("Unexpected data format:", action.payload);
          state.customerList = [];
        }
      }
    );
    build.addCase(fetchUserAuthorisation.pending, (state) => {
      state.isOnWaitCustomerListLoading = true;
    });
    build.addCase(fetchUserAuthorisation.fulfilled, (state, action) => {
      state.isOnWaitCustomerListLoading = false;
      if (action.payload.code === 200) {
        state.customerList = action.payload.data;
      }
    });
  },
});
export const { emptyCustomerList } = adminPanelSlice.actions;
export const { removeUserFromList } = adminPanelSlice.actions;
export default adminPanelSlice.reducer;
