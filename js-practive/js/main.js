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
    // usersList.forEach((user) =>{
    //     renderUserHTM(user);
    // })
    const html = usersList.map(generateUserHTML).join('');
    usersTable.innerHTML = html;
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

function saveUserInfo() {
    
    const newUser = {
        fullName: addForm.elements['fullname'].value,
		birthday: addForm.elements['birthday'].value,
		profession: addForm.elements['profession'].value,
		address: addForm.elements['address'].value,
		country: addForm.elements['country'].value,
		shortInfo: addForm.elements['short-info'].value,
		fullInfo: addForm.elements['full-info'].value, 
    }
    
    fetch('/user', {
        method: 'POST',
        body: newUser,
    })
    .then((user)=>{
        if (user.ok){
            renderUserHTM(newUser)
            clearForm()
            toggleCreateTable()
        }
    });
}

function cancelForm() {
    clearForm()
    toggleCreateTable()
}

function onUsersTableClick(e) {
    const user = getUser(e.target);
    const id = user.dataset.id;

    if (user) {
        if (e.target.classList.contains(EDIT_BTN_CLASS)) {
            editUser(id);
            return;
        }
        if (e.target.classList.contains(DELETE_BTN_CLASS)) {
            deleteUser(id)
                .then(() => {
                    const userById = usersList.findIndex(user => user.id === id)
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

function editUser(userId) {
    return fetch(`/user?id=${userId}` , {
        method: 'DELETE',
    })
    .then(res => {
        return res.ok;
    });
}


function deleteUser(userId) {
    return fetch(`/user?id=${userId}` , {
        method: 'DELETE',
    })
    .then(res => {
        return res.ok;
    });
}

function getUser(el) {
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
    // let rowCount = tableRows.length;

    //  (let i = rowCount ; i > 0; i-- ) {
    //     console.log(tableRows[i])
    //     usersTable.removeChild(tableRows[i])
    // }
    do {
        usersTable.removeChild(tableRows[0])
    } while (tableRows[0])
}

