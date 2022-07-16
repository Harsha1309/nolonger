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
    if (
      req.body.blog.user.role == "user" ||
      req.body.blog.user.role == "freezed"
    )
      return res.send("not eligible");
    const len = req.body.blog.content.length / 500;
    const timespent = req.body.t / 15000;
    const finaltime = Math.min(len, timespent);
    const balance = await Balance.findOne({ user: req.body.blog.user._id });
    if (balance && req.body.blog.views > 10) {
      balance.blogbalance = balance.blogbalance + finaltime * 0.03;
      balance.blogbalance = parseFloat(balance.blogbalance.toFixed(2));
      balance.balance = balance.balance + finaltime * 0.03;
      balance.balance = parseFloat(balance.balance.toFixed(2));
      balance.save();
      let single = await Blogs.findById(req.body.blog._id);
      if (single?.earn !== undefined) {
        single.earn = single.earn + finaltime * 0.03;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
    } else if (req.body.blog.views === 10) {
      const balance = new Balance({
        user: req.body.blog.user._id,
        balance: 1,
        blogbalance: 1,
        referalbalance: 0,
      });
      balance.save();
      let single = await Blogs.findById(req.body.blog._id);

      if (single?.earn !== undefined) {
        single.earn = single.earn + 1;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
    }
    return res.send("success");
  },
  updateBlogbalancebyview: async (req: Request, res: Response) => {
    if (
      req.body.blog.user.role == "user" ||
      req.body.blog.user.role == "freezed"
    )
      return res.send("not eligible");
    const balance = await Balance.findOne({ user: req.body.blog.user._id });
    if (balance && req.body.blog.views > 10) {
      let single = await Blogs.findById(req.body.blog._id);
      if (single?.earn !== undefined) {
        single.earn = single.earn + 0.01;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
      balance.blogbalance = balance.blogbalance + 0.01;
      balance.blogbalance = parseFloat(balance.blogbalance.toFixed(2));
      balance.balance = balance.balance + 0.01;
      balance.balance.toFixed(2);
      balance.save();
    } else if (req.body.blog.views == 10) {
      let single = await Blogs.findById(req.body.blog._id);
      if (single?.earn !== undefined) {
        single.earn = single.earn + 0.9;
        single.earn = parseFloat(single.earn.toFixed(2));
        single.save();
      }
      const balance = new Balance({
        user: req.body.blog.user._id,
        balance: 0.9,
        blogbalance: 0.9,
        referalbalance: 0,
      });
      balance.save();
    }
    return res.send({ success: "blog count" });
  },
  updateReferalbalance: async (referer: string, refered: string) => {
    let balance = await Balance.findOne({ user: referer });
    if (balance) {
      balance.referalbalance = balance.referalbalance + 11;
      balance.balance = balance.balance + 11;
      balance.save();
    } else {
      balance = new Balance({
        user: referer,
        balance: 11,
        blogbalance: 0,
        referalbalance: 11,
      });
      balance.save();
    }
    balance = await Balance.findOne({ user: refered });
    if (balance) {
      balance.referalbalance = balance.referalbalance + 12;
      balance.balance = balance.balance + 12;
      balance.save();
    } else {
      balance = new Balance({
        user: refered,
        balance: 12,
        blogbalance: 0,
        referalbalance: 12,
      });
      balance.save();
    }
  },
};
export default balanceCtrl;
