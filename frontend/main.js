let app = new Vue({
    el: '#app',
    data: {
        api: 'http://localhost:3000',
        productsPath: '/get-products',
        cartPath: '/cart',
        allProducts: [],
        page: 1,
        filteredProducts: [],
        goods: [],
        showCart: false,
        imgCart: 'https://via.placeholder.com/50',
        decCartPath: '/cart-dec',
        delCartPath: '/cart-del'
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
                                                    this.$refs.searchComponent.applySearch();
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
        updateParentGoods(result){
            result.json()
                    .then((products) => {
                        this.goods = products;
                    })
        },
        incQuantity(product){
            fetch(`${this.api + this.cartPath}/${product.id_product}`)
                    .then(result => this.updateParentGoods(result))
                    .catch(error => console.log(error))
        },
        decQuantity(product){
            fetch(`${this.api + this.decCartPath}/${product.id_product}`)
                    .then(result => this.updateParentGoods(result))
                    .catch(error => console.log(error))
        },
        removeFromCart(product){
            fetch(`${this.api + this.delCartPath}/${product.id_product}`)
                    .then(result => this.updateParentGoods(result))
                    .catch(error => console.log(error))
        },
    }
  })