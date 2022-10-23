import React, { FunctionComponent, useCallback, useState } from 'react';
import { Box, HStack, Icon, Input, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface FormControlProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: null | string;
  initialValue?: any;
  onChange: (value: string) => void;
  type?: 'password';
}

const FormControl: FunctionComponent<FormControlProps> = ({
  label,
  placeholder = undefined,
  required = true,
  error = null,
  initialValue,
  onChange,
  type,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const renderInput = useCallback(() => {
    return (
      <Input
        mx="3"
        autoCorrect={false}
        autoCapitalize="none"
        fontSize="md"
        fontWeight="light"
        borderRadius="lg"
        ml="0"
        p={6}
        borderColor="gray.300"
        onChangeText={(text) => onChange(text)}
        placeholder={placeholder}
        defaultValue={initialValue}
        type={type ? (show ? 'text' : 'password') : 'text'}
        InputRightElement={
          type && (
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={5}
              mr="2"
              color="muted.400"
              onPress={() => setShow(!show)}
            />
          )
        }
      />
    );
  }, [type, initialValue, onChange, placeholder, show, setShow]);

  return (
    <Box mt={5}>
      <HStack>
        <Text fontSize="xl" mb="2">
          {label}
        </Text>
        {required && (
          <Text fontSize="xl" ml="1" mb="2" color={'red.500'}>
            *
          </Text>
        )}
      </HStack>

      <Box>{renderInput()}</Box>

      {error && (
        <Text fontSize="md" mt="2" color={'red.500'}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default FormControl;
