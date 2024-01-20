declare module '*.png' {
    const value: any;
    export default value;
  }
  declare module '*.jpg' {
    const value: any;
    export default value;
  }


  interface RootState {
    user: {
      userData: any;
    };
  }