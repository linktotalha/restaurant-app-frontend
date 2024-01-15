import { ref, inject } from "vue";
import axios from "axios";
import { useToastr } from "./toastr";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export const useAuthApi = () => {
  const errors = ref(null);
  const userStore = useUserStore();
  const router = useRouter();
  const { toast } = useToastr();

  const register = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/register",
        data: data,
      });
      errors.value = null;
      console.log(response.data.user);
      storeUserData(response.data.user);
      router.push({name: 'dish'});
      toast(response.data.message);
    } catch (e) {
      errors.value = e.response.data.message;
    }
  };

  const login = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/login",
        data: data,
      });
      storeUserData(response.data.data);
      console.log(response.data.data)
      errors.value = null;
      router.push({name: 'dish'});
      toast(response.data.message);
    } catch (e) {
      if (e.response?.data?.message) {
        errors.value = e.response?.data?.message;
      } else {
        toast(e.response?.data?.error, 'error');
      }
    }
  };

  async function logout() {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/logout",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userStore.unSet();
      errors.value = null;
      router.push({ name: 'login'});
      toast(response.data.message);
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  }

  const storeUserData = (user) => {
    userStore.setUser(user);
  };

  return {
    errors,
    register,
    login,
    logout
  };
};
