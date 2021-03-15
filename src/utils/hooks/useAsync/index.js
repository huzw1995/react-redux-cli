import { useState } from "react";

const defaultInitialState = {
  stat: "idle",
  data: null,
  error: null,
};

export default useAsync = (currentState) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    ...currentState,
  });
  const setData = (data) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });
  const run = (promise) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        if (error.hasOwnProperty("msg")) {
          setError(error.msg);
        } else {
          setError(error.message);
        }
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
