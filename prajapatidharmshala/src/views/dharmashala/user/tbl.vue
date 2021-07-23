<template>
<CRow>
    <div class="container">
        <div class="col-sm-12 bg-white text-dark border">
          <div class="row frow header border">
              <h5><strong class="col-sm-12">  सदस्य सूची </strong></h5>
          </div>
          <!-- <CTableWrapper
            :items="users"
            :fields="fields"
            fixed
            border
            caption="सदस्य सूची"
          /> -->
          <div class="row frow d-flex justify-content-center">
            <span class="error" v-if="errors.error"> {{errors.error}}</span>
             <table class="table table-striped table-bordered tbl" id="user">
               <thead class="thead-dark">
                 <tr>
                    <th>नाम</th>
                    <th>पिता</th>
                    <th>मोबाइल</th>
                    <th>पद</th>
                    <th>गाँव</th>
                    <th>एक्शन</th>
                </tr>
               </thead>
               <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.name}}</td>
                    <td>{{user.father}}</td>
                    <td>{{user.mobile}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.village}}</td>
                    <td><a href="#"><img src="../../../../public/img/avatars/edit.jpg" style="width:30px;height:25px;"></a></td>
                </tr>
               </tbody>
             </table>
             <div>
              <!-- <mdb-datatable-2 v-model="data" :searching="{value: search, name: 'name'}" />
              <mdb-input class="mt-0" v-model="search" label="Search by office" /> -->
            </div>
          </div>
        </div>
    </div>
</CRow>

</template>

<script>
import { api } from '../../../api.js';
//import CTableWrapper from '../base/Table.vue'
// import $ from 'jquery'

//  $(function(){
//     $("#user").dataTable();
//   })
export default {
  name: 'List',
  // components: {
  //   CTableWrapper
  // },
  data() {
    return {
      users: [],
      errors: []
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
  watch: {
  },
  // cumputed:{

  // },
  methods: {
    create_table(val) {
      var arr = [];
      val.forEach((item) => {
        if (item.profile !== null) {
          var obj = {};
          obj.mobile = item.mobile;
          obj.name = item.profile.first_name+' '+ item.profile.last_name;
          obj.email = item.email;
          obj.village = item.profile.village;
          arr.push(obj);
        }
      })
      this.users = arr;
      // this.fields = [
      //   {key: 'mobile', text: 'M'},
      //   {key: 'name', text: 'N'},
      //   {key: 'email', text: 'E'},
      //   {key: 'village', text: 'V'},
      //   {key: 'action', text: 'A'}
      // ]
       //  'name', 'email', 'village', 'action']
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

.tbl {
  margin: 25px;
  width: 100.1%;
  border-collapse: collapse;
}
.frow {
  padding: 7px;
}
</style>