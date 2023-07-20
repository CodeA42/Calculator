import { Button, GestureResponderEvent } from "react-native";
import { CalculatorDisplay } from "../components/CalculatorDisplay";
import { useState } from "react";

export const HomeScreen = () => {
  const [text, setText] = useState("");

  const calculateResult = (text: string): string => {
    let result = eval(text);
    return result;
  };

  const onButtonClick = (e: string) => {
    if (e === "C") {
      setText("");
    } else if (e === "=") {
      setText(calculateResult(text));
    } else {
      console.log(text);

      if (
        !(
          text.endsWith("+") ||
          text.endsWith("-") ||
          text.endsWith("/") ||
          text.endsWith("*")
        )
      ) {
        setText(text.concat(e));
      }
    }
  };

  return (
    <>
      <CalculatorDisplay text={text} />
      <Button title="1" onPress={() => onButtonClick("1")} />
      <Button title="2" onPress={() => onButtonClick("2")} />
      <Button title="3" onPress={() => onButtonClick("3")} />
      <Button title="4" onPress={() => onButtonClick("4")} />
      <Button title="5" onPress={() => onButtonClick("5")} />
      <Button title="6" onPress={() => onButtonClick("6")} />
      <Button title="7" onPress={() => onButtonClick("7")} />
      <Button title="8" onPress={() => onButtonClick("8")} />
      <Button title="9" onPress={() => onButtonClick("9")} />
      <Button title="0" onPress={() => onButtonClick("0")} />
      <Button title="+" onPress={() => onButtonClick("+")} />
      <Button title="-" onPress={() => onButtonClick("-")} />
      <Button title="*" onPress={() => onButtonClick("*")} />
      <Button title="/" onPress={() => onButtonClick("/")} />
      <Button title="=" onPress={() => onButtonClick("=")} />
      <Button title="C" onPress={() => onButtonClick("C")} />
    </>
  );
};
