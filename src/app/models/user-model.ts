export interface UserRegistration {
    userName: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface RegisterConfirm {
    userId: number,
    username: string,
    otpText: string
}

export interface GenerateToken {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    refreshToken: string;
    userRol: string;
}
export interface MenuByRol {
    code: string;
    name: string;
}

export interface ResetPassword {
    username: string;
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePassword {
    username: string;
    password: string;
    otpText: string;
}
export interface MenuPermission {
    code: string;
    name: string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
}


