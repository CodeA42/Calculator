import { Button, GestureResponderEvent } from "react-native";
import { CalculatorDisplay } from "../components/CalculatorDisplay";
import { useState } from "react";
import _ from "lodash";

enum SignEnum {
  plus = "+",
  minus = "-",
  divide = "*",
  multiply = "/",
}

type Sign = "/" | "*" | "-" | "+";

export const HomeScreen = () => {
  const [text, setText] = useState("");

  const calculateResult = (text: string): string => {
    return eval(text);
  };

  const removeLastChar = (text: string): string => {
    return text.slice(0, -1);
  };

  const getLastChar = (text: string): string => {
    return text.slice(-1);
  };

  const endsWithSign = (val: string): boolean => {
    const lastChar = getLastChar(val);
    return isSign(lastChar);
  };

  const isSign = (val: any): val is Sign => {
    const signs = Object.values<string>(SignEnum);
    return typeof val === "string" && signs.includes(val);
  };

  const onButtonClick = (input: string) => {
    if (input === "C") {
      setText("");
    } else if (input === "=") {
      if (!_.isEmpty(text)) {
        console.log("equals if");

        let finalText = text;

        if (endsWithSign(text)) finalText = removeLastChar(text);

        const result = calculateResult(finalText).toString();

        setText(result);
      }
    } else if (isSign(input)) {
      console.log("sign if");

      const textString = text.toString();
      if (!endsWithSign(textString) && !_.isEmpty(textString))
        setText(textString.concat(input));
    } else {
      if (!_.isString(text)) {
        setText(input);
      } else {
        setText(text.concat(input));
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
