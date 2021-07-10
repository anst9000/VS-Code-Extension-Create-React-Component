# Create React component

Helper extension to generate react components **my way**.

## How it works

Open command pallette by using Ctrl+Shift+P and select "New React component".

Input the component name (e.g. "Component").

The extension will create a file sctructure like this inside the parent folder:

```
└ Component
  ├ styles.module.css
  ├ index.js
  └ Component.js
```

With the following content:

`styles.module.css`

```
/* STYLES FOR COMPONENT Component */
```


`index.js`

```
export * from './Component';
```

`Component.js`

```
import styles from "./styles.module.css";

export const  Component  = () => {
  return <>Hello from Component</>;
};

export default Component;
```

It will also add to file src/components/index.js for ease of imports

`src/components/index.js`

```
export * from './Component';
```

**Enjoy!**
