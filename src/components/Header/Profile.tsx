import { Flex,Box,Text,Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile ({ showProfileData }: ProfileProps) {
  return(
    <Flex align="center">
    {showProfileData &&(
      <Box mr="4" textAlign="right">
        <Text>Luan Nascimento</Text>
        <Text color="gray.300" fontSize="small">
          luan.nascimento@outlook.com
        </Text>
      </Box>
    )}

    <Avatar size="md" name="Luan Nascimento" src="https://github.com/Luan4560.png" />
  </Flex>
  )
}