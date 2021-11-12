const d = document,
    w = window,
    $templateUsuario = d.getElementById("template-usuario").content,
    $fragment = d.createDocumentFragment();

const filtrarDatos = datos => datos.map(el => {
    //Retorna un objeto con el nombre e imagen del usuario
    return {
        nombre: `${el.name.last} ${el.name.first}`,
        imagen: el.picture.large
    }
});

const pintarDatos = (datos, selecContenedor) => {
    //Pinta los datos 
    const $contenedor = d.querySelector(selecContenedor);

    datos.forEach(el => {
        $templateUsuario.querySelector(".usuario__imagen")
            .setAttribute("src", el.imagen);
        $templateUsuario.querySelector(".usuario__nombre")
            .textContent = el.nombre;
        
        const $clone = d.importNode($templateUsuario, true);
        $fragment.appendChild($clone);
    });

    $contenedor.appendChild($fragment);
};

export const obtenerUsuarios = async url => {
    //Obtiene y pinta los datos provenientes de una API
    try{
        const res = await fetch(url),
            json = await res.json();

        if(!res.ok) throw { 
            status: res.status, 
            statusText: res.statusText
        };

        pintarDatos(filtrarDatos(json.results), ".main");
    }catch(err){
        const mensaje = err.statusText || "Ocurrio un error";
        console.log(`Error ${err.status}: ${mensaje}`);
    }
};

export const buscarUsuarios = selecInput => {
    //Oculta y muestra unicamente los datos que solicitamos
    d.addEventListener("keyup", e => {
        if(e.target.matches(selecInput)){
            const busqueda = e.target.value.toLowerCase();
            d.querySelectorAll(".usuario").forEach(el => {
                (el.querySelector(".usuario__nombre").textContent.toLowerCase().includes(busqueda))
                    ? el.classList.remove("usuario__oculto")
                    : el.classList.add("usuario__oculto");
            });
        }
    });
};

export const volverInicioPagina = selecBoton => {
    //Retorna al usuario a la parte superior de la pagina
    const $boton = d.querySelector(selecBoton);

    w.addEventListener("scroll", e => {
        (w.scrollY > 500)
            ? $boton.classList.remove("boton--oculto")
            : $boton.classList.add("boton--oculto");
    });

    d.addEventListener("click", e => {
        if(e.target.matches(selecBoton)){
            console.log("Soy un boton");
            w.scroll(0,0);

        }
    });
};