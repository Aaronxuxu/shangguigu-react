import { Button, message } from "antd";
// import "./App.css";

function App() {
  const handleClick = () => {
    message.success("成功啦...");
  };
  return (
    <div className="App">
      <Button type="primary" onClick={handleClick}>
        学习
      </Button>
    </div>
  );
}

export default App;
