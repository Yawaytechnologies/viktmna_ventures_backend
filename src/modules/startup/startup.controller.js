import { createStartup, getAllStartups, getStartupById, deleteStartup } from "./startup.service.js";
import { emailValidator, mobileNumberValidator } from "./startup.validation.js";
import { slabConfig } from "../../config/slab_config.js";

export const createStartupController = async (req, res) => {
    try{
        const {startuName, website_link, address, year_founded, entity_type, sector, founder_name, founder_email, mobile_number, linkedin_profile, problem_statement, solution_overview, current_stage, traction_metrics, capital_raised_so_far, capital_you_are_looking_for, slab, logo} = req.body;

        const logoBase64 = logo;
         if (req.file) {
             logoBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
          }

        let slabValue = slab || 'micro';
        const selectedSlab = slabConfig[slabValue];
        if (!selectedSlab) {
            return res.status(400).json({ message: `Invalid slab: ${slabValue}. Use one of: micro, small, medium, large` });
        }
        if (!emailValidator(founder_email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!mobileNumberValidator(mobile_number)) {
            return res.status(400).json({ message: "Invalid mobile number format" });
        }

        const startup = await createStartup({
            startuName,
            website_link,
            address,
            year_founded,
            entity_type,
            sector,
            founder_name,
            founder_email,
            mobile_number,
            linkedin_profile,
            problem_statement,
            solution_overview,
            current_stage,
            traction_metrics,
            capital_raised_so_far,
            capital_you_are_looking_for,
            slab: slabValue,
            slabDetails: selectedSlab
        });
        res.status(201).json(startup);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};


export const getAllStartupsController = async (req, res) => {
    try {
        const startups = await getAllStartups();
        res.status(200).json(startups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStartupByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const startup = await getStartupById(id);
        if (!startup) {
            return res.status(404).json({ message: "Startup not found" });
        }
        res.status(200).json(startup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteStartupController = async (req, res) => {
    try {
        const { id } = req.params;
        const startup = await deleteStartup(id);
        if (!startup) {
            return res.status(404).json({ message: "Startup not found" });
        }   
        res.status(200).json({ message: "Startup deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

