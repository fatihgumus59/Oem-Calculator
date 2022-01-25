class Dolar {

    async getCurrencyList(currency1) {

        let url = `https://api.frankfurter.app/latest?from=${currency1}`;

        const data = await fetch(url);

        const currency = await data.json();

        return currency.rates.TRY;
    }

}

// Storage Controller
const StorageContoller = (function () {




})();

// Product Controller
const ProductController = (function () {

    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {

        products: [],
        selectedProduct: null,
        totalPrice: 0
    }
   

    return {
        getProducts: function () {

            return data.products;
        },
        getData: function () {
            return data;
        },
    }

})();


// UI Controller
const UIController = (function () {

    const Selectors = {

        productList: '#item-list',
        addButton: '#addBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalusd: '#total-usd',
        totaltl: '#total-tl',
        livetl: '#live-tl'

    }




})();

// APP Controller

const AppController = (function (productctrl, ui) {


    return {
        init: function () {
            console.log('Veriler Alınıyor..');


        }

    }

})(ProductController, UIController);

AppController.init();