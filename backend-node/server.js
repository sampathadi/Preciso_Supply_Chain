const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// passport / oauth
const configurePassport = require('./config/passport');
configurePassport(app);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
// oauth routes (google, microsoft)
app.use('/api/auth', require('./routes/oauthRoutes'));
// inventory / products
app.use('/api/inventory', require('./routes/inventoryRoutes'));
// warehouses
app.use('/api/warehouses', require('./routes/warehouseRoutes'));
app.use('/api/boxes', require('./routes/boxRoutes'));
app.use('/api/arrangements', require('./routes/arrangementRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/dispatches', require('./routes/dispatchRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Default test route
app.get("/", (req, res) => {
  res.send("Enterprise Supply Chain Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
