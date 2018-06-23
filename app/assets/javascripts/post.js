function cambiaVisibilidad() {
       var div2 = document.getElementById('markdown_hide');
       if(div2.style.display == 'block'){
           div2.style.display = 'none';
       }else{
          div2.style.display = 'block';
         }
   }


function sendCode(){
	editor_comentario = document.getElementById("form_nuevo_comentario");
	var show_md = document.getElementById("show_md");
	var text = editor_comentario.value;
	converter = new showdown.Converter(),
	html = converter.makeHtml(text)
	show_md.innerHTML = html
}


function change_to_preview() {
	var editor_comentario = document.getElementById("form_nuevo_comentario");
	
	var boton_preview = document.getElementById("boton_preview");
	// console.log(y);
    if (editor_comentario.style.display === "none") {
        editor_comentario.style.display = "block";
        show_md.style.display = "none";
        boton_preview.innerHTML = "Editar";
    } else {
        editor_comentario.style.display = "none";
        show_md.style.display = "block"
        boton_preview.innerHTML = "Preview";
    }

}
