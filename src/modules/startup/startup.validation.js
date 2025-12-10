export const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const mobileNumberValidator = (mobileNumber) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobileNumber);
}

