window.addEventListener('load', startProgram);

function startProgram() {
    showData()
    viewNearestHomework()
}

const p = document.querySelector('.p')
const formSubject = document.querySelector('#subject')
const formPages = document.querySelector('#pages')
const formToDate = document.querySelector('#toDate')

const myForm = document.querySelector('#myForm');
const submit = document.querySelector('.submit');
const deleteAll = document.querySelector('.deleteAll');

let homeworksData;

submit.addEventListener('click', submits)
deleteAll.addEventListener('click', deletingAll)

function showData() {
    fetch('/api', {method: 'GET'})
    .then(function (res){
        return res.json()
    })
    .then(function (data) {
        homeworksData = data;    
        viewHomeworks(homeworksData)
        return homeworksData
    }).catch(function (err) {
        console.log(err)
    })
}

function updateList() {
    showData()
    viewNearestHomework()
}



// Append one homework
function viewNearestHomework() {

    const options = {
        method: 'get'
    }

    fetch('/api/closest', options)
    .then((res)=> {
        return res.json()
    }).then((data)=> {
        const closest = data
        showClosest(closest)
        return data
    }).catch((err)=> {
        console.log(err)
    })    
}

function showClosest(closest) {    
    const list = document.querySelector('#dataItem')
    const closestDates = closest

    const noHomework = 'Finns inga läxor att visa'
    if ( closestDates === noHomework){
        list.textContent = ""
        return
    }
    console.log(closestDates)

    list.textContent = ""

    if(closestDates.length !== 0) {

        for (let i = 0; i < closestDates.length; i++) {
            const listItem = closestDates[i]

            const listContainer = document.createElement('div');
            listContainer.classList.add('listStyling', 'flex', 'row', 'center');
            list.appendChild(listContainer);

            const subject = document.createElement('p');
            subject.classList.add('closestSubject')
            subject.innerText = listItem.subject
            listContainer.appendChild(subject)

            const pages = document.createElement('p');
            pages.classList.add('closestSubject')
            pages.innerText = listItem.pages
            listContainer.appendChild(pages)

            const toDates = document.createElement('p');
            toDates.classList.add('closestSubject')
            toDates.innerText = listItem.toDate
            listContainer.appendChild(toDates)
        }
    } else {
        return
    }
    
}

// Append homeworks to html-page
function viewHomeworks(homeworksData) {
    const list = document.querySelector('#dataList')
    homework = homeworksData

    list.textContent = ""    

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

function submits(e) {
    e.preventDefault();
    console.log(e)
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