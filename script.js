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

    const addProduct = (name, price) => {
        let id;
        if (data.products.length > 0) {
            id = data.products[data.products.length - 1].id + 1;

        } else {
            id = 0;
        }
        const newProduct = new Product(id, name, parseFloat(price));
        data.products.push(newProduct);

        return newProduct;

    }

    const getTotal = () => {

        let total = 0;

        data.products.forEach(function (item) {

            total += item.price;
        })

        data.totalPrice = total;
        return data.totalPrice;

    }

    return {
        getProducts: function () {

            return data.products;
        },
        getData: function () {
            return data;
        },
        addProduct,
        getTotal
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


    const dolar = new Dolar();

    dolar.getCurrencyList('USD')
        .then(result => {


            console.log(result);
        });

    const createProductList = (product) => {

        let html = "";

        product.forEach(prd => {

            html += `
            <tr>
                <td>${prd.id}</td>
                <td>${prd.name}</td>
                <td>${prd.price} $</td>
                <td class="text-right">
                    <button type="submit" class="btn btn-warning btn-sm">
                        <i class="far fa-edit"></i>

                    </button>
                </td>
            </tr>
        `;

        });

        document.querySelector(Selectors.productList).innerHTML = html;
    }

    const addProduct = (prd) => {
        document.querySelector(Selectors.productCard).style.display = 'block';

        var item = `
            <tr>
                <td>${prd.id}</td>
                <td>${prd.name}</td>
                <td>${prd.price} $</td>
                <td class="text-right">
                    <button type="submit" class="btn btn-warning btn-sm">
                        <i class="far fa-edit"></i>

                    </button>
                </td>
            </tr>
        
        `;

        document.querySelector(Selectors.productList).innerHTML += item;

    }

    const clearInputs = () => {

        document.querySelector(Selectors.productName).value = "";
        document.querySelector(Selectors.productPrice).value = "";
    }

    const hideCard = () => {
        document.querySelector(Selectors.productCard).style.display = 'none';
    }

    const showTotal = (total) => {


        document.querySelector(Selectors.totalusd).textContent = total;
        document.querySelector(Selectors.totaltl).textContent = total * 10;


    }


    return {
        createProductList,
        getSelectors: function () {
            return Selectors;
        },
        addProduct,
        clearInputs,
        hideCard,
        showTotal,
        liveTl: function () {
        }
    }


})();

// APP Controller

const AppController = (function (productctrl, ui) {

    const UISelectors = ui.getSelectors();
    const loadEventListeners = function () {

        //add product event

        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);

    }


    const productAddSubmit = (e) => {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // add product
            const newProduct = productctrl.addProduct(productName, productPrice);

            // add item
            ui.addProduct(newProduct);

            // get total
            const total = productctrl.getTotal();
            console.log(total);

            // show total
            ui.showTotal(total);


            ui.clearInputs();

        }

        e.preventDefault();
    }


    return {
        init: function () {
            console.log('Veriler Alınıyor..');
            const products = productctrl.getProducts();

            if (products.length == 0) {
                ui.hideCard();

            } else {
                ui.createProductList(products);

            }
            loadEventListeners()


        }

    }

})(ProductController, UIController);

AppController.init();