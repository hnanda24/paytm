const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Account } = require("../models/db");
const router = express.Router();

router.get("/balance", authMiddleware, async(req,res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.status(201).json({
        balance: account.balance
    })
})

router.post("transfer", authMiddleware, async(req,res) => {
    const session = await mongoose.startSession();
    const {amount, to} = req.body;
    session.startTransaction();

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    const toAccount = await findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid Account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc : {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction();
    res.json({
        msg: "Transfer Successful"
    })
})