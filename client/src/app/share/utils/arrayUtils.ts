export const filtrarElementoByKey = (
  cod: number,
  elementos: { [key: number]: string }
) => {
  let elemento = Object.entries(elementos).find(([key, value]) => {
    return Number(key) === cod;
  });

  if (!elemento) {
    return undefined;
  } else {
    return elemento[1];
  }
};
