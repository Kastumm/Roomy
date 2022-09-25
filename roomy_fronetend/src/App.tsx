import Header from "./components/header/Header";
import Main from "./main/main";

function App() {
  
  return (
    <div className="wrapper">
      <Header />
      <div className="content-wrapper">
        <Main />
      </div>
    </div>
  );
}

export default App;