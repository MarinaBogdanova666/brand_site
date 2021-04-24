Vue.component('cart', {
    template:`
        <div v-if="showCart" class="cart-block">
            <div v-if="!goods.length" class="emptyCart">В корзине пока пусто...</div>
            <div v-for="product in goods"  class="cart-item">
                <img :src="'./img/' + product.imgCart50">
                <h3>{{product.product_name}}</h3>
                <p>\${{product.price}}/шт.</p>
                <button @click="$parent.incQuantity(product)" class="del-btn">+</button>
                <p>{{product.quantity}} шт.</p>
                <button @click="$parent.decQuantity(product)" class="del-btn">-</button>
                <p class="total">\${{ product.price * product.quantity }}</p>
                <button @click="$parent.removeFromCart(product)" class="del-btn">X</button>
            </div>
            <a href="shopping-cart.html">Перейти в корзину</a>
        </div>
    
    `,
    
    props:['goods', 'showCart'],
})