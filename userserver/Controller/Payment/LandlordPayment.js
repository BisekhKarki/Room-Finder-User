const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const khaltiPayment = async (req, res) => {
  const { id, name, amount, roomId } = req.body;
  const getAmount = parseInt(amount);
  const resultedAmount = (12 * getAmount) / 100;
  const validAmount = String(resultedAmount);

  try {
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: `http://localhost:3000/successfull/landlord`,
          website_url: `http://localhost:3000/successfull/landlord`,

          amount: validAmount,
          purchase_order_id: id,
          purchase_order_name: name,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({
        success: true,
        message: data.payment_url,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const StripePayment = async (req, res) => {
  const { id, amount, name } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: `Payment for product ID: ${id}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/landlord/successfull",
      cancel_url: "http://localhost:3000/landlord/unsuccessfull",
    });

    // if (name === "Cart payment") {
    //   await cartModel.deleteMany({});
    // }
    return res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { khaltiPayment, StripePayment };
