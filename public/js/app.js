
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraph1= document.querySelector('.paragraph1')
const paragraph2= document.querySelector('.paragraph2')



weatherForm.addEventListener('submit', (e) => {
     e.preventDefault()

     const location = search.value;
     
fetch('/weather?address='+location).then((response,error)=>{
    response.json().then((data) => {
        if(data.error){
        paragraph1.innerText = "";
        paragraph2.innerText = data.error;
        
    }else{
        paragraph1.innerText = data.location;
        paragraph2.innerText = data.getWeather;
     }
   })
 })
    
})