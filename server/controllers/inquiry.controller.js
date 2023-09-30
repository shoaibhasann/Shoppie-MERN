import inquiryModel from "../models/enquiry.model.js";

const createInquiry = async(req, res, next) => {
    try {
        const { name, email, message } = req.body;

        const newInquiry = await inquiryModel.create({
            name,
            email,
            message
        });

        res.status(201).json({
          success: true,
          message: "Your inquiry has been successfully sent!",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}

export default createInquiry;