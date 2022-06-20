import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./AppRouter";
import { CompanyContext } from "./CompanyData";
import Store from "./store";
import { Provider } from "react-redux";
export function FinalApp() {
  const [value, setValue] = React.useState(null);

  return (
    <CompanyContext.Provider
      value={{
        data: value,
        changeData: (props) => {
          setValue(props);
        },
      }}
    >
      <Provider store={Store}>
        <AppRouter />
      </Provider>
    </CompanyContext.Provider>
  );
}
ReactDOM.render(<FinalApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
