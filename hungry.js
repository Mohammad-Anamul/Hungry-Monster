let searchFoodByName = () => {
  const searchedFoodName = document.getElementById("inputSearch").value;
  const foodItemDiv = document.getElementById("meals");
  foodItemDiv.innerHTML = "";
  loading("block");

  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedFoodName}`
  )
    .then((res) => res.json())
    .then((data) => mealData(data.meals));
};

const mealData = (food) => {
  loading("none");

  if (food == null) {
    showNotFoundAlert();
    return;
  }

  food.forEach((item) => {
    UI(item);
  });
};

const showNotFoundAlert = () => {
  const alert = document.getElementById("notFoundAlert");
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
  }, 2400);
};

const UI = (foodItem) => {
  const mealItem = document.createElement("div");
  mealItem.className = "meal-item m-3";
  mealItem.onclick = () => {
    Ingredients(foodItem);
  };
  mealItem.setAttribute("data-target", "#showIngredients");
  mealItem.setAttribute("data-toggle", "modal");

  const Thumbnail = document.createElement("img");
  Thumbnail.src = foodItem.strMealThumb;

  const mealName = document.createElement("p");
  mealName.innerText = foodItem.strMeal;

  mealItem.appendChild(Thumbnail);
  mealItem.appendChild(mealName);

  const foodItemDiv = document.getElementById("meals");
  foodItemDiv.appendChild(mealItem);
};

const Ingredients = (foodItem) => {
  let ingredientData = [];
  for (let i = 1; i < 20; i++) {
    let ingredient = "strIngredient" + i;
    let strMeasure = "strMeasure" + i;

    if (foodItem[ingredient] == "" || foodItem[ingredient] == " ") {
      continue;
    }
    ingredientData.push(foodItem[strMeasure] + " " + foodItem[ingredient]);
  }

  const showIngredientsImage = document.getElementById("showIngredientsImage");
  showIngredientsImage.src = foodItem.strMealThumb;

  document.getElementById("dialogMealName").innerText = foodItem.strMeal;

  ingredientData.forEach((ingredientItem) => {
    const ingredientList = document.getElementById("ingredientList");
    const li = document.createElement("li");
    li.innerText = ingredientItem;
    ingredientList.append(li);
  });
};

const loading = (display) => {
  const loading = document.getElementById("loading");
  loading.style.display = display;
};

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", searchFoodByName);
searchFoodByName();
