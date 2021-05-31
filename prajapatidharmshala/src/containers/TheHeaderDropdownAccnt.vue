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
        <strong> Welcome {{get_name}} ! </strong>
      </CDropdownHeader>
      <span v-if="isLoggedIn">
        <CDropdownItem>
          <!-- <CIcon name="cil-user" /> <router-link to="/profile">प्रोफाइल  </router-link> -->
          <CIcon name="cil-user" /> <a @click="getProfile()"> प्रोफाइल  </a>
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
    get_name: function() {
      return localStorage.getItem('name')
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
    getProfile() {
      this.$router.push("/profile");
      //return this.$store.getters.isAuthenticated;
    }
  },
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }

</style>