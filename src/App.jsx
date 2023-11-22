import React, { useState } from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Main from './components/main/Main';

function App() {
  const [images, setImages] = useState([]);
  const [inputValues, setInputValues] = useState({ des: "", ann: ""});
  // const [restart, setRestart] = useState(false);

  const handleRestart = ()=>{
    setImages([]);
    console.log("restart");
  }
  const handleChangeDes = (des) => {
    console.log("des working")
    setInputValues({ ...inputValues, des });
  };

  const handleChangeAnn = (ann) => {
    setInputValues({ ...inputValues, ann });
  };

  const handleButtonClick = async () => {
    try {
      const data = {
        inputs: inputValues.des,
      };
      console.log(data);
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          method: "POST",
          headers: {
            Accept: "image/png",
            Authorization: "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);

      if (images.length === 10) {
        console.log("The image array is full");
      } else {
        setImages((prevImages) => [...prevImages, {url:imageUrl, anno:inputValues.ann}]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header />
      <Hero images={images} />
      <hr />
      <Main
        handleClick={handleButtonClick}
        handleChangeDes={handleChangeDes}
        handleChangeAnn={handleChangeAnn}
        handleRestart={handleRestart}
      />
    </>
  );
}

export default App;
