import { hashPassword } from '@/lib/hashPass'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/UserModel'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  try {
    await dbConnect()
    let { username, password, name, role } = req.body

    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ status: false, errorMessage: 'Please provide all fields' })
    }

    username = username.trim()

    // Check if the username already exists
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, errorMessage: 'Username already exists' })
    }

    const hashedPassword = await hashPassword(password)

    // // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      role,
    })

    // // Save the user to the database
    await newUser.save()

    return res
      .status(201)
      .json({ status: true, message: 'Registration successful' })
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
