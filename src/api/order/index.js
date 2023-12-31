import express from "express";
import passport from "passport";

import { OrderModel } from "../../database/allModels.js";
import { validateId } from "../../validation/common.validation.js";

const Router = express.Router();

/**
 * Route   /:_id
 * Des     Get all orders details by user id
 * Params  _id
 * Access  Private
 * Method  GET
 */
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const getOrders = await OrderModel.findOne({ user: user._id });

      if (!getOrders) {
        return res
          .status(404)
          .json({ error: "No orders found with this user" });
      }

      return res.json({ orders: getOrders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /new
 * Des       Add new order
 * Params    none
 * Access    Private
 * Method    PUT
 */
Router.put(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;

      const { orderDetails } = req.body;

      await validateId(req.body._id);

      const addNewOrder = await OrderModel.findOneAndUpdate(
        {
          user: user._id,
        },
        {
          $push: {
            orderDetails: orderDetails,
          },
        },
        {
          new: true,
        }
      );

      return res.json({ order: addNewOrder });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
