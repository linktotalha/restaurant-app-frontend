import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToastr } from "./toastr";

import axios from "axios";

export const useReviewApi = () => {
  const userStore = useUserStore();
  const { toast } = useToastr();

  const reviews = ref([]);
  const errors = ref(null);
  const getReviews = async (id) => {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/reviews/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      errors.value = null;
      console.log(response.data);
      reviews.value = response.data;
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  };

  const addReview = async (data) => {
    try {
      const token = userStore.user.access_token;
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/reviews",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      errors.value = null;
      toast(response.data.message);
      return response.data;
    } catch (e) {
      errors.value = e.response?.data?.message;
    }
  };

  return {
    errors,
    reviews,
    getReviews,
    addReview,
  };
};
