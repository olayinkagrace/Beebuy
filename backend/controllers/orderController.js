const Order = require("../models/orderModel");
const expressAsyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "30d" }
//   );
// };

const createOrder =   expressAsyncHandler(async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  const order = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', order });
})

const myOrder = expressAsyncHandler(async (req, res) => {

  const orders = await Order.find({ user: req.user._id });
  console.log(req.user._id);
  res.send(orders)
});

const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const updateOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }

    const updatedOrder = await order.save()
  res.send({message: 'Order Paid', order: updatedOrder})
  }else {
    res.status(404).send({message: 'Order Not Found'})
  }
  
});






module.exports = {
  createOrder,
  getOrder,
  updateOrder, 
  myOrder
};
