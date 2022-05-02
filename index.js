const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@skycluster.u1hjp.mongodb.net/NotesApp?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log('Server started on port 5000')
        } )
    } catch (err) {console.error(err)}
    
}
start()