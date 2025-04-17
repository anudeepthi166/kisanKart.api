const express = require('express');
const authRoutes = require('./routes/authRoutes')
const otpRoutes = require('./routes/otpRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const db = require('./models');
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT

const startServer = async() =>{
    try{
        await db.sequelize.authenticate()
        console.log("Connected to DB")
        const app = express();
        app.use(express.json())
        app.use(cors())
        app.use('/api/auth', authRoutes)
        app.use('/api/otp', otpRoutes)
        app.use('/api/product', productRoutes)
        app.use('/api/cart', cartRoutes)
        app.use('/api/order', orderRoutes)

        app.listen(PORT, () => {
            console.log(`Server running on PORT: ${PORT}`);
        })

    }
    catch(err){
        console.log(`Error while connecting to DB: ${err.message}`)
    }
}

startServer()

