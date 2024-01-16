<script setup>
import { ref, onMounted } from 'vue';
import { useDishApi } from '@/composables/dish';
import { useUserStore } from '@/stores/user';

const { dishes, getDish, destroyDish } = useDishApi();

const userStore = useUserStore();
const limit = ref(5);
const currentPage = ref(1);
const timer = ref(null);
const keyword = ref('');

const dishItems = async (page = 1) => {
    let params = {
        per_page: limit.value,
        page: page,
        keyword: keyword.value,
    };
    await getDish(params);
}

const searchDish = (event) => {
    keyword.value = event.target.value;
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
        dishItems();
    }, 500);
}

const previousPage = async () => {
    currentPage.value--;
    dishItems(currentPage.value)
}

const nextPage = async () => {
    currentPage.value++;
    dishItems(currentPage.value)
}

const deleteDish = async(id) => {
    await destroyDish(id);
    await getDish();
}

onMounted(async () => {
    await getDish();
});
</script>
<template>
    <div class="row p-5">
        <div class="col-12 text-center">
            <h3>Dish List</h3>
        </div>
        <div class="col-12">
            <RouterLink :to="{ name: 'dish' }" class="btn btn-primary mb-3" v-if="userStore?.user">+Add Dish
            </RouterLink>
        </div>
        <div class="col-6">
            <input type="text" placeholder="search here...." class="form-class" @keyup="searchDish"/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Submitted By</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dish in dishes.data">
                        <td>{{ dish?.title }}</td>
                        <td>{{ dish?.description }}</td>
                        <td>{{ dish?.user?.name }}</td>
                        <td>
                            <RouterLink class="btn btn-sm btn-success"
                                :to="{ name: 'dish-detail', params: { id: dish?.id } }">View</RouterLink>
                            <button v-if="userStore.user.id === dish.user_id" class="btn btn-sm btn-danger ms-2" @click="deleteDish(dish?.id)">Delete</button>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="text-end">
                <button class="btn btn-primary btn-sm" :disabled="dishes.current_page == 1"
                    @click="previousPage">Prev</button>
                <button class="btn btn-primary btn-sm ms-2" :disabled="dishes.to == dishes.total"
                    @click="nextPage">Next</button>
            </div>
    </div>
</div></template>