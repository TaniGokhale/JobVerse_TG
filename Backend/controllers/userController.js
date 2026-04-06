import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        location: req.body.location,
        experience: req.body.experience,
        currentCompany: req.body.currentCompany
      },
      { returnDocument: "after" } // ✅ mongoose new fix
    );

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};