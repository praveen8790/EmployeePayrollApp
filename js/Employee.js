window.addEventListener('DOMContentLoaded',(event) => {

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output'); 
    console.log(salary.value);
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });

    const text = document.querySelector('#name');
    const textError = document.querySelector('.text-error'); 
    text.addEventListener('input', function() {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(text.value))
            textError.textContent = "";
        else 
            textError.textContent = "Name is Incorrect";
            });
});
function getByID(id){
    return document.querySelector(id).value;
}

var datepickerDefault = new MtrDatepicker({target: "date",timepicker:0});

function submitted(){
    let empdata = new EmployeeData();
    empdata.name = getByID('#name');
    empdata.profilePic = getByID('input[name="profile"]:checked');
    empdata.gender = getByID('input[name="gender"]:checked');
    // empdata.startDate = getByID('#joindate');
    var date = datepickerDefault.toLocaleDateString();
    empdata.startDate = date.split("/").reverse().join("-");
    empdata.salary = getByID('#salary');
    var arr = [];
    for(var c of document.querySelectorAll('input[name="dept"]:checked').values() ){
        arr.push(c.value);
    }
    empdata.department = arr;
    // alert(getByID('#name'));
    // alert(getByID('input[name="profile"]:checked'));
    alert(empdata.toString());
}

const save = () =>{
    try{
        let employeePayrollData = submitted();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e){
        return;
    }
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setValue('#name','');
    setValue('#salary','');
    setValue('#notes','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
}

const setValue = (id, value) =>{
    document.querySelector(id).value = value;
}

const unsetSelectedValues = (propertyValue) =>{
    document.querySelectorAll(propertyValue).forEach(item => {
        item.checked = false;
    });
}
