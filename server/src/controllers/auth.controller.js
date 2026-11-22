import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import upload from "../middlewares/multer.js";


//Register Controller Function
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

// Login Controller Function
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


//Get Me Function
async function getMe(req, res) {
  return res.status(200).json({
    success: true,
    message: "User verified successfully",
    user: req.user,
  });
}


// Logout Handler Function
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
async function updateUser(req,res) {
  const userId = req.user;
  const {full_name, email} = req.body

  try{ 
    const updateUserData = {}

    if(full_name) updateUserData.full_name = full_name
    if (email) updateUserData.email = email

    if(req.files) {
      const profileFile = req.files?.profile?.[0];
      const coverFile = req.files?.cover?.[0];

      if (profileFile) {
        const uploadResponse = await imagekit.upload({
          file: profileFile.buffer, // Multer ka RAM buffer seedha pass kar diya
          fileName: `avatar_${userId}_${Date.now()}`,
          folder: "/profile_pictures",
        });
        updateUserData.profile_picture = uploadResponse.url;
      }
      if (coverFile) {
        const uploadResponse = await imagekit.upload({
          file: coverFile.buffer, // Multer ka RAM buffer seedha pass kar diya
          fileName: `cover_${userId}_${Date.now()}`,
          folder: "/cover_pictures",
        });
        updateUserData.cover_photo = uploadResponse.url
      }
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


//Discove User
async function discoverUser(req,res) {
    try{  
      const userId = req.user._id;
      const {input} = req.body;

      const allUsers = await userModel.find({
        $or:[
          {username: new RegExp(input,'i')},
          {email: new RegExp(input,'i')},
          {full_name: new RegExp(input,'i')},
          {location: new RegExp(input,'i')},
        ]
      })

      const filteredUser = allUsers.filter(user=>user._id!==userId);

      res.status(200).json({
        success: true,
        users:filteredUser
      })

    }
    catch(err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message
      })
    }
}


//Follow User Function
async function followUser(req,res) {
    try{  

      const {id} = req.body;
      const userId = req.user._id;

      const user = await userModel.findById(userId);

      //Checking if the user already following the person
      if(user.following.includes(id)) {
        return res.status(400).json({
          success:false,
          message: "You are already following the user"
        })
      }
      
      //Following the user
      user.following.push(id);
      await user.save();

      //Updating the follower list of the use being followed
      const toUser = await userModel.findById(id);
      toUser.followers.push(userId);
      await toUser.save()


      res.status(200).json({
        success:true,
        message: "Now you are following the user."
      })
    }
    catch(err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message
      })
    }
}


async function unfollowUser(req,res) {
    try{  
      const {id} = req.body;
      const userId = req.user._id;

      const user = await userModel.findById(userId);

      user.following = user.following.filter(user => user !== id);
      await user.save();

      const toUser = await userModel.findById(id);
      toUser.followers = toUser.followers.filter(user => user !== userId);
      toUser.save();

      res.status(200).json({
        success:true,
        message: "You have successfully unfollowed the user"
      })
    }
    catch(err) {
      console.log(err.message);
      res.status(500).json({
        message: err.message
      })
    }
}

export default { registerController, loginController, getMe, logoutController, updateUser, discoverUser, followUser, unfollowUser};

