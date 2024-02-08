const express = require("express");
const { products } = require("../mongoose/Db_connect");
const { users } = require("../mongoose/Db_connect");
const app = express();
const cors = require("cors");

// products
// app.get("/", async function(req, res){
//     const data = await products.find({})
//     res.send(data)
// })

// app.post("/post", async function(req, res){
//     const data = await products.create({product_name:"samsung", price: 30000})
//     res.send(data)
// })

app.use(cors());
app.use(express.json());

app.get("/products", async function (req, res) {
  const data = await products.find({});
  res.send(data);
});

app.post("/post", async function (req, res) {
  const data = await users.create(req.body);
  res.send(data);
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/postProducts", async function (req, res) {
  const data = await products.create(req.body);
  console.log(data);
  res.send(data);
});

app.patch("/updateProduct/:id", async function (req, res) {
  const { id } = req.params;
  const { productImg, productName, productPrice, productDesc } = req.body;
  const updatedProduct = await products.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        productImg,
        productName,
        productPrice,
        productDesc,
      },
    },
    { new: true } // Return the updated document
  );
  console.log(updatedProduct);
  res.send(updatedProduct);
});

app.delete("/deleteProduct/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await products.findOneAndDelete({ _id: id });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(1111);
