
const isUserLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

export { 
    isUserLoggedIn,
 };
