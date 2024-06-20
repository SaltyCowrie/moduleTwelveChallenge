const inquirer = require ('inquirer');
const sql = require ('mysql2')

const questions = {
    type: "list",
    name: "options",
    message: "Select an action",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Exit"],
};

const connection = sql.createConnection({
    host: "localhost", user: "root", password: "password", database: "employeeData"
})

connection.connect((err) => { if (err) {
    console.log("404")} else {
        console.log("Success")}
});

start()

function viewDepartments() {
    const query = "select id, name from department"
    connection.query(query,(err,res) => { 
        if (err) {
            console.log("404")} else {
                console.log(res)
                start()
            }
    })
}

function viewRoles() {
    const query = "select roles.id, roles.title, roles.salary from roles"
    connection.query(query,(err,res) => { 
        if (err) {
            console.log("404")} else {
                console.log(res)
                start()
            }
    })
}

function viewEmployees() {
    const query = "select employee.id, employee.first_name, employee.last_name from employee"
    connection.query(query,(err,res) => { 
        if (err) {
            console.log(err)} else {
                console.log(res)
                start()
            }
    })
}

function addDepartment() {
    inquirer.prompt({name: "departmentName",type: "input",messeage: "name of department"}).then((answer) => {
        const query = "insert into department(name) values(?)"
        connection.query(query, answer.departmentName,(err, res) => { if (err) {
            console.log(err)} else {
                console.log(res)
                start()
            }
        })
    })
};

function addRoles() {
    inquirer.prompt([{name: "title",type: "input",messeage: "name of roles"},{name: "salary", type: "input", message: "enter messeage"},{name: "departmentId",type: "input", messeage: "enter..."}]).then((answer) => {
        const query = "insert into roles(title,salary,departmentId) values(?,?,?)"
        connection.query(query,[answer.title, answer.salary, answer.departmentId],(err, res) => { if (err) {
            console.log(err)} else {
                console.log(res)
                start()
            }
        })
    })
};

function addEmployees() {
    inquirer.prompt([{name: "firstName",type: "input",messeage: "name of roles"},{name: "lastName", type: "input", message: "enter messeage"},{name: "roleId",type: "input", messeage: "enter..."},{name: "managerId",type: "input", messeage: "enter..."}]).then((answer) => {
        const query = "insert into employee(first_name,last_name,roleId,managerId) values(?,?,?,?)"
        connection.query(query,[answer.firstName, answer.lastName, answer.roleId, answer.managerId],(err, res) => { if (err) {
            console.log("404")} else {
                console.log(res)
                start()
            }
        })
    })
};

function updateEmployees() {
    inquirer.prompt([{name: "employeeId",type: "input",messeage: "name of roles"},{name: "roleId", type: "input", message: "enter messeage"}]).then((answer) => {
        const query = "update employee set roleId=(?) where id=(?)"
        connection.query(query,[answer.roleId, answer.employeeId],(err, res) => { if (err) {
            console.log("404")} else {
                console.log(res)
                start()
            }
        })
    })
};

function start() {inquirer.prompt(questions).then((answers) => {
    switch(answers.options) {
        case "view all departments":
            viewDepartments()
            break;
        case "view all roles":
            viewRoles()
            break;
        case "view all employees":
            viewEmployees()
            break;
        case "add a department":
            addDepartment()
            break;
        case "add a role": 
            addRoles()
            break;
        case "add an employee":
            addEmployees()
            break;
        case "update an employee role":
            updateEmployees()
            break;
        case "exit":
            connection.end()
            break;
        default:
            console.log(answers.options)
            break;
    }
});

}