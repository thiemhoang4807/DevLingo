import Body from "./layouts/Body";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./App.css";

import { TermPageCategory, TermPageCategorySpecializedLetter } from "./pages/TermPage";


function App() {
  return (
    <>
      <Header />
      <Body />
      {/* <TermPageCategorySpecializedLetter /> */}
      <Footer />
    </>
  );
}

export default App