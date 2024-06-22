class Contacto {
    constructor(nombre, direccion, telefono,correo, fotografia) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.fotografia = fotografia;
        
    }
    
}

// Clase para la agenda de contactos
class Agenda {
    constructor() {
      this.lista = JSON.parse(localStorage.getItem('lista')) || [];
    }
    guardarDatos() {
      localStorage.setItem('lista', JSON.stringify(this.lista));

    }

    agregarContacto(nombre, direccion, telefono, correo, fotografia) {
        this.lista.push(new Contacto (nombre, direccion, telefono, correo, fotografia))
        
       
        this.guardarDatos();
        this.MostrarPersonas();

    }
    
    editarContacto(index,nombre,direccion,telefono,correo,fotografia) {
      let persona = this.lista[index];
      persona.nombre= nombre;
      persona.direccion = direccion;
      persona.telefono = telefono;
      persona.correo = correo;
      persona.fotografia = fotografia;
      document.getElementById("editar").close();
      this.guardarDatos();
      this.MostrarPersonas();
    }
    

    Borrar(n) {
    let idborrar = document.getElementById('idborrar');
    idborrar.value = n;
    let borrar = document.getElementById('borrar');
    borrar.showModal();          
              }
      
    confirmarBorrar() { 
      let idborrar = document.getElementById('idborrar').value;
      let borrar = document.getElementById('borrar');
      console.log(idborrar)
      this.lista.splice(idborrar,1);          
      borrar.closest('dialog').close()
      agenda.MostrarPersonas();
      agenda.guardarDatos();
                
      
              }

          MostrarPersonas(){

            let contador = this.lista.length

            let listado = document.getElementById("listado");
            
            let html='<div style="display: flex;flex-wrap: wrap;">';
            let encontrada = true;
    
            let opcion = document.getElementById("opcion").value;  
            
            
            let patronConverted = 0;
            
            for(let i=0;i<this.lista.length;i++){
    
    
                if(!!patron.value){
               
                 if(opcion == 'opcion1'){
                    
                    patronConverted = patron.value.toLowerCase();
                    let nombre=this.lista[i].nombre.toLowerCase(); 
                    
                    encontrada = nombre.includes(patronConverted)
                }else if(opcion == 'opcion2'){
                    
                    patronConverted = patron.value.toLowerCase();
                    let direccion=this.lista[i].direccion.toLowerCase();
                    
                    encontrada = direccion.includes(patronConverted)
                }else if(opcion == 'opcion3'){
                    let telefono=this.lista[i].telefono;
                    encontrada = telefono.includes(patron.value)
                }else if(opcion == 'opcion4'){
                    
                  patronConverted = patron.value.toLowerCase();
                    let correo=this.lista[i].correo.toLowerCase();
                    
                    encontrada = correo.includes(patronConverted)
                }
                }
                
                if (encontrada){
    
              html+='<div class="card">';  
    
              html+='<div class="card-header bg-amarillo">';  
    
              html+=`<h1>${this.lista[i].nombre}</h1><img class='fotografia' src="${this.lista[i].fotografia}" alt="fotografia">`;
    
              html+='</div>';
    
              html+='<div class="card-body">';
    
              html+=`<p><b>Dirección</b><br>${this.lista[i].direccion}</p>`;
    
              html+=`<p><b>Teléfono</b><br>${this.lista[i].telefono}</p>`;
    
              html+=`<p><b>Correo</b><br>${this.lista[i].correo}</p>`;
                
              html+='</div>';
    
              html+='<div class="card-footer">';
    
                html+='<button onclick=Borrar('+i+') class="material-button material-button--outlined">Borrar</button>';
    
                html+=` <button onclick="Editar(${i})" class="material-button material-button--outlined">Editar</button>`;
    
              html+='</div></div>';
              
                }else{
                    contador -= 1;
                }
            }
            if (contador== 0 && patron.value!=""){
                let error = document.getElementById('error')
                    error.showModal()
                    document.getElementById('patron').value=''
            }
            html+="</div>";
    
            listado.innerHTML=html;
    
          
            }

    
        Editar(n) {

        let Nombre=document.getElementById("eNombre");

        let Direccion=document.getElementById("eDireccion");

        let Telefono=document.getElementById("eTelefono");

        let Correo=document.getElementById("eCorreo");

        // añadí editar la fotografía

        let Fotografia = document.getElementById("efotografia");

        let id=document.getElementById("id");


        id.innerHTML=n;

        Nombre.value=this.lista[n].nombre;

        Direccion.value=this.lista[n].direccion;

        Telefono.value=this.lista[n].telefono;

        Correo.value=this.lista[n].correo;
        
        // tome el valor de la fotografía 

        Fotografia.value=this.lista[n].fotografia;

        let editar = document.getElementById("editar");

        editar.showModal();

      }
 
}



// Uso de la agenda
const agenda = new Agenda();
window.onload = () => agenda.MostrarPersonas()
// Agregar contactos


function Agregar(){
    
    let Nombre=document.getElementById("Nombre").value;
    document.getElementById("Nombre").value = "";
    let Direccion=document.getElementById("Direccion").value;
    document.getElementById("Direccion").value = "";

    let Telefono=document.getElementById("Telefono").value;
    document.getElementById("Telefono").value = "";

    let Correo=document.getElementById("Correo").value;
    document.getElementById("Correo").value = "";

    // tomamos el elemento capturado en el dom
    let Fotografia=document.getElementById("fotografia").value;
    document.getElementById("fotografia").value = "";

    agenda.agregarContacto(Nombre, Direccion, Telefono,Correo, Fotografia);

  
}




  // Editar un contacto
  function guardarEditar() {
        let id=document.getElementById("id");
        let index=Number(id.innerHTML);
    let Nombre = document.getElementById("eNombre").value;
    let Direccion = document.getElementById("eDireccion").value;
    let Telefono = document.getElementById("eTelefono").value;
    let Correo = document.getElementById("eCorreo").value;
    let Fotografia = document.getElementById("efotografia").value;

    let editar = document.getElementById("editar");

    editar.close();

    agenda.editarContacto(index, Nombre, Direccion, Telefono, Correo, Fotografia)
  }
  
    
 
  // Eliminar un contacto
  function Borrar(n) {
            agenda.Borrar(n)
            
            }
    
  function confirmarBorrar() { 
              agenda.confirmarBorrar()

            } 
  // Buscar contactos 
  
  function Buscar() {
agenda.MostrarPersonas();
    
          
            }

  function Editar (n) {
    agenda.Editar(n)
  }