const express = require('express')
const data = require('./data/data.json')
const app = express()
const port = 3000

// Serve the html-files
app.use(express.static('public'))

// Convert all to json
app.use(express.json())

//  Show all lessons
app.get('/api', (req, res) => {

    if(data.length !== 0) {
        res.status(200).json(data)
    } else {
        res.status(404).json("All homeworks is done!")
    }
})

// Get the closest date
app.get('/api/closest', (req, res) => {
    
    // Does some magic to find the closest date in list
    if (data.length !== 0){
    const getDates = data.slice(0)

    // Empty array that is populated by the "toDate" from the data
    const dates = []

    // Finds all the toDates and push it to dates-array
    getDates.forEach((i) =>{        
        return dates.push({toDate: i.toDate})
    })

    // Sorts the dates-array to the closest date
    dates.sort((a,b) => (a.toDate > b.toDate ? 1 : -1))

    // Using the first value from dates-array
    const getDate = dates[0].toDate

    // Empty array that populates with all the items with the closest toDate
    const getClosest = []
    
    // Finds the closest toDate and push it to geClosest-array
    getDates.forEach((i) => {
        if(i.toDate === getDate) {
            getClosest.push({
                subject: i.subject,
                pages: i.pages,
                toDate: i.toDate
            })
        } else {
            return
        }
    })
    res.status(200).json(getClosest)  
    } else {
        res.status(404).json("No homeworks to view!")
    }
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
    res.status(201).json('Homework has been added')
})

// Change a homework
app.put('/api/:id', (req, res) => {

    const id = req.params.id

    newObject = {
        "subject": req.body.subject,
        "pages": req.body.pages,
        "toDate": req.body.toDate,
        "id": req.params.id
    }

    const index = data.findIndex(homework => homework.id == id)      
    
    if(index === -1) {             
        res.status(404).json("Can't find any homework with this ID")
    } else {
        const deleteHomework = data.splice(index, 1);
        data.push(newObject)
        res.status(200).json("Homework has been updated")        
    }
})

// Delete one lesson
app.delete('/api/:id', (req, res) => {

    const id = req.params.id

    const index = data.findIndex(homework => homework.id == id)

    if(index === -1) {
        res.status(404).json("Nothing has been deleted!")
    } else {
        const deleteHomework = data.splice(index, 1);
        res.status(200).json("Homework has been deleted!")
    }
})

// Delete all lesson
app.delete('/api', (req, res) => {

    data.splice(0, data.length)

    res.status(200).json('All lessons has been deleted!')
})

// Start server
app.listen(port, (req, res) => {
    console.log('Server is running')
})