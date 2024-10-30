import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';

// Initialize app
ReactNativeScript.start(
    React.createElement(MainStack, {}, null)
);