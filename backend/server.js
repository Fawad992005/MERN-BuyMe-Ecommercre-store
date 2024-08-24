// server.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminroutes");
const shoproutes = require("./routes/shoproutes");
const login = require("./routes/login");
const signin = require("./routes/signin");
const checkAdmin = require("./middlewares/chechkadmin");
const logout = require("./routes/logout");
const currentuser = require("./routes/currentuser")
const checkAuth = require("./middlewares/checkauth")
const Products = require("./routes/product")
require('dotenv').config();



const app = express();

mongoose.connect(process.env.MONGO_DB, {});

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/admin", checkAdmin, adminRoutes); // Protect admin routes with checkAdmin middleware
app.use("/shop", shoproutes);
app.use("/signin", signin);
app.use("/login", login);
app.use("/logout",logout);
app.use("/currentuser",checkAuth,currentuser)
app.use("/product",Products)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
