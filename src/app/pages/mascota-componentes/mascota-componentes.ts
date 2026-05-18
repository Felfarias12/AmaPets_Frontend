import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../../service/mascota-service';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-mascota-componentes',
  standalone: true, // Asegúrate de dejarlo si usas imports directos
  imports: [
    CommonModule,        
    ReactiveFormsModule  
  ],
  templateUrl: './mascota-componentes.html',
  styleUrls: ['./mascota-componentes.scss']
})
export class MascotaComponentes {
  @Output() mascotaAgregada = new EventEmitter<void>();
  mascotaForm: FormGroup;
  mostrarModal: boolean = false;

  constructor(private fb: FormBuilder, private mascotaService: MascotaService) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['perro', Validators.required], // Ajustado a los valores string válidos de tu interfaz
      genero: ['', Validators.required],       // ¡Nuevo campo obligatorio!
      edad: [0, [Validators.required, Validators.min(0)]], // Reemplaza fechaNacimiento
      peso: [0, [Validators.required, Validators.min(0)]]
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mascotaForm.reset({ especie: 'perro', edad: 0, peso: 0, genero: '' });
  }

  guardarMascota() {
    if (this.mascotaForm.valid) {
      // Construimos el objeto exacto que espera tu backend (Mascota.java)
      const payload = {
        ...this.mascotaForm.value,
        vacunado: false // Evitamos el error de nulidad enviando un valor por defecto
      };

      this.mascotaService.crearMascota(payload).subscribe({
        next: (res) => {
          console.log('Mascota guardada con éxito', res);
          this.mascotaAgregada.emit(); 
          this.cerrarModal();
        },
        error: (err) => console.error('Error al guardar en el servidor', err)
      });
    }
  }

  onFileSelected(event: any) {
    // Lógica para manejar la imagen (actualmente ignorada por el backend)
  }
}