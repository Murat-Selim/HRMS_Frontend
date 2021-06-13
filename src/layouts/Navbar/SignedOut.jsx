import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignedUp({signIn}) {
  return (
    <div>
      <Menu.Item>
        <Button inverted onClick={signIn}>Giris yap</Button>
        <Button inverted color="blue" style={{marginLeft:"0.5em"}}>Kayit ol</Button>
      </Menu.Item>
    </div>
  );
}
