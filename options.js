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
       option = $('#users')
           .append($("<option></option>")
                      .text(key));
    });
  });
}

function removeUser(email) {
  chrome.storage.sync.remove(email, function() {
    showUsers();
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

showUsers();