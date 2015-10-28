$("#login").submit(function (event) {
    chrome.storage.local.set({
        username: $("#username").val(),
        password: $("#pwd").val()
    });
});