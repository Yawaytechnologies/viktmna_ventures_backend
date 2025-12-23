import Startup from "./startup.model.js";


export const createStartup = async (data) => {
    const startup = new Startup(data);
    return await startup.save();
}

export const getAllStartups = async () => {
    return await Startup.find();
}

export const getStartupById = async (id) => {
    return await Startup.findById(id).lean();
}

export const deleteStartup = async (id) => {
    return await Startup.findByIdAndDelete(id);
}