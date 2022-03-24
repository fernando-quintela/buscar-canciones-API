<template>
<div class="fondo container-fluid">
  <h1 class="text-center text-primary pt-4 mb-5">Letras de Canciones</h1>
  
  <div class=" mt-4 ms-5 ">
    <div class="row">

      <div  class="col-md-4 ">
       <form @submit.prevent="buscarCancion">

         <div class="mb-3">
           <label for="artista" class="form-label fs-3 fw-bold">Artista</label>
           <input type="text" class="form-control" v-model="artista" >
         </div>

         <div class="mb-3">
          <label for="cancion" class="form-label fs-3 fw-bold">Canción</label>
          <input type="text" class="form-control" v-model="cancion">
         </div>
        <!-- error en caso no exista la cancion y los campos requeridos -->
        <div class="mb-3">

          <div v-if="mensaje"  class="from-text error fs-4 fw-bolder">
            error.. campos requeridos!
          </div>

          <div v-if="mensajeDos" class="from-text error fs-4 fw-bolder">
            la cancion no existe, prueba con otra busqueda
          </div>

        </div>
            <!-- button para buscar la cancion -->
        <div class="d-grid gap-2">
         <button type="submit"  class="btn btn-success ">buscar  letras</button>
        </div>
        
       </form>
      </div>
      
      <div class="letra-resultado col-md-8 ">
        <h2  v-if="mensajeTitulo" class="text-center mb-2 text-info">Cancion: {{cancion}} de {{artista}}</h2>
        <p class="mt-4 text-center lyrics fw-bold" >{{tema.lyrics}}</p>
      </div>

    </div>
  </div>
   
</div>
</template>

<script>
import { consultarApi } from "./api";
// import Canciones from './components/Canciones.vue'


export default {
  name: 'App',
  data() {
   return{
     artista: '',
     cancion: '',
     mensaje: false,
     mensajeDos: false,
     mensajeTitulo: false,
     tema: '',
   }
 },
  

  methods: {
  async buscarCancion(){
      if( this.artista === '' || this.cancion === '') {
    this.mensaje = true;
    setTimeout(() =>{
    this.mensaje = false;    
    }, 3000)
    return; // terminar la ejecucion
    };

    consultarApi(this.artista, this.cancion).then( letra => this.tema = letra );
     

  },

 },

 watch:{
   tema(value){
    if(value.error){
    this.mensajeDos = true;
    setTimeout(() =>{
    this.mensajeDos = false;    
    }, 3000)
    }else{
    this.mensajeTitulo = true;
    } 
    //  console.log(value);
   }
 },
}
</script>

<style>
 
 .fondo{
    background-image: url("./assets/fondomusicv2.jpg");
    background-size: auto auto;
     min-height: 100vh;
    /*width: 100%;
    padding: 0; */
 }
 .form-label{
   color: rgb(252, 250, 250);
 }

.error {
   color: rgb(216, 230, 21);
 }
 #resultado{
  white-space: pre-wrap;
  padding: 2rem;
 }
 
 .lyrics{
   color:rgb(123, 230, 171);
   white-space: pre-wrap;
 }
 
</style>
