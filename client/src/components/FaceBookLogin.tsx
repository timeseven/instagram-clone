import React from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { FaceBookLoginProps } from "../utils/interface";

const FaceBookLogin: React.FC<FaceBookLoginProps> = ({ title }) => {
  const onSuccess = async (response: Record<string, any>) => {};
  const onFailure = (response: Error) => console.error(response);
  return (
    <div>
      <OAuth2Login
        buttonText={title}
        authorizationUrl="/"
        responseType="token"
        clientId="219669547363948"
        redirectUri="/"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default FaceBookLogin;
