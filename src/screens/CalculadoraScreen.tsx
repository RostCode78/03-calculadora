import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';
import { useCalculadora } from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {

    const {
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
    } = useCalculadora();

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
