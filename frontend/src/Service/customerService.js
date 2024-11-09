
const BASE_URL = 'http://localhost:8080/api/customers';

export const getCustomers = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch customers');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const createCustomer = async (customerData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) {
            throw new Error('Failed to create customer');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const redeemCustomerPoints = async (userId, points) => {
    try {
        const response = await fetch(`http://localhost:8080/api/customers/${userId}/redeemPoints`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points }),
        });
        if (!response.ok) {
            throw new Error('Failed to redeem points');
        }
        return await response.json();
    } catch (error) {
        console.error('Error redeeming points:', error);
        throw error;
    }
};

export const addCustomerPoints = async (customerId, points) => {
    try {
        const response = await fetch(`http://localhost:8080/api/customers/${customerId}/addPoints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points }),
        });
        if (!response.ok) {
            throw new Error('Failed to add points');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding points:', error);
        throw error;
    }
};