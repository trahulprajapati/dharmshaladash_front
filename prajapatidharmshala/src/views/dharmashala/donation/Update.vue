<template>          
  <!-- <CRow> -->
      <div class="container">
          <div class="col-sm-12 bg-white text-dark border">
            <div class="row frow header border">
                <h5><strong class="col-sm-12">  डोनेशन अपडेट </strong></h5>
            </div>
            <div class="row frow d-flex justify-content-center">
              <!-- <span class="error" v-if="errors"> {{errors.error}}</span> -->
              <form class="col-12 ftl" @submit.prevent="submit">
                <span class="error" v-if="showError">  {{errors.error}}</span>
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-2 col-form-label"  for="name" required>नाम *</label>
                      <input type="text" class="form-control col-sm-9" name="name" id="name"
                      v-model="name" readonly/>
                      <span class="error" v-if="errors.name"> {{errors.name}}</span>
                  </div>
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-3 col-form-label" for="father">पिता *</label>
                      <input type="text" class="form-control col-sm-9" name="father" id="father"
                      v-model="father"  readonly/>
                      <span class="error" v-if="errors.father"> {{errors.father}}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-2 col-form-label"  for="mobile">मोबाइल </label>
                      <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                      v-model="mobile" v-bind:readonly="! isLoggedIn"/>
                  </div>
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-3 col-form-label" for="village">गाँव </label>
                      <input type="text" class="form-control col-sm-9" name="village" id="village"
                      v-model="village" required  v-bind:readonly="! isLoggedIn"/>
                      <span class="error" v-if="errors.village"> {{errors.village}}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-2 col-form-label"  for="donation_type">डोनेशन प्रकार </label>
                      <select class="form-control col-sm-9" id="donation_type" v-model="donation_type" required  v-bind:readonly="! isLoggedIn">
                        <option value="AMOUNT">राशि</option>
                        <option value="OTHER">अन्य</option>
                      </select>
                      <span class="error" v-if="errors.donation_type"> {{errors.donation_type}}</span>
                  </div>
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-3 col-form-label" for="amount">राशि </label>
                      <input type="text" class="form-control col-sm-9" name="amount" id="amount"
                      v-model="amount" required  v-bind:readonly="! isLoggedIn"/>
                      <span class="error" v-if="errors.amount"> {{errors.amount}}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-2 col-form-label"  for="agent_name">एजेंट</label>
                      <input type="text" class="form-control col-sm-9" name="agent_name" id="agent_name"
                      v-model="agent_name"  readonly/>
                  </div>
                  <div  class="form-row form-inline col-sm-5">
                      <label class="col-sm-3 col-form-label" for="other">अन्य </label>
                      <input type="text" class="form-control col-sm-9" name="other" id="other"
                      v-model="other" v-bind:readonly="! isLoggedIn"/>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-2 col-form-label"  for="due">बकाया </label>
                      <input type="text" class="form-control col-sm-9" name="due" id="due"
                      v-model="due" v-bind:readonly="! isLoggedIn"/>
                      <span class="error" v-if="errors.due"> {{errors.due}}</span>
                  </div>
                  <div class="form-row form-inline col-sm-5">
                      <label class="col-sm-3 col-form-label" for="remark">टिप्पणी</label>
                      <textarea type="text" class="form-control col-sm-9" name="remark" id="remark"
                      v-model="remark"  v-bind:readonly="! isLoggedIn"/>
                      <!-- <input type="text" class="form-control col-sm-9" name="remark" id="remark"
                      v-model="remark"  v-bind:readonly="! isLoggedIn" readonly required /> -->
                  </div>
                </div>
                <div v-if="isLoggedIn" class="form-group row">
                  <div class="form-row form-inline col-sm-5">
                    <button type="submit" :class="['btn btn-primary mb-2 mr-4 svbtn'] " :disabled="isDisabled">सम्पादित करें</button>
                    <button type="button" class="btn btn-primary mb-2"  @click="closeModal()">बंद करें </button>
                  </div>
                </div>
              </form>
              
              
            </div> <br> 
            <div v-if="history_table" class="bdr">
              <div class="row frow header">
                <h5><strong class="col-sm-12">  डोनेशन अपडेट हिस्ट्री </strong></h5>
              </div>
              <DTable
                      v-if="history_table"
                      :theData="history_table"
                      :config="config"
                      :pageSize="3"
                      :isSearch=false
                      :style="{height: '300px'}"
                  />
            </div>
          </div>
      </div>
  <!-- </CRow> -->
</template>

<script>
import { api } from '../../../api.js';
//import DTable from '../base/Table.vue' 
import DTable from '../base/CoreTable.vue' 
const users = {};
export default {
  name: 'Update',
  components: {
    DTable,
  },
  mounted() {
    this.url_data=this.$route.params.id;
    this.getdata(this.url_data)
  },
  data() {
    return {
      showError:false,
      donation: [],
      errors: [],
      config: [],
      url_data: null,
      id: null,
      name: null,
      donation_type: null,
      father: null,
      amount: null,
      village: null,
      mobile: null,
      other: null,
      date: null,
      remark: null,
      due: null,
      agent_id: null,
      agent_name: null,
      history_table: [],
    }
  },
  watch: {
    // name(value) {
    //   this.name = value;
    //   this.require_check('name', value, 'Name');
    // },
    // village(value) {
    //   this.village = value;
    //   this.require_check('village', value, 'Village');
    // },
    // father(value) {
    //   this.father = value;
    //   this.require_check('father', value, 'Father');
    // },
    // date(value) {
    //   this.date = value;
    //   this.require_check('date', value, 'Date');
    // },
    remark(value) {
      this.remark = value;
      this.require_check('remark', value, 'Remark');
    },
  },
  computed: {
    isDisabled() {
      if (this.name == undefined || this.father == undefined 
      || this.name == '' || this.father == ''
      || this.village == undefined || this.village == ''
      || this.remark == undefined || this.remark == ''
      || this.errors.length > 0 ) {
        return true
      } else {
        return false
      }
    },
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    // update methods
    insert_modal(res) {
      this.mobile = res.mobile
      this.id = res.id
      this.name = res.name
      this.date = res.date
      this.father = res.father
      this.due = res.due
      this.village = res.village
      this.amount = res.amount
      this.other = res.other
      this.remark = null
      this.agent_id = res.agent_id.id
      let fname = res.agent_id.profile.first_name;
      let lname  = res.agent_id.profile.last_name;
      this.agent_name = fname+' '+lname
      this.donation_type = res.donation_type
    },
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
    async submit() {
      const donation = {
        mobile: this.mobile,
        due: this.due,
        amount: this.amount,
        other: this.other,
        donation_type: this.donation_type,
        remark: this.remark,
        agent_id: this.agent_id,
      }
      //let o =  this.$store.getters.isAuthenticated;
      let tok = localStorage.getItem('token')
      let updateapi = "prajapatidharmashala/api/donation/update/"+this.id
      await api.patch(updateapi, donation,
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tok
        },}
      ).then(res => {
        alert(JSON.stringify(res.data))

        this.$router.go();
      }).catch(err => {
        alert(err)
        this.showError = true
        this.errors['error'] = err
      })
    },
    async getdata (id) {
      if (id) {
        let get_donation = '/prajapatidharmashala/api/donation/list/'+id
        let get_usr = '/prajapatidharmashala/api/account/list/'
        const fetchURL = (url) => api.get(url);
        const promiseArray = [get_donation, get_usr].map(fetchURL)
        Promise.all(promiseArray)
        .then((data) => {
          let donation_res = data[0]; // first promise resolved
          this.insert_modal(donation_res.data)

          let user_res = data[1];// second promise resolved
          this.create_table(donation_res.data.history, user_res.data)


        })
        .catch((err) => {
          alert(err)
        });
      } else {
        alert("Error: Id is required")
      }
    },
    create_table (history, user) {
      let objs = {}
      user.forEach((item) => {
        let name = item.profile.first_name + ' ' + item.profile.last_name
        let id = item.id
        objs[id] = name
      })
      history.forEach((item) => {
        item.agent_name = objs[item.agent_id]
      })
      this.history_table = history;
      this.config = [
        {key: 'history_date', title: 'तारीख'},
        {key: 'remark', title: 'टिप्पणी'},
        {key: 'other', title: 'अन्य'},
        {key: 'amount', title: 'राशि'},
        {key: 'agent_name', title: 'एजेंट'},
        {key: 'amount', title: 'राशि'},
      ];
    },
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
.bdr {
  border-top: 5px solid #bbb;
}

.ftl {  
  margin-right: 10px;
  margin-left: 45px;
  /* margin-top: 20px; */
}

.svbtn {
  margin-left: 25px;
}

</style>