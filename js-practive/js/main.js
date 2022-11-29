// console.log(event)
    // 1.очищення всієї сторінки 
    // 2.умови, що знаходяться в хещі та їх валідація (асинхронний запит який вибудовує сторінку) (вбудувати сторінку )
let usersTable
let createButton
let userForm 

setUsersTable()
setHtmlElementUserForm()

function setUsersTable() {
    usersTable = document.getElementById('users-table-list');
    createButton = document.getElementById('create');

    createButton.addEventListener('click', goToUserForm);
    usersTable.addEventListener('click', onUsersTableClick);
}

function setHtmlElementUserForm() {
    userForm = document.getElementById('users-edit');
    userForm.addEventListener('click', onUserFormClick);
}

readingHashState();

function readingHashState() {
    addEventListener('popstate', (event) => {
            
        switch (location.hash.split("=")[0]) {
            case '#user-form': {
                if (window.location.hash.split("=")[1]) {
                    fetch('/user-form.html')
                    .then((res) => res.text())
                    .then((stringHtml) => document.body.innerHTML = stringHtml)
                    .then(() => getSingleUser(window.location.hash.split("=")[1]))
                    .then((user) => {
                        setHtmlElementUserForm()
                        setUserData(user)
                    })
    
                } else {
                    fetch('/user-form.html')
                    .then((res) => res.text())
                    .then((stringHtml) => document.body.innerHTML = stringHtml)
                    .then(() => setHtmlElementUserForm())
                    .then(() => {
                        if(getDataOnLocalStorage()) {
                            setUserData(getDataOnLocalStorage())
                        }
                    })
                }            
                break
            }
            case '': {
                fetch('')
                .then((res) => res.text())
                .then((stringHtml) => document.body.innerHTML = stringHtml)
                .then(() => {
                    setUsersTable()
                    getUsers()
                });
            }
        }
     });
}

function getUsers(){
    fetch('/user')
    .then((response) =>  response.json())
    .then(showUsersList)
}

getUsers()

function showUsersList(data) {
    const html = data.map(generateUserHTML).join('');
    usersTable.innerHTML = html;
}

function generateUserHTML(user) {     
    return `
    <tr 
        class="user"
        data-id="${user.id}"
    >
        <th>${user.fullName}</th>
        <th>${user.profession}</th>
        <th>${user.shortInfo}</th>
        <th>
            <button class="btn editBtn">Edit</button>
            <button class="btn deleteBtn">Delete</button>
        </th>
    </tr>
    `
}

function goToUserForm(id) {
    if(typeof(id) === 'string') {
        location.hash = 'user-form=' + id;
    } else {
        location.hash = 'user-form';
    }
}

function onUserFormClick(e){
    if (e.target.classList.contains('btn-cancel')){
        const user = getUserFromForm()
        setDataOnLocalStorage(user)
        goToTable()
    } else if (e.target.classList.contains('btn-save')){
        saveUserInfo()
    }
}

function goToTable() {
    history.back()
}

function saveUserInfo() {

    const user = getUserFromForm()

    if (user.id){
        fetch(`/user`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res)=>{
            if (res.ok){
                renderUserHTM(user)
                clearForm()
                clearHTML()
                getUsers()
            }
        });
    } else {
        fetch('/user', {
            method: 'POST',
            body: JSON.stringify(user),
        })
        .then((res)=>{
            if (res.ok){
                renderUserHTM(user)
                clearForm()
            }
        });
    }
    deleteDataOnLocalStorage()
    goToTable()
}

function getUserFromForm() {

    setHtmlElementUserForm()

    return {
        id: userForm.elements['id'].value,
        fullName: userForm.elements['fullname'].value,
		birthday: userForm.elements['birthday'].value,
		profession: userForm.elements['profession'].value,
		address: userForm.elements['address'].value,
		country: userForm.elements['country'].value,
		shortInfo: userForm.elements['short-info'].value,
		fullInfo: userForm.elements['full-info'].value, 
    }
}

function renderUserHTM(user) {
    const userValueRenderHtml = generateUserHTML(user);

    usersTable.insertAdjacentHTML("beforeend", userValueRenderHtml);
}

function onUsersTableClick(e) {
    const user = getUserBySelector(e.target);
    const id = user.dataset.id;

    if (user) {
        if (e.target.classList.contains('editBtn')) {
            goToUserForm(id)
            getSingleUser(id)
                .then((user) => {
                    setUserData(user)
                })
        }
        if (e.target.classList.contains('deleteBtn')) {
            deleteUser(id)
                .then(() => {
                    clearHTML()   
                })
                .then(() => {
                    getUsers();
                })
        }
    }
}

function getUserBySelector(el) {
    return el.closest('.user');
}


function setUserData(user){
    setHtmlElementUserForm()

    userForm.elements['id'].value = user.id
    userForm.elements['fullname'].value = user.fullName
    userForm.elements['birthday'].value = user.birthday
    userForm.elements['profession'].value = user.profession
    userForm.elements['address'].value = user.address
    userForm.elements['short-info'].value = user.shortInfo
    userForm.elements['full-info'].value = user.fullInfo
}

function getSingleUser(userId) {
    return fetch(`/user?id=${userId}`, {
        method: 'GET',
    })
    .then(res => {
        return res.json();
    })
}

function deleteUser(userId) {
    return fetch(`/user?id=${userId}` , {
        method: 'DELETE',
    })
    .then(res => {
        return res.ok;
    });
}


function clearForm() {
    userForm.reset()     
}

function clearHTML() {
    let tableRows = usersTable.getElementsByTagName('tr');
    do {
        usersTable.removeChild(tableRows[0])
    } while (tableRows[0])
}

function setDataOnLocalStorage(user) { 
    if(!user.id){
        localStorage.setItem('user', JSON.stringify(user))
    }
}

function getDataOnLocalStorage() {
    return JSON.parse(localStorage.getItem('user'))
}

function deleteDataOnLocalStorage() {
    localStorage.removeItem('user')
}