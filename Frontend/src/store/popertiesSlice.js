import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define an async thunk for fetching properties
export const fetchProperties = createAsyncThunk(
    'properties/fetchProperties',
    async () => {
        const response = await axios.get('http://localhost:3000/api/properties');
        return response.data;
    }
);

const propertiesSlice = createSlice({
    name: "properties",
    initialState: {
        properties: [],
        loading: true, // Can be 'idle', 'loading', 'succeeded', or 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default propertiesSlice.reducer;
