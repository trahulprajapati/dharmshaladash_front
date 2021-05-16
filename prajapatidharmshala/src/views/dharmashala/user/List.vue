<template>          
  <!-- <CRow> -->
      <div class="container">
          <div class="col-sm-12 bg-white text-dark border">
            <div class="row frow header border">
                <h5><strong class="col-sm-12">  सदस्य सूची </strong></h5>
            </div>
            <div class="row frow d-flex justify-content-center">
              <span class="error" v-if="errors"> {{errors.error}}</span>
              <DTable
                    v-if="users"
                    :theData="users"
                    :config="config"
                    :style="{height: '600px'}"
                />
            </div>
          </div>
      </div>
  <!-- </CRow> -->
</template>

<script>
import { api } from '../../../api.js';
import DTable from '../base/Table.vue'
const users = [];
export default {
  name: 'List',
  components: {
    DTable,
  },
  data() {
    return {
      users,
      errors: [],
      config: [],
    }
  },
  created() {
    api.get('/prajapatidharmashala/api/account/list/').then(res => {
      //alert (JSON.stringify(res.data));
      this.create_table(res.data)
    }).catch( e => {
      alert (e);
      errors['error'] = e;
    })
  },

  methods: {
    create_table(val) {
      var arr = [];
      var i = 0;
      val.forEach((item) => {
        if (item.profile !== null) {
          var obj = {};
          obj.mobile = item.mobile;
          obj.name = item.profile.first_name+' '+ item.profile.last_name;
          obj.email = item.email;
          obj.village = item.profile.village;
          obj.father = item.profile.father;
          obj.id = '';
          arr.push(obj);
        }
      })
      this.users = arr;
      this.config = [
        {key: 'name', title: 'नाम'},
        {key: 'father', title: 'पिता'},
        {key: 'mobile', title: 'मोबाइल'},
        {key: 'village', title: 'गाँव'},
        {key: 'id', title: 'एक्शन'}
      ];

      console.log(JSON.stringify(arr))
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