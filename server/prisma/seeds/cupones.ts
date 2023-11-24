import { categoriaCupon } from "@prisma/client"

export const cupones = [
    { //1
        nombre: "Juego de Mesa",
        descripcion: "Juego de mesa rustico para uso al aire libre. (1 x cupón)",
        imagen: "cupon_juego de mesa.jpg",
        categoria: categoriaCupon.HOGAR,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 100
    },
    { //2
        nombre: "Maceta",
        descripcion: "Maceta a base de materiales reciclados. (1 x cupón)",
        imagen: "cupon_maseta.jpg",
        categoria: categoriaCupon.JARDINERIA,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 10
    },
    { //3
        nombre: "Viaje a la Playa",
        descripcion: "Un ticket para viajar a la playa, con un acompañante por 1 noche.",
        imagen: "cupon_viaje playa.jpg",
        categoria: categoriaCupon.TURISMO,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 50
    },
    { //4
        nombre: "Set Escolar",
        descripcion: "Un set que incluye un par de libros y utiles, especialmente para el regreso a clases. (1 x cupón)",
        imagen: "cupon_set escolar.jpg",
        categoria: categoriaCupon.EDUCACION,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 20
    },
    { //5
        nombre: "Sueter",
        descripcion: "Sueter hecha a base de materiales reciclados. (1 x cupón)",
        imagen: "cupon_sueter.jpg",
        categoria: categoriaCupon.ROPA,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 15
    },
    { //6
        nombre: "Caja de Leche",
        descripcion: "Caja de leche de la marca Sully. (1 x cupón)",
        imagen: "cupon_caja de leche.jpg",
        categoria: categoriaCupon.ALIMENTOS,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 7
    },
    { //7
        nombre: "Bicicleta Eléctrica",
        descripcion: "Bicicleta Eléctrica de gran bateria y de larga distancia. (1 x cupón)",
        imagen: "cupon_bicicleta electrica.jpg",
        categoria: categoriaCupon.TRANSPORTE,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 250
    },
    { //8
        nombre: "Bolso",
        descripcion: "Bolso de la marca Gutty",
        imagen: "cupon_bolso gutty.jpg",
        categoria: categoriaCupon.VARIOS,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 75
    },
    { //9
        nombre: "Atún",
        descripcion: "Atún de la marca Sullivan (1 x cupon)",
        imagen: "cupon_Atún.jpeg",
        categoria: categoriaCupon.ALIMENTOS,
        fechaInicio: new Date('2023-10-03 14:30:00.000'),
        fechaFin: new Date('2023-12-30 14:30:00.000'),
        monedasCupon: 75
    }
]