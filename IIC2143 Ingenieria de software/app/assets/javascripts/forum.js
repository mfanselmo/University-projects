function cambiaVisibilidad() {
       var div2 = document.getElementById('markdown_hide');
       if(div2.style.display == 'block'){
           div2.style.display = 'none';
       }else{
          div2.style.display = 'block';
         }
   }


function sendCodePost(){
	editor_comentario = document.getElementById("form_contenido_post");
	var show_md_post = document.getElementById("show_md_post");
	var text = editor_comentario.value;
	converter = new showdown.Converter(),
	html = converter.makeHtml(text)
	show_md_post.innerHTML = html
}




function change_post_to_preview(){

	var titulo = document.getElementById("form_titulo_post");
	var contenido = document.getElementById("form_contenido_post");
	
	var boton_preview_post = document.getElementById("boton_preview_post");

    if (show_md_post.style.display === "none") {
        show_md_post.style.display = "block";
        contenido.style.display = 'none';
        boton_preview_post.innerHTML = "Editar";

    } else {

        show_md_post.style.display = "none";
        contenido.style.display = 'block';
        boton_preview_post.innerHTML = "Preview";
    }
}