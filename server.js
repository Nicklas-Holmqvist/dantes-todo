const express = require('express')
const app = express()
const port = 3000

const homeworks = [
    {
        "Ämne": "Matte",
        "Sidor": "15-18",
        "Till": "210420",
        "id": 1
    },
    {
        "Ämne": "Engelska",
        "Sidor": "21-27",
        "Till": "210421",
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

// Delete one lesson
app.delete('/api/:id', (req, res) => {
    const index = homeworks.find((homework) => {
        if (homework.id == 1) {
            return homework
        }
    })

    const deleteHomework = homeworks.splice(index, 1);
    res.json(deleteHomework)
})


// Start server
app.listen(port, (req, res) => {
    console.log('Server is running')
})