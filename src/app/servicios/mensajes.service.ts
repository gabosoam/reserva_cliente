import { Injectable } from '@angular/core';
import swal, { SweetAlertType } from'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {

  constructor() {

  }

  

  mostrarMensaje(tipo: SweetAlertType,titulo, mensaje) {
   
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: tipo,
      title: titulo,
      text: mensaje
    })
  }
}