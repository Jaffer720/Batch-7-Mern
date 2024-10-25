import User from '../model/user.model.js';

// Create a new user
export const addUser = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, address, phone, roles, dateOfBirth } = req.body; 
    
    // Optional: Add validation for user input before saving to the database
    // const { error } = validateNewUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    
    const newUser = new User({
      username,
      email,
      password, // Ensure the password is hashed before saving
      firstName,
      lastName,
      address,
      phone,
      roles,
      dateOfBirth,
    });

    await newUser.save();  // Save the new user to the database
    res.status(201).json({ message: 'User created successfully', Data: newUser });

  } catch (error) {
    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];  // Get the field that caused the duplicate error
      return res.status(400).json({ message: `The ${duplicateField} already exists. Please choose a different ${duplicateField}.` });
    }

    console.error(error); 
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

// Update user details
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const updatedData = {
      ...req.body,
      updatedAt: Date.now(),  // Update the `updatedAt` field when modifying user data
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) return res.status(404).send('User not found');

    res.status(200).json({ message: 'User Data Updated', Data: user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).send('User not found');
    res.status(200).json({ message: 'User deleted successfully', Data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

// View a single user
export const viewSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).send('User not found');
    res.status(200).json({ message: 'User Details', Data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};

// View all users with pagination and filtering
export const viewAllUser = async (req, res, next) => {
  try {
    console.log("ViewAllUser Endpoint Triggered");
    const query = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort;

    if (req.query.username) {
      query.username = new RegExp(req.query.username, 'i'); // case-insensitive search
    }

    if (req.query.role) {
      query.roles = req.query.role;
    }

    const users = await User.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments(query);
    res.send({
      message: 'User Details',
      users,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', Error_Info: error.message });
  }
};
