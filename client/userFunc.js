const userFunc = () => {
    login=function(userData){
        return axios.post("http://localhost:3000/login",userData);
    }
    newAccount = (userData) => {
        return axios.put("http://localhost:3000/newUser",userData);
    }
    return {
        login: login,
        newAccount: newAccount
    }
};