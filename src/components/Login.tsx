import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import styled from 'styled-components';
import {getName, setNameAction} from "../reducers/loginReducer"

const LoginSection = styled.div`
margin-top: 40px;
text-align: center;
`
const Label = styled.label`
margin: 5px;
color: blue;
font-size: 20px;
`

const Input = styled.input`
margin: 10px;
margin-right: 30px;
border: 2px solid black;
&: hover {
    border: 2px solid blue;
}
`

const Greeting = styled.h1`
color: turquoise;
`

const Button = styled.button`
  margin: 10px;
  margin-top: 20px;
  color: white;
  background-color: blue;
  border-radius: 5px;
  padding: 10px;
`;
const Login = () => {

const name = useSelector(getName);
const dispatch = useDispatch();
const [input, setInput] = useState('');
 
return (
    <LoginSection>
        <Label>Enter your name:</Label>
        <Input type = 'text' value = {input} onChange = {(e)=>setInput(e.target.value)} />
        <Button onClick = {()=>{dispatch(setNameAction(input)); setInput('')}}>Submit</Button>
        <Greeting>{name? `Hello ${name}!`: null}</Greeting>
    </LoginSection>
)
}

export default Login;