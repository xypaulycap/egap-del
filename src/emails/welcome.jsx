import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

const WelcomeEmail = ({ email }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img
          src={
            "https://egapswiftbuy.com/_next/image?url=%2Flogo.png&w=256&q=75"
          }
          width="150"
          height="150"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hello {email},</Text>
        <Text style={paragraph}>
          Welcome to <b>EGAP</b> - your one-stop destination for all your shopping
          needs! We are thrilled to have you on board. At Egap, you’ll discover
          the latest products, unbeatable deals, and a seamless shopping
          experience tailored just for you. Here’s what you can look forward to:{" "}
          <br />
          <div style={points}>
          Personalized Recommendations: Find what you love faster. <br />
          Fast & Secure Checkout: Shopping made simple and safe. <br />
          </div>
          To get started, visit our website and explore our curated collections. <b>Happy Shopping!!!</b>
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://egapswiftbuy.com">
            Shop Now
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Egap team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Lagos state Nigeria
        </Text>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
};

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const points = {
  textAlign: "center",
  marginBottom: "12px",
  fontWeight:"500"
}

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#ff5f1f",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "20px",
  fontWeight: "50px",
  textDecoration: "none",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  padding: "10px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
