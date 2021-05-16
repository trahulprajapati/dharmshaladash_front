<template>
  <div  class="container">
    <div class="ftl">
      <div class="row">
        <div class="col-sm-2">
          <h5>नाम द्वारा खोजे</h5>
          </div>
        <div class="col-sm-10">
          <input class="form-control col-sm-3" type="search" v-model="filter">
        </div>
      </div>
      <div class="row">
         <div class="col-sm-10">
           <!-- <p> sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}} </p> -->
           <p>sort={{currentSort}},  page={{currentPage}} </p>
         </div>
         <div class="col-sm-2">
          <button class="btn btn-primary mb-2 mr-2" @click="prevPage">Previous</button>
          <button class="btn btn-primary mb-2" @click="nextPage">Next</button>
         </div>
      </div>
    </div>
    <table class="table table-striped table-bordered tbl" id="user">
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
              <a class="icon" href="#"><img src="../../../../public/img/avatars/edit.jpg" style="width:25px;height:20px;" data-toggle="modal" data-target="#deleteModal"></a>
              <a href="#"><img src="../../../../public/img/avatars/delete.jpg" style="width:20px;height:20px;" data-toggle="modal" data-target="#myModal"></a>{{row[obj.id]}}
            </span>
            <span>{{row[obj.key]}}</span>
          </td>
        </tr>
      </tbody>
    </table>

  <!-- delete modal -->
    <div id="deleteModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <p>Some text in the modal.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'DTable',
  //props: ['theData', 'config'], 
  props: {
    theData: {
      type: Array,
    },
    config: {
      type: Array,
    },
    pageSize: {
      type: Number,
      default: 9,
    }
  },
   data() {
    return {
    currentPage: 1,
    filter: '',
    currentSort: 'name',
    currentSortDir: 'asc'
    }
  },
  watch: {
    filter() {
      console.log('reset to p1 due to filter');
      this.currentPage = 1;
    }
  },
  computed: {
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
    }
  }
}

</script>

<style scoped>
.tbl {
  margin: 20px;
  width: 100.1%;
  border-collapse: collapse;
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
  margin-right: 20px;
  margin-left: 20px;
}

</style>