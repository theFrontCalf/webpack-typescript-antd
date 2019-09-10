import * as React from "react";
import * as ReactDOM from "react-dom";
import {Button} from 'antd';
import './demo.css'

import { Hello } from "./components/Hello";

ReactDOM.render(
  <div className="demo">
    <Hello compiler="TypeScript" framework="React" />
    <Button type="primary">Antd Button</Button>
  </div>,
  document.getElementById("example")
);