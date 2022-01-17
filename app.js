//Storage Controller
const StorageCtrl = (function (){
    //public methods
    return {
        storeItem: function(item){
            let items;
            //check if any item in LS
            if(localStorage.getItem('items') === null){
                items = [];
                //push new item
                items.push(item);
                //set LS
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                //push new item
                items.push(item);
                //reset LS
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        removeLsItem: function(item, cal){

            let items;
            //check if any item in LS
            if(localStorage.getItem('items') === null){
                items = [];

                //set LS
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                //push new item
                items.forEach(function (itemList,  index, value)
                {


                    //console.log( value[index]);
                    //console.log('===========================');
                    //console.log( item);
                    //console.log(item.name === value[indeparseInt(x].name || item.calories === value[index].calories);
                    if(item.name === value[index].name && parseInt(item.calories) === parseInt(value[index].calories)  )
                    {
                        items.splice(index, 1);
                        //console.log( item);

                    }
                });
            }
                //reset LS
                localStorage.setItem('items', JSON.stringify(items));



        },
        getItemsFromStorage: function (){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
}) ();


//Item Controller
const ItemCtrl = (function(){
    //Item Construction
    const Item = function(id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

//Data Structure
    const data = {
        items: [
            /*  {id: 0, name: 'Steak Dinner', calories: 1200},
              {id: 1, name: 'Cake', calories: 900},
              {id: 2, name: 'Eggs', calories: 300}*/
        ],
        total: 0
    }

    return {
        getItems: function(){
            return data.items
        },
        addItem: function (name, calories){
            /*console.log(name)
            console.log(calories)*/
            let ID;
            //create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
                //console.log(ID)
            } else {
                ID = 0
            }
            //calories to number
            calories = parseInt(calories);
            //create new item
            newItem = new Item(ID, name, calories);
            //add to items array
            data.items.push(newItem);
            /* //control data
             console.log(data.items)
             console.log(newItem)*/
            //return new item
            return newItem
        },
        //total calories
        getTotalCalories: function(){
            let total = 0;
            //loop through items and add calories
            data.items.forEach(function(item){
                total = total + item.calories;
                //console.log(total)
            });
            //set total calories in data structure
            data.total = total;
            //console.log(data.total)
            //return total
            return data.total;
        },
        //total calories
        calcTotalCalories: function(cal){
            totals = 0;
            calcArray = []
            data.items.forEach(function(item, index){
                if(item.calories === parseInt(cal)) {
                    data.items.splice(index, 1);

                }
                //console.log(total)
            });

            data.items.forEach(function(item, index){
                calcArray.push(item.calories)
                //console.log(total)
            });
            for (var i in calcArray) {
                totals += calcArray[i];
            }
            //console.log(totals);
            return totals;

        },
        removeItem: function(element){

            element.remove();

        },
        logData: function(){
            return data
        }
    }
})();
//UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories',
        deleteBtn: '.delete-btn',
        updateBtn: '.update-btn'
    }
    return{
        populateItemList: function(items){
            //create html content
            let html = '';

            //parse data and create list items html
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="fas fa-pencil-alt"></i>
        </a>
        </li>`
            });

            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        getListItems: function (element, calories){
            let UISelectors = UICtrl.getSelectors();
            let itemsS = StorageCtrl.getItemsFromStorage()
            let selectedItem = '';
            let itemReplace = element.replace(/:/g, '')



                itemsS.forEach(function ( item) {


                    if (item.name === itemReplace && item.calories === parseInt(calories) )
                    {

                        selectedItem = item


                    }

                });
                return selectedItem



        },
        addListItem: function (item){
            //create li element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add ID
            li.id = `item-${item.id}`;
            //add HTML
            li.innerHTML = `<strong>${item.name}:</strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fas fa-pencil-alt"></i>
            </a>`;
            //console.log(li)
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function (){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }
    }
})();

//App Controller
const App = (function(ItemCtrl,StorageCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function (){
        //get UI selectors
        const UISelectors = UICtrl.getSelectors();

        //console.log(UISelectors)
        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        //remove item event
        document.querySelector(UISelectors.itemList).addEventListener('click', selectedItem);
        //console.log(document.querySelector(UISelectors.deleteBtn));

        //ad document reload event
        document.addEventListener('DOMContentLoaded', getItemsFromStorage)
    }


    //item remove function
    const selectedItem = function(event){

        let UISelectors = UICtrl.getSelectors();

        let deleteBtn = document.querySelector(UISelectors.deleteBtn);
        let itemTag = event.target.parentNode.parentElement;
        let itemName = event.target.parentNode.parentElement.querySelector('strong').textContent;
        let itemCal = event.target.parentNode.parentElement.querySelector('em').textContent;
        let LSItem = UICtrl.getListItems(itemName, itemCal)

        document.querySelector(UISelectors.updateBtn).style.visibility = "visible";
        deleteBtn.style.visibility = "visible";

        deleteBtn.addEventListener('click', event => {
            event.preventDefault();
            //event.stopImmediatePropagation();
            ItemCtrl.removeItem(itemTag);
            StorageCtrl.removeLsItem(LSItem, itemCal);
            //get total calories
            if( itemCal.length !== 0 ) {
                let totalCalories = ItemCtrl.calcTotalCalories(itemCal);

                UICtrl.showTotalCalories(totalCalories);
            }

            event.preventDefault();

        });
        event.preventDefault();
        //event.stopImmediatePropagation();
    }




    //item add submit function
    const itemAddSubmit = function(event){
        //get form input UI Controller
        const input = UICtrl.getItemInput()
        //console.log(input)
        //check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            //add item to UI items list
            UICtrl.addListItem(newItem)
            //console.log(newItem)
            // console.log('add item to data structure')
            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //store in localStorage
            StorageCtrl.storeItem(newItem);
            //clear fields
            UICtrl.clearInput()
        }
        event.preventDefault()
    }
    //get items from Storage
    const getItemsFromStorage = function (){
        const items = StorageCtrl.getItemsFromStorage()
        //set storage items to ItemCtrl data items
        items.forEach(function (item){
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        ///get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        //populate items list
        UICtrl.populateItemList(items)
    }
    return {
        init: function (){
            console.log('Initializing App')
            //fetch items from data structure
            const items = ItemCtrl.getItems()
            //populate items list
            UICtrl.populateItemList(items)
            //load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

//Initialize App
App.init()