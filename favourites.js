

let favouritebarList = document.getElementById('favlistitem');
let list = [];
list = JSON.parse(localStorage.getItem('favlistarr'));


function fetching(list) {

    for (var i = 0; i < list.length; i++) {
        loadhero(list[i]);
    }
}



async function loadhero(heroid) {

    const URL = "https://www.superheroapi.com/api.php/3078862828893622/" + heroid.trim();
    console.log(URL);
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    if (data){
        herolistdis(data);
    } 
}

function herolistdis(hero) {

    let herolistitem = document.createElement('div');
    herolistitem.innerHTML = "";
    herolistitem.innerHTML = `
        <div id="outerbox">
        <div id="innerbox">
        <img src = "${hero.image.url}"  id="favlistimg">
         </div> 
            <H5>${hero.name}</H5>
            <button class="btn btn-secondary" id="remove" type="submit" onclick="remove(this.value)" value=${hero.id}>Remove</button>
        
    </div>
       
        `;
    favouritebarList.appendChild(herolistitem);
}
function remove(value) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
            list.splice(i, 1);
        }
    }

    localStorage.setItem('favlistarr', JSON.stringify(list));
    favouritebarList.innerHTML = "";
    fetching(list);
}


fetching(list);