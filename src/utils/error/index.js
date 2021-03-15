class _Error extends Error {
  constructor(props) {
    super();
    if (typeof props === "string") {
      this.message = props;
    } else {
      this.message = props.msg || props.message;
    }
    this.name = "错误";
    this.message = this.message || "未知错误信息";
    this.stack = new Error().stack;
  }
}

export default _Error;
