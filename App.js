const section = document.querySelector(".newnews");
const newbtn = document.querySelector(".newbtn");
const loadnewbtn = document.querySelector(".new");

let isnewbtnclicked = true;
let isselectclicked = true;
let isAllClicked = true;
let businessNotFav = true;
let sportsNotFav = true;
let worldNotFav = true;
let politicsNotFav = true;
let hatkeNotFav = true;
let scienceNotfav = true;

const newslists = [];

newbtn.addEventListener("click", () => {
    if (isnewbtnclicked){
      document.querySelector(".selection").style.display = "block";
      isnewbtnclicked = false;
    }
    else {
      document.querySelector(".selection").style.display = "none";
      isnewbtnclicked = true;
      if (!isselectclicked){
        document.querySelector(".lists").style.display = "none";
        isselectclicked = true;
      }
    }
});


section.addEventListener("click", (event) => {
  if (event.target.classList.contains("category")) {
    if (event.target.classList.contains("category")) {
      if (isselectclicked){
        document.querySelector(".lists").style.display = "block";
        isselectclicked = false;
      }
      else {
        document.querySelector(".lists").style.display = "none";
        isselectclicked = true;
      }
    }
  } 

  else if (event.target.classList.contains("all")) {
        if (isAllClicked){
          document.querySelector(".loading").innerHTML = "";
          newslists.forEach(newlist => {
              document.querySelector(".loading").innerHTML += newlist;
          });
        }
  } 
  
  else if (event.target.classList.contains("business")) {
    const savingTags = document.querySelectorAll(".saving .cg h3");
    savingTags.forEach(tag => {
      if (tag.textContent === "business") {
        businessNotFav = false;
      }
    });
    if (businessNotFav){
      const buisnessNews = newslists.filter(newsItem => extractCategory(newsItem) === "business");
      document.querySelector(".loading").innerHTML = buisnessNews.join("");
    }
  } 
  
  else if (event.target.classList.contains("sports")) {
    const savingTags = document.querySelectorAll(".saving .cg h3");
    savingTags.forEach(tag => {
      if (tag.textContent === "sports") {
        sportsNotFav = false;
      }
    });
    if (sportsNotFav) {
      const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "sports");
      document.querySelector(".loading").innerHTML = sportsNews.join("");
    }
  } 
  
  else if (event.target.classList.contains("world")) {
    const savingTags = document.querySelectorAll(".saving .cg h3");
    savingTags.forEach(tag => {
      if (tag.textContent === "world") {
        worldNotFav = false;
      }
    });
    if (worldNotFav){
      const worldNews = newslists.filter(newsItem => extractCategory(newsItem) === "world");
      document.querySelector(".loading").innerHTML = worldNews.join("");
    }
  } 
  
  else if (event.target.classList.contains("politics")) {
    const savingTags = document.querySelectorAll(".saving .cg h3");
    savingTags.forEach(tag => {
      if (tag.textContent === "politics") {
        politicsNotFav = false;
      }
    });
    if (politicsNotFav){
      const politicsNews = newslists.filter(newsItem => extractCategory(newsItem) === "politics");
      document.querySelector(".loading").innerHTML = politicsNews.join("");
    }
  } 
  
  else if (event.target.classList.contains("hatke")) {
    const savingTags = document.querySelectorAll(".saving .cg h3");
    savingTags.forEach(tag => {
      if (tag.textContent === "hatke") {
        hatkeNotFav = false;
      }
    });
    if (hatkeNotFav){
      const hatkeNews = newslists.filter(newsItem => extractCategory(newsItem) === "hatke");
      document.querySelector(".loading").innerHTML = hatkeNews.join("");
    }
  } 
  
  else if (event.target.classList.contains("science")) {
    const savingTags = document.querySelectorAll(".saving .cg h3");
    savingTags.forEach(tag => {
      if (tag.textContent === "science") {
        scienceNotfav = false;
      }
    });
    if (scienceNotfav){
      const scienceNews = newslists.filter(newsItem => extractCategory(newsItem) === "science");
      document.querySelector(".loading").innerHTML = scienceNews.join("");
    } 
  }
});

function extractCategory(htmlContent) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  const categoryElement = tempDiv.querySelector('.cg h3');
  if (categoryElement) {
    return categoryElement.innerText.trim();
  }
  return null;
}

loadnewbtn.addEventListener("click", ()=>{
  const randomItems = newslists.sort(() => 0.5 - Math.random()).slice(0, 2);
  document.querySelector(".loading").innerHTML += randomItems;
  document.querySelector(".newnews").scrollIntoView({behavior:"smooth"});
})

//Fav news
let clonedElement = null;
console.log(newslists);
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fav-icon")) {
    const parentdiv = event.target.closest(".newli");

    const clonedElement = parentdiv.cloneNode(true);
    clonedElement.querySelector(".fav-icon").remove();
    console.log(clonedElement);

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart");
    heartIcon.style.color = "red";
    heartIcon.style.float = "right";
    heartIcon.style.cursor = "pointer";
    clonedElement.appendChild(heartIcon);

    document.querySelector(".saving").appendChild(clonedElement);
    document.querySelector(".loading").removeChild(parentdiv);
  }

  else if (event.target.classList.contains("fa", "fa-heart")) {
    console.log("yes");
    const parentdiv = event.target.closest(".newli");
    const clonedElement = parentdiv.cloneNode(true);
    clonedElement.querySelector(".fa.fa-heart").remove();

    const favIcon = document.createElement("i");
    favIcon.classList.add("fav-icon", "fa", "fa-heart-o");
    favIcon.style.color = "black";
    favIcon.style.float = "right";
    favIcon.style.cursor = "pointer";

    clonedElement.appendChild(favIcon);

    document.querySelector(".loading").appendChild(clonedElement);
    document.querySelector(".saving").removeChild(parentdiv);
  }
});


let issavedbtnclicked = true;
document.querySelector(".savednews").addEventListener("click", ()=>{
  if (issavedbtnclicked){
    document.querySelector(".saving").style.display = "block";
    issavedbtnclicked = false;
  }
  else {
    document.querySelector(".saving").style.display = "none";
  }
})


// Fetching Data
async function fetchingdata() {
  const respa = await fetch(`https://content.newtonschool.co/v1/pr/64806cf8b7d605c99eecde47/news`);
  const data = await respa.json();
  console.log(data);

  data.forEach(element => {
    newslists.push(`
          <div class="newli">
          <div class="details">
          <div class="author">
          <nav>BY</nav>
          <h3>${element[" author"]}</h3>
          </div>
          <div class="cg">
          <nav>CATEGORY </nav>
          <h3>${element[" category"]}</h3>
          </div>
          </div>
          <p class="content">${element["content"]} <a href=${element["url"]} target="_blank" style="color: blue; text-decoration: none;">READ MORE</a></p>
          <i class='fa fa-heart-o fav-icon' style='color: black; cursor: pointer; float:right; '></i>
          </div>
          `);
  });

  console.log(newslists);
}

fetchingdata();