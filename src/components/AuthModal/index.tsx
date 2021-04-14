import React, { useState } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const { Title, Header, Body } = Modal;

const TAB_NAMES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

interface Props {
  show: boolean;
  closeAuthModal: () => void;
}

export default function AuthModal(props: Props): JSX.Element {
  const { show, closeAuthModal } = props;
  const [currentTab, setCurrentTab] = useState(TAB_NAMES.LOGIN);

  const openLogin = () => setCurrentTab(TAB_NAMES.LOGIN);

  return (
    <Modal show={show} onHide={closeAuthModal}>
      <Header closeButton>
        <Title>Войти</Title>
      </Header>
      <Body>
        <Tabs defaultActiveKey={TAB_NAMES.LOGIN} activeKey={currentTab} onSelect={(k) => k && setCurrentTab(k)}>
          <Tab eventKey={TAB_NAMES.LOGIN} title="Войти">
            <LoginForm closeAuthModal={closeAuthModal} />
          </Tab>
          <Tab eventKey={TAB_NAMES.REGISTER} title="Регистрация">
            <RegisterForm openLogin={openLogin} />
          </Tab>
        </Tabs>
      </Body>
    </Modal>
  );
}
