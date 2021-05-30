<template>
    <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
    >
      <template #toggler>
        <CHeaderNavLink>
          <div class="c-avatar">
            <img
              src="img/avatars/LoginIcons.jpg"
              class="c-avatar-img "
            />
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownHeader
        tag="div"
        class="text-center"
        color="light"
      >
        <strong>अकाउंट </strong>
      </CDropdownHeader>
      <span v-if="isLoggedIn">
        <CDropdownItem>
          <CIcon name="cil-user" /> <router-link to="/profile">प्रोफाइल  </router-link>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-lock-locked"/> <a @click="logout()"> लॉगआउट </a>
        </CDropdownItem>
      </span>
      <span v-else>
          <CDropdownItem>
            <CIcon name="cil-lock-locked"/> <router-link to="/login">लॉगिन  </router-link>
          </CDropdownItem>
      </span>
    </CDropdown>
</template>

<script>
import Modal from '../views/dharmashala/base/Modal'
import {api} from '../api'

export default {
  name: 'TheHeaderDropdownAccnt',
  computed: {
    isLoggedIn: function() {
      //tkn = this.$store.getters.isAuthenticated
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }

</style>