import { obtenerUsuarios, buscarUsuarios, volverInicioPagina } from "./modulosJS/funciones.js";

const d = document;

d.addEventListener("DOMContentLoaded", e => {
    obtenerUsuarios("https://randomuser.me/api/?results=50");
    buscarUsuarios(".header__input");
    volverInicioPagina(".boton");
});