<script setup>
import { ref, onMounted } from 'vue';
import { useDishApi } from '@/composables/dish';
import { useUserStore } from '@/stores/user';

const { dishes, getDish, destroyDish } = useDishApi();

const userStore = useUserStore();
const limit = ref(5);
const currentPage = ref(1);

const dishItems = async (page = 1) => {
    let params = {
        per_page: limit.value,
        page: page
    };
    await getDish(params);
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
}

onMounted(async () => {
    await getDish();
});
</script>
<template>
    <div class="row p-5">
        <div class="col-12 text-center">
            <h3>Feedback List</h3>
        </div>
        <div class="col-12">
            <RouterLink :to="{ name: 'dish' }" class="btn btn-primary mb-3" v-if="userStore?.user">+Add Feedback
            </RouterLink>
        </div>
        <div class="col-6">
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
                            <button class="btn btn-sm btn-danger ms-2" @click="deleteDish(dish?.id)">Delete</button>
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