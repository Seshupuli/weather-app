console.log("script file is loaded");

const weatherform=document.querySelector("form");
const address=document.getElementById("address");
const res1=document.querySelector("#res-1");
const res2=document.querySelector("#res-2");

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault();
    res1.innerHTML="Loading...";
    res2.innerHTML="";
    //console.log(address.value);
    fetch("http://localhost:3000/weather?address="+encodeURIComponent(address.value)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            res1.innerHTML=data.error;
        }
        else{
            res1.innerHTML="Actual Temparature is: "+data.Actual_temparature;
            res2.innerHTML="Feels Like: "+data.Feels_Like;
        }
    })
});
})
