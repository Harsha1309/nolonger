import { json, Request, Response } from "express";
import { IBlog, IReqAuth } from "../config/interface";
import Balance from "../models/balanceModel";
import sendMail from "../config/sendBalancemail";
import notificationCtrl from "./notificationCtrl";

const balanceCtrl = {
  getBalance: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const balance = await Balance.findOne({
        user: req.user._id,
      });
      if (balance) return res.json(balance);
      else {
        const balance = new Balance({
          user: req.user,
          balance: 0,
          blogbalance: 0,
          referalbalance: 0,
        });
        balance.save();
        return res.json(balance);
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  withdrawBalance: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const { withdraw, mobilenumber } = req.body;

      let balance = await Balance.findOne({ user: req.user._id });
      if (balance) {
        if (balance.balance && balance.balance >= withdraw) {
          balance.balance = balance.balance - withdraw;
          balance.balance.toFixed(2);
          sendMail(mobilenumber, withdraw, balance);
        }

        notificationCtrl.addNotification(
          req.user._id,
          "Withdraw request processed.",
          "Your withdraw request is processed money will be received with in 30 minutes."
        );
        balance = await balance.save();
        res.json({
          msg: "Successfull ! You will recive amount with in 30 minutes . If not received contact : contact@pediageek.com ",
          balance,
        });
      } else
        return res
          .status(400)
          .json({ msg: "You donot have sufficient balnace for transaction." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBlogbalance: async (blog: IBlog) => {
    const balance = await Balance.findOne({ user: blog.user });
    if (balance) {
      balance.blogbalance = balance.blogbalance + 2.11;
      balance.blogbalance = parseFloat(balance.blogbalance.toFixed(2));
      balance.balance = balance.balance + 2.11;
      balance.balance.toFixed(2);
      balance.save();
    } else {
      const balance = new Balance({
        user: blog.user,
        balance: 2.11,
        blogbalance: 2.11,
        referalbalance: 0,
      });
      balance.save();
    }
  },
  updateReferalbalance: async (referer: string, refered: string) => {
    let balance = await Balance.findOne({ user: referer });
    if (balance) {
      balance.referalbalance = balance.referalbalance + 10;
      balance.balance = balance.balance + 10;
      balance.save();
    } else {
      balance = new Balance({
        user: referer,
        balance: 10,
        blogbalance: 0,
        referalbalance: 10,
      });
      balance.save();
    }
    balance = await Balance.findOne({ user: refered });
    if (balance) {
      balance.referalbalance = balance.referalbalance + 10;
      balance.balance = balance.balance + 10;
      balance.save();
    } else {
      balance = new Balance({
        user: refered,
        balance: 10,
        blogbalance: 0,
        referalbalance: 10,
      });
      balance.save();
    }
  },
};
export default balanceCtrl;
