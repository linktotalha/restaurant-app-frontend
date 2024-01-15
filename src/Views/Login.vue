<script setup>
import { ref } from 'vue';
import { useAuthApi } from '@/composables/authentication';

const { errors, login } = useAuthApi();

const form = ref({
    email: '',
    password: '',
});

const submit = () => {
    login(form.value);
}
</script>
<template>
    <div class="row p-5">
        <div class="col-12">
            <h2>Login</h2>
        </div>
        <div class="col-md-6">
            <form @submit.prevent="submit">
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
                    No account? <RouterLink to="register" style="text-decoration: none;">Create one</RouterLink>
                </div>
            </form>
        </div>
    </div>
</template>