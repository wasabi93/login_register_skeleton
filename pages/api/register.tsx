import bcrypt from 'bcrypt';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import { IUser } from '../../interfaces/common';

export default async (
  req: { body: IUser },
  res: {
    status: (arg0: number) => {
      (): unknown;
      new (): unknown;
      json: {
        (arg0: { token?: unknown; success?: boolean; data?: unknown; message?: string }): void;
        new (): unknown;
      };
    };
    _id: string;
  },
) => {
  await dbConnect();
  try {
    const checkUser = await User.findOne({ username: req.body.username });
    if (!checkUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userAfterHashed = new User({ ...req.body, password: hashedPassword });
      const user = await User.create(userAfterHashed);
      return res.status(200).json({ token: user._id.toString() });
    } else {
      return res.status(404).json({ message: 'username already exist' });
    }
  } catch (error) {
    console.log('error', error);
    res.status(400).json({ success: false });
  }

  // Disconnect from database
  // dbConnect.close();
};
