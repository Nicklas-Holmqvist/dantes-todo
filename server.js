const express = require('express')
const data = require('./data/data.json')
const app = express()
const port = 3000

// Convert all to json
app.use(express.json())

//  Show all lessons
app.get('/api', (req, res) => {
    res.json(data)
    res.end()
})

// Get one lesson
app.get('/api/:id', (req, res) => {
    const id = req.params.id
    
    const findHomework = data.find((data) => {
        return data.id == id
    })

    if(!findHomework) {
        res.json("Hittade ingen läxa!")
        res.end()
    }

    res.json(findHomework)
    res.end()
})


// Add a homework to the array
app.post('/api', (req, res) => {

    const homeworkToSave = req.body
    
    const subject = homeworkToSave.subject
    const pages = homeworkToSave.pages
    const toDate = homeworkToSave.toDate

    let newId = 0
    data.forEach((i) => {
        if(i.id > newId) {
            newId = i.id
        }
    })

    newId++

    newObject = {
        "subject": subject,
        "pages": pages,
        "toDate": toDate,
        "id": newId
    }

    data.push(newObject)
    res.end()

})

// Change a homework
app.put('/api/:id', (req, res) => {

    const id = req.params.id

    console.log(id)

    newObject = {
        "subject": req.body.subject,
        "pages": req.body.pages,
        "toDate": req.body.toDate,
        "id": req.body.id
    }

    const index = homeworks.findIndex(homework => homework.id == id)   
    
    
    if(index === -1) {        
        res.json("Hitta inte läxan")
        res.end()
    } else {
        const deleteHomework = homeworks.splice(index, 1);
        homeworks.push(newObject)
        res.end()
        
    }
    res.end()

})

// Delete one lesson
app.delete('/api/:id', (req, res) => {

    const id = req.params.id

    const index = homeworks.findIndex(homework => homework.id == id)

    if(index === -1) {
        res.json("Inget att radera!")
    } else {
        const deleteHomework = homeworks.splice(index, 1);
        res.end()
    }

    res.end()
})


// Start server
app.listen(port, (req, res) => {
    console.log('Server is running')
})