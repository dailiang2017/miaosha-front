<script>
  const passsword_salt="th8is&7&my#@aa-9e^6^1*)"
  function recombine(inputPass) {
    var str = ""+passsword_salt.charAt(5)+passsword_salt.charAt(8) + inputPass +passsword_salt.charAt(6) + passsword_salt.charAt(2)
    return str
  }
  // --------各种key  start--------
  const error_key="error_key"
  // --------各种key    end--------

  export default {
    recombine,
    error_key
  }
</script>

