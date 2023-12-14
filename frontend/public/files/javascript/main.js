// alert(0);
function preview(token){
    $.getJSON("//ulogin.ru/token.php?host=" + encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?", function(data){
        qwerty(data)
    // data = $.parseJSON(data.toString());
        // if(!data.error){

        //     console.log(data, JSON.stringify(data), 101)
        //     console.log(token , 101)
        //     sessionStorage.setItem("socialLoginObject", JSON.stringify(data));
        // }
    });
}