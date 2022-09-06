import "./App.css";
import logo from "./logo.svg";
import myimg from "./myimg.png";

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <img src={myimg} alt="test_image" />
                <p style={{ "fontFamily": '"Work Sans"' }}>Hello world</p>
            </header>
        </div>
    );
}
