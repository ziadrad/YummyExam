
let data = document.getElementById('data')
closeSideNav()
let recipe = "";
let tags = "";
$(document).ready(() => {

let navWidth=  $(".white_nav").outerWidth();
document.getElementById('content').style.padding = `0px 0 0 ${navWidth}px`;


searchByName("").then(()=>{
    $(".loading_screen").fadeOut(500)
    $(".content").fadeIn(500)
    $("body").css("overflow", "visible")

})
})

async function searchByName(term) {
    data.innerHTML = ""

    $(".loading_screen").fadeIn(0)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    if (response.meals) {
      displayMeals(response.meals)
    }else{
      displayMeals([])
    }
    $(".loading_screen").fadeOut(700)

}
async function searchByFirstLetter(char) {
  data.innerHTML = ""
  $(".loading_screen").fadeIn(0)
if (char != "") {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
  response = await response.json()
  if (response.meals) {
    displayMeals(response.meals)
  }else{
    displayMeals([])
  }
  $(".loading_screen").fadeOut(700)
}else{
  document.getElementById('data').innerHTML="";
$(".loading_screen").fadeOut(700)
}
  document.getElementById("inputs").classList.replace("z-0",'z-2')
  document.getElementById("nav").classList.replace("z-1",'z-3')
}

function displayMeals(arr_list){
    var temp = ""
    for (let i = 0; i < arr_list.length; i++) {
        temp+=`  <div class="col-md-3 px-2  col-sm-6 position-relative food-img " onclick="getMealDetail(${arr_list[i].idMeal})">
      <img src="`+arr_list[i].strMealThumb+`" class="w-100" alt="">
      <div class="overlayer position-absolute  d-flex flex-column justify-content-center align-content-end  "> 
        <h2 class=" text-black mx-2"> `+arr_list[i].strMeal+`</h2>
      </div>  

  </div> `
        
    }
    document.getElementById('data').innerHTML=temp;
}


function openSideNav() {
  document.getElementById("inputs").classList.replace("z-3",'z-2')
  $(".side-nav").animate({
      left: 0
  }, 750)
  $(".navbar-toggler").removeClass("fa-bars");
  $(".navbar-toggler").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
      $(".black_nav .links li").eq(i).animate({
          top: "0"
      }, 900)
  }
}
$(".navbar-toggler").click(function(){
  if ($(".side-nav").css("left") == "0px") {
    closeSideNav()
} else {
    openSideNav()
}
})

function closeSideNav() {
  let tabWidth = $(".black_nav").outerWidth()
  $(".side-nav").animate({
      left: -tabWidth
  }, 500)
  $(".navbar-toggler").addClass("fa-bars");
  $(".navbar-toggler").removeClass("fa-x");
  $(".black_nav .links li").animate({
      top: 1000
  }, 750)

  setTimeout(()=>{
    document.getElementById("inputs").classList.replace("z-2",'z-3')
  },1000)
  

}



function displayMealsDetail(meal){
  
    getRecipe(meal)
getTags(meal)
    var temp = ""

        temp+=`  <div class="meal_img_name text-white col-lg-4 col-12 align-self-start">
    <img src="${meal.strMealThumb}" class="w-100" alt="">
    <h2>`+meal.strMeal+`</h2>
   </div>
   <div class="meal_data  d-flex flex-column col-lg-8 col-12 align-self-start text-white ">
        <h2>Instructions</h2>
        <p>`+meal.strInstructions+`</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex  flex-wrap">
           ${recipe}
        </ul>
  
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex flex-wrap">
        ${tags}
        </ul>
  <div class="btns">
    <a target="_blank" href="${meal.strSource != undefined ? meal.strSource : "#"}" class="btn btn-success">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
  </div>
   
    </div> `
        
    document.getElementById('data').innerHTML=temp;
    $("#inputs").addClass("py-3")
    $("#inputs").removeClass("py-5")
    document.getElementById('inputs').innerHTML="";

    
}

  function getRecipe(meal){
  for (let i = 1; i <= 20; i++) {

    if(meal[`strIngredient${i}`]){
   recipe +=`<li class="alert alert-info m-1 p-1">`+meal[`strMeasure${i}`]+meal[`strIngredient${i}`] +`</li>`
    }
  }
  }
function getTags(meal){

    
 
    if(meal[`strTags`]){
      var tagList = meal.strTags.split(",")
    for (let i = 0; i < tagList.length; i++) {
if (tagList[i]) {
  tags +=`<li class="alert alert-danger m-1 p-1">${tagList[i]}</li>`
}
       

        }
      }
      }


  async function getMealDetail (mealId){
    $(".loading_screen").fadeIn(0)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    response = await response.json();
    if (response.meals) {
      displayMealsDetail(response.meals[0]);
    }else{
      displayMealsDetail([]);
    }
    $(".loading_screen").fadeOut(300)
  }

 function getSearchItems(){

  document.getElementById("nav").classList.replace("z-2",'z-3')
var temp =`
        <div class="col-md-5 ">
            <input onkeyup="searchByName(this.value)" class="form-control search bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-5">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control search bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    `
    document.getElementById('inputs').innerHTML=temp;
    $("#inputs").addClass("py-5")
    document.getElementById('data').innerHTML="";

closeSideNav()
 }

 

 function displayCategory(arr_list){
  document.getElementById('inputs').innerHTML="";
  var temp = ""
  for (let i = 0; i < arr_list.length; i++) {
      temp+=`  <div class="col-md-3 px-2 col-sm-6 position-relative food-img " onclick= getMealByCategory("${arr_list[i].strCategory
        }")>
    <img src="`+arr_list[i].strCategoryThumb+`" class="w-100" alt="">
    <div class="overlayer position-absolute text-center d-flex flex-column justify-content-center align-content-center  "> 
      <h2 class=" text-black mx-2"> `+arr_list[i].strCategory+`</h2>
      <p class="text-black mx-2"> ${arr_list[i].strCategoryDescription?.split(" ").slice(0,20).join(" ")} </p>
    </div>  

</div> `
  }
  
  document.getElementById('data').innerHTML=temp;
  $("#inputs").removeClass("py-5")
 }


 async function getMealByCategory(Category) {
 let strCategory = String(Category)
  $(".loading_screen").fadeIn(0)
  let respond = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
  respond = await respond.json();
  if (respond.meals) {
    displayMeals(respond.meals);
  }else{
    displayMeals([]);
  }
  $(".loading_screen").fadeOut(300)
 }

 async function getCategory(){
  closeSideNav();
  $(".loading_screen").fadeIn(0)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json();
  if (response.categories) {
    displayCategory(response.categories);
  }else{
    displayCategory([]);
  }
  $(".loading_screen").fadeOut(700)
 }

 async function getAreas() {

  closeSideNav();
  $(".loading_screen").fadeIn(0)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json();
  if (response.meals) {
    displayArea(response.meals);
  }else{
    displayArea([]);
  }
  $(".loading_screen").fadeOut(700)

 }


 function displayArea(arr_list){
  document.getElementById('inputs').innerHTML="";
  var temp = ""
  for (let i = 0; i < arr_list.length; i++) {
      temp+=`  <div class="col-md-3 text-white text-center px-2 py-3 col-sm-6 position-relative d-flex flex-column justify-content-center align-items-center " onclick= displayMealsByArea("${arr_list[i].strArea}")>
    <i class="fa-solid fa-house w-100"></i>
      <h2 class=" mx-2"> `+arr_list[i].strArea+`</h2>
</div> `

   
  }
  document.getElementById('data').innerHTML=temp;
  $("#inputs").removeClass("py-5")
 }



async function displayMealsByArea(Area){

  $(".loading_screen").fadeIn(0)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
  response = await response.json();
  if (response.meals) {
    displayMeals(response.meals);
  }else{
    displayMeals([]);
  }
  $(".loading_screen").fadeOut(700)

 }



 function displayIngredients(arr_list){
  document.getElementById('inputs').innerHTML="";
  var temp = ""
  for (let i = 0; i < 20; i++) {
      temp+=`  <div class="col-md-3 text-white text-center px-2 py-3 col-sm-6 position-relative d-flex flex-column justify-content-center align-items-center " onclick= getMealByIngredient("${arr_list[i].strIngredient}")>
    <i class="fa-solid fa-drumstick-bite w-100"></i>
      <h2 class=" mx-2"> `+arr_list[i].strIngredient+`</h2>
            <p class="text-center mx-2"> ${arr_list[i].strDescription?.split(" ").slice(0,20).join(" ")} </p>

</div> `
  }
  document.getElementById('data').innerHTML=temp;
  $("#inputs").removeClass("py-5")
 }


 async function getIngredientsList(){
  closeSideNav();
  $(".loading_screen").fadeIn(0)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json();

  if (response.meals) {
    displayIngredients(response.meals);
  }else{
    displayIngredients([]);
  }
  $(".loading_screen").fadeOut(700)

 }

async function getMealByIngredient(strIngredient){
  $(".loading_screen").fadeIn(0)
  let respond = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
  respond = await respond.json();
  if (respond.meals) {
    displayMeals(respond.meals);
  }else{
    displayMeals([]);
  }
  $(".loading_screen").fadeOut(300)
 }



 async function displayContacts(){
  document.getElementById('inputs').innerHTML="";
  document.getElementById('data').innerHTML=temp;
  closeSideNav();
var temp =  ` <div class="contact vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <form class="row g-4" id="form">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValid()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters , numbers not allowed and cannot be null
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValid()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValid()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValid()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" onkeyup="inputsValid()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" onkeyup="inputsValid()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        password enterd dosen't match
                    </div>
                </div>
            </form>
            <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`

   document.getElementById('data').innerHTML= temp;

   document.getElementById("nameInput").addEventListener("focus", function(){
    usernametouched = true;
  })
  document.getElementById("emailInput").addEventListener("focus", function(){
    emailtouched = true;
  })
  document.getElementById("phoneInput").addEventListener("focus", function(){
    phonetouched = true;
  })
  document.getElementById("ageInput").addEventListener("focus", function(){
    agetouched = true;
  })
  document.getElementById("passwordInput").addEventListener("focus", function(){
    passwordtouched = true;
  })
  document.getElementById("repasswordInput").addEventListener("focus", function(){
    repasswordtouched = true;
  })
   window.addEventListener("DOMContentLoaded", () =>{
    form[0].addEventListener("submit",e=>{
      e.preventDefault();
      
      inputsValid();
    })
  })
 }





function seterorr(erorid) {
let element= document.getElementById(erorid);
element.classList.replace("d-none","d-block");
}

function setSucess(erorid){
  let element= document.getElementById(erorid);
element.classList.replace("d-block","d-none");
}



let usernametouched = false;
let emailtouched = false;
let phonetouched = false;
let agetouched = false;
let passwordtouched = false;
let repasswordtouched = false;


 function inputsValid(){
  
  

const userNameValue =document.getElementById("nameInput").value
const EmailValue =document.getElementById("emailInput").value.trim();
const PhoneValue =document.getElementById("phoneInput").value;
const ageValue =document.getElementById("ageInput").value;
const passwordValue =document.getElementById("passwordInput").value;
const repasswordValue =document.getElementById("repasswordInput").value;

function userNameCheck(userNameValue) {
  var regx = /^[a-zA-Z ]+$/
  return regx.test(userNameValue)
}
function EmailCheck(EmailValue) {
  var regx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/
  return regx.test(EmailValue)
}
function PhoneCheck(PhoneValue) {
  var regx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
  return regx.test(PhoneValue)
}
function ageCheck(Age) {
  var regx = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
  return regx.test(Age)
}
function passwordCheck(password) {
  var regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regx.test(password)
}

if (!userNameCheck(userNameValue ) && usernametouched ) {
  seterorr("nameAlert");
}else{
  setSucess("nameAlert");
}
if (!EmailCheck(EmailValue) && emailtouched ) {
  seterorr("emailAlert");
}else{
  setSucess("emailAlert");
}
if (!PhoneCheck(PhoneValue)&& phonetouched ) {
  seterorr("phoneAlert");
}else{
  setSucess("phoneAlert");
}
if (!ageCheck(ageValue)&& agetouched ) {
  seterorr("ageAlert");
}else{
  setSucess("ageAlert");
}
if (!passwordCheck(passwordValue) && passwordtouched) {
  seterorr("passwordAlert");
}else{
  setSucess("passwordAlert");
}
if (passwordValue != repasswordValue && repasswordtouched ) {
  seterorr("repasswordAlert")
}else{
  setSucess("repasswordAlert")
}

if (userNameCheck(userNameValue )&&passwordCheck(passwordValue) && ageCheck(ageValue)&&PhoneCheck(PhoneValue)&&EmailCheck(EmailValue) && passwordValue == repasswordValue) {

document.getElementById("submitBtn").removeAttribute("disabled")
}else{
  document.getElementById("submitBtn").setAttribute("disabled","true")
}

 }