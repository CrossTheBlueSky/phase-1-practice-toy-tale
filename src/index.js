let addToy = false;
const toyButton = document.querySelector(".add-toy-form")
toyButton.addEventListener("submit", (e)=>{
  e.preventDefault()
  toyAdder(e)
})
function initialize(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then((res)=>res.json())
  .then((data)=>{
    data.forEach((e)=>{
      makeCard(e)
    })
  })

}

function makeCard(obj){
  const collection = document.getElementById("toy-collection")
  const newCard = document.createElement("div")
  newCard.classList = "card"
  newCard.innerHTML = `
  <h2>${obj.name}</h2>
  <img src=${obj.image} class="toy-avatar" />
  <p>${obj.likes} Likes</p>
  <button class="like-btn" id="${obj.id}">Like ❤️</button>
  `
  collection.append(newCard)
}

function toyAdder(toy){

  const newToy = {
    name: toy.target[0].value,
    image: toy.target[1].value,
    likes: 0
  }
  const toyObj = {
    method: "POST",

    headers:
    {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
    "name": `${toy.target[0].value}`,
    "image": `${toy.target[1].value}`,
    "likes": `0`
    })}

    fetch("http://localhost:3000/toys", toyObj)
    .then(res=>res.json())


    makeCard(newToy)
  }
initialize()
