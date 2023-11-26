import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type canjeoMaterialesDetalle = {
  materialId: number;
  cantidadUnidades: number;
  material: any;
  subtotal: number;
};

@Injectable({
  providedIn: 'root',
})
export class CanjeoMaterialesService {
  private canjeoMateriales: BehaviorSubject<canjeoMaterialesDetalle[]>;
  private cantUnidades: BehaviorSubject<number>;

  constructor() {
    let detalles = JSON.parse(localStorage.getItem('canjeoMateriales'));

    this.canjeoMateriales = new BehaviorSubject<canjeoMaterialesDetalle[]>(
      detalles ? detalles : []
    );

    let totalUnidades = this.calcularCantUnidades();

    this.cantUnidades = new BehaviorSubject<number>(
      totalUnidades ? totalUnidades : 0
    );
  }

  public agregarDetalle(material: any) {
    let listaDetalles = this.getDetalles;
    let nuevoDetalle: canjeoMaterialesDetalle = {
      cantidadUnidades: 1,
      material: material,
      materialId: material.id,
      subtotal: 0,
    };

    nuevoDetalle.subtotal = this.calcularSubtotalDetalle(nuevoDetalle);

    if (listaDetalles) {
      let indexObj = listaDetalles.findIndex(
        (obj) => (obj.materialId = nuevoDetalle.materialId)
      );

      if (indexObj != -1) {
        if (material.hasOwnProperty('cantidadUnidades')) {
          if (material.cantidadUnidades <= 0) {
            this.eliminarDetalle(nuevoDetalle);
            return;
          } else {
            listaDetalles[indexObj].cantidadUnidades =
              material.cantidadUnidades;
          }
        } else {
          listaDetalles[indexObj].cantidadUnidades += 1;
        }
        nuevoDetalle.cantidadUnidades =
          listaDetalles[indexObj].cantidadUnidades;
        listaDetalles[indexObj].subtotal =
          this.calcularSubtotalDetalle(nuevoDetalle);
      } else {
        listaDetalles.push(nuevoDetalle);
      }
    } else {
      listaDetalles = [];
      listaDetalles.push(nuevoDetalle);
    }

    this.canjeoMateriales.next(listaDetalles);
    this.cantUnidades.next(this.calcularCantUnidades());
    this.guardarCanjeo();
  }

  public eliminarDetalle(detalle: canjeoMaterialesDetalle) {
    let listaDetalles = this.getDetalles;
    let indexObj = listaDetalles.findIndex(
      (obj) => (obj.materialId = detalle.materialId)
    );

    if (indexObj != -1) {
      listaDetalles.splice(indexObj, 1);
    }

    this.canjeoMateriales.next(listaDetalles);
    this.cantUnidades.next(this.calcularCantUnidades());
    this.guardarCanjeo();
  }

  public vaciarCanjeoMateriales() {
    this.canjeoMateriales.next([]);
    this.cantUnidades.next(0);
    this.guardarCanjeo();
  }

  private guardarCanjeo(): void {
    localStorage.setItem(
      'canjeoMateriales',
      JSON.stringify(this.canjeoMateriales.getValue())
    );
  }

  private calcularCantUnidades(): number {
    return this.canjeoMateriales.getValue()
      ? this.canjeoMateriales
          .getValue()
          .reduce(
            (lastValue, currentValue) =>
              lastValue + currentValue.cantidadUnidades,
            0
          )
      : 0;
  }

  private calcularTotal(): number {
    return this.canjeoMateriales.getValue()
      ? this.canjeoMateriales
          .getValue()
          .reduce(
            (lastValue, currentValue) => lastValue + currentValue.subtotal,
            0
          )
      : 0;
  }

  private calcularSubtotalDetalle(detalle: canjeoMaterialesDetalle) {
    return detalle.cantidadUnidades * detalle.material.monedasUnidad;
  }

  get getDetalles() {
    return this.canjeoMateriales.getValue();
  }

  get getCantUnidades(): number {
    return this.cantUnidades.getValue();
  }

  get getTotal() {
    return this.calcularTotal();
  }
}
