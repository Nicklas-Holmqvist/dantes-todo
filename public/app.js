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

function showData() {
    
    fetch('/api', {method: 'GET'})
    .then(function (res){
        return res.json()
    })
    .then(function (data) {
        const homeworksData = data;        
        console.log(homeworksData)
        viewHomeworks(homeworksData)
        return homeworksData
    }).catch(function (err) {
        console.log(err)
    })
}



// Append homeworks to html-page
function viewHomeworks(homeworksData) {
    const list = document.querySelector('#dataList')
    const homework = homeworksData

    for (let i = 0; i <homework.length; i++) {
        const listItem = homework[i]

        const listContainer = document.createElement('div');
        listContainer.classList.add('listStyling', 'flex', 'row', 'center');
        list.appendChild(listContainer)

        // Datafield Subject
        const subject = document.createElement("P");
        subject.classList.add('textLeft')
        subject.innerText = listItem.subject
        listContainer.appendChild(subject)

        // Datafield Pages
        const pages = document.createElement("P");
        pages.innerText = listItem.pages
        listContainer.appendChild(pages)

        // Datafield toDate
        const toDate = document.createElement("P");
        toDate.classList.add('textRight')
        toDate.innerText = listItem.toDate
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
            console.log(listItem.id)
            console.log(e)
            deleteHomework(listItem.id)
        })

        btnUpdate.addEventListener('click', (e) => {
            console.log(listItem.id)
            console.log(e)
        })
    }    
}

function deleteHomework(e) {
    console.log(e)
    const id = e
    const url = `/api/${id}`
    console.log(url)

    const init = {
        method: 'delete'
    }

    fetch(url, init)
    .then(function (res){
        return res.json()
    })
    
    showData()
}

function submits(e) {
    e.preventDefault();
    console.log(e)
    const subject = formSubject.value
    const pages = formPages.value
    const toDate = formToDate.value

    const formData = {subject, pages, toDate}
    console.log(formData)
    
    // const formData = new FormData(this);
    // const searchParams = new URLSearchParams()

    // for(const pair of formData) {
    //     searchParrams.append(pair[0], pair[1])
    // }

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
}