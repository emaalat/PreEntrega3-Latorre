const arrayDestinos = [{id: 1, descripcion:`Arreglar la casa 🏠`, interes: 1.498},
                        {id: 2, descripcion: `Comprar un auto 🚐`, interes: 1.387},
                        {id: 3, descripcion: `viaje de vaciones ✈`, interes: 1.626},
                        {id: 4, descripcion: `Otro motivo 💢`, interes: 1.815},
                    ]

// ENLACE DOM A elementos HTML
const inputMonto = document.querySelector("input#montoPrestamo")
const inputPlazo = document.querySelector("input#plazoPago")
const selectDestinos = document.querySelector("select")
const btnCalcular = document.querySelector("button.button-calcular")

/* Desarrollo logica aplicacion  */


function cargarDestinos(){
    if(arrayDestinos.length > 0){
        arrayDestinos.forEach((destino)=> {    
            selectDestinos.innerHTML +=  `<option>${destino.descripcion}</option>`
        })
    }
}

function retornarInteres(descripcion){
    let destino = arrayDestinos.find((destino)=>  destino.descripcion === descripcion )
    return destino.interes
}

function calcularPrestamo(){
    let dineroSolicitado = parseInt(inputMonto.value)
    let plazoEnMeses = parseInt(inputPlazo.value)
    let interesAplicado = retornarInteres(selectDestinos.value)

    /* colocar el objeto prestamo() */

        const prestamo = new Prestamo(dineroSolicitado, interesAplicado, plazoEnMeses)
        let cuotaMensual = prestamo.calcularCuota()

    /* guardar datos LS */
    guardarEnLS(dineroSolicitado, plazoEnMeses, interesAplicado, cuotaMensual, selectDestinos.value)


    /* redireccionar a la pagina cotizacion */  

    location.href = "cotizacion.html"

}

function guardarEnLS (dinero, meses, interes, cuota, destino){   
    let datosDelPrestamo = {
        dinero: dinero,
        meses: meses,
        interes: interes, 
        cuota: cuota, 
        destino: destino
    }

    localStorage.setItem("DatosDelPrestamo", JSON.stringify(datosDelPrestamo))

}


/* EVENTO DE LA APLICACION */
btnCalcular.addEventListener("click", ()=> calcularPrestamo())


cargarDestinos()