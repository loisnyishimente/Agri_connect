// Assuming this is in a file like CustomInput.tsx

import { ThemeProps, useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";

// Extend ThemeProps to include lightColor and darkColor if they are not already included
export type TextInputProps = ThemeProps;

interface FormInputProps extends TextInputProps {
  label: string;
  type?: string;
  required?: boolean;
  value?: any;
  onChangeText?: (text: string) => void; // Specify the type for onChangeText
  secureTextEntry?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  lightColor?: string; // Add lightColor property
  darkColor?: string;  // Add darkColor property
}

const CustomInput: React.FC<FormInputProps> = ({
  label,
  type,
  required,
  value,
  onChangeText,
  secureTextEntry,
  lightColor,
  darkColor,
  right,
  left,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <TextInput
      style={{
        backgroundColor,
        fontSize: 12,
        color: "black",
        marginTop: 6,
      }}
      textColor={textColor}
      label={label}
      mode="outlined"
      autoCapitalize="none"
      outlineColor="#E6E8EE"
      activeOutlineColor="#026338"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      left={left}
      right={right}
      {...otherProps}
    />
  );
};

export default CustomInput;