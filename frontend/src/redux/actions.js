export const CREATE_USER = 'CREATE_USER';
export const ADD_POINTS = 'ADD_POINTS';
export const REDEEM_POINTS = 'REDEEM_POINTS';
export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';

export const createUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:8080/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const user = await response.json();
                dispatch({ type: CREATE_USER, payload: user });
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
};

export const addPoints = (userId, points) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:8080/api/customers/${userId}/addPoints`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ points }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                dispatch({ type: ADD_POINTS, payload: updatedUser });
            } else {
                console.error('Failed to add points');
            }
        } catch (error) {
            console.error('Error adding points:', error);
        }
    };
};
export const redeemPoints = (userId, points) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://localhost:8080/api/customers/${userId}/redeemPoints`, {
                method: 'PUT', // Using PUT request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ points }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                dispatch({ type: REDEEM_POINTS, payload: updatedUser });
            } else {
                console.error('Failed to redeem points');
            }
        } catch (error) {
            console.error('Error redeeming points:', error);
        }
    };
};


export const fetchCustomers = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:8080/api/customers');
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: FETCH_CUSTOMERS, payload: data });
            } else {
                console.error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };
};
