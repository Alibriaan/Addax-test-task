import 'styled-components';

declare module 'styled-components' {
  export interface Palette {
    main: string;
    light: string;
    dark: string;
  }

  export type PlatterMode = 'light' | 'dark';

  export type CssProp = TemplateStringsArray | CSSObject;

  export type ComponentWithCss<T = {}> =  T & { css?: CssProp };

  export type StyledInterface = ThemedStyledInterface<DefaultTheme & ComponentWithCss>;

  export interface Palettes {
    mode: PlatterMode;
    common: {
      black: string;
      white: string;
      transparent: string;
    };
    primary: Palette;
    secondary: Palette;
    error: Palette;
  }

  export interface TypographyVariant {
    fontSize: string;
    fontWeight: string;
  }

  export interface Typography {
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
  };

  export interface DefaultTheme {
    palette: Palettes;
    typography: Typography;
    border: {
      radius: string;
    }
  }

  export type CssProp = TemplateStringsArray | CSSObject;

  export type ComponentWithCss<T = {}> =  T & { css?: CssProp };
}