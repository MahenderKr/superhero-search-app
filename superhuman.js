let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");

let favoriteHeroArray = [];
let superHeroId = 0;
let favid = 0;

search.onkeyup = function () {
  let searchname = search.value;
  console.log(searchname);
  if (searchname !== "") {
    fetch(
      "https://superheroapi.com/api.php/ 3328323083897178/search/" +
      searchname.trim()
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        function showhero() {
          let heronames = data.results;
          console.log(data.results);
          ul.innerText = " ";
          for (let i of heronames) {
            let li = document.createElement("li");
            li.innerHTML = i.name;
            li.id = i.id;

            li.addEventListener("click", function () {
              superHeroId = this.id;
              console.log(superHeroId + "this oIdis id");
              loadSuperHeroDetails(superHeroId);
              ul.innerText = " ";
            });
            li.setAttribute("style", "display: block; color:red; background-color:yellow;margin-top: 10px; width: 878px; border: 1px solid red; border-radius:15px 50px 30px;");
            ul.appendChild(li); 
          }
        }

        showhero();
      })
      .catch((err) => console.log(err));
  }
};


function loadSuperHeroDetails(superHeroId) {
  fetch(`https://superheroapi.com/api.php/ 3328323083897178/${superHeroId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let details = document.getElementById('details');
      details.setAttribute("style", "background-color:#d4b743;")

      let img = document.getElementById("img");
      img.setAttribute("src", data.image.url);

      let name = document.getElementById("name");
      name.innerHTML = data.name;

      let relatives = document.getElementById("bio");
      relatives.innerHTML = " Relatives :" + data.connections.relatives;

      let good = document.getElementById("nature");
      good.innerText = "Nature :" + data.biography.alignment;

      let base = document.getElementById("base");
      base.innerHTML = "Work :" + data.work.base;

      let occupation = document.getElementById("occupation");
      occupation.innerHTML = "Occupation :" + data.work.occupation;

      let powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "Intelligence : " +
        data.powerstats.intelligence +
        ", Combat : " +
        data.powerstats.combat +
        ", Power : " +
        data.powerstats.power +
        ", Speed : " +
        data.powerstats.speed +
        ", Strength : " +
        data.powerstats.strength;

      let favBtn = document.getElementById("favoriteBtn");
      favBtn.setAttribute("style", "display:flex;");
      favBtn.setAttribute('value', data.id)

    })
    .catch((error) => console.log(error));
}

function addFavorite(favid) {
  console.log(favid);
  if (favoriteHeroArray.includes(favid)) {
    let customAlert = new CustomAlert();
    customAlert.alert('Already Added To Favourites');
    setTimeout(()=>{
      customAlert.ok();
    },1000)
    return;
  }
  favoriteHeroArray.push(favid);
  localStorage.setItem('favlistarr', JSON.stringify(favoriteHeroArray));
}


function CustomAlert(){
  this.alert = function(message,title){
    document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    
    let winH = window.innerHeight;
    dialogoverlay.style.height = winH+"px";
    
    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').style.display = 'block';

    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button style="display:none;" class="pure-material-button-contained active" onclick="customAlert.ok()"></button>';
  }
  
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}




