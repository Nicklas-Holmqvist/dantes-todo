const express = require('express')
const app = express()
const port = 3000

const homeworks = [
    {
        "subject": "Matte",
        "pages": "15-18",
        "toDate": "210420",
        "id": 1
    },
    {
        "subject": "Engelska",
        "pages": "21-27",
        "toDate": "210421",
        "id": 2
    }
]

// Convert all to json
app.use(express.json())

//  Show all lessons
app.get('/api', (req, res) => {
    res.json(homeworks)
})

// Get one lesson
app.get('/api/:id', (req, res) => {
    const id = req.params.id
    
    const findHomework = homeworks.find((homework) => {
        return homework.id == id
    })

    if(!findHomework) {
        res.json("Hittade ingen läxa!")
    }

    res.json(findHomework)
})

// Add a homework to the array
app.post('/api', (req, res) => {

    const homeworkToSave = req.body
    
    const subject = homeworkToSave.subject
    const pages = homeworkToSave.pages
    const toDate = homeworkToSave.toDate

    let newId = 0
    homeworks.forEach((i) => {
        if(i.id > newId) {
            newId = i.id
        }
    })

    newId++

    homeworks.push({
        "subject": subject,
        "pages": pages,
        "toDate": toDate,
        "id": newId
    })

})

// Delete one lesson
app.delete('/api/:id', (req, res) => {

    const id = req.params.id

    const index = homeworks.findIndex(homework => homework.id === id)

    const deleteHomework = homeworks.splice(index, 1);
    res.json(deleteHomework)
    console.log(deleteHomework)
})


// Start server
app.listen(port, (req, res) => {
    console.log('Server is running')
})