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

const addNotification = async (user: string, msg: string, desc: string) => {
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
};

export default addNotification;
