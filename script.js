const products = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcal: 400,
        amount: 0,

        get calcSum() {
            return this.amount * this.price;
        },

        get calcKcal() {
            return this.amount * this.kcal;
        }
    },

    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcal: 500,
        amount: 0,

        get calcSum() {
            return this.amount * this.price;
        },

        get calcKcal() {
            return this.amount * this.kcal;
        }
    },

    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcal: 700,
        amount: 0,

        get calcSum() {
            return this.amount * this.price;
        },

        get calcKcal() {
            return this.amount * this.kcal;
        }
    }
}


const extraProducts = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 50,
        kcal: 50
    },

    lettuce: {
        name: 'Салатный лист',
        price: 30,
        kcal: 10
    },

    cheese: {
        name: 'Сыр',
        price: 100,
        kcal: 100,
    }
}


let btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
checkExtraProducts = document.querySelectorAll('.main__product-checkbox');

// console.log(btnPlusOrMinus);

for (let el of btnPlusOrMinus) {
    el.addEventListener('click', function (e) {
        e.preventDefault();

        plusOrMinus(this);
    })
}

function plusOrMinus(elem) {
    let parent = elem.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcal = parent.querySelector('.main__product-kcall span'),
        elemSymbol = elem.getAttribute('data-symbol');

    if (elemSymbol == '+' && products[parentId].amount < 10) products[parentId].amount++;
    else if (elemSymbol == '-' && products[parentId].amount > 0) products[parentId].amount--;

    out.innerHTML = products[parentId].amount;
    price.innerHTML = products[parentId].calcSum;
    kcal.innerHTML = products[parentId].calcKcal;
    // console.log(parentId);
}


for (let key of checkExtraProducts) {
    key.addEventListener('click', function () {

        addExtraProducts(this);

    })
}

function addExtraProducts(elment) {
    let parent = elment.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcal = parent.querySelector('.main__product-kcall span'),
        elemName = elment.getAttribute('data-extra');

    products[parentId][elemName] = elment.checked;

    if (products[parentId][elemName] == true) {
        products[parentId].price += extraProducts[elemName].price;
        products[parentId].kcal += extraProducts[elemName].kcal;
    }

    else {
        products[parentId].price -= extraProducts[elemName].price;
        products[parentId].kcal -= extraProducts[elemName].kcal;
    }

    price.innerHTML = products[parentId].calcSum;
    kcal.innerHTML = products[parentId].calcKcal;
}


let addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptWindowOut = document.querySelector('.receipt__window-out'),
    receiptWindowBtn = document.querySelector('.receipt__window-btn'),

    arrayProducts = [],
    totalName = '',
    totalPrice = 0,
    totalKcal = 0;

addCart.addEventListener('click', function () {

    for (let key in products) {
        if (products[key].amount > 0) {
            arrayProducts.push(products[key]);
            products[key].name += ` - ${products[key].amount}шт`;

            for (let newKey in products[key]) {
                if (products[key][newKey] === true) {
                    products[key].name += `\n${extraProducts[newKey].name}`;
                }
            }
        }
    }
    for (let elem of arrayProducts) {
        totalPrice += elem.calcSum;
        totalKcal += elem.calcKcal;
        totalName += `\n${elem.name}\n`;
    }

    receiptWindowOut.innerHTML = `Ваш заказ: \n${totalName} \nКалорийность: ${totalKcal} \nОбщая стоимость покупки: ${totalPrice}сумм`;

    receipt.style.display = 'flex';
    setTimeout(function () { receipt.style.opacity = '1'; }, 100);
    setTimeout(function () { receiptWindow.style.top = '0'; }, 200);
    document.body.style.overflow = 'hidden';

    let outNum = document.querySelectorAll('.main__product-num');
    let priceNum = document.querySelectorAll('.main__product-price span');
    let kcalNum = document.querySelectorAll('.main__product-kcall span');

    for (let el of outNum) {
        el.innerHTML = 0;
    }
    for (let el of priceNum) {
        el.innerHTML = 0;
    }
    for (let el of kcalNum) {
        el.innerHTML = 0;
    }

})


receiptWindowBtn.addEventListener('click', function () {
    location.reload();
})




