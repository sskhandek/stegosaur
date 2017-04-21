console.log('edafdsa')

InboxSDK.load('1.0', 'sdk_stegosaur_1b4904456f').then(function(sdk){
  sdk.Compose.registerComposeViewHandler(function(composeView){

  // a compose view has come into existence, do something with it!
  composeView.addButton({
    title: "My Nifty Button!",
    iconUrl: 'https://example.com/foo.png',
    onClick: function(event) {
      event.composeView.insertHTMLIntoBodyAtCursor('<img src=\"http://news.nationalgeographic.com/content/dam/news/2016/04/21/01-baby-dinosaurs.jpg\" />');
    }
  });

});
});