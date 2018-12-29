<template>
    <div>
        <form>
            <div class="form-group">
                <label for="">Username</label>
                <input type="text" v-modal="username" class="form-control" aria-describedby="helpId" placeholder="">
                <small id="helpId" class="form-text text-muted">Help text</small>
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" v-modal="password"  class="form-control" aria-describedby="helpId" placeholder="">
              <small id="helpId" class="form-text text-muted">Help text</small>
            </div>
            <button @click="login" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        // data() {
        //     return {
        //         username: '',
        //         password: '',
        //     };
        // },
        // methods: {
        //     login() {
        //         const username = {
        //             ...this.username,
        //         };
        //         const pass = {
        //             ...this.pass,
        //         };
        //         // console.log(username);
        //         // console.log(pass);
        //     },
        // },
    };
</script>

<style scoped>
    
</style>