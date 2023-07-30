const section = document.querySelector(".newnews");
const newbtn = document.querySelector(".newbtn");
const loadnewbtn = document.querySelector(".new");
const loadsavebtn = document.querySelector(".save");

let isnewbtnclicked = true;
let isselectclicked = true;
let isAllClicked = true;

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
      if (isselectclicked){
        document.querySelector(".lists").style.display = "block";
        isselectclicked = false;
      }
      else {
        document.querySelector(".lists").style.display = "none";
        isselectclicked = true;
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
      const buisnessNews = newslists.filter(newsItem => extractCategory(newsItem) === "business");
      document.querySelector(".loading").innerHTML = buisnessNews.join("");
    }
  
  else if (event.target.classList.contains("sports")) {
      const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "sports");
      document.querySelector(".loading").innerHTML = sportsNews.join("");
    }
  
  else if (event.target.classList.contains("world")) {
      const worldNews = newslists.filter(newsItem => extractCategory(newsItem) === "world");
      document.querySelector(".loading").innerHTML = worldNews.join("");
    }
  
  else if (event.target.classList.contains("politics")) {
      const politicsNews = newslists.filter(newsItem => extractCategory(newsItem) === "politics");
      document.querySelector(".loading").innerHTML = politicsNews.join("");
    }
  
  else if (event.target.classList.contains("hatke")) {
      const hatkeNews = newslists.filter(newsItem => extractCategory(newsItem) === "hatke");
      document.querySelector(".loading").innerHTML = hatkeNews.join("");
    } 
  
  else if (event.target.classList.contains("science")) {
      const scienceNews = newslists.filter(newsItem => extractCategory(newsItem) === "science");
      document.querySelector(".loading").innerHTML = scienceNews.join("");
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

//Load Save News
loadsavebtn.addEventListener("click", ()=>{
  document.querySelector(".savednews").scrollIntoView({behavior:"smooth"});
})


//Load New News
loadnewbtn.addEventListener("click", ()=>{
  const randomItems = newslists.sort(() => 0.5 - Math.random()).slice(0, 2);
  document.querySelector(".loading").innerHTML += randomItems;
  document.querySelector(".newnews").scrollIntoView({behavior:"smooth"});
})

//Local Storage

function saveToLocalStorage(element) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(element.outerHTML);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}


function removeFromLocalStorage(element) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites);
  console.log(element);
  console.log(element.outerHTML);;
  
  const updatedFavorites = favorites.filter((fav) => fav !== element.outerHTML);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}


function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const savingDiv = document.querySelector(".saving");
  savingDiv.innerHTML = favorites.join("");
}

loadFavorites();

//Fav news
let clonedElement = null;

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fav-icon")) {
    const parentdiv = event.target.closest(".newli");
    const clonedElement = parentdiv.cloneNode(true);
    const favtag = clonedElement.querySelector(".fav-icon");
    const idValue = parentdiv.getAttribute('id');
  
    const heart = parentdiv.querySelector("i");
    heart.classList.remove("fav-icon", "fa", "fa-heart-o");
    heart.classList.add("fa", "fa-heart");
    heart.style.color = "red";

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart");
    heartIcon.style.color = "red";
    heartIcon.style.cursor = "pointer";
    clonedElement.replaceChild(heartIcon, favtag);
    newslists[idValue] = clonedElement.outerHTML.trim();
    document.querySelector(".saving").appendChild(clonedElement);
    saveToLocalStorage(clonedElement);
  }

  else if (event.target.classList.contains("fa", "fa-heart")) {
    const parentdiv = event.target.closest(".newli");
    const clonedElement = parentdiv.cloneNode(true);
    removeFromLocalStorage(clonedElement);
    const idValue = parentdiv.getAttribute('id');
    const favtag = clonedElement.querySelector(".fa.fa-heart");

    const favIcon = document.createElement("i");
    favIcon.classList.add("fav-icon", "fa", "fa-heart-o");
    favIcon.style.color = "black";
    favIcon.style.cursor = "pointer";

    clonedElement.replaceChild(favIcon, favtag);
    newslists[idValue] = clonedElement.outerHTML.trim();
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
    issavedbtnclicked = true;
  }
})


// Fetching Data
async function fetchingdata() {
  const respa = await fetch(`https://content.newtonschool.co/v1/pr/64806cf8b7d605c99eecde47/news`);
  const data = await respa.json();
  console.log(data);
  let idx = 0;
  let favcg = true;
  data.forEach(element => {

    let listtag = `
    <div class="newli" id=${idx}>
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
    <i class=${favcg ? "'fa fa-heart-o fav-icon'" : "'fa fa-heart'"} id="itag" style=' cursor: pointer; '></i>
    </div>
    `
    
    newslists.push(listtag.trim());
    idx += 1;
  });

  console.log(newslists);
}

fetchingdata();