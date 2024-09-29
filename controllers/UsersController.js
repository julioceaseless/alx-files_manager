// controllers/UsersController.js
import sha1 from 'sha1';
import dbClient from '../utils/db.js';

export default class UsersController {
  static async postNew(req, res) {
    const email = req.body?.email;
    const password = req.body?.password;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the user already exists
    const existingUser = await (await dbClient.usersCollection()).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password and create the new user
    const hashedPassword = sha1(password);
    const insertionInfo = await (await dbClient.usersCollection()).insertOne({
      email,
      password: hashedPassword,
    });
    
    // Return the new user
    const newUserId = insertionInfo.insertedId.toString();
    return res.status(201).json({ email, id: newUserId });
  }
}
