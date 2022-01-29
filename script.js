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

    const updateProduct = (name, price) => {

        let product = null;

        data.products.forEach(function (prd) {

            if (prd.id == data.selectedProduct.id) {

                prd.name = name;
                prd.price = parseFloat(price);
                product = prd;
            }
        })

        return product;
    }

    const deleteProduct = (product) => {

        data.products.forEach(function (prd, index) {

            if (prd.id == product.id) {
                data.products.splice(index, 1);
            }

        });
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
        updateProduct,
        deleteProduct,
        getTotal
    }


})();


// UI Controller
const UIController = (function () {

    const Selectors = {

        productList: '#item-list',
        productListItems: '#item-list tr',
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

    const updateProduct = (product) => {

        let updatedItem = null;

        let items = document.querySelectorAll(Selectors.productListItems);

        items.forEach(function (item) {

            if (item.classList.contains('bg-warning')) {

                item.children[1].textContent = product.name;
                item.children[2].textContent = product.price;
                updatedItem = item;
            }

        });

        return updatedItem;
    }

    const clearInputs = () => {

        document.querySelector(Selectors.productName).value = "";
        document.querySelector(Selectors.productPrice).value = "";
    }

    const clearWarnings = () => {

        const items = document.querySelectorAll(Selectors.productListItems);

        items.forEach(function (item) {
            if (item.classList.contains('bg-warning')) {

                item.classList.remove('bg-warning');
            }

        });

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

    const deleteProduct = () => {

        let items = document.querySelectorAll(Selectors.productListItems);

        items.forEach(function (prd) {

            if (prd.classList.contains('bg-warning')) {
                prd.remove('bg-warning');
            }
        })

    }

    const addingState = () => {

        UIController.clearWarnings();
        UIController.clearInputs();
        document.querySelector(Selectors.addButton).style.display = 'inline';
        document.querySelector(Selectors.updateButton).style.display = 'none';
        document.querySelector(Selectors.deleteButton).style.display = 'none';
        document.querySelector(Selectors.cancelButton).style.display = 'none';


    }

    const editState = (tr) => {

        tr.classList.add('bg-warning');
        document.querySelector(Selectors.addButton).style.display = 'none';
        document.querySelector(Selectors.updateButton).style.display = 'inline';
        document.querySelector(Selectors.deleteButton).style.display = 'inline';
        document.querySelector(Selectors.cancelButton).style.display = 'inline';
    }
    return {
        createProductList,
        getSelectors: function () {
            return Selectors;
        },
        addProduct,
        updateProduct,
        deleteProduct,
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
        clearWarnings,
        editState
    }


})();

// APP Controller

const AppController = (function (productctrl, ui) {

    const UISelectors = ui.getSelectors();
    const loadEventListeners = function () {

        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);
        document.querySelector(UISelectors.productList).addEventListener('click', productEditClik);
        document.querySelector(UISelectors.updateButton).addEventListener('click', editProductSubmit);
        document.querySelector(UISelectors.cancelButton).addEventListener('click', cancelUpdate);
        document.querySelector(UISelectors.deleteButton).addEventListener('click', deleteProductSubmit);

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

            // show total
            ui.showTotal(total);


            ui.clearInputs();

        }

        e.preventDefault();
    }

    const productEditClik = (e) => {

        if (e.target.classList.contains('product-edit')) {

            let id = e.target.parentNode.parentNode.previousElementSibling.previousElementSibling.
                previousElementSibling.textContent;

            const product = productctrl.getProductById(id);

            productctrl.setCurrentProduct(product);

            ui.clearWarnings();

            ui.addProductToForm();

            ui.editState(e.target.parentNode.parentNode.parentNode);

        }
        e.preventDefault();
    }

    const editProductSubmit = (e) => {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {

            //update product

            const updateProduct = productctrl.updateProduct(productName, productPrice);

            const item = ui.updateProduct(updateProduct);

            // get total
            const total = productctrl.getTotal();
            console.log(total);

            // show total
            ui.showTotal(total);

            ui.addingState();

        }

        e.preventDefault();
    }

    const cancelUpdate = (e) => {


        ui.addingState();
        ui.clearWarnings();

        e.preventDefault();
    }

    const deleteProductSubmit = (e) => {

        const selectedProduct = productctrl.getCurrentProduct();

        // delete product
        productctrl.deleteProduct(selectedProduct);

        // delete ui
        ui.deleteProduct();

        // get total
        const total = productctrl.getTotal();

        // show total
        ui.showTotal(total);

        ui.addingState();

        if(total==0){
            ui.hideCard();
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