<script setup>
import { signOut } from 'aws-amplify/auth';
import { ref, onMounted } from 'vue';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuthState = async () => {
  try {
    const user = await getCurrentUser();
    isAuthenticated.value = true;
  } catch {
    isAuthenticated.value = false;
  }
};

const logout = async () => {
  try {
    await signOut();
    isAuthenticated.value = false;
    router.push({ name: 'auth' });
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

onMounted(() => {
  checkAuthState();
});
</script>

<template>
  <button v-if="isAuthenticated" @click="logout">Sign out</button>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
