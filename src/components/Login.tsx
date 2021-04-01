import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { getName, setLoginAction } from "../reducers/loginReducer";

const LoginSection = styled.div`
  margin-top: 0;
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
  margin: 0;
  margin-bottom: 10px;
  color: turquoise;
`;

const Button = styled.button`
  margin: 10px;
  margin-top: 10px;
  color: white;
  background-color: blue;
  border-radius: 5px;
  padding: 10px;
`;
const Login = () => {
  const name = useSelector(getName);
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (nameInput === "" || password === "") {
      alert("Please fill in both fields.");
      return;
    }
    dispatch(setLoginAction(nameInput, password));
    setNameInput("");
    setPassword("");
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
      <Greeting>{name ? `Hello ${name}!` : null}</Greeting>
    </LoginSection>
  );
};

export default Login;
