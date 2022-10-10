const express = require("express");
const Cart = require("../models/cart.model");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");

router.get("", async (req, res) => {
  try {
    const cart = await Cart.find().lean().exec();
    return res.send(cart);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await verifyToken(token);
    const { _id } = user.user;
    let cart = await Cart.find({ userId: _id });
    let items = [];
    if (cart.length > 0) {
      await Cart.updateOne(
        { userId: _id },
        {
          cartItems: [
            ...cart[0].cartItems,
            {
              product: req.params.id,
              quantity: req.body.quantity,
            },
          ],
        }
      );
      items = [
        ...cart[0].cartItems,
        {
          product: req.params.id,
          quantity: req.body.quantity,
        },
      ];
    } else {
      let product = {
        userId: _id,
        cartItems: [
          {
            product: req.params.id,
            quantity: req.body.quantity,
          },
        ],
      };
      await Cart.create(product);
      items = [
        {
          product: req.params.id,
          quantity: req.body.quantity,
        },
      ];
    }

    return res.send({ updatedCart: items });
  } catch (error) {
    return res.send(error.message);
  }
});

//check if product exists in cart or not

router.get("/:id", async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await verifyToken(token);
    const { _id } = user.user;

    const cart = await Cart.find({ userId: _id });

    const check = cart[0].cartItems.filter(
      (prod) => prod.product == req.params.id
    );
    return res.send({ exists: check.length == 0 ? false : true });
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
