InboxSDK.load('1.0', 'sdk_stegosaur_1b4904456f').then(function (sdk) {
    sdk.Compose.registerComposeViewHandler(function (composeView) {
        var statusBarView = composeView.addStatusBar({
            height: 40
        });

        $.get(chrome.extension.getURL('imageselect.html'), function (data) {
            statusBarView.el.innerHTML = data;
            bindAddressInputToPreviewImage(statusBarView.el);
            insertImageToThreadOnClick(statusBarView.el, composeView);
        });
    });


    sdk.Conversations.registerMessageViewHandler(function (messageView) {
        var images = messageView.getBodyElement().getElementsByTagName('img');
        if (images.length != 0) {
            try {
                var node = document.createElement('div');
                node.appendChild(document.createElement('br'));
                var secretMessages = [];

                for (var i = 0; i < images.length; i++) {
                    var j = images[i].src;
                    var src = j.substring(j.indexOf("#")).substring(1)
                    var img = new Image();
                    img.crossOrigin = "";
                    img.src = src;
                    img.addEventListener('load', function () {
                        try {
                            var decodedMessage = steg.decode(img) + "";
                            if (decodedMessage) {
                                var textnode = document.createTextNode();
                                node.appendChild(textnode);
                                node.appendChild(document.createElement('br'));
                            }
                        } catch (e) {
                            console.log(e)
                        }
                    })
                }
                messageView.getBodyElement().appendChild(node)
            } catch (e) {

            }
        }

    });
});

function insertImageToThreadOnClick(statusBar, composeView) {
    $(statusBar).find("#steg-insert").click(function () {
        var canvas = $(statusBar).find("#steg-canvas").get(0);
        var message = $('#steg-message').val();
        
        var ctx = canvas.getContext("2d");
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var colors = imgData.data;

        imageText = steg.encode(message, canvas, { "width": canvas.width, "height": canvas.height });
        var image = new Image();
        image.src = imageText;
        image.crossOrigin = "Anonymous";
        image.addEventListener('load', function () {
            var base64String = /,(.+)/.exec(imageText)[1];
            uploadToImgurAndInsertToThread(composeView, base64String);
        });
    });
}

function bindAddressInputToPreviewImage(statusBar) {
    $(statusBar).find("#steg-address").change(function () {
        var imageAddress = $(statusBar).find("#steg-address").val();
        $(statusBar).find("#steg-image").attr('src', imageAddress);
        insertImageToCanvas(statusBar, imageAddress);
    });
}

/* The only way we can edit our image is if it's in a canvas. But it must come from a CORS-enabled domain and not animated.
The canvas is drawn but hidden, and it is a square and may need to be redrawn or multiple images */
function insertImageToCanvas(statusBar, imageAddress) {
    var image = new Image();
    image.crossOrigin = '';
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
        success: function (response) {
            console.log(response);
            composeView.insertHTMLIntoBodyAtCursor('<img src=\"' + response.data.link + '\" />');
        },
        error: function (response) {
            alert('Image failed to insert.');
        }
    });
}
