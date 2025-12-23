import {
  createInvestor,
  getAllInvestors,
  getInvestorById,
  deleteInvestor,
} from "./invester.service.js";
import {
  emailValidator,
  panNumberValidator,
  pincodeValidator,
  mobileNumberValidator,
} from "./invester.validation.js";
import { slabConfig } from "../../config/slab_config.js";
import {
  uploadFileToS3,
  generatePresignedUrl,
  deleteFileFromS3,
} from "../storage/s3.service.js";

export const createInvestorController = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      address,
      pincode,
      panNumber,
      investorType,
      preferredStage,
      sectorsOfInterest,
      anythingElse,
      logo,
      slab,
    } = req.body;
    const imageFile = req.files?.images?.[0] || null;
    const docFile = req.files?.documents?.[0] || null;

    let logoBase64 = logo;
    if (imageFile) {
      // Converting buffer to Base64 string
      logoBase64 = `data:${
        imageFile.mimetype
      };base64,${imageFile.buffer.toString("base64")}`;
    }

    let slabValue = slab || "micro";
    const selectedSlab = slabConfig[slabValue];

    if (!selectedSlab) {
      return res.status(400).json({
        message: `Invalid slab: ${slabValue}. Use one of: micro, small, medium, large`,
      });
    }

    if (!emailValidator(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!panNumberValidator(panNumber)) {
      return res.status(400).json({ message: "Invalid PAN number format" });
    }
    if (!pincodeValidator(pincode)) {
      return res.status(400).json({ message: "Invalid pincode format" });
    }
    if (!mobileNumberValidator(mobileNumber)) {
      return res.status(400).json({ message: "Invalid mobile number format" });
    }
    const documents = await uploadFileToS3(docFile.buffer, docFile.mimetype);

    const investor = await createInvestor({
      fullName,
      email,
      mobileNumber,
      address,
      pincode,
      panNumber,
      investorType,
      preferredStage,
      sectorsOfInterest,
      anythingElse,
      logo: logoBase64,
      document: documents,
      slab: slabValue,
      slabDetails: selectedSlab,
    });
    res.status(201).json(investor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInvestorsController = async (req, res) => {
  try {
    const investors = await getAllInvestors();
    res.status(200).json(investors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvestorByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const investor = await getInvestorById(id);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    const documentUrl = await generatePresignedUrl(investor.document);
    res.status(200).json({ ...investor, document: documentUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvestorController = async (req, res) => {
  try {
    const { id } = req.params;
    const investor = await getInvestorById(id);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    await deleteFileFromS3(investor.document);
    const deletedInvestor = await deleteInvestor(id);
    if (!deletedInvestor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    res.status(200).json({ message: "Investor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
