async function getNFT() {
    items = await fetch(`https://awesome-nft-app.herokuapp.com/`)
        .then((res) => res.json())
        .then((res) => {
            return res.assets
        })
        .catch((e) => {
            console.error(e)
            return null
        })

    if (items.length === 0) { return }
    return items;
}

async function displayAllNFC() {
    await getNFT()
    displayNFC(items)
}

async function displayNFC(items) {
    console.log(items)
    let newitems = [];
    const osContainer = document.getElementById('nft')
    await removeCards()
    //Sort NFT by number of click save in localstorage
    if (window.localStorage.getItem('ClickList')) {
        const list = JSON.parse(window.localStorage.getItem('ClickList'));
        const entries = Object.entries(list);
        entries.sort(function (a, b) {
            return a[1] - b[1];
        });
        entries.reverse()
        /* console.log(entries) */
        entries.forEach((idcount) => {
            items.forEach((nft) => {
                if (nft.id == idcount[0]) {
                    newitems.push(nft);
                }
            })
        })
        items.forEach((idsearch) => {
            if (newitems.indexOf(idsearch) == -1) {
                newitems.push(idsearch);
            }
        })
    } else {
        newitems = items;
    };
    /* console.log(newitems) */
    newitems.forEach((nft) => {
        const { name, image_url, description, sales, id, contract: { created_at }, creator: { username } } = nft
        const newElement = document.createElement('div')
        //Add fav class if NFT is in fav list in localstorage
        if (window.localStorage.getItem('favoritesList')) {
            let listOnLoad = JSON.parse(window.localStorage.getItem('favoritesList'));
            if (listOnLoad.includes(id)) {
                var classfav = 'fav';
            }
            else {
                var classfav = '';
            }
        }
        newElement.innerHTML = `
        <div  class="card" >
            <div class="card__inner">
                <div class="card__face card__face--front">
                    <div class="card_nft card__face--front">
                    <div class= "image"> 
                        <img class="card_img" src ="${image_url}">
                    </div>
                        <div class="card_text">
                            <p class="desc"> Nom du NFT : ${name}</p>
                            <p class="owner"> Créateur : ${username}</p>
                        </div>
                        <svg onclick="favorites.initButton(this);" class="shop-item__favorite-button ${classfav}" data-add-to-favorite="${id}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve">
                        <style type="text/css">
                            .st0{fill:transparent;}
                        </style>
                        <path class="st0" d="M326.6,10.3c-38.7,0-75,17.5-99.1,46.9c-24.1-29.4-60.4-46.9-99.1-46.9C57.6,10.3,0,67.9,0,138.7  c0,55.4,33,119.5,98.2,190.5c50.2,54.6,104.7,97,120.3,108.6l9,6.8l9-6.8c15.5-11.7,70.1-54,120.3-108.6  c65.2-71,98.2-135.1,98.2-190.5C455,67.9,397.4,10.3,326.6,10.3z"/>
                        <path d="M326.6,10.3c-38.7,0-75,17.5-99.1,46.9c-24.1-29.4-60.4-46.9-99.1-46.9C57.6,10.3,0,67.9,0,138.7  c0,55.4,33,119.5,98.2,190.5c50.2,54.6,104.7,97,120.3,108.6l9,6.8l9-6.8c15.5-11.7,70.1-54,120.3-108.6  c65.2-71,98.2-135.1,98.2-190.5C455,67.9,397.4,10.3,326.6,10.3z M334.7,309c-41.3,44.9-85.6,81.3-107.2,98  c-21.5-16.7-65.9-53.1-107.2-98C61.2,244.6,30,185.7,30,138.7c0-54.2,44.1-98.4,98.4-98.4c35.7,0,68.7,19.5,86,50.8l13.1,23.7  l13.1-23.7c17.4-31.3,50.3-50.8,86-50.8c54.2,0,98.4,44.1,98.4,98.4C425,185.7,393.8,244.6,334.7,309z"/>
                        </svg>
                        <button dataNbClick="${id}" onclick="clicks.initButton(this);flipped(this);">Voir plus</button>
                    </div>
                </div>
                <div class="card__face card__face--back">
                    <div class="card_nft">
                        <div class="card_text">
                            <p class="ventes">  Nombre de ventes : ${sales}</p>
                            <p class="description"> ${description}</p>
                            <p class="creation"> Crée le : ${created_at}</p>
                        </div>
                        <button onclick="flipped(this)">retour</button>
                    </div>
                </div>
            </div>
        </div>
        `
        osContainer.appendChild(newElement)
    })
}