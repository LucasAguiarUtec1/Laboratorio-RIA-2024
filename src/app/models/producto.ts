import { Insumo } from "./insumo";

export class Producto {
    id: number = 0;
    nombre: string = '';
    descripcion: string = '';
    insumos: Insumo[] = [];
    imagen: string = '';
    precio: number = 0;
}
