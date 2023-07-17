const section = document.querySelector(".newnews");
const newbtn = document.querySelector(".newbtn");
const loadnewbtn = document.querySelector(".new");

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
  } else if (event.target.classList.contains("all")) {
        if (isAllClicked){
          document.querySelector(".loading").innerHTML = "";
          newslists.forEach(newlist => {
            document.querySelector(".loading").innerHTML += newlist;
          });
        }
  } else if (event.target.classList.contains("business")) {
    const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "business");
    document.querySelector(".loading").innerHTML = sportsNews.join("");
  } else if (event.target.classList.contains("sports")) {
    const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "sports");
    document.querySelector(".loading").innerHTML = sportsNews.join("");
  } else if (event.target.classList.contains("world")) {
    const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "world");
    document.querySelector(".loading").innerHTML = sportsNews.join("");
  } else if (event.target.classList.contains("politics")) {
    const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "politics");
    document.querySelector(".loading").innerHTML = sportsNews.join("");
  } else if (event.target.classList.contains("hatke")) {
    const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "hatke");
    document.querySelector(".loading").innerHTML = sportsNews.join("");
  } else if (event.target.classList.contains("science")) {
    const sportsNews = newslists.filter(newsItem => extractCategory(newsItem) === "science");
    document.querySelector(".loading").innerHTML = sportsNews.join("");
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
let clonedElement = Node;
document.addEventListener("click", (event)=>{
  if (event.target.classList.contains("fav-icon")) {
    const parentdiv = event.target.closest(".newli");
    clonedElement = parentdiv.cloneNode(true);
    clonedElement.querySelector(".fav-icon").remove();

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart");
    heartIcon.style.color = "red";
    heartIcon.style.fontSize = "35px";
    heartIcon.style.float = "right";
    heartIcon.style.cursor = "pointer";
    clonedElement.appendChild(heartIcon);
    document.querySelector(".saving").appendChild(clonedElement);
  }
})

let issavedbtnclicked = true;
document.querySelector(".savednews").addEventListener("click", ()=>{
  if (isAllClicked){
    document.querySelector(".saving").style.display = "block";
    isAllClicked = false;
  }
  else {
    document.querySelector(".saving").style.display = "none";
  }
})

const adjustIconSize = () => {
  const icons = document.querySelectorAll(".fa fa-heart, .fa fa-heart-o");
  const iconSize = window.innerWidth <= 768 ? "20px" : "35px";
  icons.forEach((icon) => (icon.style.fontSize = iconSize));
};

// Call the adjustIconSize function on page load and whenever the window is resized
window.addEventListener("DOMContentLoaded", adjustIconSize);
window.addEventListener("resize", adjustIconSize);

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
          <i class='fa fa-heart-o fav-icon' style='color: black; font-size: 35px; float:right; cursor: pointer;'></i>
          </div>
          `);
  });

  console.log(newslists);
}

fetchingdata();