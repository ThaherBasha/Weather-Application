document.getElementById("weather").addEventListener("click",()=>{
    let city=document.getElementById("city").value
    if(city){
        fetchdata(city)

    }
    else{
        alert("please enter a city");
    }
})
async function fetchdata(city){
    let apikey="a161ee4c29dc07b67f65be75851fbb53";
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
         // Generally fetch is asynchronous so it doesn't wait for instruction and it executes another lines or multiple lines at a time this gives incorrect details or some error of our project so we need to convert asynchronous to a synchronous way 
                                       // so that we can't get any issues so we use await key word before the fetch method to convert the code  as  a synchronous .
                                       // await keyword only works if it has async function only so we make this function as a async 
 try{
    let response=await fetch(url) 
    if(!response.ok){   //it will executes only if the city name is wrong in api
        throw new Error("city not found")
    }
   let  data= await response.json(); //here also we must place an await otherwise we got a promise object even though the code is correct due to asnchronous nature of json () method
   display(data)

 }
 catch(error){
    //console.log(error.message)
    let a=document.getElementById("result");
    a.style.color="red";
    a.innerHTML=error.message;

 }


}
//here everything is entered correct in api key and city name then we got ok:true in response object otherwise it gives false.
function display(data){
    // console.log(data)
    const {main,name,weather,wind}=data;
    let b=document.getElementById("result");
    b.innerHTML=`
    <h1>${name}</h1>
    <p>temperature: ${main.temp}<sup>o</sup>C</p>
    <p>humidity: ${main.humidity}g/m<sup>3</sup></p>
    <p>cloud: ${weather[0].description}</p>
    <p> wind: ${wind.speed}km/h</p>`
    


}