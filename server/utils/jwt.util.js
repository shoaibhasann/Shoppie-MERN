// function to send JWT Token in cookie along with response
const sendToken = async (user, statusCode, message, res) => {
    const token = await user.generateToken();

    const cookieOptions = {
      maxAge: 5 * 24 * 60 * 60 * 1000, // Valid for 5 days
      httpOnly: true,
      secure: true,
    };

    return res.status(statusCode).cookie('token', token, cookieOptions).json({
        success: true,
        message
    });

}

export default sendToken;