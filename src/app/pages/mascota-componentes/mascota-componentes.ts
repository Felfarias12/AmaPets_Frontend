import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../../service/mascota-service';
import { ReactiveFormsModule } from '@angular/forms'; // Para [formGroup]

@Component({
  selector: 'app-mascota-componentes',
  imports: [
    CommonModule,        // Soluciona el error de *ngIf
    ReactiveFormsModule  // Soluciona el error de [formGroup]
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
      especie: ['Canino', Validators.required],
      raza: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      peso: [0, [Validators.required, Validators.min(0)]]
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mascotaForm.reset({ especie: 'Canino' });
  }

  guardarMascota() {
    if (this.mascotaForm.valid) {
      this.mascotaService.crearMascota(this.mascotaForm.value).subscribe({
        next: (res) => {
          console.log('Mascota guardada', res);
          this.mascotaAgregada.emit(); // Avisa a perfil para recargar la lista
          this.cerrarModal();
        },
        error: (err) => console.error('Error al guardar', err)
      });
    }
  }

  onFileSelected(event: any) {
    // Lógica para manejar la imagen si es necesario
  }
}