const USER_SELECTOR = '.user';
const EDIT_BTN_CLASS = 'editBtn';
const DELETE_BTN_CLASS = 'deleteBtn';

const usersTable = document.getElementById('users-table-list');
const editButton = document.getElementById('create');
const addForm = document.getElementById('users-edit')
const saveButton = document.getElementById('saveBnt')
const cancelButton = document.getElementById('cancel')

let usersList;

getUsers()

editButton.addEventListener('click', toggleCreateTable)
saveButton.addEventListener('click', saveUserInfo)
cancelButton.addEventListener('click', cancelForm)
usersTable.addEventListener('click', onUsersTableClick )

function getUsers(){
    fetch('/user')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        usersList = data
        showUsersList(usersList);
    });
}

function showUsersList(usersList) {
    const html = usersList.map(generateUserHTML).join('');
    usersTable.innerHTML = html;
}

function saveUserInfo() {

    const user = getUser()

    if (user.id){
        fetch(`/user?id=${user.id}` , {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        .then((res)=>{
            if (res.ok){
                renderUserHTM(user)
                clearForm()
                toggleCreateTable()
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
                toggleCreateTable()
            }
        });
    }
}

function renderUserHTM(user) {
    const userValueRenderHtml = generateUserHTML(user);

    usersTable.insertAdjacentHTML("beforeend", userValueRenderHtml);
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

function getUser() {
    
    const user = usersList.find(userValue => userValue.id === addForm.elements['id'].value)

    return {
        ...user,
        fullName: addForm.elements['fullname'].value,
		birthday: addForm.elements['birthday'].value,
		profession: addForm.elements['profession'].value,
		address: addForm.elements['address'].value,
		country: addForm.elements['country'].value,
		shortInfo: addForm.elements['short-info'].value,
		fullInfo: addForm.elements['full-info'].value, 
    }
}

function cancelForm() {
    clearForm()
    toggleCreateTable()
}

function onUsersTableClick(e) {
    const user = getUserBySelector(e.target);
    const id = user.dataset.id;

    if (user) {
        if (e.target.classList.contains(EDIT_BTN_CLASS)) {
            toggleCreateTable()
            getSingleUser(id)
                .then((user) => {
                    changeUser(user)
                })
        }
        if (e.target.classList.contains(DELETE_BTN_CLASS)) {
            deleteUser(id)
                .then(() => {
                    const userById = usersList.findIndex(user => user.id === id) || {}
                    usersList.splice(userById, 1);
                })
                .then(() => {
                    clearHTML()   
                })
                .then(() => {
                    showUsersList(usersList);
                })

        }
    }
}

function changeUser(user){
    addForm.elements['id'].value = user.id
    addForm.elements['fullname'].value = user.fullName
    addForm.elements['birthday'].value = user.birthday
    addForm.elements['profession'].value = user.profession
    addForm.elements['address'].value = user.address
    addForm.elements['short-info'].value = user.shortInfo
    addForm.elements['full-info'].value = user.fullInfo
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

// function updateUser(userId, changas) {
//     fetch(`/user?id=${userId}` , {
//         method: 'PUT',
//         body: JSON.stringify(changas)
//     })
//     .then(res => {
//         return res.ok;
//     });
// }

function getUserBySelector(el) {
    return el.closest(USER_SELECTOR);
}

function toggleCreateTable() {
    addForm.classList.toggle('users-edit-hidden')
}

function clearForm() {
    addForm.reset()     
}

function clearHTML() {
    let tableRows = usersTable.getElementsByTagName('tr');
    do {
        usersTable.removeChild(tableRows[0])
    } while (tableRows[0])
}

