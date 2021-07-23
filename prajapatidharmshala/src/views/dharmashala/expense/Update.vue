<template>          
  <!-- <CRow> -->
      <div class="container">
          <div class="col-sm-12 bg-white text-dark border">
            <div class="row frow header border">
                <h5><strong class="col-sm-12">  एक्सपेंस अपडेट </strong></h5>
            </div>
            <div class="row frow d-flex justify-content-center">
              <!-- <span class="error" v-if="errors"> {{errors.error}}</span> -->
              <form class="col-12 ftl" @submit.prevent="submit">
                <span class="error" v-if="showError">  {{errors.error}}</span>
                <div style="border-bottom: 2px solid #bbb;">
                    <div class="form-group row">
                    <!-- <div class="form-row form-inline col-sm-8"> -->
                    <div class="form-row form-inline col-sm-11">
                        <label class="col-sm-2 col-form-label" for="father"> <b> एक्सपेंस प्रकार *</b></label>
                        <select class="form-control col-sm-10" id="expense_type" v-model="expense_type" readonly>
                            <option value="contract">निर्माण </option>
                            <option value="material">वस्तु  </option>
                            <option value="other">अन्य </option>
                        </select>
                    </div>
                    </div>
                    <br>
                </div> <br>
                <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="expense_name" required> एक्सपेंस नाम</label>
                        <input type="text" class="form-control col-sm-9" name="expense_name" id="expense_name"
                        v-model="expense_name" readonly/>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="biller_name">बिलर *</label>
                        <input type="text" class="form-control col-sm-9" name="biller_name" id="biller_name"
                        v-model="biller_name" readonly/>
                        <span class="error" v-if="errors.biller_name"> {{errors.biller_name}}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label" for="rate">दर *</label>
                        <input type="text" class="form-control col-sm-9" name="rate" id="rate"
                        v-model="rate" required v-bind:readonly="! isLoggedIn"/>
                        <span class="error" v-if="errors.rate"> {{errors.rate}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label"  for="quantity">मात्रा *</label>
                        <input type="text" class="form-control col-sm-9" name="quantity" id="quantity"
                        v-model="quantity" v-bind:readonly="! isLoggedIn" required/>
                        <span class="error" v-if="errors.quantity"> {{errors.quantity}}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label" for="amount_type">राशि प्रकार *</label>
                        <select class="form-control col-sm-9" id="amount_type" v-bind:readonly="! isLoggedIn" v-model="amount_type">
                            <option value="cash">कैश </option>
                            <option value="check">चेक </option>
                        </select>
                        <span class="error" v-if="errors.amount_type"> {{errors.amount_type}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="amount">राशि </label>
                        <input type="text" class="form-control col-sm-9" name="amount" id="amount"
                        v-model="amount" v-bind:readonly="! isLoggedIn"/>
                        <span class="error" v-if="errors.amount"> {{errors.amount}}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="due">बकाया </label>
                        <input type="text" class="form-control col-sm-9" name="due" id="due"
                        v-model="due" v-bind:readonly="! isLoggedIn"/>
                        <span class="error" v-if="errors.due"> {{errors.due}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="remark">टिप्पणी</label>
                        <textarea type="text" class="form-control col-sm-9" name="remark" id="remark"
                        v-model="remark" v-bind:readonly="! isLoggedIn"/>
                    </div>
                </div>
                <div style="border-top: 2px solid #bbb;">
                    <br>
                    <div v-if="expense_type == 'material'">
                    <div class="form-group row">
                        <div class="form-row form-inline col-sm-5">
                            <label class="col-sm-3 col-form-label"  for="bill_number">बिल नंबर </label>
                            <input type="text" class="form-control col-sm-9" name="bill_number" id="bill_number"
                            v-model="bill_number" readonly/>
                            <span class="error" v-if="errors.bill_number"> {{errors.bill_number}}</span>
                        </div>
                        <div class="form-row form-inline col-sm-6">
                            <label class="col-sm-3 col-form-label" for="item_type">प्रकार </label>
                            <input type="text" class="form-control col-sm-9" name="item_type" id="item_type"
                            v-model="item_type" readonly/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-row form-inline col-sm-5">
                            <label class="col-sm-3 col-form-label"  for="bill_photo">बिल फोटो</label>
                            <input type="file" class="form-control col-sm-9" name="bill_photo" id="bill_photo" v-bind:readonly="! isLoggedIn"/>
                            <span class="error" v-if="errors.bill_photo" > {{errors.bill_photo}}</span>
                        </div>
                    </div>
                    </div>
                    <div v-else-if="expense_type == 'contract'">
                    <div class="form-group row">
                        <div class="form-row form-inline col-sm-5">
                            <label class="col-sm-3 col-form-label"  for="c_name">कॉन्ट्रेक्ट नाम </label>
                            <input type="text" class="form-control col-sm-9" name="c_name" id="c_name"
                            v-model="c_name" readonly/>
                            <span class="error" v-if="errors.c_name"> {{errors.c_name}}</span>
                        </div>
                        <div class="form-row form-inline col-sm-6">
                            <label class="col-sm-3 col-form-label" for="mobile">मोबाईल </label>
                            <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                            v-model="mobile" readonly/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-row form-inline col-sm-5">
                            <label class="col-sm-3 col-form-label"  for="start_date">कॉन्ट्रेक्ट स्टार्ट </label>
                            <input type="date" class="form-control col-sm-9" name="start_date" id="start_date"
                            v-model="start_date" readonly/>
                            <span class="error" v-if="errors.due"> {{errors.due}}</span>
                        </div>
                        <div class="form-row form-inline col-sm-6">
                            <label class="col-sm-3 col-form-label" for="due_date">कॉन्ट्रेक्ट एन्ड  </label>
                            <input type="date" class="form-control col-sm-9" name="due_date" id="due_date"
                            v-model="due_date" readonly/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-row form-inline col-sm-5">
                            <label class="col-sm-3 col-form-label"  for="village">गाँव  </label>
                            <input type="text" class="form-control col-sm-9" name="village" id="village"
                            v-model="village" readonly/>
                            <span class="error" v-if="errors.village"> {{errors.village}}</span>
                        </div>
                        <div class="form-row form-inline col-sm-6">
                            <label class="col-sm-3 col-form-label"  for="c_desc">कॉन्ट्रेक्ट टिप्पणी </label>
                            <textarea type="text" class="form-control col-sm-9" name="c_desc" id="c_desc"
                            v-model="c_desc" readonly/>
                            <span class="error" v-if="errors.c_desc"> {{errors.c_desc}}</span>
                        </div>
                    </div>
                    </div>
                    <div v-else-if="expense_type == 'other'">
                    <div class="form-group row">
                        <div class="form-row form-inline col-sm-5">
                            <label class="col-sm-3 col-form-label"  for="exp_for">एक्सपेंस नाम </label>
                            <input type="text" class="form-control col-sm-9" name="exp_for" id="exp_for"
                            v-model="exp_for" readonly/>
                            <span class="error" v-if="errors.exp_for"> {{errors.exp_for}}</span>
                        </div>
                        <div class="form-row form-inline col-sm-6">
                            <label class="col-sm-3 col-form-label" for="remark"> एक्सपेंस टिप्पणी</label>
                            <textarea type="text" class="form-control col-sm-9" name="remark" id="remark"
                            v-model="remark" v-bind:readonly="! isLoggedIn"/>
                        </div>
                    </div>
                    </div>
                </div>
                <br>
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
      expense: [],
      errors: [],
      config: [],
      url_data: null,
      id: null,
      agent_id: null,
      c_father: null,
      village: null,
      mobile: null,
      c_name: null,
      start_date: null,
      due_date: null,
      c_desc: null,
      is_contract_new: false,
      is_contractor_new: false,
      bill_number: null,
      item_type: null,
      exp_date: null,
      exp_for: null,
      biller_name: null,
      amount: null,
      amount_type: null,
      due: null,
      check_number: null,
      remark: null,
      rate: null,
      quantity: null,
      expense_type: null,
      bill_photo: null,
      expense_name: null,
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
      if (this.expense_name == undefined || this.expense_name == '' 
      || this.rate == undefined || this.rate == ''
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
      let et = null;
      for (let item in res) {
        if (item === 'contract' || item === 'other' || item === 'material'){
          let ob = res[item];
          //alert(res[item])
          if (typeof ob === "object" && ob !== null && ob) {
            res['expense_type'] = item;
            break;
          } 
        }
      }
      this.agent_id = res.agent_id.id;
      this.id = res.id;
      this.biller_name= res.biller_name;
      this.amount= res.amount;
      this.amount_type= res.amount_type;
      this.due= res.due;
      this.remark= undefined;// res.remark;
      this.rate= res.rate;
      this.quantity= res.quantity;
      this.expense_type = res.expense_type;

      if (res.expense_type == 'contract') {
        this.c_father = res.contract.c_father;
        this.village = res.contract.village;
        this.mobile = res.contract.mobile;
        this.c_name = res.contract.c_name;
        this.start_date = res.contract.start_date;
        this.due_date = res.contract.due_date;
        this.c_desc = undefined; // res.contract.c_desc;
        this.is_contract_new = res.contract.is_contract_new;
        this.is_contractor_new = res.contract.is_contractor_new;
        this.expense_name = res.contract.c_name;
        //alert( res.c_name)
      }
      // if it is material
      if (res.expense_type == 'material') {
        this.item_from = res.material.item_from;
        this.item_type = res.material.item_type;
        this.bill_number = res.material.bill_number;
        this.expense_name = res.material.item_name;

      }
      // if it is other
      if (res.expense_type == 'other') {
        this.exp_for = res.material.exp_for;
        //alert(JSON.stringify(res))
        this.expense_name = res.material.exp_name;
      }
      let fname = res.agent_id.profile.first_name;
      let lname  = res.agent_id.profile.last_name;
      this.agent_name = fname+' '+lname
      
    },
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
    async submit() {
      let logincheck =  this.$store.getters.isAuthenticated;
      if (logincheck === true) {
        const param = {
          amount: this.amount,
          amount_type: this.amount_type,
          due: this.due,
          rate: this.rate,
          quantity: this.quantity,
          remark: this.remark
        }
        // if it is contract
        // if (this.expense_type == 'contract') {
        //   param['due_date'] = this.due_date;
        //   param['c_desc'] = this.c_desc;
        // }
        //alert(JSON.stringify(param))
        let tok = localStorage.getItem('token')
        let updateapi = "prajapatidharmashala/api/expense/update/"+this.id
        await api.patch(updateapi, param,
          {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+tok
          },}
        ).then(res => {
          alert(JSON.stringify(res.data))
          //this.$router.go();
        }).catch(err => {
          alert(err)
          this.showError = true
          this.errors['error'] = err
        })

      } else {
        alert("Not allowed");
      }
    },
    async getdata (id) {
      if (id) {
        let get_expense = '/prajapatidharmashala/api/expense/list/'+id
        let get_usr = '/prajapatidharmashala/api/account/list/'
        const fetchURL = (url) => api.get(url);
        const promiseArray = [get_expense, get_usr].map(fetchURL)
        Promise.all(promiseArray)
        .then((data) => {
          let expense_res = data[0]; // first promise resolved
          this.insert_modal(expense_res.data)

          let user_res = data[1];// second promise resolved
          this.create_table(expense_res.data.history, user_res.data)


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
        {key: 'amount', title: 'राशि'},
        {key: 'agent_name', title: 'एजेंट'},
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