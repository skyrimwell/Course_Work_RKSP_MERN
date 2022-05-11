
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

router.get('/', async (req, res) =>{
    try {
        const { userId } = req.query
        
        const note = await Note.find({owner: userId})

        res.json(note)

    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async (req, res) =>{
    try {
        const note = await Note.findOneAndDelete({_id: req.params.id})
        res.json(note)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router