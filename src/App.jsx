import React, { useState } from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Main from './components/main/Main';

function App() {
  const [images, setImages] = useState([]);

  const handleButtonClick = async () => {
    try {
      const data = {
        "inputs": "Astronaut riding a horse"
      };

      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          method: "POST",
          headers: {
            "Accept": "image/png",
            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);

      if (images.length === 10) {
        console.log("The image array is full");
        // You might display a message or disable the button when the array is full
      } else {
        // Using setImages([...images, imageUrl]); directly inside the function might cause issues due to how React batches state updates. The problem arises when you rely on the current state (images) to update the state immediately. In some scenarios, React might not provide the most up-to-date state when using this method because state updates are asynchronous.
// Using the functional form of setImages ensures that you're working with the latest state value at the time the update is applied. This approach guarantees the correctness of the updated state based on the previous state.
// javascript
// Copy code
// setImages(prevImages => [...prevImages, imageUrl]);
// This approach, with the functional form of setState, prevents potential issues related to stale state references and ensures that you're correctly updating the state based on its previous value.

// However, if you face any specific issues or error messages while using setImages([...images, imageUrl]);, feel free to provide more details, and I'll be happy to assist further!
        setImages((prevImages)=>[...prevImages, imageUrl]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state here or display an error message in the UI
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <button onClick={handleButtonClick}> You have to click me</button>
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Image ${index}`} />
        </div>
      ))}
      <hr />
      <Main />
    </>
  );
}

export default App;
