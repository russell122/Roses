// let catalogItemJs = document.querySelectorAll('.catalog__item');
let catalogMascBtnJs = document.querySelectorAll('.catalog__masc-btn-js');
// let objCatalog = [];
// let newArr = localStorage.getItem('data-arr');

// if (objCatalog.length >= 1) {
// 	let arr2 = objCatalog;
// 	objCatalog = [...newArr, arr2];
// }


const newGoods = (id, count = 1) => ({
    id: id,
    count: count
})

let currentCartCount = 0
let countText = document.querySelector('.basket-value')

// const functionLcCurrentCount = (arr, counter, text) => {
// 	counter = arr.reduce((sum, el) => {
// 		return el.count + sum
// 	}, 0)
// 	text.textContent = counter
// }

if (localStorage.getItem('goods') !== undefined && localStorage.getItem('goods') !== null) {
    let arrayLC = JSON.parse(localStorage.getItem('goods'))
    // functionLcCurrentCount(arrayLC, currentCartCount, countText)
    countText.textContent = (arrayLC.length)
}

catalogMascBtnJs.forEach(elem => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();

        let dataNumber = elem.getAttribute('data-number');
        let newObjGoods = newGoods(dataNumber)


        if (localStorage.getItem('goods') == undefined && localStorage.getItem('goods') == null) {
            let goods = []
            //goods.push(newObjGoods)
            goods = [...goods, newObjGoods]
            localStorage.setItem('goods', JSON.stringify(goods))

            // functionLcCurrentCount(goods, currentCartCount, countText)
            countText.textContent = (goods.length)

        } else {
            let oldGoods = JSON.parse(localStorage.getItem('goods')) // старый массив
            let findOldItem = oldGoods.find(el => el.id == dataNumber) // проверка на наличии текущего объекта

            if (findOldItem == undefined) { // если его нет. мы добавляем новый
                oldGoods = [...oldGoods, newObjGoods]
                //  oldGoods.push(newObjGoods)  // тут добавили к старому массиву
            } else {
                oldGoods.filter((item) => { // а если он есть мы его же возвращаем но + 1
                    if (item.id == dataNumber) {
                        item.count = item.count + 1
                    }
                    return item
                })
            }
            localStorage.setItem('goods', JSON.stringify(oldGoods))
            // functionLcCurrentCount(oldGoods, currentCartCount, countText)
            countText.textContent = (oldGoods.length)
        }

    })
})

let basket__wrap = document.querySelector('.basket__wrap');

if (basket__wrap) {
    let dataArr = JSON.parse(localStorage.getItem('goods'))
    let arr = [];

    arr = data.people.filter(el => (dataArr.includes(el.id)))

    dataArr.forEach(elem => {
        let div = document.createElement('div');
        let myPrice;
        let rez;

        if (data.people[elem.id - 1].discountPersent != false) {
            rez = data.people[elem.id - 1].price / 100 * data.people[elem.id - 1].discountPersent;
            myPrice = (data.people[elem.id - 1].price - rez).toFixed(0);

        } else {
            myPrice = data.people[elem.id - 1].price;
        }

        div.innerHTML = `
            <div>${data.people[elem.id - 1].name}</div>
            <div class="myCount">${elem.count}</div>
            <div class="ArrMyPrice">${myPrice * elem.count}</div>
            <div class="myPlus" data-value-plus = ${data.people[elem.id - 1].id}>+</div>
        `;
        basket__wrap.append(div);

        let myPlus = document.querySelectorAll('.myPlus');
        let myCount = document.querySelectorAll('.myCount');
        let ArrMyPrice = document.querySelectorAll('.ArrMyPrice');
        let myArr = JSON.parse(localStorage.getItem('goods'));
        let rez2;
        let myPrice2;

        myPlus.forEach((elem, i) => {
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-value-plus') == myArr[i].id) {
                    myArr[i].count++;
                }

                localStorage.setItem('goods', JSON.stringify(myArr));
                myCount[i].textContent = myArr[i].count;

                if (data.people[i].discountPersent != false) {
                    rez2 = data.people[i].price / 100 * data.people[i].discountPersent;
                    myPrice2 = (data.people[i].price - rez2).toFixed(0);

                } else {
                    myPrice2 = data.people[i].price;
                }

                ArrMyPrice[i].textContent = myPrice2 * myArr[i].count;

            })
        })

    })

}