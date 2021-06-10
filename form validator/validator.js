const form =document.getElementById('form')
const username=document.getElementById('username')
const email =document.getElementById('email')
const password=document.getElementById('password')
const password2 = document.getElementById('password2')

// show input error messages
function showError(input,message) {
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small =formControl.querySelector('small');
    small.innerText=message;
}

//show success outline
function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success'
}

//chheck email is valid
function checkEmail(input) {
    const mail=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (mail.test(input.value.trim())){
        showSuccess(input)
    }
    else{
        showError(input,'Email is not valid')
    }
}

// check required feilds
function checkRequired(inputArr){
    let isRequired=false;
    inputArr.forEach(function(input){
        if(input.value.trim()==''){
            showError(input,`${getFieldName(input)} is required`);
            isRequired=true;
        }
        else{
            showSuccess(input);
        }
    });
    return isRequired;
}


//check input length
function checkLength(input,min,max) {
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be atleast ${min} characters`);
    }
    else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}

// check passwords match
function checkPasswordMatch(input1,input2) {
    if(input1.value !== input2.value){
        showError(input2,'Passwords do not match');
    }
}

//get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

// event listeners
form.addEventListener('submit', function(exe) {
    exe.preventDefault();

    if(!checkRequired([username,email,password,password2])){
        checkLength(username,3,16);
        checkEmail(email);
        checkLength(password,6,15);
        checkPasswordMatch(password,password2);
    }
    
});



