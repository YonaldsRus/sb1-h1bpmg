/// <reference path="./node_modules/@nativescript/types-minimal/index.d.ts" />
/// <reference path="./node_modules/@nativescript/types/index.d.ts" />

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.css" {
  const content: any;
  export default content;
}

declare const TNS_ENV: string;
declare const __DEV__: boolean;

declare namespace NodeJS {
  interface Global {
    isAndroid: boolean;
    isIOS: boolean;
    document?: any;
  }
}