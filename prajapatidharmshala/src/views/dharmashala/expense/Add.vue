<template>
<CRow>
    <div class="container">
        <!-- <Ack v-if="ack"
            :theData="ackdata"
            :agent = agent_name
        >
        </Ack> -->
        <div class="col-sm-12 bg-white text-dark border">
          <div class="row frow header border">
              <h5><strong class="col-sm-8"> एक्सपेंस जोड़ें </strong></h5>
          </div>
          <br>
          <div class="row frowc d-flex justify-content-center">
            <form class="col-12" @submit.prevent="submit">
              <span class="error" v-if="showError">  {{errors.error}}</span>
              <div style="border-bottom: 2px solid #bbb;">
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-11">
                      <label class="col-sm-2 col-form-label" for="father"> <b> एक्सपेंस प्रकार * </b></label>
                      <select class="form-control col-sm-10" id="expense_type" v-model="expense_type">
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
                    <label class="col-sm-3 col-form-label"  for="exp_name" required> एक्सपेंस नाम</label>
                    <input type="text" class="form-control col-sm-9" name="exp_name" id="exp_name"
                    v-model="exp_name" required/>
                    <span class="error" v-if="errors.exp_name"> {{errors.exp_name}}</span>
                </div>
                <div class="form-row form-inline col-sm-6">
                    <label class="col-sm-3 col-form-label" for="biller_name">बिलर *</label>
                    <input type="text" class="form-control col-sm-9" name="biller_name" id="biller_name"
                    v-model="biller_name" required/>
                    <span class="error" v-if="errors.biller_name"> {{errors.biller_name}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="rate">दर *</label>
                    <input type="text" class="form-control col-sm-9" name="rate" id="rate"
                    v-model="rate" required/>
                    <span class="error" v-if="errors.rate"> {{errors.rate}}</span>
                </div>
                <div class="form-row form-inline col-sm-6">
                    <label class="col-sm-3 col-form-label"  for="quantity">मात्रा *</label>
                    <input type="text" class="form-control col-sm-9" name="quantity" id="quantity"
                    v-model="quantity" required/>
                    <span class="error" v-if="errors.quantity"> {{errors.quantity}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="amount_type">राशि प्रकार *</label>
                    <select class="form-control col-sm-9" id="amount_type" v-model="amount_type">
                        <option value="cash">कैश </option>
                        <option value="check">चेक </option>
                      </select>
                    <span class="error" v-if="errors.amount_type"> {{errors.amount_type}}</span>
                </div>
                <div class="form-row form-inline col-sm-6">
                    <label class="col-sm-3 col-form-label" for="amount">राशि </label>
                    <input type="text" class="form-control col-sm-9" name="amount" id="amount"
                      v-model="amount"/>
                    <span class="error" v-if="errors.amount"> {{errors.amount}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label"  for="due">बकाया </label>
                    <input type="text" class="form-control col-sm-9" name="due" id="due"
                    v-model="due"/>
                    <span class="error" v-if="errors.due"> {{errors.due}}</span>
                </div>
                <div class="form-row form-inline col-sm-6">
                    <label class="col-sm-3 col-form-label" for="remark">टिप्पणी</label>
                    <textarea type="text" class="form-control col-sm-9" name="remark" id="remark"
                    v-model="remark"/>
                </div>
              </div>
              <div style="border-top: 2px solid #bbb;">
                <br>
                <div v-if="expense_type == 'material'">
                  <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="bill_number">बिल नंबर </label>
                        <input type="text" class="form-control col-sm-9" name="bill_number" id="bill_number"
                        v-model="bill_number"/>
                        <span class="error" v-if="errors.bill_number"> {{errors.bill_number}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="item_type">प्रकार </label>
                        <input type="text" class="form-control col-sm-9" name="item_type" id="item_type"
                        v-model="item_type"/>
                    </div>
                  </div>
                   <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="bill_photo">बिल फोटो</label>
                        <input type="file" class="form-control col-sm-9" name="bill_photo" id="bill_photo"/>
                        <span class="error" v-if="errors.bill_photo"> {{errors.bill_photo}}</span>
                    </div>
                  </div>
                </div>
                <div v-else-if="expense_type == 'contract'">
                  <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="c_name">कॉन्ट्रेक्ट नाम </label>
                        <input type="text" class="form-control col-sm-9" name="c_name" id="c_name"
                        v-model="c_name"/>
                        <span class="error" v-if="errors.c_name"> {{errors.c_name}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="mobile">मोबाईल </label>
                        <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                        v-model="mobile"/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="start_date">कॉन्ट्रेक्ट स्टार्ट </label>
                        <input type="date" class="form-control col-sm-9" name="start_date" id="start_date"
                        v-model="start_date"/>
                        <span class="error" v-if="errors.due"> {{errors.due}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="due_date">कॉन्ट्रेक्ट एन्ड  </label>
                        <input type="date" class="form-control col-sm-9" name="due_date" id="due_date"
                        v-model="due_date"/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="village">गाँव  </label>
                        <input type="text" class="form-control col-sm-9" name="village" id="village"
                        v-model="village"/>
                        <span class="error" v-if="errors.village"> {{errors.village}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label"  for="c_desc">कॉन्ट्रेक्ट टिप्पणी </label>
                        <textarea type="text" class="form-control col-sm-9" name="c_desc" id="c_desc"
                        v-model="c_desc"/>
                        <span class="error" v-if="errors.c_desc"> {{errors.c_desc}}</span>
                    </div>
                  </div>
                </div>
                <div v-else-if="expense_type == 'other'">
                  <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-2 col-form-label"  for="exp_for">एक्सपेंस नाम </label>
                        <input type="text" class="form-control col-sm-9" name="exp_for" id="exp_for"
                        v-model="exp_for"/>
                        <span class="error" v-if="errors.exp_for"> {{errors.exp_for}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="remark"> एक्सपेंस टिप्पणी</label>
                        <textarea type="text" class="form-control col-sm-9" name="remark" id="remark"
                        v-model="remark"/>
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" :class="['btn btn-primary mb-2 mr-4']" :disabled="isDisabled">सम्पादित करें</button>
                   <button type="button" class="btn btn-primary mb-2" @click="reset_form">रिसेट</button>
                </div>
              </div>
            </form>
          </div>
        </div>
       
    </div>
</CRow>

</template>

<script>
//import { api } from  '../../../'
import Ack from '../donation/Ack.vue'
import { api } from '../../../api.js';
export default {
  name: 'Add',
  components: {
    Ack,
  },
  data() {
    return {
      errors: [],
      showError:false,
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
      exp_name: undefined
      //agent_name: null
    }
  },
  created() {
    if (this.$store.getters.isAuthenticated === false) {
      alert("Unathorized");
      this.$router.push("/dashboard");
    } 
    let mob = localStorage.getItem('mobile');
    this.agent_name = localStorage.getItem('name');
    //get id from mobile
    api.get('/prajapatidharmashala/api/account/get_uid?mobile='+mob).then(res => {
      this.agent_id = res.data.id;
    }).catch( e => {
      alert(JSON.stringify(e))
    })
  },
  watch: {
    mobile(value) {
      this.mobile = value;
      this.require_check('mobile', value, 'Mobile');

      //mobile number validation
      var phoneno = /^\d{10}$/;
      if (value.match(phoneno)) {
        this.errors['mobile'] = '';
      } else {
        this.errors['mobile'] = 'Mobile Number is Invalid';
      }
    },
    due (val) {
      var inte = /^\d*$/;
      if (val.match(inte)) {
        this.errors['due'] = '';
      } else {
        this.errors['due'] = 'Invalid due amount';
      }
    },
    amount (val) {
      var inte = /^\d*$/;
      if (val.match(inte)) {
        this.errors['amount'] = '';
      } else {
        this.errors['amount'] = 'Invalid amount';
        this.showError = true
      }
    }

  },
  computed:{
    isDisabled() {
      if (this.biller_name == undefined || this.biller_name == ''
      || this.quantity == undefined || this.quantity == ''
      || this.exp_name == undefined || this.exp_name == ''
      || this.expense_type == undefined || this.expense_type == ''
      || this.rate == undefined || this.rate == ''
      || this.amount == undefined || this.amount == ''
      || ((this.expense_type == 'contract') && (this.c_name == undefined || this.c_name == ''))
      || ((this.expense_type == 'material') && (this.bill_number == undefined || this.bill_number == ''))
      || ((this.expense_type == 'other') && (this.exp_for == undefined || this.exp_for == ''))
      || this.remark == undefined || this.remark == ''
      || this.errors.length > 0 ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
    reset_form(){
      this.c_father = ''
      this.village = ''
      this.mobile = ''
      this.c_name = ''
      this.start_date= ''
      this.due_date= ''
      this.c_desc= ''
      this.is_contract_new= false
      this.is_contractor_new= false
      this.bill_number= ''
      this.item_type= ''
      this.exp_date= ''
      this.exp_for= ''
      this.biller_name= ''
      this.amount= ''
      this.amount_type= ''
      this.due= ''
      this.check_number= ''
      this.remark= ''
      this.rate= ''
      this.quantity= ''
      this.exp_name=''
      this.errors = []
    },

    async submit() {
      let logincheck =  this.$store.getters.isAuthenticated;
      if (logincheck === true) {
        const param = {
          agent_id: this.agent_id,
          biller_name: this.biller_name,
          amount: this.amount,
          amount_type: this.amount_type,
          due: this.due,
          remark: this.remark,
          rate: this.rate,
          quantity: this.quantity,
          exp_type: this.expense_type,
          exp_name: this.exp_name
        }
        // if it is contract
        if (this.expense_type == 'contract') {
          param['c_father'] = this.c_father;
          param['village'] = this.village;
          param['mobile'] = this.mobile;
          param['c_name'] = this.c_name;
          param['start_date'] = this.start_date;
          param['due_date'] = this.due_date;
          param['c_desc'] = this.c_desc;
          param['is_contract_new'] = this.is_contract_new;
          param['is_contractor_new'] = this.is_contractor_new;
        }
        // if it is material
        if (this.expense_type == 'material') {
          param['item_from'] = this.item_from;
          param['item_type'] = this.item_type;
          param['bill_number'] = this.bill_number;
        }
        // if it is other
        if (this.expense_type == 'other') {
          param['exp_for'] = this.exp_for;
        }
        //let o $$$$=  this.$store.getters.isAuthenticated;
        let tok = localStorage.getItem('token')
        //alert(JSON.stringify(param))
        await api.post("/prajapatidharmashala/api/expense/add", param,
          {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+tok
          },}
        ).then(res => {
            if (res.data.success) {
              //alert(JSON.stringify(res.data))
              let id = res.data.data.id;
              this.$router.push("/dharmashala/expense/get/"+id);
              //this.ackdata = res.data.data;
              //this.ack = true;
            } else {
              this.errors['error'] = "Something went wrong"
            }
            this.reset_form();
            //this.$router.push("/dharmashala/user/list");
        }).catch(err => {
          //alert(err)
          alert(JSON.stringify(err.response.data))
          this.showError = true
          this.errors['error'] = err+JSON.stringify(err.response.data)
        })
      } else {
        alert("Not allowed");
      }
    }, //-- END 

  }
}
</script>

<style scoped>
.header {
  padding: 60px;
  text-align: center;
  background: rgb(99, 110, 117);
  color: white;
  font-size: 30px;
}

.error {
  color: red;
}
.frow {
  padding: 7px;
}
.frowc {
  /* padding: 7px; */
  padding-left: 70px;
  padding-right: 60px;
  padding-top: 7px;
}

</style>