import { Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import Notification from "../models/notificationModel";

// const Pagination = (req: IReqAuth) => {
//   let page = Number(req.query.page) * 1 || 1;
//   let limit = Number(req.query.limit) * 1 || 4;
//   let skip = (page - 1) * limit;

//   return { page, limit, skip };
// };

const notificationCtrl = {
  getNotification: async (req: IReqAuth, res: Response) => {
    try {
      const notifications = await Notification.findOne({
        user: req.user?._id,
      });
      if (notifications) {
        let free = notifications;
        free.new = false;
        free.save();
        const msg = notifications.msg;
        res.send({ msg, new: notifications.new });
      } else {
        const notification = new Notification({
          user: req.user?._id,
          msg: [],
          new: false,
        });
        notification.save();
        res.send({ msg: notification.msg, new: notification.new });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addNotification: async (user: string, msg: string, desc: string) => {
    let notification = await Notification.findOne({ user });
    if (notification) {
      notification.msg.concat([{ msg, desc, time: new Date() }]);
      notification.new = true;
      notification.save();
    } else {
      notification = new Notification({
        user,
        msg: [{ msg, desc, time: new Date() }],
        new: true,
      });
      notification.save();
    }
  },
};

export default notificationCtrl;
