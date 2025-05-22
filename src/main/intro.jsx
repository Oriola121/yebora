import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Title = styled.p`
  color: #13192e;
  font-size: 20px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Highlight = styled.span`
  color: #328be0;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  width: 40%;
  padding: 10px;
  border: 1px solid #f3f3f5;
  border-radius: 25px;
  align-items: center;
  gap: 8px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const SearchIcon = styled.div`
  width: 30px;
  height: 30px;
  background: #328be0;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function Intro() {
  return (
    <div>
      <Title>All Campaigns</Title>

      <Heading>
        <h1>
          Small Donations, Big
          <br /> Impact: Contribute to Help
          <br /> <Highlight>Fund a Better Future!</Highlight>
        </h1>

        <SearchContainer>
          <SearchInput placeholder="Search popular campaigns" />
          <SearchIcon>
            <FaSearch size={14} />
          </SearchIcon>
        </SearchContainer>
      </Heading>
    </div>
  );
}
