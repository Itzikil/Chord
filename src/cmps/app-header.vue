<template>
  <header>
    <nav>
      <router-link to="/">
        <span role="img" aria-label="logo">Home</span>
      </router-link>
      <div>
        <router-link to="/song">Songs</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    // loggedInUser() {
    //   return this.$store.getters.loggedinUser
    // },
  }
}
</script>