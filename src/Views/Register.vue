<script setup>
import { ref, onMounted } from 'vue';
import { useAuthApi } from '@/composables/authentication';

const { errors, register } = useAuthApi();

const form = ref({
    name: '',
    nick_name: '',
    email: '',
    password: '',
});

const submit = () => {
    register(form.value);
}
</script>
<template>
    <div class="row p-5">
        <div class="col-12">
            <h2>Register</h2>
        </div>
        <div class="col-md-6">
            <form @submit.prevent="submit">
                <div class="form-group mb-3">
                    <label for="exampleInputName">Full Name </label>
                    <input type="text" v-model="form.name" class="form-control" id="exampleInputName"
                        aria-describedby="emailHelp" placeholder="Enter Name">
                    <span class="text-danger" v-if="errors && errors.name">{{ errors.name[0] }}</span>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputName">Nick Name </label>
                    <input type="text" v-model="form.nick_name" class="form-control" id="exampleInputName"
                        aria-describedby="emailHelp" placeholder="Enter Nick Name">
                    <span class="text-danger" v-if="errors && errors.nick_name">{{ errors.nick_name[0] }}</span>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email">
                    <span class="text-danger" v-if="errors && errors.email">{{ errors.email[0] }}</span>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1"
                        placeholder="Password">
                    <span class="text-danger" v-if="errors && errors.password">{{ errors.password[0] }}</span>
                </div>
                <button type="submit" class="btn btn-primary mb-3">Submit</button>
                <div>
                    Already have an account? <RouterLink to="/" style="text-decoration: none;">Login</RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>