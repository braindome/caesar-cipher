import { useState } from "react";
import axios from 'axios';


const DECRYPT_URL =
  //"https://i7fzubpd6bl56ulauhs5zhlujm0bopzf.lambda-url.eu-north-1.on.aws/decrypt";
  "https://2f037nqfwa.execute-api.eu-north-1.amazonaws.com/decrypt";
const ENCRYPT_URL =
  //"https://i7fzubpd6bl56ulauhs5zhlujm0bopzf.lambda-url.eu-north-1.on.aws/encrypt";
  "https://2f037nqfwa.execute-api.eu-north-1.amazonaws.com/encrypt";

const Cipher = () => {
  const [message, setMessage] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [shift, setShift] = useState(3)


  const encrypt = () => {
    axios.post(ENCRYPT_URL, {
        message: message,
        shift: shift
      })
      .then(function (response) {
        // console.log(response.data.encryptedMessage);
        setProcessedText(response.data.encryptedMessage);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const decrypt = () => {
    axios.post(DECRYPT_URL, {
        encryptedMessage: message,
        shift: shift
      })
      .then(function (response) {
        setProcessedText(response.data.decryptedMessage);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
    <div className="wrapper" >
      <textarea
        className="input"
        value={message}
        placeholder="Insert text..."
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setMessage(e.target.value)} 
      ></textarea>

      <div className="shift_field" >
        <input type="text" placeholder="Enter shift value (default = 3)" onChange={(e) => setShift(parseInt(e.target.value))} />
      </div>

      <div className="button_container" >
        <button onClick={encrypt}>Encrypt</button>
        <button onClick={decrypt}>Decrypt</button>
      </div>
      <div>
        <h3>Processed Text:</h3>
        <p> {processedText} </p>
      </div>
    </div>
  );
};

export default Cipher;
