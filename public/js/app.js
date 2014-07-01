var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        $.post(
        "/post", // Gets the URL to sent the post to
        {applicantId : '123', base64png: signaturePad.toDataURL()}, // Serializes form data in standard format
        function(data ) { 
            alert("applicant" + " : " + data.applicantId +" saved!");
            var baseString = data.base64png;
            var index = baseString.indexOf(",");  // Gets the first index where a space occours
            var imageEncodeType = baseString.substr(0, index); // Gets the first part
            var textCode = baseString.substr(index + 1);
            console.log("type" + " : " + imageEncodeType );
            console.log("code" + " : " + textCode);
         },
        "json" // The format the response should be in
    );
        //window.open(signaturePad.toDataURL());
    }
});
