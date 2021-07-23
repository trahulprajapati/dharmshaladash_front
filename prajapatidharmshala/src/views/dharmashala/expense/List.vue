<template>          
  <!-- <CRow> -->
      <div class="container">
          <div class="col-sm-12 bg-white text-dark border">
            <div class="row frow header border">
                <h5><strong class="col-sm-12">  एक्सपेंस सूची </strong></h5>
            </div>
            <div class="row frow d-flex justify-content-center">
              <span class="error" v-if="errors"> {{errors.error}}</span>
              <DTable
                    v-if="expense"
                    :theData="expense"
                    :config="config"
                    :updateapi="api"
                    :style="{height: '700px'}"
                />
            </div>
          </div>
      </div>
  <!-- </CRow> -->
</template>

<script>
import { api } from '../../../api.js';
//import DTable from '../base/Table.vue' 
//import DTable from '../donation/ListUpdate.vue' 
import DTable from '../base/CoreTable.vue'

export default {
  name: 'List',
  components: {
    DTable,
  },
  data() {
    return {
      expense: [],
      errors: [],
      config: [],
      api: null
    }
  },
  created() {
    //assign api its value
    this.api = '/dharmashala/expense/get/';
    api.get('/prajapatidharmashala/api/expense/list').then(res => {
      this.create_table(res.data)
    }).catch( e => {
      alert (e);
      errors['error'] = e;
    })
  },

  methods: {
    create_table(val) {
      var arr = [];
      //var i = 0;
      val.forEach((item) => {
        let fname = item.agent_id.profile.first_name;
        let lname  = item.agent_id.profile.last_name;
        item.agent_name = fname+' '+lname
        item.exps_name = 'NULL'
        item.agent_id = item.agent_id.id;
      })
      this.expense = val;
      this.config = [
        {key: 'exps_name', title: 'खर्च नाम'},
        {key: 'biller_name', title: 'बिलर'},
        {key: 'amount', title: 'राशि'},
        {key: 'exp_date', title: 'तारीख'},
        {key: 'agent_name', title: 'एजेंट'},
        {key: 'id', title: 'एक्शन'}
      ];

      // console.log(JSON.stringify(arr))
    }
  }
}
</script>

<style scoped>
.header {
  padding: 60px;
  text-align: center;
  font-size: 30px;
}

.error {
  color: red;
}

.frow {
  padding: 7px;
}
</style>