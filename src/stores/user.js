import { ref, onBeforeMount, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  // Load user data from localStorage when the store is first created
  onBeforeMount(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  });

  // set user
  function setUser(userData) {
    user.value = userData;

    localStorage.setItem("user", JSON.stringify(userData));
  }

  // remove user
  function unSet() {
    (user.value = null),
      // Remove user data from localStorage on logout
      localStorage.removeItem("user");
  }

  const getUser = computed(() => {
    return user.value;
  });

  return { user, setUser, unSet, getUser };
});
