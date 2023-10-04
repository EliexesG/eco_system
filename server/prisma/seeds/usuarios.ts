import { tipoUsuario } from "@prisma/client"

export const usuarios = [
    { //1
        tipoUsuario: tipoUsuario.ADMINISTRADOR,
        identificacion: "117900330",
        nombre: "Elías Gabriel",
        primerApellido: "González",
        segundoApellido: "Lara",
        correo: "egonzalezlar@ecosystem.com",
        contrasenna: "",
        codProvincia: 2,
        codCanton: 1,
        codDistrito: 4
    },
    { //2
        tipoUsuario: tipoUsuario.ADMINISTRADOR_CENTROS_ACOPIO,
        identificacion: "504260860",
        nombre: "Luis Fernando",
        primerApellido: "Chavarria",
        segundoApellido: "Guiltres",
        correo: "lchavarria@ecosystem.com",
        contrasenna: "",
        codProvincia: 2,
        codCanton: 1,
        codDistrito: 4
    },
    { //3
        tipoUsuario: tipoUsuario.CLIENTE,
        identificacion: "288052675",
        nombre: "Pedro",
        primerApellido: "Perez",
        segundoApellido: "Zeledon",
        correo: "juanperez123@gmail.com",
        contrasenna: "",
        codProvincia: 1,
        codCanton: 19,
        codDistrito: 5
    },
]