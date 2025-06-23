import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const useFlip = (initialState = true) => {
  const [isFlipped, setFlipped] = useState(initialState);
  const flip = () => {
    setFlipped(isUp => !isUp);
  };
  return [isFlipped, flip];
};

const useAxios = (baseUrl) => {
  const [responses, setResponses] = useState([]);

  const addData = async (restOfUrl = "") => {
    const endpoint = typeof restOfUrl === "string" ? restOfUrl : "";
    const response = await axios.get(`${baseUrl}${endpoint}`);
    setResponses(data => [...data, { ...response.data, id: uuid() }]);
  };

  return [responses, addData];
};

export { useFlip, useAxios }; 