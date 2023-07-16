//Creating New Buttons -> Toggle
const section = document.querySelector(".newnews");
const newbtn = document.querySelector(".newbtn");
let isnewbtnclicked = true;

newbtn.addEventListener("click", ()=>{
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

})

let isselectclicked = true;

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
  });


  //Fetching Data

  async function fetchingdata(){
    const respa = await fetch(`https://content.newtonschool.co/v1/pr/64806cf8b7d605c99eecde47/news`);
    const data = await respa.json();
    console.log(data);
    data.forEach(element => {
      let newslists = `
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
      <i class='fa fa-heart-o fav-icon' style='color: black; font-size: 40px; float:right;'></i>
      </div>
      `
      document.querySelector(".loading").innerHTML += newslists;
    });

  }
  fetchingdata(); 
