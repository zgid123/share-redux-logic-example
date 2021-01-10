/* eslint-disable @typescript-eslint/ban-types */
declare module 'react-native-password-strength-meter' {
  import { FC } from 'react';
  import { ViewProps, TextProps } from 'react-native';

  export interface IBoxPasswordStrengthDisplayProps {
    width?: number;
    password: string;
    boxColor?: string;
    touched?: boolean;
    minLength?: number;
    boxSpacing?: number;
    scoreLimit?: number;
    labelVisible?: boolean;
    boxStyle?: ViewProps['style'];
    labelStyle?: TextProps['style'];
    wrapperStyle?: ViewProps['style'];
    boxContainerStyle?: ViewProps['style'];
    variations?: {
      lower?: RegExp;
      upper?: RegExp;
      digits?: RegExp;
      nonWords?: RegExp;
    };
    levels?: {
      label: string;
      labelColor: string;
      activeBarColor: string;
    }[];
  }

  export declare const BoxPasswordStrengthDisplay: FC<IBoxPasswordStrengthDisplayProps>;
}
