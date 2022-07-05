import { json, Request, Response } from "express";
import { IBlog, IReqAuth } from "../config/interface";
import Balance from "../models/balanceModel";
import sendMail from "../config/sendBalancemail";
import notificationCtrl from "./notificationCtrl";
import Blogs from "../models/blogModel";
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
          .json({ msg: "You donot have sufficient balance for transaction." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBlogbalance: async (req: Request, res: Response) => {
    const balance = await Balance.findOne({ user: req.body.blog.user._id });
    if (balance) {
      balance.blogbalance = balance.blogbalance + 0.03;
      balance.blogbalance = parseFloat(balance.blogbalance.toFixed(2));
      balance.balance = balance.balance + 0.03;
      balance.balance = parseFloat(balance.balance.toFixed(2));
      balance.save();
      let single = await Blogs.findById(req.body.blog._id);

      if (single?.earn !== undefined) {
        single.earn = single.earn + 0.03;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
   
    } else {
      const balance = new Balance({
        user: req.body.blog.user._id,
        balance: 1.7,
        blogbalance: 1.7,
        referalbalance: 0,
      });
      balance.save();
      let single = await Blogs.findById(req.body.blog._id);

      if (single?.earn !== undefined) {
        single.earn = single.earn + 1.7;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
  
    }
  
    return res.send(balance);
  },
  updateBlogbalancebyview: async (blog: IBlog) => {
    const balance = await Balance.findOne({ user: blog.user });
    if (balance) {
      let single = await Blogs.findById(blog._id);
      if (single?.earn !== undefined) {
        single.earn = single.earn + 0.1;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
      balance.blogbalance = balance.blogbalance + 0.1;
      balance.blogbalance = parseFloat(balance.blogbalance.toFixed(2));
      balance.balance = balance.balance + 0.1;
      balance.balance.toFixed(2);
      balance.save();
    } else {
      let single = await Blogs.findById(blog._id);
      if (single?.earn !== undefined) {
        single.earn = single.earn + 1.5;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
      const balance = new Balance({
        user: blog.user,
        balance: 1.5,
        blogbalance: 1.5,
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
