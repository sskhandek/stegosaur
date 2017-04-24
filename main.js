InboxSDK.load('1.0', 'sdk_stegosaur_1b4904456f').then(function(sdk){
  sdk.Compose.registerComposeViewHandler(function(composeView){
    var statusBarView = composeView.addStatusBar({
      height: 40
    });

    $.get(chrome.extension.getURL('imageselect.html'), function(data) {
      statusBarView.el.innerHTML = data;
      bindAddressInputToPreviewImage(statusBarView.el);
      insertImageToThreadOnClick(statusBarView.el, composeView);
    });
  });
});

function insertImageToThreadOnClick(statusBar, composeView) {
  $(statusBar).find("#steg-insert").click(function() {
    var canvas = $(statusBar).find("#steg-canvas").get(0);
    console.log($('#steg-address').val(), $('#steg-message').val())


    // Do Steganography here
    // http://stackoverflow.com/questions/667045/getpixel-from-html-canvas

    var message =  $('#steg-message').val();
    var password = "mypassword"; // Password will go here
    if (password.length > 0) {
      message = sjcl.encrypt(password, message);
    } else {
      alert("need a password")
      return;
    }
    console.log(message);

    var ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    var colors = imgData.data;

    // Manipulation here //

    imgData.data = colors
    ctx.putImageData(imgData, 0, 0)

    var imageText = canvas.toDataURL();
    imageText = imageText.split("base64")[1];
    uploadToImgurAndInsertToThread(composeView, imageText);

    // Validating
    console.log(resultingMessage)
    console.log(sjcl.decrypt(password, message));

  });
}

function bindAddressInputToPreviewImage(statusBar) {
  $(statusBar).find("#steg-address").change(function() {
    var imageAddress = $(statusBar).find("#steg-address").val();
    $(statusBar).find("#steg-image").attr('src', imageAddress);
    insertImageToCanvas(statusBar, imageAddress);
  });
}

/* The only way we can edit our image is if it's in a canvas. But it must come from a CORS-enabled domain and not animated.
The canvas is drawn but hidden, and it is a square and may need to be redrawn or multiple images */
function insertImageToCanvas(statusBar, imageAddress) {
  var image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = function () {
    var canvas = $(statusBar).find("#steg-canvas").get(0);
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.width * 1.0 * image.width / image.height);
    var imageText = canvas.toDataURL();
  };
  image.src = imageAddress;
}

function uploadToImgurAndInsertToThread(composeView, imageBase64) {
  $.ajax({
    type: 'POST',
    url: 'https://api.imgur.com/3/upload',
    crossDomain: true,
    headers: {
      Authorization: 'Client-ID 977be0be51e54df',
      Accept: 'application/json'
    },
    data: {
      image: imageBase64,
      type: 'base64'
    },
    success: function(response) {
      console.log(response);
      composeView.insertHTMLIntoBodyAtCursor('<img src=\"'+ response.data.link + '\" />');
    },
    error: function (response) {
      alert('Image failed to insert.');
    }
  });
}
