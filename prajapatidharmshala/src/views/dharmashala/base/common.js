
function validte_form (val){
    return (val == undefined || val == '') ? true : false
}

function require_check(prop, val, p) {
    if (!val) {
      this.errors[prop] = p+' is required';
    } else {
      this.errors[prop] = '';
    }
  }
export default {
    validte_form,
}