const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/api/auth/', require('./routes/auth.route'))
app.use('/api/notes/', require('./routes/notes.route'))
dotenv.config({ path: ".env" });
const dbKey = process.env.REACT_APP_ACCESS_KEY;
async function start() {

    try {
        await mongoose.connect(dbKey)
        app.listen(PORT, () => {
            console.log('Server started on port 5000')
        } )
    } catch (err) {console.error(err)}
    
}


start()