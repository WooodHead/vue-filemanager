<template>
  <div>
    <div class="options clearfix">
      <h3>{{count}} repository results</h3>

      <b-form-group>
        <b-form-radio-group id="btnradios1" buttons v-model="view" :options="options" name="radiosBtnDefault" button-variant="outline-primary"
        />
      </b-form-group>
    </div>

    <b-pagination @change="changePage" align="center" :total-rows="pages" v-model="page" :per-page="limit">
    </b-pagination>


    <div v-if="view==='table'">
      <b-table fixed responsive striped hover :items="repos" :fields="fields">
        <template slot="full_name" slot-scope="data">
          <a class='full_name' :href="data.item.repo_url" target="_blank">{{data.value}}</a>
        </template>

        <template slot="packages" slot-scope="data">
          <b-btn v-b-toggle.collapse1 variant="primary">Toggle Collapse</b-btn>
          <b-collapse id="collapse1" class="mt-2">
            <!-- <b-card> -->
            <p class="card-text">{{data.item.packages}}</p>
            <!-- </b-card> -->
          </b-collapse>
          <!-- <a class='packages' :href="data.item.repo_url" target="_blank">{{data.value}}</a> -->
        </template>

      </b-table>
    </div>

    <div v-if="view==='card'">
      <div v-for="repo in repos">
        <reposCardView :repo="repo"></reposCardView>
      </div>
    </div>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination';
  import ReposCardView from '@/components/Repos/ReposCardView';
  import repoService from '@/services/repoService';

  export default {
    components: {
      Pagination,
      ReposCardView
    },
    data() {
      return {
        view: 'table',
        options: [{
            text: 'Card View',
            value: 'card'
          },
          {
            text: 'Table View',
            value: 'table'
          }
        ],
        repos: [],
        fields: ['full_name', 'description', 'language', 'watchers', 'repo_size', 'packages'],
        page: 1,
        pages: 1,
        limit: 20,
        count: 0
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      loadData: function () {
        var options = {
          page: this.page,
          limit: this.limit
        }
        console.log('this.page', this.page)
        repoService.index(options).then(res => {
          console.log('res', res)
          this.page = res.data.page
          this.pages = res.data.pages
          this.count = res.data.count

          var repos = res.data.repos
          repos.forEach(item => {
            item.repo_url = 'https://github.com/' + item.owner + '/' + item.repo_name,
              item.owner_url = 'https://github.com/' + item.owner + '/' + item.repo_name,
              item.repo_size = this.$filesize(item.repo_size * 1000)
          })

          this.repos = repos
          console.log('repos', repos)
        })
      },
      changePage: function (p) {
        this.page = p;
        this.loadData()
        // this.$router.push({
        //   path: 'repos',
        //   query: {
        //     page: p
        //   }
        // })

        console.log('p', p)
      }
    }

  }

</script>


<style>
  th {
    white-space: nowrap;
  }

  .options {
    display: flex;
  }

  .options h3 {
    flex: 1;
  }

  fieldset {
    /* flex: 1; */
    /* align-self: flex-end; */
    /* justify-self: flex-end; */
  }

  .full_name {
    font-size: 1.5em;
  }

</style>
