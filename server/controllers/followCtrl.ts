import { Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import notificationCtrl from "./noticeCtrl";

// const Pagination = (req: IReqAuth) => {
//   let page = Number(req.query.page) * 1 || 1;
//   let limit = Number(req.query.limit) * 1 || 4;
//   let skip = (page - 1) * limit;

//   return { page, limit, skip };
// };

const followCtrl = {
  addFollowing: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const addfollowing = req.body.id._id;

      const user = await Users.findOne({ _id: req.user._id });

      if (user) {
        user.following = user.following.concat(addfollowing);
        user.save();
      }
      const follow1 = await Users.findOne({ _id: addfollowing });
      if (follow1) {
        follow1.follower = follow1.follower.concat(req.user._id);
        notificationCtrl.addNotification(
          follow1._id,
          "Followers Update 👩‍👦‍👦.",
          user?.name + " started following you.",
          "/profile/" + user?._id
        );
        if (follow1.follower.length === 20 || follow1.follower.length === 21)
          follow1.role = "garnet";
        if (follow1.follower.length === 500) follow1.role = "scholar";
        follow1.save();
      }
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeFollowing: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const removefollowing = JSON.stringify(req.body.id._id);
      console.log(req.body.id._id, " ", removefollowing);
      const user = await Users.findOne({ _id: req.user._id });

      if (user) {
        user.following = user.following.filter((following) => {
          return JSON.stringify(following) !== removefollowing;
        });
        await user.save();
      }
      const follow1 = await Users.findOne({ _id: req.body.id._id });
      if (follow1) {
        follow1.follower = follow1.follower.filter((follower) => {
          return JSON.stringify(follower) !== JSON.stringify(req.user?._id);
        });
        await follow1.save();
      }

      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default followCtrl;
