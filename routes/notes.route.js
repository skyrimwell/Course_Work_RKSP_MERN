const {Router} = require('express')
const router = Router()
const Note = require('../models/Note')

router.post('/addNote', async (req, res) => {
    try {
        const {text, userId} = req.body

        const note = await new Note({
            text,
            owner: userId,
            checked: false,
            important: false
        })

        await note.save();

        res.json(note)

    } catch (error) {
        console.error(error)
    }
})

module.exports = router