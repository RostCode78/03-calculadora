import { useRef, useState } from 'react';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {


    const [ numero, setNumero ] = useState('0');
    const [ numeroAnterior, setNumeroAnterior ] = useState('0');

    const UltimaOperacion = useRef<Operadores>();

    const Limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    };

    const ArmarNumero = ( numeroTexto: string ) => {

        // No aceptar doble punto
        if ( numero.includes('.') && numeroTexto === '.' ) { return; }

        if ( numero.startsWith('0') || numero.startsWith('-0') ) {

            // Punto decimal
            if ( numeroTexto === '.' ) {
                setNumero( numero + numeroTexto );

                // Evaluar si es otro cero y hay un punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {

                setNumero( numero + numeroTexto );

                // Evaluar si es diferente a cero y no tiene un punto
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {

                if ( numero.startsWith('-0') ) {
                    const QuitarCero = numero.slice(0, -1);
                    setNumero( QuitarCero + numeroTexto );
                } else {
                    setNumero( numeroTexto );
                }

                // Evitar 0000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ) {

                setNumero( numero );

            } else {

                setNumero( numero + numeroTexto );

            }

        } else {
            setNumero( numero + numeroTexto );
        }

    };

    const PositivoNegativo = () => {
        if ( numero.includes('-') ) {
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );
        }
    };

    /*==================================================================
    =    FUNCION PARA EL BOTON DEL                                     =
    =    El boton debe de poder borar el ultimo numero en el string    =
    =    Si hay solo un digito y es diferente a cero entonces debe     =
    =    debe colocar un cero                                          =
    =    Si es numero negativo debe convertirlo en positivo            =
    ==================================================================*/

    const btnDelete = ()  => {

        if ( numero.length > ( numero.includes('-') ? 2 : 1 ) ) {
            setNumero( numero.substring( 0, numero.length - 1 ) );
        } else {
            setNumero('0');
        }

    };

    /*===============================
    =    OPERACIONES ARITMETICAS    =
    ===============================*/

    const CambiarNumAnterior = () => {
        if ( numero.endsWith('.') ) {
            setNumeroAnterior( numero.slice(0,-1) );
        } else {
            setNumeroAnterior( numero );
        }
        setNumero('0');
    };

    const btnDividir = () => {
        CambiarNumAnterior();
        UltimaOperacion.current = Operadores.dividir;
    };

    const btnMultiplicar = () => {
        CambiarNumAnterior();
        UltimaOperacion.current = Operadores.multiplicar;
    };

    const btnRestar = () => {
        CambiarNumAnterior();
        UltimaOperacion.current = Operadores.restar;

        // const num1 = Number( numero );
        // const num2 = Number( numeroAnterior );

        // if ( numero === '0' || numero === '-0' ) {
        //     return;
        // } else {
        //     setNumeroAnterior(`${ num2 - num1 }`);
        // }
    };

    const btnSumar = () => {
        CambiarNumAnterior();
        UltimaOperacion.current = Operadores.sumar;

        // const num1 = Number( numero );
        // const num2 = Number( numeroAnterior );

        // if ( numero === '0' || numero === '-0' ) {
        //     return;
        // } else {
        //     setNumeroAnterior(`${ num1 + num2 }`);
        // }
    };

    const Calcular = () => {

        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch ( UltimaOperacion.current ) {
            case Operadores.sumar:
                setNumero( `${ num1 + num2 }` );
                break;
            case Operadores.restar:
                setNumero( `${ num2 - num1 }` );
                break;
            case Operadores.multiplicar:
                setNumero( `${ num1 * num2 }` );
                break;
            case Operadores.dividir:
                num1 !== 0 && setNumero(`${num2 / num1}`);
                break;
        }

        setNumeroAnterior('0');

    };

    return {
        numero,
        numeroAnterior,
        Limpiar,
        PositivoNegativo,
        btnDelete,
        btnDividir,
        ArmarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        Calcular,
    };

};
