const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const mainRouter = require("./routes/index")

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://hnanda005:Mongodbtest24%40@test-db.d1aau5r.mongodb.net/paytm")
.then(() => {console.log("DB Connected")})
.catch((err) => {console.log("Error connecting to DB" + err)})

app.use("/api/v1", mainRouter);

app.use("api/v1", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
