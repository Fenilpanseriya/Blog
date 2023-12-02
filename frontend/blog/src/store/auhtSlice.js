import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:{
        email:localStorage.getItem("email"),
        password:null
    }
}

const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        },
        changeStatus:(state)=>{
            state.status=!state.status
        }
    }
})

export const {login,logout,changeStatus}=authSlice.actions;
export default authSlice.reducer;