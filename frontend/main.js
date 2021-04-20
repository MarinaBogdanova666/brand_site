let app = new Vue({
    el: '#app',
    data: {
        api: 'http://localhost:3000',
        productsPath: '/get-products',
        cartPath: '/cart',
        allProducts: [],
        filteredProducts: [],
        goods: [],
        showCart: false,
    },
    mounted: function(){
        this.getProducts();
        this.getCart();
    },
    methods: {
        getProducts(){
            fetch(this.api + this.productsPath)
                    .then(result => result.json()
                                                .then((products) => {
                                                    this.allProducts = products;
                                                    this.filteredProducts = products;
                                                })
                    )
                    .catch(error => console.log(error))
        },

        getCart(){
            fetch(this.api + this.cartPath)
                    .then(result => result.json()
                                                .then((products) => {
                                                    this.goods = products;
                                                })
                    )
                    .catch(error => console.log(error))
        },

        addToCart(product){
            fetch(`${this.api + this.cartPath}/${product.id_product}`)
                    .then(result => result.json()
                                                .then((products) => {
                                                    this.goods = products;
                                                })
                    )
                    .catch(error => console.log(error))
        },
        
        toggleCart(){
            this.showCart = !this.showCart;
        },
    }
  })