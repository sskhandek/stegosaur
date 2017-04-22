InboxSDK.load('1.0', 'sdk_stegosaur_1b4904456f').then(function(sdk){
  sdk.Compose.registerComposeViewHandler(function(composeView){
    var statusBarView = composeView.addStatusBar({
      height: 40
    });

    $.get(chrome.extension.getURL('imageselect.html'), function(data) {
      statusBarView.el.innerHTML = data;
      bindAddressInputToImage(statusBarView.el);
    });
  });
});

function bindAddressInputToImage(statusBar) {
  $(statusBar).find("#steg-address").change(function() {
    var imageAddress = $(statusBar).find("#steg-address").val();
    $(statusBar).find("#steg-image").attr('src', imageAddress);
  });
}

function uploadToImgur(imageBase64) {
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
      console.log(response.data);
      composeView.insertHTMLIntoBodyAtCursor('<img src=\"'+ response.data.link + '\" />');
    },
    error: function (response) {
      console.log(response);
      alert('POST failed.');
    }
  });
}