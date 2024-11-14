const express = require("express")
require("dotenv").config()
require("./DB/connectDB")
const cors = require("cors")
const categoryRouter = require("./Route/CategoryRouter")
const productRouter = require("./Route/ProductRouter")
const contactRouter = require("./Route/ContactRouter")
const subcategoryrouter = require("./Route/SubcategoryRouter")
const bannerrouter = require("./Route/BannerRouter")
const newLanchRouter = require("./Route/NewLanchRouter")
const app = express()
app.use(cors())
app.use(express.json())
app.set(express.static("/Public"))

app.use("/api", categoryRouter)
app.use("/api", productRouter)
app.use("/api", contactRouter)
app.use("/api", subcategoryrouter)
app.use("/api", bannerrouter)
app.use("/api", newLanchRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`)
})