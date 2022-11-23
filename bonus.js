//---------------------------------------------------- BONUS FUNCTION (sort by number of click with local storage) ----------------------------------------------------
const clickButtonAttr = 'dataNbClick';
class ClickList {
    constructor() {
        this.storageName = 'ClickList';
        this.list = this.initList();
    }
    initList() {
        if (window.localStorage.getItem(this.storageName)) {
            const list = JSON.parse(window.localStorage.getItem(this.storageName));
            console.log(list);
            return list;
        } else {
            let obj = {};
            return obj;
        }
    }
    initButton(button) {
        const id = parseInt(button.getAttribute(clickButtonAttr));
        const test = {
            Backcolour: 'red'
        };
        !inArrayClick(id, this.list) ? this.list[id] = 0 : this.list[id] = this.list[id] + 1;
        this.updateList();
        return button;
    }
    updateList() {
        setLocalStorage(this.storageName, this.list);
    }
}

function inArrayClick(element, array) {
    return array.hasOwnProperty(element) == true;
}

const clickButtons = document.querySelectorAll('.card');
let clicks = new ClickList();
clickButtons.forEach(button => clicks.initButton(button));