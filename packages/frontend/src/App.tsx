import QuizPage from './pages/QuizPage';

function App() {
  return (
    <div className="App">
      <QuizPage />
    </div>
  );
}

export default App;
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      {/* Body in here */}
      <Footer />
    </div>
  )
}

export default App
