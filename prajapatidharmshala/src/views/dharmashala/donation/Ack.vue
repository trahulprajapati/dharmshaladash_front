<template>          
  <!-- <CRow> -->
    <div class="container" id="ackbox">
      <div class="ackdiv col-sm-9 bg-white text-dark border">
        <div class="box" >
          <div class="hdr ">
              <div>
                <input type="button" @click="printdoc"  id = "printBtn" value="print"/>
              </div>
              <div class="row">
                <div class="col-sm-9 hdrline">
                  <h3> <strong> प्रजापति धर्मशाला दुधाखेड़ी  </strong> </h3>
                  <strong> अनुदान स्वीकृति रसीद  </strong>
                    <!-- <h3> <strong> अनुदान स्वीकृति रसीद</strong> </h3> -->
                </div>
                <div class="col-sm-3">
                  <img src="../../../../public/img/avatars/loginlogo.jpeg" width="110" height="100"> 
                </div>
              </div>
          </div>
          <div class="bgimage bdr">
          <section class="modal-body" id="modalDescription" >
            <slot name="body">
                <!-- <div class="head2"> 
                दान की जानकारी 
              </div> -->
              <div class="date">
              <div class="row justify-content-end">
                <label class="col-md-6 col-lg-2 col-xl-4">
                  रसीद क्र. :  {{ theData.id }}
                </label>
              </div>
              <div class="row justify-content-end">
                <label class="col-md-6 col-lg-2 col-xl-4">
                  दिनाँक & समय : {{ theData.date }}
                </label>
              </div>
              </div>
              <!-- othe filed -->
              <div class="row hdrline"> 
                  <div class="col-sm-8">
                      <label class="lbl">दानदाता : </label> <span> {{ theData.name }} s/o {{ theData.father }} </span>
                  </div>
                  <div class="col-sm-3">
                      <label class="lbl">गाँव :</label> <span> {{ theData.village }} </span>
                  </div>
              </div>
              <div class="row contnt"> 
                  <div class="col-sm-7">
                      <label class="lbl">एजेंट  : </label> <span> {{ agent }} </span>
                  </div>
              </div>  <br>
              <span> द्वारा निम्न दान प्राप्त हुआ -  </span>
              <div class="row">
                  <table class="table tbl">
                    <tr>
                      <th> डोनेशन प्रकार </th>
                      <th> राशि प्रकार</th>
                      <th> राशि </th>
                      <th> बकाया </th>
                      <th> अन्य </th>
                    </tr>
                    <tr> 
                      <td> {{ theData.donation_type }} </td>
                      <td> {{ amount_type }} </td>
                      <td> {{ theData.amount }} </td>
                      <td> {{ theData.due }} </td>
                      <td> {{ theData.other }} </td>
                    </tr>
                  </table>
              </div>
              <div class="row contnt"> 
                <strong> नोट : </strong>
                <ul>
                <li>दान देने के पश्चात् रसीद अवश्य लें </li>
                <li>दान सत्यापित  करने के लिए डोनेशन लिस्ट देखें   </li>
                <li> कृपया एजेंट को रसीद में दी गई राशि ही दें  </li>
              </ul> 
              </div>
            </slot>
          </section>
          </div>
          <div class="ftr ">
            <slot name="footer">
                * यह एक कम्यूटर जनरेटेड रसीद है अतः हस्ताक्षर अनिवार्य नहीं। 
            </slot>
          </div>
        </div>
      </div>
    </div>
  <!-- </CRow> -->
</template>

<script>
import Table from '../base/Table.vue'

  export default {
  components: { Table },
    name: 'Ack',
    props: {
      theData: {
        type: Object,
      },
      agent : { 
        type:String,
      }
    },
    data() {
      return {
        error: [],
        amount_type: 'cash'
      }
    },
    methods: {
      printdoc(div) {
        //  var elements = document.querySelectorAll( 'body *' );
        // console.log(elements);

        window.print();
        /*let menu_bar = document.getElementsByClassName('container')[0];
        let headbar = document.getElementsByClassName('headbar')[0];
        let tab_container = document.getElementsByClassName('tab-container')[0];
        let printBtn = document.getElementById("printBtn");
        let printDiv = document.getElementById("ackbox")
        // add class to the corresponding DOM
        menu_bar.classList.add("noprint")
        headbar.classList.add("noprint")
        tab_container.classList.add("noprint")
        printBtn.classList.add("noprint")
        printDiv.classList.add("toTopwilePrint")

        window.print (); // invoking print
        window.location.reload();*/
        /*alert(div)
        let printContents = document.getElementById(div).innerHTML;
        alert(printContents)
        console.log(printContents);
        let w=window.open();
        w.document.write(printContents);
        w.print();
        w.close(); */
      },
      print() {
       // this.$htmlToPaper('ackbox');
      }
    }

  }
    


</script>

<style scoped>
  .ackdiv {
    /* margin-right: 10px; */
    margin: 5px 50px 5px 100px;
  }
  .box {
    border: 4px solid black;
    margin: 30px;
  }
  .ftr {
    font-size: 12px;
    padding-top: 50px; 
    padding-bottom: 20px;
  }
  .tbl {
    margin: 20px;
  }
  /* .header {
    font-size: 24px;
  } */
  .bdr {
    border-top: 1px solid #bbb;
    margin: 5px 20px 5px 20px;
  }
  .hdrline {
    padding-top: 30px;
    /* padding-left: 30px;  */
  }
  .date {
    padding-bottom: 10px;
  }
  .contnt {
    padding-top: 5px;
    /* padding-left: 30px;  */
  }
  .contnt1 {
    padding-top: 2px;
    /* padding-left: 30px;  */
  }
  .head2 {
    padding-top: 7px;
    padding-bottom: 7px; 
    /* border-top: 3px solid #bbb; */
    border-bottom: 3px solid #bbb;
  }
  .hdr {
    margin: 5px 20px 5px 20px;
    /* padding: 40px; */
    /* padding-bottom: 50px; */
    padding-top: 30px;
    color: black;
    background:white
  }
  .col-md-2 {
    float: right !important;
  }

  .lbl {
    font-size: 13px;
    font-weight: bold;
    color: black;
  }
  .bgimage {
    /* background-image: url('../../../../public/img/avatars/loginlogo.jpeg'); */
  }
</style>