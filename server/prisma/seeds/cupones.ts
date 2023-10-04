import { categoriaCupon } from "@prisma/client"

export const cupones = [
    { //1
        nombre: "Juego de Mesa",
        descripcion: "Juego de mesa rustico para uso al aire libre. (1 x cupón)",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20juego%20de%20mesa.jpg?alt=media&token=7171f539-a1da-40b6-aec0-b65ca8ba7d40&_gl=1*19988lj*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4ODc0MS41My4wLjA.",
        categoria: categoriaCupon.HOGAR,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 100
    },
    { //2
        nombre: "Maceta",
        descripcion: "Maceta a base de materiales reciclados. (1 x cupón)",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20maseta.jpg?alt=media&token=8c914cf9-9ba3-4648-bea5-3eea318d9d36&_gl=1*3gmmdm*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4ODIxNy41My4wLjA.",
        categoria: categoriaCupon.JARDINERIA,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 10
    },
    { //3
        nombre: "Viaje a la Playa",
        descripcion: "Un ticket para viajar a la playa, con un acompañante por 1 noche.",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20viaje%20playa.jpg?alt=media&token=04a19dfa-34a8-446c-9c5c-b1c1c5e0d9bf&_gl=1*c90w13*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4ODk1Ni41My4wLjA.",
        categoria: categoriaCupon.TURISMO,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 50
    },
    { //4
        nombre: "Set Escolar",
        descripcion: "Un set que incluye un par de libros y utiles, especialmente para el regreso a clases. (1 x cupón)",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20set%20escolar.jpg?alt=media&token=1354a518-1290-4518-95c5-a3e5a9445255&_gl=1*14a4nbv*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4OTEwMC41My4wLjA.",
        categoria: categoriaCupon.EDUCACION,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 20
    },
    { //5
        nombre: "Sueter",
        descripcion: "Sueter hecha a base de materiales reciclados. (1 x cupón)",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20sueter.jpg?alt=media&token=1d242a80-d5cb-4bf6-abba-25523685c3e7&_gl=1*luc4cm*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4OTI4Ny41Mi4wLjA.",
        categoria: categoriaCupon.ROPA,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 15
    },
    { //6
        nombre: "Caja de Leche",
        descripcion: "Caja de leche de la marca Sully. (1 x cupón)",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20caja%20de%20leche.jpg?alt=media&token=e68b3e79-b9f8-4a94-a6c4-3f27123ad776&_gl=1*yrrtw4*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4OTYwOC41NC4wLjA.",
        categoria: categoriaCupon.ALIMENTOS,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 7
    },
    { //7
        nombre: "Bicicleta Eléctrica",
        descripcion: "Bicicleta Eléctrica de gran bateria y de larga distancia. (1 x cupón)",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20bicicleta%20electrica.jpg?alt=media&token=1461d0b6-a157-41e1-ad69-5f452fbacb47&_gl=1*1atc5dc*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM4OTc4OC41NC4wLjA.",
        categoria: categoriaCupon.TRANSPORTE,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 250
    },
    { //8
        nombre: "Bolso",
        descripcion: "Bolso de la marca Gutty",
        imagen: "https://firebasestorage.googleapis.com/v0/b/proyecto-centro-acopio.appspot.com/o/Imagenes%2Fcupones%2Fcupon%20bolso%20gutty.jpg?alt=media&token=5d55a72a-7506-4f64-9b20-bc2688eab8ed&_gl=1*l2rmol*_ga*MjAwOTUzNjQ3MS4xNjk2Mzg1Njk1*_ga_CW55HF8NVT*MTY5NjM4NTY5NC4xLjEuMTY5NjM5MDA0OC41NC4wLjA.",
        categoria: categoriaCupon.VARIOS,
        fechaInicio: new Date('2023-10-03 14:30:00'),
        fechaFin: new Date('2023-12-30 14:30:00'),
        monedasCupon: 75
    }
]