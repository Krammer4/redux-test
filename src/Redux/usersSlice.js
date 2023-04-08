import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    usersInputValue: '',
    isCleared: false,
    status: null,
    error: null
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function (_, {rejectWithValue}){
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            if(response.status>200){
                throw new Error('Server Error!')
            }
            const data = response.data
            return data
        } catch (error) {
            return rejectWithValue (error.message)
        }
       

    }

)

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUsers:(state, action)=>{
            state.users.push({
               name: action.payload, 
               id:  Date.now(),
            });
            state.usersInputValue = ''
        },
        setUsersValue:(state,action)=>{
            state.usersInputValue = (action.payload)
        },
        removeUser:(state, action)=>{
            state.users = state.users.filter(users=> users.id !== action.payload)
        },
        clearUsers:(state,action)=>{
            state.users = []
            state.isCleared = true
        },
        closeIsCleared:(state)=>{
            state.isCleared = false
        },
        setUsers:(state, action)=>{
            state.users = action.payload
        },
        
    },
    extraReducers:{
        [fetchUsers.pending]:(state, action)=>{
            state.status = 'loading';
            state.error = null
        },
        [fetchUsers.fulfilled]:(state, action)=>{
            state.status = 'loaded';
            state.error = null
            state.users = action.payload
            
        },
        [fetchUsers.rejected]:(state, action)=>{
            state.status = 'rejected';
            state.error = action.payload
        },

    }
})

export const {addUsers, setUsersValue, removeUser, clearUsers, closeIsCleared, setUsers} = usersSlice.actions
export const usersReducer = usersSlice.reducer