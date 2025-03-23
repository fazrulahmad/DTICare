export const getLostAndFoundItems = () => {
    // Function to retrieve lost and found items
    return [
        { id: 1, item: 'Laptop', description: 'Silver MacBook Pro', dateFound: '2023-10-01' },
        { id: 2, item: 'Backpack', description: 'Black backpack with books', dateFound: '2023-10-03' },
        { id: 3, item: 'Keys', description: 'Set of keys with a blue keychain', dateFound: '2023-10-05' },
    ];
};

export const getTuitionPaymentSchedule = () => {
    // Function to retrieve tuition payment schedule
    return [
        { term: 'Fall 2023', dueDate: '2023-08-15', amount: '$5000' },
        { term: 'Spring 2024', dueDate: '2024-01-15', amount: '$5000' },
    ];
};

export const getPaymentMethods = () => {
    // Function to retrieve available payment methods
    return [
        { method: 'Credit Card', description: 'Visa, MasterCard, American Express' },
        { method: 'Bank Transfer', description: 'Direct transfer to university account' },
        { method: 'PayPal', description: 'Secure online payment through PayPal' },
    ];
};