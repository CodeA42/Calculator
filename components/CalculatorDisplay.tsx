import { Text } from "react-native";

export type CalculatorDisplayProps = {
  text?: string;
};

export const CalculatorDisplay = (props: CalculatorDisplayProps) => {
  return <Text>{props.text}</Text>;
};
