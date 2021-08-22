import React from "react";
import { Button, Menu } from "semantic-ui-react";

export default function SignedUp({signIn}) {
  return (
    <div>
      <Menu.Item style={{marginTop: "10px"}}>
        <Button circular color="violet" onClick={signIn}>Giriş yap</Button>
        <Button circular basic inverted color="blue" style={{marginLeft:"0.5em"}}>Kayıt ol</Button>
      </Menu.Item>
    </div>
  );
}
