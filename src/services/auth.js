const userRegister = (username, email, password) => {
    let user = new AV.User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);

    return user.signUp();
}

const userLogin = (email, password) => {
    return AV.User.loginWithEmail(email, password);
}

export {
    userRegister,
    userLogin
}