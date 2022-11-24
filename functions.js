
    function inArray(element, array) {
        return array.indexOf(element) != -1;
    }

    function removeFromArray(element, array) {
        array.splice(array.indexOf(element), 1);
    }

    function setLocalStorage(key, value) {
        console.log(value)
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    function removeCards() {
        document.getElementById("nft").innerHTML = '';
    }