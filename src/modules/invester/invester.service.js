import Investor from "./invester.model.js";

export const createInvestor = async (investorData) => {
    const investor = new Investor(investorData);
    return await investor.save();
}

export const getAllInvestors = async () => {
    return await Investor.find().sort({ createdAt: -1 });
}

export const getInvestorById = async (id) => {
    return await Investor.findById(id);
}


export const deleteInvestor = async (id) => {
    return await Investor.findByIdAndDelete(id);
}



