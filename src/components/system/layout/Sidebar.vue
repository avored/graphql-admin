<template>
<a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
>
    <router-link to="/admin/dashboard">
        <div class="logo">
            <span>AvoRed</span>
        </div>
    </router-link>

    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="dashboard">
            <router-link to="/admin/dashboard">
                <a-icon type="dashboard" />
                <span>Dashboard</span>
            </router-link>
        </a-menu-item>
        <a-sub-menu key="catalog">
            <span slot="title">
                <a-icon type="team"></a-icon>
                <span>Catalog</span>
            </span>
            <a-menu-item key="category">
                <router-link  to="/admin/catalog/category">
                    Category
                </router-link>
            </a-menu-item>
            <a-menu-item key="product">
                    <router-link  to="/admin/catalog/product">
                    Product
                </router-link>
            </a-menu-item>
        </a-sub-menu>
    </a-menu>
      
    </a-layout-sider>
</template>
<script>
export default {
    data () {
        return {
            collapsed: false,
        }
    },
    methods:{
        toggleSideBar() {
            this.collapsed = !this.collapsed;
        }
    },
    mounted() {
      
    }
}
</script>
<style>
.logo {
    background-image: url("./../../../assets/logo.svg");
    height: 64px;
    background-repeat: no-repeat;
    background-size: 50px;
    background-position: 18px;
    color: #fff;
    line-height: 64px;
    padding-left: 80px;
    font-size: 1.6rem;
}
</style>
