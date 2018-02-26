<template>
  <div class="container">

    <div class="card text-left">
      <div class="card-header ">
        Register
      </div>
      <div class="card-body">
        <!-- <form action='/api/register' method='POST'> -->
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input name='email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input name='password' type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
        <button @click='register' type="submit" class="btn btn-primary">Submit</button>
        <!-- </form> -->

      </div>

    </div>

  </div>

</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'

  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
      async register() {
        try {
          var aa = await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
          console.log('aa', aa.data)
        } catch (error) {
          console.log('error', error)
          this.error = error.response.data.error
        }
      }
    }
  }

</script>


<style>
  .card {
    /* width: 38rem; */
    /* margin: 0 auto; */
  }

</style>
