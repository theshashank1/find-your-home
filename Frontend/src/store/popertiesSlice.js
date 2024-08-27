import { createSlice } from "@reduxjs/toolkit";

const properties=createSlice({
    name:"user",
    initialState:"",
    reducers:{
        setProperties:(state,action)=>{
            return state=action.payload
        }

        
    }
})

export const {setProperties} =properties.actions
export default properties.reducer