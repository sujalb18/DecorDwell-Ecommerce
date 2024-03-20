const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const ProductModel = require('./models/Products.js');
const RegisterModel = require('./models/Register.js');
const bcrypt = require('bcrypt');
const ReviewModel = require('./models/Review.js');
const app = express();
const Cart = require('./models/Cart.js')
const cookieParser = require("cookie-parser");
const ContactModel = require('./models/Contact.js');

app.use(cookieParser());

// Used For Cross origin data transfer
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// To connect MONGODB Database
mongoose.connect(process.env.MONGO_CONNECT);

// GET REQUEST FOR HOME ROUTE
app.get("/", (req, res) => {
    res.send("Hello World");
})


// POST REQUEST FOR REGISTER ROUTE 
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        const customerExist = await RegisterModel.findOne({ email: email });
        if (customerExist) {
            return res.status(422).json({ error: "Already Exist" })
        }
        if (password != confirmpassword) {
            return res.status(423).json({ error: "Password is not same" })
        }
        const customer = new RegisterModel({ name, email, password, confirmpassword });
        const customerReg = await customer.save();
        if (!customerReg) {
            return res.status(400).json({ error: "Failed to register" })
        } else if (customerReg) {
            return res.status(201).json({ message: "Registered Successfully" })
        }

    } catch (error) {
        console.log(error);
    }
})

// POST REQUEST FOR LOGIN ROUTE
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await RegisterModel.findOne({ email: email });
        if (!email || !password) {
            res.status(400);
        }
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({ message: "Password Incorrect" });
            } else {
                res.status(201).json({Userid: userLogin._id});
            }
        }
        else {
            res.status(500).json({ message: "Invalid Credentials" });
        }
        
    } catch (err) {
        console.log(err);
    }
})

//AUTHENTICATION PROCESS
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await RegisterModel.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) {
            res.status(401);
        }
        req.token = token;
        req.rootUser = rootUser;
        req.UserID = rootUser._id;

        next();
    } catch (err) {
        res.send("ERROR")
        console.log(err);
    }
}

// CHECK IF USER IS LOGGED IN
app.get('/check-auth', authenticate, (req, res) => {
    res.json({ authenticated: true });
});

// GET REQUEST FOR PRODUCT ROUTE
app.get('/products', authenticate, (req, res) => {
    ProductModel.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
})

//GET PRODUCT FOR SPECIFIC PRODUCT
app.get('/products/:id', (req, res) => {
    ProductModel.findById(req.params.id)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err);
        })
})



//PROFILE ROUTE
app.get('/profile', authenticate, (req, res) => {
    res.send(req.rootUser);

})
//LOGOUT ROUTE
app.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('Logout Successfully')
})


//NEW ARRIVAL PRODUCT ROUTE
app.post('/products/isNewArrival/:isNewArrival', (req, res) => {
    ProductModel.find({ isNewArrival: req.params.isNewArrival })
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log(err);
        })
})


//CATEGORY ROUTE
app.get('/products/category/:category', (req, res) => {
    ProductModel.find({ category: req.params.category })
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log(err);
        })
});


// PRODUCTS TO CART 
app.post('/addtocart', authenticate, async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const userId = req.UserID
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        const existingItem = cart.items.find(item => item.product.toString() === id);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.items.push({ product: id, quantity });
        }
        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});



// CART LOGIC
app.get('/cart', authenticate, async (req, res) => {
    try {
        const userId = req.UserID;
        const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price img');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

})


// DELETE CART LOGIC
app.post('/deletecart', authenticate, async (req, res) => {
    try {
        const userId = req.UserID;
        const { id } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== id);
        await cart.save();

        res.status(200).json({ message: 'Item removed from the cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


// MODIFY CART LOGIC
app.post('/modifycart', authenticate, async (req, res) => {
    try {
        const userId = req.UserID;
        const { id, action } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        const existingItem = cart.items.find(item => item.product.toString() === id);

        if (!existingItem) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        if (action === 'increase') {
            existingItem.quantity += 1;
        } else if (action === 'decrease' && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        }

        await cart.save();

        res.status(200).json({ message: 'Item quantity modified successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/get-user-info', authenticate , async (req, res) => {
    try {
      // You can customize the user data you want to send
      const userData = {
        _id: req.UserID,
        name: req.rootUser.name,
        email: req.rootUser.email,
      };
  
      res.status(200).send(userData);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// REVIEWS
app.post('/reviews', authenticate, async (req, res) => {
    try {
        const { user , title , product, rating, comment } = req.body;
        const newReview = new ReviewModel({
            user,
            title,
            product,
            rating,
            comment
        })
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.log(error);
    }

})

app.get('/reviews/:productID'  , async (req,res)=>{
    try {
        const productID = req.params.productID;
        const reviews = await ReviewModel.find({ product: productID }).populate('user', 'name email');

        res.status(200).json(reviews);

    } catch (error) {
        
    }
})

app.delete('/reviews/:reviewID', authenticate, async (req, res) => {
    try {
      const reviewID = req.params.reviewID;
      const loggedInUserID = req.UserID;
  
      const review = await ReviewModel.findOne({ _id: reviewID });
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Check if the logged-in user is the owner of the review
      if (String(loggedInUserID) !== String(review.user)) {
        return res.status(403).json({ message: 'Unauthorized. You can only delete your own reviews.' });
      }
  
      await ReviewModel.findByIdAndDelete({ _id: reviewID });
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//   Contact
app.post('/contacts' , async (req,res) => {
    try {
        const {name, email ,messages} = req.body;
        const contacts =  new ContactModel({name , email , messages});
        const contactdata = await contacts.save();
        if(!contactdata){
            res.status(400).json({message: "error"})
        }else{
            res.status(200).json({message: "Contact sent successfully"})
        }
    } catch (error) {
        console.log(error);
    }
})


// LISTEN TO PORT 5000
app.listen(5000, () => {
    console.log("Server started at port 5000");
})