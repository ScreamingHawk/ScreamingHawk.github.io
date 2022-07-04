// All others
$(document).ready(function() {
  // Print
  $(".print-content-button").click(function() {
    var printContents = $(".print-content");
    if (printContents.length == 0){
      printContents = $(".block-right .content");
    }
    printContents = printContents.html();
    var originalContents = $("body").html();

    $("body").html(printContents);

    window.print();

    $("body").html(originalContents);
  });
});

