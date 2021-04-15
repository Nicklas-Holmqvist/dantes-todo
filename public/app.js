window.addEventListener('load', startProgram);

// Fetch the GETS and event
function startProgram() {
    showData()
    viewNearestHomework()

    eventListeners()    
}

// Eventlisteners for the global buttons
function eventListeners() {
    submit.addEventListener('click', submits)
    deleteAll.addEventListener('click', deletingAll)
}

// Gets all the elements to use in the app
const p = document.querySelector('.p')
const formSubject = document.querySelector('#subject')
const formPages = document.querySelector('#pages')
const formToDate = document.querySelector('#toDate')
const myForm = document.querySelector('#myForm');
const submit = document.querySelector('.submit');
const deleteAll = document.querySelector('.deleteAll');

// Variable with all homeworks that acts as a boolean to delete all homeworks
let homeworksData;

// When a button is pressed, this function will run to fetch all the GETs
function updateList() {
    showData()
    viewNearestHomework()
}

// A GET fetch that shows all the homeworks
function showData() {

    const options = {
        method: 'get'
    }

    const response = {
        res: {},
        body: {}
    }

    fetch('/api', options)
    .then(function (res){
        response.res = res
        return res.json()
    })
    .then(function (data) {
        response.body = data;
        homeworksData = data    
        viewHomeworks(response)
    }).catch(function (err) {
        console.log(err)
    })
}

/**
 * Create elements  for all the homeworks
 * @param {Object} response sends down the response and body from fetch
 * @returns 
 */
 function viewHomeworks(response) {
    const list = document.querySelector('#dataList')
    homework = response.body
    noHomeworks = response.res.status

    // Removes the old list elements
    list.textContent = ""  
    
    if(noHomeworks === 404) {
        return
    }    

    // If the array isn't empty all the list items will be created in a for-loop 
    // The eventlisteners is inside here that delete and updates the list items
    for (let i = 0; i <homework.length; i++) {
        const listItem = homework[i]

        const listContainer = document.createElement('div');
        listContainer.classList.add('listStyling', 'flex', 'row', 'center');
        list.appendChild(listContainer)

        // Datafield Subject
        const subject = document.createElement("input");
        subject.classList.add('textLeft', 'subject')
        subject.value = listItem.subject
        subject.type = "text"
        subject.name = "subject"
        listContainer.appendChild(subject)

        // Datafield Pages
        const pages = document.createElement("input");
        pages.classList.add('pages')
        pages.value = listItem.pages
        pages.type = "text"
        pages.name = "pages"
        listContainer.appendChild(pages)

        // Datafield toDate
        const toDate = document.createElement("input");
        toDate.classList.add('textRight', 'toDate')
        toDate.value = listItem.toDate
        toDate.type = "text"
        toDate.name = "toDate"
        listContainer.appendChild(toDate)

        // Button Delete
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'delete');
        btnDelete.innerText = 'Ta bort';
        listContainer.appendChild(btnDelete)

        // Button Update
        const btnUpdate = document.createElement('button');
        btnUpdate.classList.add('btn', 'update');
        btnUpdate.innerText = 'Uppdatera';
        listContainer.appendChild(btnUpdate)     

        btnDelete.addEventListener('click', (e) => {
            list.removeChild(listContainer)
            deleteHomework(listItem.id)
        })

        btnUpdate.addEventListener('click', (e) => {
            const getId = listItem.id
            const changeSubject = subject.value
            const changePages = pages.value
            const changeToDate = toDate.value

            updateHomework(getId, changeSubject, changePages , changeToDate)
        })
    }    
}

// A GET fetch that gets the closest homeworks
function viewNearestHomework() {

    const options = {
        method: 'get'
    }

    const response = {
        res: {},
        body: {}
    }
    fetch('/api/closest', options)
    .then((res)=> {
        response.res = res
        return res.json()
    }).then((data)=> {
        response.body = data
        showClosest(response)
    }).catch((err)=> {
        console.log(err)
    })    
}

/**
 * Creates elements for the closest homeworks
 * @param {Object} response sends down the response and body from fetch
 * @returns 
 */
 function showClosest(response) {    
    const list = document.querySelector('#dataItem')
    const closestDates = response.body
    const noHomework = response.res.status

    // Removes the old list elements
    list.textContent = ""

    if ( noHomework === 404){
        return
    }    

    // If the array isn't empty all the list items will be created in a for-loop 
    if(closestDates.length !== 0) {

        for (let i = 0; i < closestDates.length; i++) {
            const listItem = closestDates[i]

            const listContainer = document.createElement('div');
            listContainer.classList.add('listStyling', 'flex', 'row', 'center');
            list.appendChild(listContainer);

            const subject = document.createElement('p');
            subject.classList.add('closestSubject')
            subject.innerText = 'Ämne: ' + listItem.subject
            listContainer.appendChild(subject)

            const pages = document.createElement('p');
            pages.classList.add('closestPages')
            pages.innerText = 'Kapitel/Sidor: ' + listItem.pages
            listContainer.appendChild(pages)

            const toDates = document.createElement('p');
            toDates.classList.add('closestDates')
            toDates.innerText = 'Till datum: ' + listItem.toDate
            listContainer.appendChild(toDates)
        }
    } else {
        return
    }
    
}

/**
 * Fetch and add homework-function
 * @param {*} e eventfor the button
 */
 function submits(e) {
    e.preventDefault();
    const subject = formSubject.value
    const pages = formPages.value
    const toDate = formToDate.value

    const formData = {subject, pages, toDate}

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    
    fetch('http://localhost:3000/api', options
    ).then((response)=>{
        return response.text();
    }).then((text) => {
        console.log(text)
    }).catch((error) => {
        console.log(error)
    })
    
    updateList()
}

/**
 * Fetch and update-function for on item on the todo list
 * @param {number} getId gets the ID from list item
 * @param {string} changeSubject gets the Subject from list item
 * @param {string} changePages gets the Pages from list item
 * @param {string} changeToDate gets the ToDates from list item
 */
 function updateHomework(getId, changeSubject, changePages , changeToDate) {
    const id = getId
    const url = `/api/${id}`


    const subject = changeSubject
    const pages = changePages
    const toDate = changeToDate

    const formData = {subject, id, pages, toDate}
    console.log(formData)
    console.log(id)

    const init = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    fetch(url, init)
    .then(function (res){
        return res.text()
    }).catch((error) => {
        console.error(error)
    })
    
    updateList()
}

/**
 * Fetch and delete-function for one item on the todo list
 * @param {number} e event to get the ID from list item
 */
 function deleteHomework(e) {
    const id = e
    const url = `/api/${id}`

    const init = {
        method: 'delete'
    }
    fetch(url, init)
    .then(function (res){
        return res.text()
    }).catch((error) => {
        console.error(error)
    })

    updateList()    
}

// Fetch and deleteAll-function
function deletingAll() {

    const options = {
        method: 'delete'
    }

    fetch('http://localhost:3000/api', options)
    .then((response)=> {
        return response.text();
    }).then((text)=> {
        console.log(text)
    }).catch((error)=> {
        console.log(error)
    })

    if(homeworksData.length === 0){
        return
    } else {
        updateList()
    }
}