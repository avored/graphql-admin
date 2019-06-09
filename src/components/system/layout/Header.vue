<template>
<a-layout-header class="header">
     <a-icon 
        class="trigger header-trigger" 
        :type="collapsed ? 'menu-unfold' : 'menu-fold'" 
        @click="sideBarToggle">
    </a-icon>
</a-layout-header>
</template>
<script>
export default {
    data() {
        return {
            collapsed: false,
        }
    },
    methods: {
        sideBarToggle() {
            this.$emit('toggleSideBarClicked')
        }
    }
}
</script>
<style>
.header {
    height: 64px;
    padding: 0 12px 0 0;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
}
.header-trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    -webkit-transition: color .3s;
    transition: color .3s;
}
</style>
