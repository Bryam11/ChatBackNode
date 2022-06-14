require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require("./config/mongo");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

dbConnect();