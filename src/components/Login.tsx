import { useState, useContext } from "react";
import { DataContext } from "./App";
import styled from "styled-components";

const LoginSection = styled.div`
  margin-top: 40px;
  text-align: center;
`;
const Label = styled.label`
  margin: 5px;
  color: blue;
  font-size: 20px;
`;

const Input = styled.input`
  margin: 10px;
  margin-right: 30px;
  border: 2px solid black;
  &: hover {
    border: 2px solid blue;
  }
`;

const Greeting = styled.h1`
  color: turquoise;
`;

const Button = styled.button`
  margin: 10px;
  margin-top: 20px;
  color: white;
  background-color: blue;
  border-radius: 5px;
  padding: 10px;
`;
const Login = () => {
  const dataContext = useContext(DataContext);

  const [nameInput, setNameInput] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (nameInput === "" || password === "") {
      alert("Please fill in both fields.");
      return;
    }
    dataContext.setName(nameInput);
    dataContext.setPassword(password);
  };

  return (
    <LoginSection>
      <Label>Name:</Label>
      <Input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <Label>Password:</Label>
      <Input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleClick}>Submit</Button>
      <Greeting>
        {dataContext.name ? `Hello ${dataContext.name}!` : null}
      </Greeting>
    </LoginSection>
  );
};

export default Login;
