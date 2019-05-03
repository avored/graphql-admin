<template>
<a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo"></div>

      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="dashboard">
            <router-link  to="/admin/dashboard">
                <a-icon type="dashboard" />
                <span>Dashboard</span>
            </router-link>
        </a-menu-item>
        <a-sub-menu key="catalog">
            <span slot="title">
              <router-link  to="/admin/dashboard">
                <a-icon type="team"></a-icon>
                <span>Catalog</span>
              </router-link>
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
      
    },
    mounted() {
      
    }
}
</script>
