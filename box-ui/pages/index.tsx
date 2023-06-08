import Link from "next/link";
import Layout from "../components/Layout";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const IndexPage = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

  const handleSend = () => {
    fetch(`http://${ipAddress}:8080`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: message,
    })
      .then((response) => response.text())
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => {
        // Handle the error here (e.g., display an error message)
        console.error("Error sending message:", error);
      });
    // Perform the logic to send the message to the IP address
    console.log("Sending message:", message, "to IP address:", ipAddress);
  };
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Send Message</Heading>
        <Input
          placeholder="127.0.0.1"
          variant="filled"
          mb={3}
          type="text"
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <Input
          placeholder="Hello there mf"
          variant="filled"
          mb={3}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button colorScheme="purple" onClick={handleSend}>
          Send
        </Button>
        {response && (
          <Text mt={6} textAlign="center">
            Response: {response}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default IndexPage;
