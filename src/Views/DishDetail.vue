<script setup>
import { ref, onMounted } from 'vue';
import { useDishApi } from '../composables/dish';
import { useReviewApi } from '../composables/reviews';
import StarRating from 'vue-star-rating';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const user = ref([]);
const { dishes, showDish } = useDishApi();
const { reviews, addReview, getReviews } = useReviewApi();

const form = ref({
    rating: '',
    review: '',
    dish_id: route.params.id
});

const submit = async() => {
    const response = await addReview(form.value)
    response && await getReviews(route.params.id);
    response && (form.value = {
        rating: '',
        review: '',
    })
}
onMounted(async () => {
    user.value = userStore.getUser;
    form.value.user_id = user.value ? user.value.id : null;
    await showDish(route.params.id);

    await getReviews(route.params.id);
});
</script>
<template>
    <div class="row p-5">
        <div class="col-12 text-center mb-3">
            <h4>Dish Detail</h4>
        </div>
        <div class="col-6">
            <div class="mb-3">
                <h5>Title: </h5> {{ dishes?.title }}
            </div>
            <div class="mb-3">
                <h5>Title: </h5> {{ dishes?.price }}
            </div>
            <div class="mb-3">
                <h5>Description: </h5> {{ dishes?.description }}
            </div>
        </div>
    </div>
    <div class="row p-5">
        <div class="col-12 text-center mb-3">
            <h4>Reviews</h4>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card mb-3" v-if="reviews?.reviews && reviews?.reviews?.data.length > 0" v-for="review in reviews.reviews.data">
                    <div class="card-body">
                        <h5>{{ review?.user?.name }}</h5>
                        <p>
                            <star-rating star-size="20" v-model:rating="review.rating" :show-rating="false"
                                    :read-only="true" active-color="#ff6846"></star-rating>
                        </p>
                        <p>{{ review?.review }}</p>
                    </div>
                </div>
                <div v-else>
                    <h5>No record found</h5>
                </div>
            </div>
        </div>
        <div class="col-6">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Add Review</label>
                    <StarRating star-size="20" v-model:rating="form.rating" :show-rating="false" active-color="#ff6846"
                        class="mb-3"></StarRating>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.review"></textarea>
                </div>
                <button class="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    </div>
</template>
