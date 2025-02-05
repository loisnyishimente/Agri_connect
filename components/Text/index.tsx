import { ThemeProps, useThemeColor } from "@/hooks/useThemeColor";
import { Text as DefaultText } from "react-native";

export type TextProps = ThemeProps & DefaultText["props"];

export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const MonoText = (props: TextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: "ReadexPro" }]} />;
};
