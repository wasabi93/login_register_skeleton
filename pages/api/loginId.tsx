import bcrypt from 'bcrypt';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import { IUser } from '../../interfaces/common';

const Login = async (
  req: { body: IUser },
  res: {
    status: (arg0: number) => {
      (): unknown;
      new (): unknown;
      json: {
        (arg0: { message?: string; token?: unknown; success?: boolean }): void;
        new (): unknown;
      };
    };
  },
) => {
  const { username, password } = req.body;

  await dbConnect();
  try {
    const user = await User.findOne({ username: username });

    // If no username, user doesn't exist
    if (!user) {
      res.status(404).json({ message: 'No user found' });
    } else {
      // Compare user-entered password to stored hash
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Send all-clear with _id as token
        res.status(200).json({ token: user._id.toString() });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export default Login;
