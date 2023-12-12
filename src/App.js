import { useState } from "react";
import Check from "./pages/Check";
import Sort from "./pages/Sort";

function App() {
  const [isSort, setIsSort] = useState(true)


  return (
    <div className="App">
        <div className="header">
          <a onClick={() => setIsSort(true)}>Sort</a>
          <a onClick={() => setIsSort(false)}>Check</a>
        </div>
        {isSort ? <Sort/> : <Check/>}
    </div>
  );
}

export default App;
