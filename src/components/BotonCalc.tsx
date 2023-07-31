import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    texto: string;
    color?: string;
    ancho?: boolean;
    accion?: ( numeroTexto: string ) => void; //Este valor debe ser obligatorio pero lo dejare como opcional al inicio.
}

export const BotonCalc = ({
    texto,
    color = '#2D2D2D',
    ancho = false,
    accion,
    }:Props ) => {

    // Validar color del texto
    const textColor = ( color === '#9B9B9B' ) ? 'black' : 'white';
    // Validar ancho
    const widthAncho = ( ancho ) ? 180 : 80;

    return (
        <TouchableOpacity
            onPress={ () => accion( texto ) }
        >
            <View style={{
                ...styles.boton,
                backgroundColor: color,
                width: widthAncho,
            }}>
                <Text style={{
                    ...styles.botonTexto,
                    color: textColor,
                }}>{ texto }</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boton: {
        height: 80,
        width: 80,
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    botonTexto: {
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        color: 'white',
        fontWeight: '300',
    },
});
