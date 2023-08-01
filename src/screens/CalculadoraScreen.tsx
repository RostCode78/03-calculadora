import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';

export const CalculadoraScreen = () => {

    const [ numero, setNumero ] = useState('0');
    const [ numeroAnterior, setNumeroAnterior ] = useState('0');

    const Limpiar = () => {
        setNumero('0');
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

    return (
        <View style={ styles.calculadoraContainer }>
            <Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>
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
                <BotonCalc texto="del" color="#9B9B9B" accion={ Limpiar } />
                <BotonCalc texto="/" color="#FF9427" accion={ Limpiar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="7" accion={ ArmarNumero } />
                <BotonCalc texto="8" accion={ ArmarNumero } />
                <BotonCalc texto="9" accion={ ArmarNumero } />
                <BotonCalc texto="X" color="#FF9427" accion={ Limpiar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="4" accion={ ArmarNumero } />
                <BotonCalc texto="5" accion={ ArmarNumero } />
                <BotonCalc texto="6" accion={ ArmarNumero } />
                <BotonCalc texto="-" color="#FF9427" accion={ Limpiar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="1" accion={ ArmarNumero } />
                <BotonCalc texto="2" accion={ ArmarNumero } />
                <BotonCalc texto="3" accion={ ArmarNumero } />
                <BotonCalc texto="+" color="#FF9427" accion={ Limpiar } />
            </View>

            {/* Fila de botones */}
            <View style={ styles.fila }>
                <BotonCalc texto="0" ancho accion={ ArmarNumero }/>
                <BotonCalc texto="." accion={ ArmarNumero }/>
                <BotonCalc texto="=" color="#FF9427" accion={ Limpiar } />
            </View>

        </View>
    );
};
