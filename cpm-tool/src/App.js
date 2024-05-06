import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
import Header from "./components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <>
      <Header user={user} signOut={signOut} />
      <ProjectForm user={user} />
      <ProjectList user={user} />
    </>
  );
}

export default withAuthenticator(App);
