import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Spinner, Box, Link, Heading } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page");
        const data = await response.json();
        setStories(data.hits.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top stories:", error);
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" mb={4}>
          Hacker News Top Stories
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          stories.map((story) => (
            <Box key={story.objectID} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Link href={story.url} isExternal>
                <Heading as="h2" size="md" mb={2}>
                  {story.title} <FaExternalLinkAlt />
                </Heading>
              </Link>
              <Text>By {story.author}</Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(story.created_at).toLocaleString()}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
