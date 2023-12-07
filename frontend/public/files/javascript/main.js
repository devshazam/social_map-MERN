// alert(0);
function preview(token){
    $.getJSON("//ulogin.ru/token.php?host=" + encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?", function(data){
        data = $.parseJSON(data.toString());
        if(!data.error){

            console.log(data, JSON.stringify(data), 101)
            sessionStorage.setItem("socialLoginObject", JSON.stringify(data));
        }
    });
}