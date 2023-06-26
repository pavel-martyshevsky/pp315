const data = document.getElementById("user-info-table")
const url = 'http://localhost:8080/api/admin/viewUser'
const panel = document.getElementById("admin-header")

function userAuthInfo() {
    fetch(url).then((res) => res.json())
        .then((user) => {

            let temp = ''

            temp += '<tr>'
            temp += '<td>' + user.id + '</td>'
            temp += '<td>' + user.name + '</td>'
            temp += '<td>' + user.surname + '</td>'
            temp += '<td>' + user.age + '</td>'
            temp += '<td>' + user.username + '</td>'
            temp += '<td>' + user.roles.map(role => role.roleName.substring(5)) + '</td>'
            data.innerHTML = temp
            panel.innerHTML = `<h5>${user.username} with roles: ${user.roles.map(role => " " + role.roleName.substring(5))}</h5>`
        })
}

userAuthInfo()

const URL = "/api/admin/users"

$(document).ready(function () {
    getUsers();
})

function getUsers() {
    fetch(URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (users) {
            let placeholder = document.getElementById('users-info-table')
            let out = ""
            for (let user of users) {
                out += '<tr>'
                out += '<td>' + user.id + '</td>'
                out += '<td>' + user.name + '</td>'
                out += '<td>' + user.surname + '</td>'
                out += '<td>' + user.age + '</td>'
                out += '<td>' + user.username + '</td>'
                out += '<td>' + user.roles.map(role => role.roleName.substring(5)) + '</td>'
                out += '<td>' +
                    '<button type="button" class="btn btn-info" data-bs-target="#editUserModal" data-bs-toggle="modal" ' +
                    'onclick="getEditModal(' + user.id + ')">' + 'Edit' +
                    '</button>' +
                    '</td>'
                out += '<td>' +
                    '<button type="button" class="btn btn-danger" data-bs-target="#deleteUserModal" data-bs-toggle="modal" ' +
                    'onclick="getDeleteModal(' + user.id + ')">' + 'Delete' +
                    '</button>' +
                    '</td>'
                out += '</tr>'
            }

            placeholder.innerHTML = out
        })
}


function getEditModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(userEdit => {
                document.getElementById('edit_id').value = userEdit.id
                document.getElementById('edit_name').value = userEdit.name
                document.getElementById('edit_surname').value = userEdit.surname
                document.getElementById('edit_age').value = userEdit.age
                document.getElementById('edit_username').value = userEdit.username
                document.getElementById('edit_password').value = userEdit.password
                document.getElementById('edit_role').value = userEdit.roles

                const select = document.querySelector('#edit_role').getElementsByTagName('option')

                for (let i = 0; i < select.length; i++) {
                    if (select[i].value === userEdit.roles[i].roleName) {
                        select[i].selected = true;
                        if (i === select.length - 1) {
                            break;
                        }
                    } else if (select[i + 1].value === userEdit.roles[i].roleName) {
                        select[i + 1].selected = true;
                    }
                }
            })
    })
}

function editUser() {
    event.preventDefault()
    let id = document.getElementById('edit_id').value
    let name = document.getElementById('edit_name').value
    let surname = document.getElementById('edit_surname').value
    let age = document.getElementById('edit_age').value
    let username = document.getElementById('edit_username').value
    let password = document.getElementById('edit_password').value
    let roles = $("#edit_role").val()

    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
            roles[i] = {
                'id': 2,
                'role': 'ROLE_ADMIN',
                "authority": "ROLE_ADMIN"
            }
        }
        if (roles[i] === 'ROLE_USER') {
            roles[i] = {
                'id': 1,
                'role': 'ROLE_USER',
                "authority": "ROLE_USER"
            }
        }
    }

    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'id': id,
            'name': name,
            'surname': surname,
            'age': age,
            'username': username,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            $('#editModal').modal('hide');
            getUsers();
        })
}

function getDeleteModal(id) {
    fetch(URL + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(userDelete => {
            document.getElementById('delete_id').value = userDelete.id
            document.getElementById('delete_name').value = userDelete.name
            document.getElementById('delete_surname').value = userDelete.surname
            document.getElementById('delete_age').value = userDelete.age
            document.getElementById('delete_email').value = userDelete.username
            document.getElementById('delete_password').value = userDelete.password
            document.getElementById('delete_role').value = userDelete.roles
        })
    })
}

function deleteUser() {
    event.preventDefault()
    let id = document.getElementById('delete_id').value

    fetch(URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },

    })
        .then(() => {
            $('#deleteModal').modal('hide')
            getUsers()
        })
}

function addUser() {
    event.preventDefault()
    let name = document.getElementById('create_name').value
    let surname = document.getElementById('create_surname').value
    let age = document.getElementById('create_age').value
    let username = document.getElementById('create_username').value
    let password = document.getElementById('create_password').value
    let roles = $("#create_role").val()


    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'name': name,
            'surname': surname,
            'age': age,
            'username': username,
            'password': password,
            'roles': roles
        })
    })
        .then(() => {
            document.getElementById('users_table-tab').click()
            getUsers()
            document.newUserForm.reset()
        })

}





