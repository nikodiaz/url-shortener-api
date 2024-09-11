import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"



export const signup = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(500).json({ message: "Ya existe un usuario con ese email" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiredIn: "2h" })

    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario" })
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "No existe un usuario con ese email" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" })
    res.json({ token })
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión", error })
  }
}
