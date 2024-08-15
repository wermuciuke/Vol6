import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function registerNewAccount(req, res) {
  const { username, password } = req.body;

  try {
    const existingAccount = await Account.find({ username: username });

    if (existingAccount.length > 0) {
      res.status(400).json({ error: "Username already taken" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAccount = new Account({
      username,
      password: hashedPassword,
    });

    await newAccount.save();

    res.json(newAccount);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function loginAccount(req, res) {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });

    if (!account) {
      return res.status(400).json({ error: "Incorrect username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, account.password);

    if (isPasswordCorrect) {
      const secretKey = process.env.SECRET_KEY;

      const token = jwt.sign(
        { id: account._id, username: account.username },
        secretKey,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } else {
      res.status(400).json({ error: "Incorrect username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
