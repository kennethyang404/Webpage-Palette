function showPalette(palette) {
    $("#loading").fadeOut("slow", function(){
        $("#palette").fadeIn("slow");    
    });
    for (var i=0; i<5; i++) {
        var color = palette[i];
        palette[i].push(RGBtoHEX(color[0], color[1], color[2]));
    }
    var colors_container = document.getElementById("colors-container");
    for (var i=0; i<5; i++) {
            var color = palette[i]; 
            var new_color = document.createElement("div");
            new_color.setAttribute("class", "color");
            new_color.setAttribute("id", "color-"+i);
            new_color.style.backgroundColor = color[3];
            var new_hex = document.createElement("div");
            new_hex.setAttribute("class", "hex");
            new_hex.setAttribute("id", "hex-"+i);
            new_hex.innerHTML = color[3];
            new_hex.style.color = ((color[0]+color[1]+color[2])/3 > 128) ? "black" : "white";
            new_color.appendChild(new_hex);
            colors_container.appendChild(new_color);
    }
    $(".color").css("width", 100/5+"%");
    $(".color").hover(function(){$("#" + this.id.replace("color", "hex")).fadeIn("fast")},
                      function(){$("#" + this.id.replace("color", "hex")).fadeOut("fast")});
    $(".color").click(function(){ 
        hex = this.childNodes[0].innerText;
        copyTextToClipboard(hex);
    });
}

function RGBtoHEX(r, g, b) {
    var h = (r << 16 | g << 8 | b).toString(16).toUpperCase();
    return "#" + Array(7 - h.length).join("0") + h;
}

function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}