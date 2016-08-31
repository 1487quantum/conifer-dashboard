var runCmd = function(){
  var txtInput =  document.getElementById('txtIn');

  //Vals
  var text_val = txtInput.value;
  printLog(text_val);
};

var printLog = function(val){
  var myTextarea = document.getElementById('consl');

  myTextarea.value += "> "+ val + "\n";
  console.log("CMD: "+ val);
};
