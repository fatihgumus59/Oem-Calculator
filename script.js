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

   


})();


// UI Controller
const UIController = (function () {

  




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