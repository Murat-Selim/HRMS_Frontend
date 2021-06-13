import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";

export default function SignedIn({ signOut }) {
  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaces="right"
          src="https://img2.pngindir.com/20180426/bhe/kisspng-computer-icons-avatar-man-clip-art-5ae1dffd9b6241.8062271015247523816365.jpg"
        />
        <Dropdown pointing="top left" text="Murat">
          <Dropdown.Menu>
            <Dropdown.Item text="Bilgilerim" icon="info" />
            <Dropdown.Item onClick={signOut} text="Cikis yap" icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
