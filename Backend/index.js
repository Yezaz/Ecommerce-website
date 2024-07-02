const port = process.env.PORT || 4000; //process.env.PORT is used to host a website online
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { error } = require('console');

app.use(express.json()); // Automatically parses JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Database connection with MongoDB
mongoose.connect("mongodb+srv://yezaz:1208@cluster0.r4a6jvq.mongodb.net/e-commerce?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Ensure MongoDB driver monitoring engine is enabled
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    // Ensure the filename function is properly closed with a semicolon above
  }
});



// Initialize multer instance
const upload = multer({ storage: storage });

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Handle file upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: 'No file uploaded' });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  }
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    console.log("Product saved:", product);
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product removed:", req.body.id);
    res.json({
      success: true,
      name: req.body.name
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Failed to remove product" });
  }
});

//Schema creating for User model

const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
    email:{
      type:String,
      unique:true,
    },
    password:{
      type:String,
    },
    cartData:{
      type:Object,
    },
    date:{
      type:Date,
      default:Date.now,
    }
 
})

//creatng endpoint for regestring the user
//here we check user with same email exsist or not
app.post('/signup',async(req,res)=>{
  let check = await Users.findOne({email:req.body.email})//req.body.email brings the email which is present in the browser and store it in check
  if(check)
    {
      return res.status(400).json({success:false,errors:"Existing user found with same email id  "})
    }
    //if the user dosent exist then we will create a new user
    let cart = {};
    for(let i=0;i<300;i++)
      {
        cart[i]=0;
      }
      //adding name emal password and cartdata of user
      const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData: cart,
      })
      await user.save(); //used to save user in database

      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom') //used to generate a token;
      res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
  let user = await Users.findOne({email:req.body.email});
  if(user){
    const passCompare = req.body.password === user.password;
    if (passCompare){
      const data = {
        user : {
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else{
      res.json({success:false,errors:"Wrong Password"
      });
    }
  }
  else{
    res.json({success:false,errors:"Wrong email id"})
  }
})
// Get all products endpoint
app.get('/allproducts', async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

//creating endpoints for newcollection data
app.get('/newcollection',async (req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection fetched");
  res.send(newcollection);
})

app.get('/popularinwomen',async(req,res)=>{
  let products = await Product.find({category:"women"})
  let popular_in_women = products.slice(0,4);
  res.send(popular_in_women);
})
// creating middleware to fetch user and is accessed in addtocart
const fetchuser = async(req,res,next)=>{
  const token = req.header('auth-token');
  if(!token)
    {
      res.status(401).send({errors:"Please authenticate using valid token"})
    }
  else{ //decoding token here
    try{
      const data = jwt.verify(token,'secret_ecom');
      req.user = data.user;
      next();
    }
    catch(error){
      res.status(401).send({errors:"Please authenticate"})
    }
  }
}
//creating end point for adding produts to carts this reflects in database
app.post('/addtocart',fetchuser,async (req,res)=>{
  console.log("Added",req.body.itemId)
  let userdata = await Users.findOne({_id:req.user.id});
  userdata.cartData[req.body.itemId] +=1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
  res.send("Added");
})
// creating endpoint to remove product from cart
app.post('/removefromcart',fetchuser,async(req,res)=>{
  console.log("removed",req.body.itemId)
  let userdata = await Users.findOne({_id:req.user.id});
  if(userdata.cartData[req.body.itemId]>0)
  userdata.cartData[req.body.itemId] -=1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
  res.send("Removed");
})

// creating a logic so that even after logout our cart data is retrived
app.post('/getcart',fetchuser, async(req,res)=>{
  let userdata =await Users.findOne({_id:req.user.id});
  res.json(userdata.cartData);
}) //fetchuser is middleware used to find user id
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
