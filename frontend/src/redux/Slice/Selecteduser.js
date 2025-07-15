import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selecteUser : null 
}

const selectedUser = createSlice ({
    name : 'selectUser',
    initialState,
    reducers : {
        setSelectedUser: (state,action) => {
            state.selecteUser= action.payload
        } ,

        removeSelectedUser : (state)=>{
            state.selecteUser = null
        }
    }
})

 export const {setSelectedUser,removeSelectedUser}=selectedUser.actions;
 export default selectedUser.reducer;