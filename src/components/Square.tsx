import styled from "styled-components";

const Cell = styled.td`
  margin: 0;
  padding: 0;
`;

const SquareBackground = styled.div`
  background: ${(props:{ black:boolean }) => (props.black ? "black" : "white")};
  height: 20px;
  width: 20px;
`;

const Square = (props: { handleClick: ()=>void, squareInfo:boolean }) => {
  return (
    <Cell onClick={props.handleClick}>
      {props.squareInfo ? <SquareBackground black={true} /> : <SquareBackground black={false} />}
    </Cell>
  );
};

export default Square;
