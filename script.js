class Dolar {



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