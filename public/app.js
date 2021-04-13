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

function viewHomeworks(homeworksData) {
    const homework = homeworksData
    console.log(homework)
    for (let i = 0; i <homework.length; i++) {
        console.log(homework[i].pages)
        
    }
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

    
    fetch('http://localhost:3000/api', options
    ).then((response)=>{
        return response.text();
    }).then((text) => {
        console.log(text)
    }).catch((error) => {
        console.log(error)
    })
}