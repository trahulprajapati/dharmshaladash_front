<template>
  <div  class="container">
    <div class="ftl">
      <div v-if="isSearch == true" class="row">
            <div class="col-sm-2">
            <h5>नाम द्वारा खोजे</h5>
          </div>
        <div class="col-sm-10">
          <input class="form-control col-sm-3" type="search" v-model="filter">
        </div>
      </div>
      <div class="row">
         <div class="col-sm-10">
           <p>sort={{currentSort}},  page={{currentPage}} </p>
         </div>
         <div class="col-sm-2">
          <button class="btn btn-primary mb-2 mr-2" @click="prevPage">पीछे</button>
          <button class="btn btn-primary mb-2" @click="nextPage">आगे</button>
         </div>
      </div>
    </div>
    <table class="table table-striped table-bordered tbl" id="donation">
      <thead class="thead-dark">
        <tr>
          <th v-for="(obj, ind) in config" :key="ind"  @click="sort(obj.key)">
                {{ obj.title }} 
                <img src="../../../../public/img/avatars/ascdsc1.jpg" class="img" style="width:13px;height:15px;">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedData" :key="index">
          <td v-for="(obj, ind) in config" :key="ind">
            <span v-if="obj.key === 'id'">
               <button @click="callAPI(row[obj.key])">
                <!-- <a v-bind:href="row[obj.api]"> {{row[obj.api] }} -->
                 <img src="../../../../public/img/avatars/edit.jpg" style="width:25px;height:20px;" >
                <!-- </a> -->
               </button>
              <!-- <a class="icon" href="#"><img src="../../../../public/img/avatars/edit.jpg" style="width:25px;height:20px;" @click="$refs.editModal.openModal()"></a> -->
              <!-- <a v-if="isLoggedIn" href="#"><img src="../../../../public/img/avatars/delete.jpg" style="width:20px;height:20px;"></a>{{row[obj.id]}} -->
            </span>
            <span v-else>{{row[obj.key]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

<script>
//import Modal from "../Moda"
import Modal from '../base/Modal.vue'
import { api } from '../../../api.js';
export default {
  name: 'DListUpdate',
  components: {
    Modal
  },
  //props: ['theData', 'config'], 
  props: {
    theData: {
      type: Array,
    },
    config: {
      type: Array,
    },
    updateapi: {
      type: String,
    },
    pageSize: {
      type: Number,
      default: 9,
    },
    isSearch: {
        type: Boolean,
        default: true
    }
  },
   data() {
    return {
      currentPage: 1,
      filter: '',
      currentSort: 'name',
      currentSortDir: 'asc',
      isModalVisible: false,
      showError:false,
      errors: [],
    }
  },
  watch: {
    filter() {
      console.log('reset to p1 due to filter');
      this.currentPage = 1;
    },
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
    filteredData() {
      return this.theData.filter(c => {
        if(this.filter == '') return true;
        return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      })
    },
    sortedData() {
      return this.filteredData.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  },
  methods: {
    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.filteredData.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    callAPI(id) {
      let path = this.updateapi+id
      //this.$router.push({ name: this.updateapi, params: { id: id }})
      this.$router.push(path);
    },
  }
}

</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}
.tbl {
  margin: 20px;
  width: 100.1%;
  border-collapse: collapse;
}

.error {
  color: red;
}

.img {
  margin-right: 5px;
  margin-left: 5px;
}

.icon {
  margin-right: 30px;
  margin-left: 15px;
}
.ftl {  
  margin-right: 10px;
  margin-left: 20px;
  margin-top: 20px;
}

.frow {
  padding: 7px;
}

.fdiv {
  margin: 7px 15px;
  /* margin: 15px; */
}
</style>