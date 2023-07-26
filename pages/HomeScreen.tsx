import { Button } from "react-native";
import { CalculatorDisplay } from "../components/CalculatorDisplay";
import { useState } from "react";
import _, { endsWith } from "lodash";
import { Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";

enum OperatorEnum {
  plus = "+",
  minus = "-",
  divide = "/",
  multiply = "*",
}

enum Command {
  plus = '+',
  minus = '-',
  divide = '/',
  multiply = '*',
  clear = 'clear',
  delete = 'delete',
  number = 'number',
  changeSign = 'changeSign',
  result = 'result',
  bracket = 'bracket',
  dot = 'dot'
}

enum Number {
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9'
}

const isNumber = (val: any): val is Number => {
  return typeof val === 'string' && Object.values<string>(Number).includes(val)
}

enum Digit {
  zero = '0',
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9'
}

const isDigit = (val: any): val is Digit => {
  return typeof val === 'string' && Object.values<string>(Digit).includes(val)
}

type Operator = "/" | "*" | "-" | "+";

const isOperator = (val: any): val is Operator => {
  return typeof val === "string" && Object.values<string>(OperatorEnum);.includes(val);
};

export const HomeScreen = () => {
  const [text, setText] = useState("");
  const [snackbarState, setSnackbarState] = useState<{
    text: string;
    isVisible: boolean;
  }>({ text: "", isVisible: false });

  const displayError = (message: string) => {
    setSnackbarState({isVisible: true, text: message})
  }

  const calculateResult = (text: string): string => {
    return eval(text);
  };

  const removeLastChar = (text: string): string => {
    return text.slice(0, -1);
  };

  const getLastChar = (text: string): string => {
    return text.slice(-1);
  };

  const getTextAfterLastOperator = (text: string): string => {
    const splitResult = text.split(/[\+,\-,\*,\/]/);
    return splitResult[splitResult.length - 1];
  };

  const getTextAfterLastSign = (text: string): string => {
    const splitResult = splitByAllSigns(text);
    return splitResult[splitResult.length - 1];
  };

  const splitByAllSigns = (text: string): string[] => {
    return text.split(/[\+,\-,\*,\/,\(,\)]/);
  };

  const hasValAfterLastSign = (text: string, val: string) => {
    return getTextAfterLastOperator(text).includes(val);
  };

  const hasDotAfterLastSign = (text: string) => {
    return hasValAfterLastSign(text, ".");
  };

  const endsWithOperator = (val: string): boolean => {
    const lastChar = getLastChar(val);
    return isOperator(lastChar);
  };

  const isOperator = (val: any): val is Operator => {
    const signs = Object.values<string>(OperatorEnum);
    return typeof val === "string" && signs.includes(val);
  };

  const replaceLastCharWith = (text: string, val: string): string => {
    const withoutLastChar = removeLastChar(text);
    return withoutLastChar.concat(val);
  };

  const endsWithOperatorAndZero = (text: string): boolean => {
    return endsWithOperatorAnd(text, "0");
  };

  const endsWithOperatorAnd = (text: string, val: string): boolean => {
    const result = Object.values(OperatorEnum).some((operator) =>
      text.endsWith(`${operator}${val}`)
    );
    return result;
  };

  const endsWithSignAndOpenBracket = (text: string) => {
    return endsWithOperatorAnd(text, "(");
  };

  const countOccurencesOfSubstring = (text: string, val: string) => {
    return text.split(val).length - 1;
  };

  const countOpenBrackets = (text: string) => {
    return countOccurencesOfSubstring(text, "(");
  }

  const countClosedBrackets = (text: string) => {
    return countOccurencesOfSubstring(text, ")")
  }

  const hasOpenBracket = (text: string): boolean => {
    return countOpenBrackets(text) > countClosedBrackets(text);
  };

  const endsWithNumber = (text: string): boolean => {
    const lastText = getTextAfterLastSign(text);
    return text.endsWith(lastText);
  };

  const closeBrackets = (text: string): string => {
    const difference = countOpenBrackets(text) - countClosedBrackets(text)

    return text.concat(')'.repeat(difference))
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const endsWithAnyDataArr = (text: string, dataArr: string[]): boolean => {
    return dataArr.some(data => text.endsWith(data));
  };

  const onButtonClick = (input: string) => {
    if (input === Command.bracket) {
      if(endsWithAnyDataArr(text, ['(-', '(+'])) {
        setText(text.concat('1)'))
      } else if(_.isEmpty(text)) return
      else if (endsWithSignAndOpenBracket(text)) return;
      if (endsWithOperator(text)) {
        setText(text.concat("("));
      } else if (endsWithNumber(text)) {
        if (hasOpenBracket(text)) {
          setText(text.concat(")"));
        } else {
          setText(text.concat("*("));
        }
      } else if (text.endsWith(")")) {
        if (hasOpenBracket(text)) {
          setText(text.concat(")"));
        } else if (!hasOpenBracket(text)) {
          return;
        }
      }
    } else if (input === Command.dot) {
      if(endsWithAnyDataArr(text, digits) && !hasDotAfterLastSign(text)) {
        setText(text.concat('.'))
      }
    } else if (input === Command.delete) {
      if (text.length > 0) setText(removeLastChar(text));
    } else if (input === Command.clear) {
      setText("");
    } else if (input === Command.result) {
      if (!_.isEmpty(text)) {
        if(endsWithAnyDataArr(text, ['(+', '(-'])) {
          displayError('Invalid format used')
          return
        }
        let finalText = text;

        
        if (endsWithOperator(finalText)) finalText = removeLastChar(text);

        finalText = closeBrackets(finalText)

        const result = calculateResult(finalText).toString();
        
        const InfinityEval = eval('1/0').toString()
        const NaNEval = eval('0/0').toString()
        
        if (_.isEqual(result, NaNEval)) {
          displayError("Invalid operation")
          return;
        }
        if (_.isEqual(result, InfinityEval)) {
          displayError('Cannot divide by zero')
          return;
        }
        
        setText(result);
      }
    } else if (isOperator(input)) {
      const textString = text.toString();
      if(input === '-' || input === '+') {
        if(endsWithAnyDataArr(textString, [...digits, '(', ')'])) {
          setText(textString.concat(input))
        } else if (endsWithAnyDataArr(textString, ['(+', '(-'])) {
          setText(replaceLastCharWith(textString, input))
        }
      } else if(endsWithOperator(textString) && !endsWithAnyDataArr(textString, ['(+', '(- '])) {
        setText(replaceLastCharWith(text, input))
      } else if (!endsWithOperator(textString) && !_.isEmpty(textString)){
        setText(textString.concat(input));
      }
    } else {
      if (!_.isString(text)) {
        setText(input);
      } else {
        if (endsWithOperatorAndZero(text) && input === "0") return;
        if (text === "0") return;
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (endsWithOperatorAndZero(text) && numbers.includes(input)) {
          setText(replaceLastCharWith(text, input));
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
      <Button title="+" onPress={() => onButtonClick(Command.plus)} />
      <Button title="-" onPress={() => onButtonClick(Command.minus)} />
      <Button title="*" onPress={() => onButtonClick(Command.multiply)} />
      <Button title="/" onPress={() => onButtonClick(Command.delete)} />
      <Button title="=" onPress={() => onButtonClick(Command.result)} />
      <Button title="C" onPress={() => onButtonClick(Command.clear)} />
      <Button title="." onPress={() => onButtonClick(Command.dot)} />
      <Button title="()" onPress={() => onButtonClick(Command.bracket)} />
      <Icon.Button
        name="delete"
        onPress={() => {
          onButtonClick(Command.delete);
        }}
      ></Icon.Button>
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
