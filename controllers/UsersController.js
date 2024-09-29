// controllers/UsersController.js
import sha1 from 'sha1';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

export default class UsersController {
  static async postNew(req, res) {
    const email = req.body?.email;
    const password = req.body?.password;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    
    const existingUser = await (await dbClient.usersCollection()).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const insertionInfo = await (await dbClient.usersCollection()).insertOne({
      email,
      password: hashedPassword,
    });
    
    const newUserId = insertionInfo.insertedId.toString();
    return res.status(201).json({ email, id: newUserId });
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];
    
    // Retrieve user ID based on the token
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Find user by ID
    const user = await (await dbClient.usersCollection()).findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Return the user object
    return res.status(200).json({ id: user._id.toString(), email: user.email });
  }
}
