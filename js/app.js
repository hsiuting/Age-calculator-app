const inputDay = document.querySelector('#day')
const inputMonth = document.querySelector('#month')
const inputYear = document.querySelector('#year')
const btn = document.querySelector('#button')
const inputs = Array.from(document.querySelectorAll('input'))
const errors = Array.from(document.querySelectorAll('.error'))
const resultYear = document.querySelector('.result-years')
const resultMonth = document.querySelector('.result-months')
const resultDays = document.querySelector('.result-days')

//reset error style
for (let i = 0 ; i < inputs.length ; i++){
    inputs[i].addEventListener('change' , () => {
        inputs[i].style.border = '';
        errors[i].style.opacity = '0';
    })
}

//get today
const date = new Date();
const currentYear = date.getFullYear()
const today = date.getDate()
const currentMonth = date.getMonth() + 1

//check input info

let validate = false;
function checkInput(){
    if(inputDay.value == '' || inputMonth.value == '' || inputYear.value == ''){
        validate = false;
    }else if ((inputMonth.value == 1,3,5,7,8,10,12 && inputDay.value >= 32) || (inputMonth.value == 4,6,9,11 && inputDay.value >= 31) || (inputMonth.value == 2 && inputDay.value > 29)){
            validate = false;
        }else{
            validate = true;
        }

    if (inputYear.value > currentYear){
            errors[0].textContent = 'Must be a valid date'
            errors[0].style.opacity = '100'
            resultYear.textContent ='--'
            resultMonth.textContent ='--'
            resultDays.textContent ='--'
            validate = false;
        }

    for (let i=0 ; i < inputs.length ; i++){
        if(!inputs[i].value > 0 || inputs[i].value == ''){
            errors[i].style.opacity = '100'
            inputs[i].style.border = 'red 1px solid'
            resultYear.textContent ='--'
            resultMonth.textContent ='--'
            resultDays.textContent ='--'
        }
    }
}
    


//click event
btn.addEventListener('click' , (e) => {
    e.preventDefault();
    checkInput()
    
    if(validate){
        //calculate
        let Y = currentYear - inputYear.value
        let M = currentMonth - inputMonth.value
        let D = today - inputDay.value
        if( M < 0){
            Y = Y - 1
            M = M + 12
        }
        if(D < 0){
            if( inputMonth.value == 1,3,5,7,8,10,12 ){
                D = 31 - inputDay.value + today
            }else if ( inputMonth.value == 4,6,9,11 ){
                D = 30 - inputDay.value + today
            }else {
                D = 28 - inputDay.value + today
            }
        }
        if(Y < 0 ){
            resultYear.textContent ='--'
            resultMonth.textContent ='--'
            resultDays.textContent ='--'
            errors[0].style.opacity = '100'
            errors[0].textContent = 'Must be a valid date'
        }
        else{
            resultYear.textContent = Y
            resultMonth.textContent = M
            resultDays.textContent = D
            errors[0].style.opacity = '0'
            errors[0].textContent = ''

            //add aimation
        function aniNumber( baseNumber , finalNumber , outputNumber){
            let step = (finalNumber - baseNumber) / 30
            let count = baseNumber
            let initial = 0
            let timer = setInterval(()=>{
            count += step
            if( count >= finalNumber ){
                clearInterval(timer)
                count = finalNumber
            }
            outputNumber.textContent = count.toFixed(0);
            },20)
            }

            aniNumber(0 , D , resultDays)
            aniNumber(0 , M , resultMonth)
            aniNumber(0 , Y , resultYear)

                }
            }else{
                //wrong input date
                errors[0].textContent = 'Must be a valid date'
                errors[0].style.opacity = '100'
                resultYear.textContent ='--'
                resultMonth.textContent ='--'
                resultDays.textContent ='--'
            }
})
