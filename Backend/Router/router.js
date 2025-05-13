const express = require('express');
const model = require("../model/model.js"); 
const model2 = require("../model/model2.js");  
const model3 = require("../model/model3.js");  
const router = express.Router();

router.post("/addReferalBonus", async (req, res) => {
  try {
    const { amount, address,solAddress } = req.body;
    console.log(`Amount received: ${amount}, Referrer address: ${address}`);


    if (!amount || !address || !solAddress) {
      return res.status(200).json({ status: true, message: "Amount and address are required" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(200).json({ status: true, message: "Amount must be a positive number" });
    }


  if (address.toLowerCase() === solAddress.toLowerCase()) {
    return res.status(200).json({ status: true, message: "Cannot refer yourself." });
  }


    console.log(`Amount received: ${amount}, Referrer address: ${address}`);

    const bonus = amount * 0.1;

    const existingRecord = await model.findOne({ address });

    if (existingRecord) {
      existingRecord.bonusToken = (existingRecord.bonusToken || 0) + bonus;
      await existingRecord.save();
      return res.status(200).json({ status: true, message: "Referral bonus updated successfully" });
    } else {
      const newRecord = new model({
        address,
        bonusToken: bonus,
      });
      await newRecord.save();
      return res.status(201).json({ status: true, message: "Referral bonus added successfully" });
    }
  } catch (error) {
    console.error("Error in addReferalBonus:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

router.post("/addPurchase", async (req, res) => {
  try {
    const { tokenBought, address } = req.body;
    console.log(`Tokens bought: ${tokenBought}, Address: ${address}`);

    if (!tokenBought || !address) {
      return res.status(400).json({ status: false, message: "Token bought and address are required" });
    }
    if (isNaN(tokenBought) || tokenBought <= 0) {
      return res.status(400).json({ status: false, message: "Token bought must be a positive number" });
    }

    const existingRecord = await model2.findOne({ address });

    if (existingRecord) {
      existingRecord.tokenBought = (existingRecord.tokenBought || 0) + tokenBought;
      await existingRecord.save();
      return res.status(200).json({ status: true, message: "Purchase updated successfully" });
    } else {
      const newRecord = new model2({
        address,
        tokenBought: tokenBought,
      });
      await newRecord.save();
      return res.status(201).json({ status: true, message: "Purchase added successfully" });
    }
  } catch (error) {
    console.error("Error in addPurchase:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});


router.post("/getData", async (req, res) => {
  try {
    const { address } = req.body;
    console.log(`Address: ${address}`);

    if (!address) {
      return res.status(400).json({ status: false, message: "Address is required" });
    }

    const existingRecord = await model.findOne({ address });
    const existingRecord2 = await model2.findOne({ address });

    if (!existingRecord && !existingRecord2) {
      return res.status(200).json({ status: true, tokenBought: 0, bonusToken: 0 });
    }

    if (existingRecord && !existingRecord2) {
      return res.status(200).json({ status: true, tokenBought: 0, bonusToken: existingRecord.bonusToken });
    }

    if (!existingRecord && existingRecord2) {
      return res.status(200).json({ status: true, tokenBought: existingRecord2.tokenBought, bonusToken: 0 });
    }

   
    return res.status(200).json({
      status: true,
      tokenBought: existingRecord2.tokenBought,
      bonusToken: existingRecord.bonusToken,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

router.post("/addSolToDatabase", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(`Amount: ${amount}`);

    if (amount == null) {
      return res.status(400).json({ status: false, message: "Amount is required" });
    }

   
    let existingRecord = await model3.findOne(); 

    if (existingRecord) {
      existingRecord.SolRecieved = (existingRecord.SolRecieved || 0) + amount;
      await existingRecord.save();
      return res.status(200).json({ status: true, message: "Amount updated successfully" });
    } else {
      const newRecord = new model3({
        SolRecieved: amount,
      });
      await newRecord.save();
      return res.status(201).json({ status: true, message: "Amount added successfully" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

router.get("/getSolRecieved", async (req, res) => {
  try {
    const existingRecord = await model3.findOne();
  
    if (!existingRecord ) {
      return res.status(200).json({ status: true, SolRecieved: 0 });
    }
    return res.status(200).json({
      status: true,
      SolRecieved: existingRecord.SolRecieved,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

module.exports = router;
