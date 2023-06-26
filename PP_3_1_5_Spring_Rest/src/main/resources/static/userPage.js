const url = 'http://localhost:8080/api/user/showUser'
const data = document.getElementById("user-info-table")
const navbar = document.getElementById("navbar")

function getUserInfo() {
    fetch(url).then(response => response.json())
        .then(u => {
            let temp = ''
            temp += '<tr>'
            temp += '<td>' + u.id + '</td>'
            temp += '<td>' + u.name + '</td>'
            temp += '<td>' + u.surname + '</td>'
            temp += '<td>' + u.age + '</td>'
            temp += '<td>' + u.username + '</td>'
            temp += '<td>' + u.roles.map(role => role.roleName.substring(5)) + '</td>'
            data.innerHTML = temp
            navbar.innerHTML = `<h4>${u.username} with roles: ${u.roles.map(role => " " + role.roleName.substring(5))}</h4>`
        })
}
getUserInfo()




