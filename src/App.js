import { useState } from "react";
import styled from "styled-components";
import logo from "./assets/logo.svg";
import { FaBell } from "react-icons/fa";
import PP from "./assets/profilePic.jpg";
import Intro from "./main/intro";
import Campaign from "./main/campaign";
import CreateCampaign from "./main/create-campaign";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const navigateTo = (page) => setCurrentPage(page);

  return (
    <AppWrapper id="home">
      <Header>
        <HeaderInner>
          <Left>
            <Logo src={logo} alt="Logo" />
            <Nav>
              <NavLink href="/" className="active">
                Dashboard
              </NavLink>
              <NavLink href="/pledges">Pledges</NavLink>
            </Nav>
          </Left>

          <Right>
            <AlertProfile>
              <BellIcon />
              <Separator />
              <Profile>
                <Avatar src={PP} alt="Philip" />
                <Name>Philip</Name>
              </Profile>
            </AlertProfile>
            <CreateButton onClick={() => navigateTo("createCampaign")}>
              Create Campaign
            </CreateButton>
          </Right>
        </HeaderInner>
      </Header>

      <Main>
        <MainInner>
          {currentPage === "dashboard" ? (
            <>
              <Intro />
              <Campaign />
            </>
          ) : (
            <CreateCampaign onBack={() => navigateTo("dashboard")} />
          )}
        </MainInner>
      </Main>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const HeaderInner = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 65%;
`;

const Logo = styled.img`
  height: 30px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #777e90;
  font-weight: 500;
  font-size: 16px;

  &.active {
    color: #328be0;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

const AlertProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BellIcon = styled(FaBell)`
  font-size: 18px;
  color: #4e5d78;
  cursor: pointer;
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background-color: #91a0bb;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  font-weight: 500;
  color: #333;
`;

const CreateButton = styled.button`
  background: linear-gradient(to right, #1b75bc, #29abe2);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 8px 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Main = styled.main`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  overfloxy: auto;
`;

const MainInner = styled.div`
  width: 85%;
  height: 95%;
`;
