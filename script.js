class Dolar {

    async getCurrencyList(currency1) {

        let url = `https://api.frankfurter.app/latest?from=${currency1}`;

        const data = await fetch(url);

        const currency = await data.json();

        return currency.rates.TRY.toFixed(2);
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
        return Number(data.totalPrice.toFixed(3));

    }

    const getProductById = (id) => {

        let product = null;

        data.products.forEach(function (prd) {

            if (prd.id == id) {
                product = prd;
            }

        })

        return product;

    }

    const setCurrentProduct = (product) => {

        data.selectedProduct = product;

    }
    const getCurrentProduct = () => {
        return data.selectedProduct;
    }
    return {
        getProducts: function () {

            return data.products;
        },
        getData: function () {
            return data;
        },
        getProductById,
        setCurrentProduct,
        getCurrentProduct,
        addProduct,
        getTotal
    }


})();


// UI Controller
const UIController = (function () {

    const Selectors = {

        productList: '#item-list',
        addButton: '#addBtn',
        updateButton: '.updateBtn',
        deleteButton: '.deleteBtn',
        cancelButton: '.cancelBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalusd: '#total-usd',
        totaltl: '#total-tl',
        livetl: '#live-tl'

    }

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
                        <i class="far fa-edit product-edit"></i>

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
                        <i class="far fa-edit product-edit"></i>

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

    const dolar = new Dolar();

    const showTotal = (total) => {

        dolar.getCurrencyList('USD')
            .then(result => {

                document.querySelector(Selectors.totaltl).textContent = Number((total * result).toFixed(3));

                console.log(result);
            });

        document.querySelector(Selectors.totalusd).textContent = total;

    }

    const addProductToForm = () => {
        const selectedProduct = ProductController.getCurrentProduct();
        document.querySelector(Selectors.productName).value = selectedProduct.name;
        document.querySelector(Selectors.productPrice).value = selectedProduct.price;
    }

    const addingState = () => {
        UIController.clearInputs();
        document.querySelector(Selectors.addButton).style.display='inline';
        document.querySelector(Selectors.updateButton).style.display='none';
        document.querySelector(Selectors.deleteButton).style.display='none';
        document.querySelector(Selectors.cancelButton).style.display='none';


    }

    const editState = (tr) => {

        const parent = tr.parentNode;

        for(let i=0;i<parent.children.length;i++){
            parent.children[i].classList.remove('bg-warning');
        }

        tr.classList.add('bg-warning');
        document.querySelector(Selectors.addButton).style.display='none';
        document.querySelector(Selectors.updateButton).style.display='inline';
        document.querySelector(Selectors.deleteButton).style.display='inline';
        document.querySelector(Selectors.cancelButton).style.display='inline';
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

            dolar.getCurrencyList('USD')
                .then(result => {

                    document.querySelector(Selectors.livetl).textContent = result;
                });
        },
        addProductToForm,
        addingState,
        editState
    }


})();

// APP Controller

const AppController = (function (productctrl, ui) {

    const UISelectors = ui.getSelectors();
    const loadEventListeners = function () {

        //add product event

        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);
        document.querySelector(UISelectors.productList).addEventListener('click', productEditSubmit);
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

    const productEditSubmit = (e) => {

        if (e.target.classList.contains('product-edit')) {

            let id = e.target.parentNode.parentNode.previousElementSibling.previousElementSibling.
                previousElementSibling.textContent;

            const product = productctrl.getProductById(id);

            productctrl.setCurrentProduct(product);

            ui.addProductToForm();

            ui.editState(e.target.parentNode.parentNode.parentNode);

        }
        e.preventDefault();
    }

    return {
        init: function () {
            console.log('Veriler Alınıyor..');

            ui.addingState();
            const products = productctrl.getProducts();

            //live exchange rate
            ui.liveTl();

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