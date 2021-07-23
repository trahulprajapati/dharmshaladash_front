<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <h4 class="dhead"> प्रजापति धर्मशाला दुधाखेड़ी </h4>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  }
}
</script>

<style scoped>
  .dhead {
    color: grey;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
  }
</style>
