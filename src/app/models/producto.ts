import { Insumo } from "./insumo";

export class Producto {
    id: number = 0;
    nombre: string = '';
    descripcion: string = '';
    insumos: any[] = [];
    imagen: string = '';
    precio: number = 0;
    mostrarDescripcionCompleta?: boolean = false;
}
