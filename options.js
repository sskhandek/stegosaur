function addUser(email, publicKey) {
  var save = {};
  save[email] = publicKey;
  chrome.storage.sync.set(save, function() {
    showUsers();
    $("#email").val("");
    $("#publickey").val("");
  });
}

function showUsers() {
  $("#users option").remove();
  chrome.storage.sync.get(null, function (values) {
    $.each(values, function(key, value) {
       if (key !== 'myPrivateKey') {
         option = $('#users')
           .append($("<option></option>")
                      .text(key));
       }   
    });
  });
}

function removeUser(email) {
  chrome.storage.sync.remove(email, function() {
    showUsers();
  });
}

function updatePrivateKey(privateKey) {
  var save = {};
  save['myPrivateKey'] = privateKey;
  chrome.storage.sync.set(save, function() {
    $("#privatekey").val("");
    alert('Your Private Key has been sucessfully been updated')
  });
}

$("#adduser").click(function() {
  event.preventDefault();
  addUser($("#email").val(), $("#publickey").val());
});

$("#removeuser").click(function() {
  event.preventDefault();
  removeUser($("#users").val());
});

$("#updatePrivateKey").click(function() {
  event.preventDefault();
  updatePrivateKey($('#privatekey').val())
});

showUsers();