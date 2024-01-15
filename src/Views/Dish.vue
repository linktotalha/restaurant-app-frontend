<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useDishApi } from '@/composables/dish';

const { errors, addDish } = useDishApi();
const userStore = useUserStore();
const user = ref({});

const form = ref({
    title: '',
    description: '',
    price: '',
    image: null,
    user_id: null
});

const submit = () => {
    const formData = new FormData();
    formData.append('title', form.value.title)
    formData.append('price', form.value.price)
    formData.append('image', form.value.image);
    formData.append('description', form.value.description);
    formData.append('user_id', userStore.getUser?.id); 
    addDish(formData);
}

const imageUpload = (event) => {
    form.value.image = event.target.files[0];
}

onMounted(() => {
    user.value = userStore.getUser;
   
});
</script>
<template>
    <div class="row p-5">
        <div class="col-12">
            <h3 class="text-center">Submit a Dish</h3>
        </div>
        <div class="col-md-6">
            <form @submit.prevent="submit()" enctype="multipart/form-data">
                <div class="form-group mb-3">
                    <label for="title">Title</label>
                    <input type="text" v-model="form.title" class="form-control" id="title" placeholder="Enter title">
                    <span class="text-danger" v-if="errors && errors.title">{{ errors.title[0] }}</span>
                </div>
                <div class="form-group mb-3">
                    <label for="title">Price</label>
                    <input type="text" v-model="form.price" class="form-control" id="title" placeholder="Enter price">
                    <span class="text-danger" v-if="errors && errors.price">{{ errors.price[0] }}</span>
                </div>
                <!-- <div class="form-group mb-3">
                    <label for="title">Image</label>
                    <input type="file" class="form-control" @change="imageUpload">
                    <span class="text-danger" v-if="errors && errors.image">{{ errors.image[0] }}</span>
                </div> -->
                <div class="form-group mb-3">
                    <label for="desc">Description</label>
                    <textarea class="form-control" rows="5" v-model="form.description" id="desc"
                        placeholder="Enter description" />
                    <span class="text-danger" v-if="errors && errors.description">{{ errors.description[0] }}</span>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>