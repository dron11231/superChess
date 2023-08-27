declare module '*.css';
declare module '*.scss';
declare module '*.png' {
  const value: any;
  export default value;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  __REDUX_DEVTOOLS_EXTENSION__: any;
}
