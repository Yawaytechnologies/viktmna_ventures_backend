export const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const mobileNumberValidator = (mobileNumber) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobileNumber);
}

export const panNumberValidator = (panNumber) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panNumber);
}

export const pincodeValidator = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
}

