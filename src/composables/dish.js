import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToastr } from "./toastr";
import { useRouter } from "vue-router";
import axios from "axios";

export const useDishApi = () => {
  const errors = ref(null);
  const dishes = ref([]);
  const userStore = useUserStore();
  const router = useRouter();
  const { toast } = useToastr();
  
  const addDish = async (data) => {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/dish",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      errors.value = null;
      router.push({ name: 'dish-list'});
      toast(response.data?.message);
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  };

  const getDish = async (params) => {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/dish-list",
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      errors.value = null;
      dishes.value = response.data.dishes;
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  };

  const showDish = async (id) => {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/dish-detail/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      errors.value = null;
      dishes.value = response.data.dish;
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  };

  const destroyDish = async(id) => {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      errors.value = null;
      // dishes.value = response.data.dish;
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  }

  return {
    errors,
    dishes,
    addDish,
    getDish,
    showDish,
    destroyDish
  };
};
