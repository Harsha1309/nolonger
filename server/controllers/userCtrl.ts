import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import bcrypt from "bcrypt";

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const { avatar, name, about, paytm } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          name,
          paytm,
          about,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.type !== "register")
      return res.status(400).json({
        msg: `Quick login account with ${req.user.type} can't use this function.`,
      });

    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Reset Password Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .select("-referer")
        .select("-type");
      if (!user) return res.status(404).json({ msg: "Invalid ID." });
      res.json(user);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  searchUsers: async (req: Request, res: Response) => {
    try {
      const users = await Users.aggregate([
        {
          $search: {
            index: "user_search",
            text: {
              query: req.query.title,
              path: {
                wildcard: "*",
              },
              fuzzy: {},
            },
          },
        },
        {
          $project: {
            password: 0,
            type: 0,
            paytm: 0,
            referer:0
          },
        },
        { $limit: 8 },
      ]);

      if (!users.length)
        return res.status(400).json({ msg: "No Users with this name." });
      res.json(users);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default userCtrl;
