import { Text, TouchableOpacity } from "react-native";

interface IProps {
  text: string;
  style: object;
  onPress: () => void;
}

function Botao(props: IProps) {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Text style={{ color: 'white' }}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Botao;
