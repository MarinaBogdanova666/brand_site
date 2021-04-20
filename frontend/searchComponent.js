Vue.component('search', {
    template: `
    <div class="search-bar">
        <button class="grey-button">
            Browse
            <i class="fas fa-sort-down"></i>
        </button>
        <input @input="filterProducts" v-model="userSearch" type="text" placeholder="Search for Item...">
        <button @click="filterProducts" class="search-button" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </div>
    `,
    data() {
        return{
            userSearch: "",
        }
    },
    methods:{
        filterProducts(){
            let regexp = new RegExp(this.userSearch, "i");
            this.$parent.filteredProducts = this.$parent.allProducts.filter(elem => regexp.test(elem.product_name));
        }
    },
})