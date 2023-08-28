import { urls } from "./constant";

export const AuthRoutes = {
    checkIfEmailIsRegistered: `${urls.SERVER_URL}/auth/checkUser`,
    submitLogin: `${urls.SERVER_URL}/auth/submitLogin`,
    submitRegister: `${urls.SERVER_URL}/auth/submitRegister`,
    checkAuth: `${urls.SERVER_URL}/auth/checkAuth`,
}

export const LinkRoutes = {
    shortenLink: `${urls.SERVER_URL}/shorten`,
    checkCustomURL: `${urls.SERVER_URL}/utils/checkCustomURL`,
    checkLinkAuth: `${urls.SERVER_URL}/shortenByID`
}