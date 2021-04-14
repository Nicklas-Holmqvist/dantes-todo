window.addEventListener('load', startProgram);

function startProgram() {
    showData()

}
const p = document.querySelector('.p')
const formSubject = document.querySelector('#subject')
const formPages = document.querySelector('#pages')
const formToDate = document.querySelector('#toDate')

const myForm = document.querySelector('#myForm');
const submit = document.querySelector('.submit');


submit.addEventListener('click', submits)

function updateList() {
    setInterval(showData, 500)
}

function showData() {
    
    fetch('/api', {method: 'GET'})
    .then(function (res){
        return res.json()
    })
    .then(function (data) {
        const homeworksData = data;    
        viewHomeworks(homeworksData)
        return homeworksData
    }).catch(function (err) {
        console.log(err)
    })
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