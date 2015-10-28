var githubLinks = $('li a').filter(function(){
    var href = $(this).attr('href');
    // TODO: 以下情况，链接无法自动计算star数：301/302 跳转； or no "https://".
    return href.search(/^https:\/\/github.com\/[\w_\-\.]*\/[\w_\-\.]*\/?$/) != -1 && href.search('github.com/site/') == -1;
});

githubLinks.each(function (index, el) {
    var ajaxUrl = $(el).attr('href').replace("github.com", "api.github.com/repos").replace(/\/$/, '');
    chrome.storage.local.get(["username", "password"], function (accountInfo) {
        var auth = btoa(accountInfo.username + ":"+accountInfo.password);
        $.ajax({
            url: ajaxUrl,
            data: "",
            method: "GET",
            headers: {
                Authorization: 'Basic ' + auth
            },
            dataType: 'json',
            success: function(data){
                $(el).after(' <span style="color:red">' + data.stargazers_count + "</span>");
            }
        });
    });

});
