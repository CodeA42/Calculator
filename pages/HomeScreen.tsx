import { Button } from "react-native";
import { CalculatorDisplay } from "../components/CalculatorDisplay";
import { useState } from "react";
import _ from "lodash";
import { Snackbar } from "react-native-paper";

enum SignEnum {
  plus = "+",
  minus = "-",
  divide = "*",
  multiply = "/",
}

type Sign = "/" | "*" | "-" | "+";

export const HomeScreen = () => {
  const [text, setText] = useState("");
  const [snackbarState, setSnackbarState] = useState<{
    text: string;
    isVisible: boolean;
  }>({ text: "", isVisible: false });

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

  const replaceLastSymbolWith = (text: string, val: string): string => {
    const withoutLastChar = removeLastChar(text);
    return withoutLastChar.concat(val);
  };

  const endsWithSignAndZero = (text: string): boolean => {
    const result = Object.values(SignEnum).some((sign) =>
      text.endsWith(`${sign}0`)
    );

    return result;
  };

  const onButtonClick = (input: string) => {
    if (input === "C") {
      setText("");
    } else if (input === "=") {
      if (!_.isEmpty(text)) {
        if (_.isEqual(text, "0/0")) {
          setSnackbarState({ isVisible: true, text: "Invalid operation" });
          return;
        }
        if (text.endsWith("/0")) {
          setSnackbarState({ isVisible: true, text: "Cannot divide by zero" });
          return;
        }
        let finalText = text;

        if (endsWithSign(text)) finalText = removeLastChar(text);

        const result = calculateResult(finalText).toString();

        setText(result);
      }
    } else if (isSign(input)) {
      const textString = text.toString();
      if (!endsWithSign(textString) && !_.isEmpty(textString))
        setText(textString.concat(input));
    } else {
      if (!_.isString(text)) {
        setText(input);
      } else {
        if (endsWithSignAndZero(text) && input === "0") return;
        if (text === "0") return;
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (endsWithSignAndZero(text) && numbers.includes(input)) {
          setText(replaceLastSymbolWith(text, input));
          return;
        }
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
      <Snackbar
        visible={snackbarState.isVisible}
        onDismiss={() =>
          setSnackbarState({ ...snackbarState, isVisible: false })
        }
        duration={1000}
      >
        {snackbarState.text}
      </Snackbar>
    </>
  );
};
