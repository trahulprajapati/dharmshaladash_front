<template>
<CRow>
    <div class="container">
        <div class="col-sm-12 bg-white text-dark border">
          <div class="row frow header border">
              <h5><strong class="col-sm-9">रिपोर्ट  </strong></h5>
          </div>
          <br>
          <div class="row frowc d-flex justify-content-center">
            <form class="col-12" @submit.prevent="submit">
              <span class="error" v-if="showError">  {{errors.error}}</span>
              <div style="border-bottom: 2px solid #bbb ">
                <div class="form-group row">
                  <div class="form-row form-inline col-sm-11">
                      <label class="col-sm-2 col-form-label" for="report_type"> <b> रिपोर्ट  प्रकार * </b></label>
                      <select class="form-control col-sm-10" id="report_type" v-model="report_type">
                        <option value="donation">डोनेशन  </option>
                        <option value="expense">एक्सपेंस  </option>
                      </select>
                  </div>
                </div>
                <br>
              </div> <br>
              <div v-if="report_type == 'donation'">
                <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="subtype" required>प्रकार  *</label>
                        <select class="form-control col-sm-9" id="subtype" v-model="subtype">
                          <option value="CONST">निर्माण  </option>
                          <option value="EVENT">प्रोग्राम   </option>
                          <option value="ALL">पूर्ण</option>
                          <option>सम्मलेन </option>
                          <option value="OTHER">अन्य </option>
                      </select>
                        <span class="error" v-if="errors.name"> {{errors.name}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="duration">समयांतराल *</label>
                        <select class="form-control col-sm-9" id="duration" v-model="duration">
                            <option value="custom">अन्य</option>
                          <option value="monthly">महीना रिपोर्ट</option>
                          <option value="yearly">सालाना रिपोर्ट</option>
                      </select>
                    </div>
                </div>
                <div v-if="duration" class="form-group row">
                    <div v-if="duration == 'yearly'" class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="yearly" required>साल *</label>
                        <select class="form-control col-sm-9" id="yearly" v-model="yearly">
                          <option v-for="y in years" :value="y" :key="y">{{ y }}</option>
                      </select>
                    </div>
                    <div v-else-if="duration == 'monthly'" class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="monthly" required>महीना *</label>
                        <select class="form-control col-sm-9"  id="monthly" v-model="monthly">
                          <option value="select"> Select</option>
                          <option v-for="mon in months" :value="mon.id" :key="mon.id">{{ mon.text }}</option>
                      </select>
                    </div>
                      <div v-if="duration == 'custom'" class="form-row form-inline col-sm-5">
                          <label class="col-sm-3 col-form-label"  for="from" required>फ्रॉम (कब से) *</label>
                          <input type="date" class="form-control col-sm-9" name="from" id="from"
                          v-model="from"/>
                      </div>
                      <div v-if="duration == 'custom'" class="form-row form-inline col-sm-6">
                          <label class="col-sm-3 col-form-label" for="to">टू  (कब तक )*</label>
                          <input type="date" class="form-control col-sm-9" name="to" id="to"
                        v-model="to"/>
                      </div>
                </div>
              </div>
              <div v-else-if="report_type == 'expense'">
                <div class="form-group row">
                    <div class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="subtype" required>प्रकार  *</label>
                        <select class="form-control col-sm-9" id="subtype" v-model="subtype">
                          <option value="contract">निर्माण </option>
                          <option value="all">पूर्ण</option>
                          <!-- <option value="material">matrial</option> -->
                          <option value="other">अन्य </option>
                      </select>
                        <span class="error" v-if="errors.name"> {{errors.name}}</span>
                    </div>
                    <div class="form-row form-inline col-sm-6">
                        <label class="col-sm-3 col-form-label" for="duration">समयांतराल *</label>
                        <select class="form-control col-sm-9" id="duration" v-model="duration">
                          <option value="custom">अन्य</option>
                          <option value="monthly">महीना रिपोर्ट</option>
                          <option value="yearly">सालाना रिपोर्ट</option>
                      </select>
                    </div>
                </div>
                <div v-if="duration" class="form-group row">
                    <div v-if="duration == 'yearly'" class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="yearly" required>साल *</label>
                        <select class="form-control col-sm-9" id="yearly" v-model="yearly">
                          <option v-for="y in years" :value="y" :key="y">{{ y }}</option>
                      </select>
                    </div>
                    <div v-else-if="duration == 'monthly'" class="form-row form-inline col-sm-5">
                        <label class="col-sm-3 col-form-label"  for="monthly" required>महीना *</label>
                        <select class="form-control col-sm-9" id="monthly" v-model="monthly">
                          <option v-for="mon in months" :value="mon.id" :key="mon.id"> {{ mon.text }}</option>
                      </select>
                    </div>
                      <div v-if="duration == 'custom'" class="form-row form-inline col-sm-5">
                          <label class="col-sm-3 col-form-label"  for="from" required>फ्रॉम (कब से) *</label>
                          <input type="date" class="form-control col-sm-9"  onfocus="blur()" name="from" id="from"
                          v-model="from"/>
                          <span class="error" v-if="errors.from"> {{errors.c_desc}}</span>
                      </div>
                      <div v-if="duration == 'custom'" class="form-row form-inline col-sm-6">
                          <label class="col-sm-3 col-form-label" for="to">टू  (कब तक )*</label>
                          <input type="date" class="form-control col-sm-9" name="to" id="to"
                        v-model="to"/>
                        <span class="error" v-if="errors.to"> {{errors.c_desc}}</span>
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
          </div> <br> 
          <div v-if="Repdata" class="bdr">
            <!-- <div class="row frow">
              <h5><strong class="col-sm-12"> Report </strong></h5>
            </div> -->
            <DTable
                    v-if="Repdata"
                    :theData="Repdata"
                    :config="config"
                    :pageSize="10"
                    :isSearch=false
                    :style="{height: '600px'}"
                />
          </div>
      </div>
       
    </div>
</CRow>

</template>

<script>
//import { api } from  '../../../'
import { api } from '../../../api.js';
import DTable from '../base/CoreTable.vue'
export default {
  name: 'Report',
  components: {
    DTable,
  },
  data() {
    return {
      errors: [],
      Repdata: [],
      showError:false,
      //agent_id: null,
      report_type: null,
      d_type: undefined,
      e_type:undefined,
      duration: undefined,
      yearly: undefined,
      monthly: undefined,
      from: undefined,
      to: undefined,
      subtype_st: false,
      subtype: undefined,
      session: false,
      months: [
        { id: '01', text: "जनवरी" },
        { id: '02', text: "फरवरी" },
        { id: '03', text: "मार्च" },
        { id: '04', text: "अप्रैल" },
        { id: '05', text: "मई" },
        { id: '06', text: "जून" },
        { id: '07', text: "जुलाई" },
        { id: '08', text: "अगस्त" },
        { id: '09', text: "सितम्बर" },
        { id: '10', text: "अक्टूबर" },
        { id: '11', text: "नवम्बर" },
        { id: '12', text: "दिसंबर" }
      ],
      years: [],
      currentyear: undefined,
      config: []
    }
  },
  created() {
    var year = new Date().getFullYear();
    this.currentyear = year;
    year = year - 1;
    for (var i=0; i < 3; i++) {
       this.years.push(year-i);
    }
    
  },
  watch: {
    // d_type(val) {
    //   //this.subtype= false;
    //   if (this.e_type) {
    //     this.e_type = undefined
    //   }
    //   if (val) {
    //     this.subtype = true
    //   }
    // },
    // e_type (val) {
    //   if (this.d_type) {
    //     this.d_type = undefined
    //   }
    //   //this.subtype= false;
    //   if (val) {
    //     this.subtype = true;
    //   }
    // },
    report_type(val){
      if (val){
        this.subtype = undefined;
      }
    },
    duration (val) {
      if (val) {
        this.subtype_st = true;
      }
    },
    monthly (val){
      if (this.yearly) {
        this.yearly = undefined
      }
      if (this.to) {
        this.to = undefined
      }
      
      if (this.from) {
        this.from = undefined
      }
      
      this.session = false;
      if (val) {
        this.session = true;
      } else {
        this.session = false;
      }
    },
    yearly (val){
      if (this.monthly) {
        this.monthly = undefined;
      }
      if (this.to) {
        this.to = undefined
      }
      
      if (this.from) {
        this.from = undefined
      }
      if (val) {
        this.session = true;
      } else {
        this.session = false;
      }
    },
    from (val){
       if (this.monthly) {
        this.monthly = undefined;
      }
       if (this.yearly) {
        this.yearly = undefined
      }
      if (val) {
        this.session = true;
      } else {
        this.session = false;
      }
      this.require_check('from', val, 'From');
    },
    to (val){
      if (this.monthly) {
        this.monthly = undefined;
      }
       if (this.yearly) {
        this.yearly = undefined
      }
      if (val) {
        this.session = true;
      }
      this.require_check('from', val, 'To');

    }
  },
  computed:{
    isDisabled() {
      if (this.report_type == undefined || this.report_type == ''
      || this.duration == undefined || this.duration == ''
      || this.subtype_st == false
      || this.session == false 
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
      this.type =  undefined;
      this.report_type = null;
      // this.d_type= undefined;
      // this.e_type=undefined;
      this.duration= undefined;
      this.yearly= undefined;
      this.subtype= undefined;
      this.monthly= undefined;
      this.from= undefined;
      this.to= undefined;
      this.errors= [];
      this.Repdata=[]
    },
    getLastDate (y, m) {
      return  new Date(y, m +1, 0).getDate();
    },
    create_table(val) {
      //alert(this.report_type)
      if (val === null || val === undefined) {
        alert ('No Records found');
      }
      alert(JSON.stringify(val))
      val.forEach((item) => {
        let fname = item.agent_id.profile.first_name;
        let lname  = item.agent_id.profile.last_name;
        item.agent_name = fname+' '+lname
        //item.exps_name = 
        item.agent_id = item.agent_id.id;
      })
      this.Repdata = val
      if (this.report_type === 'expense') {
        this.config = [
          {key: 'exp_type', title: 'खर्च प्रकार'},
          {key: 'exp_name', title: 'खर्च नाम'},
          {key: 'biller_name', title: 'बिलर'},
          {key: 'amount', title: 'राशि'},
          {key: 'exp_date', title: 'तारीख'},
          {key: 'quantity', title: 'मात्रा'},
          {key: 'rate', title: 'दर'},
          {key: 'agent_name', title: 'एजेंट'}, 
          {key: 'remark', title: 'टिपण्णी'},
        ];
      } else if (this.report_type === 'donation') {
        alert('in donationmnnn')
        this.config = [
          {key: 'd_type', title: 'दान प्रकार'},
          {key: 'name', title: 'नाम'},
          {key: 'father', title: 'पिता'},
          {key: 'village', title: 'गांव'},
          {key: 'amount', title: 'राशि'},
          {key: 'date', title: 'तारीख'},
          {key: 'agent_name', title: 'एजेंट'}, 
          {key: 'remark', title: 'टिपण्णी'},
        ];
      } else {
        alert('Unknown type')
      }
      //var i = 0;
      /*val.forEach((item) => {
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
      ];*/

      // console.log(JSON.stringify(arr))
    },
    async submit() {      
      const param = {type: this.subtype}
      // if (this.d_type) {
      //   //param['type'] = this.d_type
      //   param['type'] = this.subtype
      // }
      // if (this.e_type) {
      //   param['type'] = this.subtype
      // }
      if (this.monthly) {
        let frm = this.currentyear+'-'+this.monthly+'-01'
        var lastdate = this.getLastDate(2021,this.monthly-1);
        let to = this.currentyear+'-'+this.monthly+'-'+lastdate
        param['from'] = frm;
        param['to'] = to;
      } else if (this.yearly) {
        param['from'] = this.yearly+'-'+'01-01';
        param['to'] = this.yearly+'-'+'12-31';
      } else {
        param['from'] = this.from;
        param['to'] = this.to;
      }
      let cansubmit = true;
      if (new Date(param.from) > new Date(param.to)) {
        cansubmit = false
        this.errors['error'] = 'फ्रॉम डेट, टू डेट से अधिक होना चाहिए';
        alert("फ्रॉम डेट, टू डेट से अधिक होना चाहिए ");
        
      }

      if (this.report_type == 'expense' || this.report_type == 'donation') {
      } else {
        cansubmit = false
        let msg = 'Wrong report type';
        this.errors['error'] = msg;
        alert(msg);
      }
      if (param.type === undefined || param.type === null || param.type === '') {
        cansubmit = false
        let msg = 'Sub type is required';
        this.errors['error'] = msg;
        alert(msg)
      }
      var len = Object.keys(param).length;
      if (len !== 3) {
        cansubmit = false
        let msg = 'Parameter is not correct';
        this.errors['error'] = msg;
        alert(msg)
      }
      if (cansubmit) {
        ///http://127.0.0.1:8000/prajapatidharmashala/api/expense/getdata?from=2021-06-30&to=2021-07-10
        alert(JSON.stringify(param))
        //api.get('/prajapatidharmashala/api/'+this.report_type+'/getdata', param).then(res => {
          //api.get('/prajapatidharmashala/api/expense/getdata', param).then(res => {
          //api.get('/prajapatidharmashala/api/expense/getdata?from='+param.from+'&to='+param.to+'&type='+param.type).then(res => {
          api.get('/prajapatidharmashala/api/'+this.report_type+'/getdata?from='+param.from+'&to='+param.to+'&type='+param.type).then(res => {
          this.create_table(res.data)
        }).catch( e => {
          alert (e);
          errors['error'] = e;
        })
        //{"report_type":"donation","d_type":"CONST","from":"2021-07-25","to":"2021-07-29"}
        //let o =  this.$store.getters.isAuthenticated;
        /*let tok = localStorage.getItem('token')
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
        })*/
      } else {
        alert ("Something went wrong, PLease check all the values")
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
.bdr {
  border-top: 3px solid #bbb;
}
.frowc {
  /* padding: 7px; */
  padding-left: 80px;
  padding-right: 60px;
  padding-top: 7px;
}

</style>