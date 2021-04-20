Vue.component('cart', {
    template:`
        <div v-if="showCart" class="cart-block">
            <div v-if="!goods.length" class="emptyCart">В корзине пока пусто...</div>
            <div v-for="product in goods"  class="cart-item">
                <img :src="imgCart">
                <h3>{{product.product_name}}</h3>
                <p>\${{product.price}}/шт.</p>
                <button @click="incQuantity(product)" class="del-btn">+</button>
                <p>{{product.quantity}} шт.</p>
                <button @click="decQuantity(product)" class="del-btn">-</button>
                <p class="total">\${{ product.price * product.quantity }}</p>
                <button @click="removeFromCart(product)" class="del-btn">X</button>
            </div>
            <a href="shopping-cart.html">Перейти в корзину</a>
        </div>
    
    `,
    data() {
        return{
            imgCart: 'https://via.placeholder.com/50',
            api: 'http://localhost:3000',
            cartPath: '/cart',
            decCartPath: '/cart-dec',
            delCartPath: '/cart-del'
        }
    },
    props:['goods', 'showCart'],
    methods: {
        updateParentGoods(result){
            result.json()
                    .then((products) => {
                        this.$parent.goods = products;
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
    },
})