InboxSDK.load('1.0', 'sdk_stegosaur_1b4904456f').then(function(sdk){
  sdk.Compose.registerComposeViewHandler(function(composeView){
    // // a compose view has come into existence, do something with it!
    // composeView.addButton({
    //   title: "Stegosaur",
    //   iconUrl: 'http://cliparts.co/cliparts/pTq/KMd/pTqKMdG6c.png',
    //   onClick: function(event) {
    //     // Show Div for Ima
    //     // getToRecipients()
    //     event.composeView.insertHTMLIntoBodyAtCursor('<img src=\"http://news.nationalgeographic.com/content/dam/news/2016/04/21/01-baby-dinosaurs.jpg\" />');
    //   }
    // });

    var statusBarView = composeView.addStatusBar({
      height: 40
    });
    $.get(chrome.extension.getURL('imageselect.html'), function(data) {
      statusBarView.el.innerHTML = data;
      $(statusBarView.el).find("#steg-insert").click(function() {
        var imageAddress = $(statusBarView.el).find("#steg-address").val();

        // load image

        // convert image to library

        // pgp

        // copy image to clipboard

        // trigger paste event in gmail
        // $(composeView).trigger("paste");
        composeView.insertHTMLIntoBodyAtCursor('<img src=\"'+ imageAddress + '\" />');
      })
    });
  });
});