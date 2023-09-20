const id = (x) => {
    return document.getElementById(x);
}
let input = id('input');
let addBtn = id('add_btn');
let evenBtn = id('even_btn');
let oddBtn = id('odd_btn');
let deleteFirstElemBtn = id('delete_first_elem_btn');
let deleteLastElemBtn = id('delete_last_elem_btn');
let listContainer = id('item_list_container');
let itemList = localStorage.itemList ? JSON.parse(localStorage.itemList) : [];


const renderList = () => {
    listContainer.innerHTML = ``;
    for (let i = 0; i <= itemList.length - 1; i++) {
        if (!itemList[i].completedList) {
            listContainer.innerHTML += `
                <div class="list-item">
                    <div class="item-name" id="${i}">
                        ${itemList[i].value}
                    </div>
                    <div class="item-actions">
                        <button onclick="completedItem(${i})">Complete</button>
                        <button onclick="editItem(${i})">Edit</button>
                        <button onclick="deleteItem(${i})">Delete</button>
                    </div>
                </div>
            `;
        }
        else {
            listContainer.innerHTML += `
                <div class="list-item">
                    <div class="item-name completed" id="${i}">
                        ${itemList[i].value}
                    </div>
                    <div class="item-actions">
                        <button onclick="completedItem(${i})">Uncomplete</button>
                        <button onclick="editItem(${i})">Edit</button>
                        <button onclick="deleteItem(${i})">Delete</button>
                    </div>
                </div>
            `;
        }

    }
}

const addEvent = () => {
    let value = input.value;
    let idx = 0;
    if (value.length > 0) {
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].completedList == true) {
                idx = i;
                break;
            } else {
                idx = itemList.length;
            }
        }
        let obj = { value: value, completedList: false };
        itemList.splice(idx, 0, obj);
        input.value = '';
    } else {
        alert("Пожалуйста заполните поле!");
    }
    localStorage.itemList = JSON.stringify(itemList);
    renderList();
}

const deleteItem = (index) => {
    let item = itemList[index];
    if (item != null) {
        itemList.splice(index, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    } else {
        alert("Элемент был успешно удален");
    }
}

const completedItem = (index) => {
    let item = itemList[index];
    let tmp = '';
    if (item != null && !item.completedList) {
        item.completedList = true;
        tmp = item;
        itemList.splice(index, 1);
        itemList.push(tmp);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    } else {
        itemList.unshift(...itemList.splice(index, 1))
        item.completedList = false;
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    }
}

const editItem = (index) => {
    let item = itemList[index];
    if (item != null) {
        let ask = prompt(`Изменяем "${item.value}" на : `);
        if (ask != null) {
            if (ask.length > 0) {
                itemList[index].value = ask;
                localStorage.itemList = JSON.stringify(itemList);
                renderList();
            }
        }
    } else {
        alert("Элемент недоступен в списке.");
    }
}

const evenItem = () => {
    for (let i = 0; i < itemList.length; i++) {
        if (((i + 1) % 2) === 0) {
            let elem = document.getElementById(i);
            elem.classList.toggle("even_color");
        }
    }
}

const oddItems = () => {
    for (let i = 0; i < itemList.length; i++) {
        if (((i + 1) % 2) !== 0) {
            let elem = document.getElementById(i);
            elem.classList.toggle("odds_color");
        }
    }
}

const deleteFirstElem = () => {
    if (itemList[0] != null) {
        itemList.splice(0, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    }
}

const deleteLastElem = () => {
    if ((itemList.length - 1) != null) {
        itemList.splice(itemList.length - 1, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    }
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
})

evenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    evenItem();
})
oddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    oddItems();
})
deleteFirstElemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteFirstElem();
})
deleteLastElemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteLastElem();
})

renderList();