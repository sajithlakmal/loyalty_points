import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const response = await fetch('http://localhost:8080/api/customers');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    }
);

// Async action to add points to a user
export const addPointsAsync = createAsyncThunk(
    'user/addPointsAsync',
    async ({ userId, points }) => {
        const response = await fetch(`http://localhost:8080/api/customers/${userId}/addPoints`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points }),
        });
        if (!response.ok) {
            throw new Error('Failed to add points');
        }
        return await response.json();
    }
);

// Async action to redeem points for a user
export const redeemPointsAsync = createAsyncThunk(
    'user/redeemPointsAsync',
    async ({ userId, points }) => {
        const response = await fetch(`http://localhost:8080/api/customers/${userId}/redeemPoints?points=${points}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to redeem points');
        }
        return await response.json();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: { users: [], status: 'idle', error: null },
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addPointsAsync.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const existingUser = state.users.find(user => user.id === updatedUser.id);
                if (existingUser) {
                    existingUser.points = updatedUser.points;
                }
            })

            .addCase(redeemPointsAsync.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const existingUser = state.users.find(user => user.id === updatedUser.id);
                if (existingUser) {
                    existingUser.points = updatedUser.points;
                }
            });
    },
});

export const { createUser } = userSlice.actions;
export default userSlice.reducer;
