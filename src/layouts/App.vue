
<template>
  <a-layout id="avored-admin" style="min-height: 100vh">
      <app-sidebar ref="sideBar"></app-sidebar>
      <a-layout>
        <app-header @toggleSideBarClicked="toggleSideBarClicked"  />
        <a-layout-content style="margin: 0 16px">
          <app-breadcrumb />
            <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <slot/>
          </div>
        </a-layout-content>
      <app-footer/>
    </a-layout>
  </a-layout>
</template>
<script>

import Header from "@/components/system/layout/Header";
import Breadcrumb from "@/components/system/layout/Breadcrumb";
import Sidebar from "@/components/system/layout/Sidebar";
import Footer from "@/components/system/layout/Footer";

export default {
    components: {
      'app-header': Header,
      'app-breadcrumb': Breadcrumb,
      'app-sidebar': Sidebar,
      'app-footer': Footer
    },
    data () {
        return {
          collapsed: false,
        }
    },
    methods: {
        toggleSideBarClicked() {
          //window.x = this;
          this.$refs.sideBar.toggleSideBar();
        }
    }
}
</script>
