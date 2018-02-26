<template>

  <div>
    <b-card-group deck>
      <b-card>
        <div class="row">
          <div class="col-8">
            <h4>
              <a :href="repo.owner_url" target='_blank'>{{repo.owner}}</a> /
              <a :href="repo.repo_url" target='_blank'>{{repo.repo_name}}</a>
            </h4>

            <p>{{repo.description}}</p>
          </div>
          <div class="col-2">
            {{repo.repo_size}}
          </div>
          <div class="col-2">{{repo.watchers}}</div>
        </div>

        <!-- <h6 slot="header" class="mb-0">Header Slot</h6> -->
        <!-- <em slot="footer">Footer Slot</em> -->
        <!-- <p class="card-text">Header and footers using slots.</p> -->
        <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card>
    </b-card-group>
  </div>

</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    props: ['repo']
  }

</script>


<style>


</style>
