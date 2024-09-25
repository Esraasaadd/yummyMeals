///<reference types="../@types/jquery"/>;
$(document).ready(function () {
  // Hide nav-taps initially
  $(".nav-taps").css({
    width: "0",
    visibility: "hidden",
  });

  function closeNavTaps() {
    // Closing nav-taps
    $(".nav-taps").animate({ width: "0" }, 500, function () {
      $(".nav-taps").css("visibility", "hidden");
    });
    $("#menu").attr(
      "class",
      "fa-solid open-close-icon fa-align-justify fa-2x"
    );
    $(".nav-taps ul").removeClass("animate__animated animate__bounceInUp");
    $(".nav-taps ul").addClass("animate__animated animate__backOutDown");
  }

  $("#menu").on("click", function () {
    if ($(".nav-taps").css("width") === "0px") {
      // Opening nav-taps
      $(".nav-taps")
        .css("visibility", "visible")
        .animate({ width: "250px" }, 500);
      $("#menu").attr("class", "fa-solid open-close-icon fa-x fa-2x");
      $(".nav-taps ul").removeClass("animate__animated animate__backOutDown");
      $(".nav-taps ul").addClass("animate__animated animate__bounceInUp");
    } else {
      closeNavTaps();
    }
  });

  // Add event listener for li clicks
  $(".nav-taps ul li").on("click", function () {
    closeNavTaps();
  });
});

const myRow = document.getElementById("myRow");
const imageDetails = document.getElementById("imageDetails");
const home = document.getElementById("home");
const searchSection = document.getElementById("search-section");
const detailsSection=document.getElementById("details-section")
const contactUs=document.getElementById("contactUs-section")
const byName=document.getElementById("byName")
const byLetter=document.getElementById("byLetter")
const loader=document.getElementById("loader")
// Get all meals from API
async function getAllMeals() {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const data = await resp.json();
  return data;
}
// Search meal by name
async function searchByName(firstName) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${firstName}`
  );
  const data = await resp.json();
  return data
}
// Search meal by letter
async function searchByLetter(letter) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  const data = await resp.json();
  return data
}
// Get meal by its ID
async function getMealDetails(id) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const detailsData = await resp.json();
  return detailsData;
}
// Get Alll categories
async function getCategories() {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const categoriesData = await resp.json();
  return categoriesData;
}
//Get Meal By Category
async function getMealsByCategory(category) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const meals = await resp.json();
  return meals
}
// Get Areas
async function getAreas() {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await resp.json();
    return data;
  }
  
// Get meals by area
async function getMealsByArea(area) {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await resp.json();
    return data
  }
// Get ingredients
async function getIngredients() {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const data = await resp.json();
    return data;
  }

//Get Meal By ingredients 
async function getIngredientMeals(ingredient) {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await resp.json();
    return data;
  }

async function displayAllMeals() {
  const data = await getAllMeals();
  const meals = data.meals;
  let container = "";
  for (let i = 0; i < meals.length; i++) {
    container += `<div class="myMeal col-md-3" id="${meals[i].idMeal}">
            <div class="item position-relative overflow-hidden">
                <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-2">
                <div class="layer d-flex align-items-center rounded-2 p-2">
                    <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
  }
  myRow.innerHTML = container;
  displayMealsDetails();
  hideLoader()
}
displayAllMeals();

//search section appear
document.getElementById("search").addEventListener("click",function(){
  home.classList.add("d-none")
  detailsSection.classList.add("d-none")
  contactUs.classList.add("d-none")
  searchSection.classList.remove("d-none")
  
})
//function to search with meal name 
async function searchName(){
  showLoader()
  let x=await searchByName(byName.value)
  let data=x.meals
  let container='';
  for (let i = 0; i < data.length; i++) {
      container+=`<div class="myMeal col-md-3" id="${data[i].idMeal}">
                      <div class="item position-relative overflow-hidden">
                          <img src="${data[i].strMealThumb}" alt=""  class="w-100  rounded-2">
                          <div class="layer d-flex align-items-center rounded-2 p-2">
                              <h3>${data[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>`
  }
  document.getElementById("searchRow").innerHTML=container
  displayMealsDetails();
  hideLoader()
}
//function to search with the first name of the meals  
async function searchLetter(){
  showLoader()
  let x=await searchByLetter(byLetter.value)
  let data=x.meals
  let container='';
  for (let i = 0; i < data.length; i++) {
      container+=`<div class="myMeal col-md-3" id="${data[i].idMeal}>
                      <div class="item position-relative overflow-hidden">
                          <img src="${data[i].strMealThumb}" alt=""  class="w-100  rounded-2">
                          <div class="layer d-flex align-items-center rounded-2 p-2">
                              <h3>${data[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>`
  }
  document.getElementById("searchRow").innerHTML=container
  displayMealsDetails();
  hideLoader()
}
async function displayMealsDetails() {
  const myMeal = document.querySelectorAll(".myMeal");
  for (let i = 0; i < myMeal.length; i++) {
    myMeal[i].addEventListener("click", async function () {
      let details = await getMealDetails(myMeal[i].id);
      home.classList.add("d-none");
      detailsSection.classList.remove("d-none");
      imageDetails.setAttribute("src", details.meals[0].strMealThumb);
      document.querySelector(".mealName").innerHTML=details.meals[0].strMeal
      document.querySelector("#details-section p").innerHTML =details.meals[0].strInstructions;
      document.querySelector(".area").innerHTML = details.meals[0].strArea;
      document.querySelector(".Category").innerHTML =details.meals[0].strCategory;
        //clear
        document.querySelector("#details-section ul").innerHTML = "";
      // Iterate over ingredients and measures
      for (let j = 1; j <= 20; j++) {
        const ingredient = details.meals[0][`strIngredient${j}`];
        const measure = details.meals[0][`strMeasure${j}`];
        if (ingredient !== "") {
          const listItem = document.createElement("li");
          listItem.classList.add("alert", "alert-info", "m-2", "p-1");
          listItem.innerHTML = `${measure} ${ingredient}`;
          document.querySelector("#details-section ul").appendChild(listItem);
        }
      }
      document.getElementById("youtube").setAttribute("href", details.meals[0].strYoutube);
      if(details.meals[0].strSource){
        $("#source").remove()
      }
      else{
        document.getElementById("source").setAttribute("href", details.meals[0].strSource);
      }
    });
  }
}

document.getElementById("categories").addEventListener("click", async function () {
    detailsSection.classList.add("d-none")
    contactUs.classList.add("d-none")
    searchSection.classList.add("d-none")  
    home.classList.remove("d-none")
    showLoader()
    let data = await getCategories();
    let categoriesData = data.categories;
    let container = "";
    for (let i = 0; i < categoriesData.length; i++) {
      container += `<div class="col-md-3 myCategory" id="${categoriesData[i].strCategory}">
<div class="item position-relative overflow-hidden">
    <img src=${categoriesData[i].strCategoryThumb} alt=""  class="w-100  rounded-2">
    <div class="layer rounded-2 p-2 text-center">
        <h3>${categoriesData[i].strCategory}</h3>
        <p>${categoriesData[i].strCategoryDescription}</p>
    </div>
</div>
</div>`;
    }
    myRow.innerHTML = container;
    displayMealsCategory();
    hideLoader()
    });

function displayMealsCategory() {
  let myCtegory = document.querySelectorAll(".myCategory");
  for (let i = 0; i < myCtegory.length; i++) {
    myCtegory[i].addEventListener("click",async function(){
        let data=await getMealsByCategory(myCtegory[i].id)
        let meals=data.meals
        let container = "";
        for (let i = 0; i < meals.length; i++) {
          container += `<div class="myMeal col-md-3" id="${meals[i].idMeal}">
                  <div class="item position-relative overflow-hidden">
                      <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-2">
                      <div class="layer d-flex align-items-center rounded-2 p-2">
                          <h3>${meals[i].strMeal}</h3>
                      </div>
                  </div>
              </div>`;
        }
        myRow.innerHTML = container;
        home.classList.remove("d-none")
        displayMealsDetails();
    })
  }
}


document.getElementById("area").addEventListener("click",async function(){
        detailsSection.classList.add("d-none")
        contactUs.classList.add("d-none")
        searchSection.classList.add("d-none")      
        home.classList.remove("d-none")
        showLoader()
        let data=await getAreas()
        let areas =data.meals
        let container="";
        for (let i = 0; i < areas.length; i++) {
            container+=`<div class="col-md-3 areaBox text-center" id="${areas[i].strArea}">
            <div><i class="fa-solid fa-house-laptop fa-4x text-danger mb-3"></i></div>
            <h3>${areas[i].strArea}</h3>
    </div>`
        }
        myRow.innerHTML=container
        displayAreaMeals()
        hideLoader()
    })

function displayAreaMeals(){
    const areas=document.querySelectorAll(".areaBox")
    for (let i = 0; i < areas.length; i++) {
        areas[i].addEventListener("click",async function(){
            const data=await getMealsByArea(areas[i].id)
            const mealsArea=data.meals
            let container = "";
            for (let i = 0; i < mealsArea.length; i++) {
              container += `<div class="myMeal col-md-3" id="${mealsArea[i].idMeal}">
                      <div class="item position-relative overflow-hidden">
                          <img src="${mealsArea[i].strMealThumb}" alt="" class="w-100 rounded-2">
                          <div class="layer d-flex align-items-center rounded-2 p-2">
                              <h3>${mealsArea[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>`;
            }
            myRow.innerHTML = container;
            home.classList.remove("d-none")
            displayMealsDetails()
        })
    }
}

document.getElementById("ingredients").addEventListener("click",async function(){
    detailsSection.classList.add("d-none")
    contactUs.classList.add("d-none")
    searchSection.classList.add("d-none")  
    home.classList.remove("d-none")
   showLoader()
    const data=await getIngredients()
    const ingredients=data.meals
    let container=''
    for (let i = 0; i <25; i++) {
        container+=`<div class="col-md-3 myIngredient text-center" id="${ingredients[i].strIngredient}">
                                <div><i class="fa-solid fa-drumstick-bite fa-4x text-danger"></i></div>
                                <h3>${ingredients[i].strIngredient}</h3>
                                <p>${ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>`
    }
    myRow.innerHTML=container
    displayIngrediesntMeals()
    hideLoader()
})


function displayIngrediesntMeals(){
    const myIngredient=document.querySelectorAll(".myIngredient")
    for (let i = 0; i < myIngredient.length; i++) {
        myIngredient[i].addEventListener("click",async function(){
            home.classList.remove("d-none")
            const data=await getIngredientMeals(myIngredient[i].id)           
            const ingredientMeals=data.meals
            container="";
            for (let i = 0; i < ingredientMeals.length; i++) {
                container+=`<div class="myMeal col-md-3" id="${ingredientMeals[i].idMeal}">
                      <div class="item position-relative overflow-hidden">
                          <img src="${ingredientMeals[i].strMealThumb}" alt="" class="w-100 rounded-2">
                          <div class="layer d-flex align-items-center rounded-2 p-2">
                              <h3>${ingredientMeals[i].strMeal}</h3>
                          </div>
                      </div>
                  </div>`
            }
            myRow.innerHTML = container;
            displayMealsDetails()
        })
    }
}

let yourNameInvalid=true
let phoneInvalid=true
let passwordInvalid=true
let emailInvalid=true
let ageInvalid=true
let repasswordInvalid=true

    // Fetch input values
    const yourName = document.getElementById('yourName');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const repassword = document.getElementById('repassword');

function validation() {
  var regex = {
    yourName: /^[A-Za-z]{3,}$/,
    phone: /^(010|011|012|015)\d{8}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    email: /^[A-Za-z]{3,}@(gmail|yahoo)\.com$/i,
    age: /^\d{1,2}$/
  };

  // Perform validation checks
  if (regex.yourName.test(yourName.value) &&
    regex.phone.test(phone.value) &&
    regex.password.test(password.value) &&
    regex.email.test(email.value) &&
    regex.age.test(age.value) &&
    (password.value) == (repassword.value)) {
      
    document.getElementById("submition").classList.remove("disabled");
  }
  else{
    document.getElementById("submition").classList.add("disabled");
  }


  // Check each input field and set validation state
  yourNameInvalid = !regex.yourName.test(yourName.value);
  phoneInvalid = !regex.phone.test(phone.value);
  passwordInvalid = !regex.password.test(password.value);
  emailInvalid = !regex.email.test(email.value);
  ageInvalid = !regex.age.test(age.value);
  repasswordInvalid = password.value !== repassword.value;

  // Show or hide alert divs based on validation state
  showAlertDivs();
}

function showAlertDivs() {
  if(!yourName.value){yourNameInvalid=false}
  if(!phone.value){phoneInvalid=false}
  if(!password.value){passwordInvalid=false}
  if(!email.value){emailInvalid=false}
  if(!age.value){ageInvalid=false}
  if(!repassword.value){repasswordInvalid=false}
  
  clearAlerts();
  if (yourNameInvalid) { addAlert('yourName', "Special characters and numbers are not allowed"); }
  if (phoneInvalid) { addAlert('phone', "Enter valid Phone Number"); }
  if (passwordInvalid) { addAlert('password', "Enter valid password *Minimum eight characters, at least one letter and one number"); }
  if (emailInvalid) { addAlert('email', "Email not valid *exemple@yyy.zzz"); }
  if (ageInvalid) { addAlert('age', "Enter valid age"); }
  if (repasswordInvalid) { addAlert('repassword', "Passwords do not match"); }
}

function clearAlerts() {
  document.querySelectorAll('.alert').forEach(alert => alert.remove());
}

function addAlert(inputId, divContent) {
  var inputElement = document.getElementById(inputId);
  var existingAlert = inputElement.nextElementSibling;

  // Check if the next sibling is an alert div
  if (existingAlert && existingAlert.classList.contains('alert')) {
    existingAlert.innerHTML = divContent; // Update the content if it already exists
  } else {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = divContent;
    newDiv.classList.add('alert', 'alert-danger', 'w-100', 'd-block');
    inputElement.parentNode.insertBefore(newDiv, inputElement.nextSibling);
  }
}

document.getElementById("contactUs").addEventListener("click", function() {
  home.classList.add("d-none");
  searchSection.classList.add("d-none");
  detailsSection.classList.add("d-none");
  contactUs.classList.remove("d-none");
  clearAlerts(); // Clear existing alerts
  validation(); // Perform validation and show alerts if necessary
});
////////LOADER////
//function show loader
function showLoader(){
  loader.classList.remove("d-none")
}
//function hide loader
function hideLoader(){
  loader.classList.add("d-none")
}
//close
document.querySelector(".close").addEventListener("click",function(){
  detailsSection.classList.add("d-none")
  home.classList.remove("d-none")
})