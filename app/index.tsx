import Botao from "@/components/Botoes";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useWindowDimensions } from 'react-native';

export default function Index() {
  const { width } = useWindowDimensions();
  const [n1, setn1] = useState('');
  const [operador, setOperador] = useState<String | null>(null);
  const [n2, setn2] = useState('');
  const [resultado, setResultado] = useState('');

  const tamanho = (width - 25) / 4;

  const estilo_botao = {
    backgroundColor: '#888',
    width: 80,
    borderRadius: 40,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    margin: 2,
  };

  const aoPressionarBotao = (valor: string) => {
    if (!isNaN(Number(valor)) || valor === ',') {
      if (!operador) {
        setn1((prev) => prev + valor.replace(',', '.'));
      } else {
        setn2((prev) => prev + valor.replace(',', '.'));
      }
    } else if (['+', '-', 'x', '/', '%'].includes(valor)) {
      setOperador(valor);
    } else if (valor === '=') {
      calcular();
    } else if (valor === 'C') {      
      limpar();
    } else if (valor === '<=') {
      apagar();
    }
    
  };

  const calcular = () => {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    let res = '';

    if (operador != null) {
      switch (operador) {
        case '+':
          res = (num1 + num2).toString();
          break;
        case '-':
          res = (num1 - num2).toString();
          break;
        case 'x':
          res = (num1 * num2).toPrecision(4).toString();
          console.log(res);
          break;
        case '/':
          res = num2 !== 0 ? (num1 / num2).toString() : 'Erro';
          break;
        case '%':
          res = (num1 % num2).toString();
          break;
      }
    }

    setResultado(res);
    setn1(res);
    setn2('');
    setOperador(null);
  };

  const limpar = () => {
    setn1('');
    setn2('');
    setOperador(null);
    setResultado('');
  };

  const apagar = () => {
    if (n2) {
      setn2(n2.slice(0, -1));
    } else if (operador) {
      setOperador(null);
    } else {
      setn1(n1.slice(0, -1));
    }
  };

  const botoes = [
    "C", "<=", "%", "/", 
    "7", "8", "9", "x", 
    "4", "5","6", "-",
    "1", "2", "3", "+",
    ".", "0", ",", "="
  ];

  

  return (
    <View style={styles.container}>
      <View style={styles.campo}>
        <Text style={{ fontSize: 30, color: 'white', padding: 10 }}>
          {resultado || `${n1} ${operador || ' '} ${n2}`}
        </Text>
      </View>
      <View style={{
        width: '100%',
        backgroundColor: '#fff',
        height: (tamanho * 4) + 70,
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        {botoes.map((b, idx) => (
          <Botao key={idx} text={b} style={estilo_botao} onPress={() => aoPressionarBotao(b)} />        
        ))};
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  campo: {
    backgroundColor: '#47453f',
    borderColor: '#000',
    borderWidth: 4,
    margin: 30,
    width: '90%',
    marginBottom: 50
  },
});
