const itemsFilter = [];
const itemsFilterOnSaleNb = [];
const creators = [];
async function displayFilters() {
    await getNFT()
    const divfilters = document.getElementById('filters');
    const newElement = document.createElement('ul')
    var ul = document.getElementById("filters");
    items.forEach((nft) => {
        creators.push(nft.creator.username);
    })
    const creatorsFilter = creators.filter(element => {
        return element !== "" && element !== undefined && element != null;
    });
    creatorsFilter.forEach((creator) => {
        var li = document.createElement("li");
        var text = document.createTextNode(creator);
        li.dataset.creator = creator;
        li.setAttribute("onclick", "FilterByCreators(this);");
        li.appendChild(text);
        ul.appendChild(li);
    })

}

async function FilterByCreators(e) {
    await getNFT();
    const creatorname = e.getAttribute('data-creator')
    if (e.hasAttribute('data-actif')) {
        e.removeAttribute('data-actif');
        itemsFilter.forEach((items) => {
            if (items.creator.username == creatorname) {
                var index = itemsFilter.indexOf(items);
                itemsFilter.splice(index, 1);
            }
        })
    }
    else {
        e.setAttribute('data-actif', 'true');
        items.forEach(element => {
            if (element.creator.username == creatorname) {
                itemsFilter.push(element);
            }
        });
    }
    if (itemsFilter.length < 1) {
        displayAllNFC();
    } else {
        displayNFC(itemsFilter)
    }
}

async function searchSale() {
    const cards = document.querySelectorAll(".card");
    const searchBar = document.querySelector("#searchbarSale")
    searchBar.addEventListener("keyup", (e) => {
        const searchedLetters = e.target.value;
        if (searchedLetters.length >= 1) {
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].querySelector('.ventes').textContent.toLowerCase().includes(searchedLetters)) {
                    cards[i].style.display = "block";
                } else {
                    cards[i].style.display = "none";
                }
            }
        }
    })
}