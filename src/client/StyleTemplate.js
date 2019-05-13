import Table from 'reactstrap/lib/Table';
import styled from 'styled-components';

export const InfoTable = styled(Table)`
  th {
    font-size: calc(7px + .5vw);
  }
  td {
    vertical-align: middle !important;
    font-size: calc(5px + .5vw);
  }
`;

export const MainLink = styled.a`
  color: inherit;
  text-decoration: none;
  color: #61dafb;
  :hover {
    color: #61dafb;
  }
`;

export const AppBox = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(12px + .5vw) !important;
  color: white;
`;

export const Article = styled.div`
  text-align: center;
`;

export const ArticleText = styled.p`
  padding: 100;
  margin: 100;
  width: 80%;
  display: inline-table;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 0.5vw);
  color: #e8edef;
`;

export const RatingBox = styled.div`
  margin-left: -20px;
  border-radius: 20px 40px;
  padding: 10px;
  float: left;
  text-align: center;
  position: relative;
  background-color: #64C7CC;
`;

export const RatingText = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export const RatingScore = styled.span`
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const RatingMax = styled.span`
  color: #212529;
  font-size: 1rem;
`;