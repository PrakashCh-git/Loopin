import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

async function registerController(req, res) {
  try {
    const {full_name, email, password } = req.body;

    

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Credentials not provided",
      });
    }

    //Checking if user already exist
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with the email",
      });
    }

    //Hasing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Creating User Name and Checking its uniqueness
    let username = email.split('@')[0];
    const doesItexist = await userModel.findOne({username});
    if(doesItexist) {
        username = username + Math.floor(Math.random()*10000)
    }

    //Creating user
    const user = await userModel.create({
      full_name: full_name,
      email: email,
      username:username,
      password: hashedPassword,
    });

    //Generating token
    const token = generateToken(res, user._id);

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
      });
    }

    const user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getMe(req, res) {
  return res.status(200).json({
    success: true,
    message: "User verified successfully",
    user: req.user,
  });
}

async function logoutController(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}



//Update User Data in Database
async function updateUser(res,res) {
  const userId = req.user;
  const {full_name, email, image_url} = req.body

  try{ 
    const updateUserData = {
      email: email,
      full_name: full_name,
      profile_picture: image_url
    }

    await userModel.findByIdAndUpdate(userId,updateUserData)

    return res.status(201).json({
      message: "User updated successfull",
    })

  }catch(err) {
    return res.status(400).json({
      message: err.message,
    })
  }
}

export default { registerController, loginController, getMe, logoutController,updateUser};
