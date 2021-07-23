<template>
<CRow>
    <div class="container">
        <Ack v-if="ack"
        :theData="ackdata"
        :agent = agent_name
        >
        </Ack>
        <div v-else class="col-sm-10 bg-white text-dark border">
          <div class="row frow header border">
              <h5><strong class="col-sm-9"> डोनेशन जोड़ें </strong></h5>
          </div>
          <br>
          <div class="row frow d-flex justify-content-center">
            <form class="col-12" @submit.prevent="submit">
              <span class="error" v-if="showError">  {{errors.error}}</span>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="name" required>नाम *</label>
                    <input type="text" class="form-control col-sm-9" name="name" id="name"
                    v-model="name" required/>
                    <span class="error" v-if="errors.name"> {{errors.name}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="father">पिता *</label>
                    <input type="text" class="form-control col-sm-9" name="father" id="father"
                    v-model="father" required/>
                    <span class="error" v-if="errors.father"> {{errors.father}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label" for="village">गाँव *</label>
                    <input type="text" class="form-control col-sm-9" name="village" id="village"
                    v-model="village" required/>
                    <span class="error" v-if="errors.village"> {{errors.village}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label"  for="mobile">मोबाइल *</label>
                    <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                    v-model="mobile" required/>
                    <span class="error" v-if="errors.mobile"> {{errors.mobile}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="donation_type">डोनेशन प्रकार </label>
                    <select class="form-control col-sm-9" id="donation_type" v-model="donation_type">
                      <option value="AMOUNT">राशि </option>
                      <option value="OTHER">अन्य </option>
                    </select>
                </div>
                <div v-if="amounttext" class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="amount">राशि </label>
                    <input type="text" class="form-control col-sm-9" name="amount" id="amount"
                    v-model="amount"/>
                    <span class="error" v-if="errors.amount"> {{errors.amount}}</span>
                </div>
                <div v-else class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="other">अन्य</label>
                    <input type="text" class="form-control col-sm-9" name="other" id="other"
                    v-model="other"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="due">बकाया </label>
                    <input type="text" class="form-control col-sm-9" name="due" id="due"
                    v-model="due"/>
                    <span class="error" v-if="errors.due"> {{errors.due}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="remark">टिप्पणी</label>
                    <textarea type="text" class="form-control col-sm-9" name="remark" id="remark"
                    v-model="remark"/>
                    <!-- <input type="text" class="form-control col-sm-9" name="remark" id="remark"
                    v-model="remark"/> -->
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" :class="['btn btn-primary mb-2 mr-4']" :disabled="isDisabled">सम्पादित करें</button>
                   <button type="submit" class="btn btn-primary mb-2" @click="reset_form">रिसेट</button>
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
      name: null,
      donation_type: 'AMOUNT',
      father: null,
      amount: null,
      village: null,
      mobile: null,
      other: 'NA',
      remark: null,
      due: 0,
      amounttext: true,
      othertext: false,
      ackdata: null,
      ack: false,
      agent_name: null
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
    name(value) {
      this.name = value;
      this.require_check('name', value, 'Name');
    },
    village(value) {
      this.village = value;
      this.require_check('village', value, 'Village');
    },
    father(value) {
      this.father = value;
      this.require_check('father', value, 'Father');
    },
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
    donation_type(value) {
      if (value === 'AMOUNT') {
        this.amounttext = true;
      } else {
        this.amounttext = false
      }
      //alert(value)
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
      if (this.name == undefined || this.name == ''
      || this.father == undefined || this.father == ''
      || this.village == undefined || this.village == ''
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
      this.name = ''
      this.mobile = ''
      this.village = ''
      this.amount = ''
      this.remark = ''  
      this.due=0
      this.other = ''
      this.errors.error=''
      this.errors = []
    },
    async submit() {
      let logincheck =  this.$store.getters.isAuthenticated;
      if (logincheck === true) {
        const param = {
          agent_id: this.agent_id,
          name: this.name,
          village: this.village,
          father: this.father,
          mobile: this.mobile,
          amount: this.amount,
          remark: this.remark,
          due: this.due,
          other: this.other,
          donation_type: this.donation_type
        }
        //alert(JSON.stringify(param))
        //let o =  this.$store.getters.isAuthenticated;
        let tok = localStorage.getItem('token')
        // console.log(JSON.stringify(user) + '----' + tok);
        await api.post("/prajapatidharmashala/api/donation/add", param,
          {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+tok
          },}
        ).then(res => {
            alert(JSON.stringify(res.data))
            if (res.data.success) {
              this.ackdata = res.data.data;
              this.ack = true;
            } else {
              this.errors['error'] = "Something went wrong"
            }
            this.reset_form();
            //this.$router.push("/dharmashala/user/list");
        }).catch(err => {
          //alert(err)
          //alert(JSON.stringify(err.response.data))
          this.showError = true
          this.errors['error'] = err+JSON.stringify(err.response.data)
        })
      } else {
        alert("Not allowed");
      }
    },
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
</style>