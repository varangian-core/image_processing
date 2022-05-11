import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
    const [previewImage, setPreviewImage] = useState("");
    const [imageFile, setImageFile] = useState({});
    const [text, setText] = useState("");

    function handleFileInputChange(event) {
        setImageFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        console.log(previewImage);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const form = new FormData();
        form.append("Session", "string");
        form.append("srcImg", imageFile);

        const options = {
            method: "POST",
            url: "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
            headers: {
                "content-type": "multipart/form-data",
                "x-rapidapi-host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            },
            data: form
        };
        axios
            .request(options)
            .then(function (response) {
                setText(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <div className="App">
            <h1>GET IMAGE TEXT</h1>
            <img src={previewImage} />
            <form onSubmit={handleFormSubmit}>
                <div className="input-wrapper">
                    <button className="btn">Upload an Image</button>
                   <input type="file" onChange={handleFileInputChange} />
                    <input type="submit" value="Extract Text" />
                </div>
            </form>
            <p className="text">{text}</p>
        </div>
    );
}

export default App;
