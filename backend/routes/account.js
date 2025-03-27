const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Account } = require("../models/db");
const router = express.Router();
const zod = require("zod");
const mongoose = require("mongoose");

const updateBalanceSchema = zod.object({
    accountId: zod.string(),
    balance: zod.number().min(0, "Balance must be a positive number"),
});

// Get balance
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId,
        });

        if (!account) {
            return res.status(404).json({
                msg: "Account not found",
            });
        }

        res.status(200).json({
            balance: account.balance,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
            error: err.message,
        });
    }
});

// Transfer amount
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { amount, to } = req.body;

        const account = await Account.findOne({
            userId: req.userId,
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Insufficient balance",
            });
        }

        const toAccount = await Account.findOne({
            userId: to,
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Invalid Account",
            });
        }

        // Update balances
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        res.status(200).json({
            msg: "Transfer Successful",
        });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            msg: "Internal Server Error",
            error: err.message,
        });
    } finally {
        session.endSession();
    }
});

// Add balance
router.post("/addBalance", authMiddleware, async (req, res) => {
    try {
        const { accountId, balance } = req.body;

        const { success, error } = updateBalanceSchema.safeParse({ accountId, balance });
        if (!success) {
            return res.status(400).json({
                msg: "Invalid Inputs",
                error: error.errors,
            });
        }

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            { balance },
            { new: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({
                msg: "Account not found or not updated",
            });
        }

        res.status(200).json({
            msg: "Balance updated successfully",
            updatedAccount,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error",
            error: err.message,
        });
    }
});

module.exports = router;
