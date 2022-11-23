 //-------------------------------------------------------- FAVORITE LIST ----------------------------------------------------------------

 const favoriteButtonAttr = 'data-add-to-favorite';
 class FavoritesList {
     constructor() {
         this.storageName = 'favoritesList';
         this.list = this.initList();
     }
     initList() {
         if (window.localStorage.getItem(this.storageName)) {
             const list = JSON.parse(window.localStorage.getItem(this.storageName));
             console.log(list);
             return list;
         } else {
             return [];
         }
     }
     initButton(button) {
         const id = parseInt(button.getAttribute(favoriteButtonAttr));
         !inArray(id, this.list) ? this.list.push(id) : removeFromArray(id, this.list);
         this.updateList();
         button.classList.toggle('fav');
         return button;
     }

     updateList() {
         setLocalStorage(this.storageName, this.list);
     }
 }

 const buttons = document.querySelectorAll('.shop-item__favorite-button');
 let favorites = new FavoritesList();
 buttons.forEach(button => favorites.initButton(button));