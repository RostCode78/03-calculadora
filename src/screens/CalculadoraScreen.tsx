import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const CalculadoraScreen = () => {

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

                setNumero( numeroTexto );

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
    };

    const btnSumar = () => {
        CambiarNumAnterior();
        UltimaOperacion.current = Operadores.sumar;
    };

    const Calcular = () => {

        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch ( UltimaOperacion.current ) {
            case Operadores.sumar:
                setNumero( `${ num1 + num2 }` );
                console.log(`Sumar: ${num1} + ${num2} = ${ num1 + num2 }`);
                break;
            case Operadores.restar:
                setNumero( `${ num2 - num1 }` );
                console.log(`Restar: ${num2} - ${num1} = ${ num2 - num1 }`);
                break;
            case Operadores.multiplicar:
                setNumero( `${ num1 * num2 }` );
                console.log(`Multiplicar: ${num1} * ${num2} = ${ num1 * num2 }`);
                break;
            case Operadores.dividir:
                num1 !== 0 && setNumero(`${num2 / num1}`);
                console.log(`Dividir: ${num2} / ${num1} = ${ num2 / num1 }`);
                break;
        }

        setNumeroAnterior('0');

    };

    return (
        <View style={ styles.calculadoraContainer }>

            {
                ( numeroAnterior !== '0' ) && (
                    <Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>
                )
            }

            <Text
                style={ styles.resultado }
                numberOfLines={ 1 }
                adjustsFontSizeToFit
            >
                { numero }
            </Text>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="C" color="#9B9B9B" accion={ Limpiar } />
                <BotonCalc texto="+/-" color="#9B9B9B" accion={ PositivoNegativo } />
                <BotonCalc texto="del" color="#9B9B9B" accion={ btnDelete } />
                <BotonCalc texto="/" color="#FF9427" accion={ btnDividir } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="7" accion={ ArmarNumero } />
                <BotonCalc texto="8" accion={ ArmarNumero } />
                <BotonCalc texto="9" accion={ ArmarNumero } />
                <BotonCalc texto="X" color="#FF9427" accion={ btnMultiplicar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="4" accion={ ArmarNumero } />
                <BotonCalc texto="5" accion={ ArmarNumero } />
                <BotonCalc texto="6" accion={ ArmarNumero } />
                <BotonCalc texto="-" color="#FF9427" accion={ btnRestar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="1" accion={ ArmarNumero } />
                <BotonCalc texto="2" accion={ ArmarNumero } />
                <BotonCalc texto="3" accion={ ArmarNumero } />
                <BotonCalc texto="+" color="#FF9427" accion={ btnSumar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="0" ancho accion={ ArmarNumero }/>
                <BotonCalc texto="." accion={ ArmarNumero }/>
                <BotonCalc texto="=" color="#FF9427" accion={ Calcular } />
            </View>

        </View>
    );
};
