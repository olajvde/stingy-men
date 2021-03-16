var express = require("express");
var router = express.Router();

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    stripePusblishableKey: keys.stripePusblishableKey,
  });
});

// router.get("/success", (req, res) => {
//   res.render("success");
// });

router.post("/charge", (req, res) => {
  const amount = 2500;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: "Web Development Ebook",
        currency: "usd",
        customer: customer.id,
      })
    )
    .then((charge) => res.render("success"));
});
module.exports = router;
