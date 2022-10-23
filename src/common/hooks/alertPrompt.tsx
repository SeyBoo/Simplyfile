import React, {
  createContext,
  FunctionComponent,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';
import { View, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';

interface AlertPromptProps {
  message: string;
  action: { f: (text: string) => Promise<void>; name: string };
}
type AlertPromptActions = {
  setAlertPrompt: ({ message, action: { f, name }, }: AlertPromptProps) => void;
};

const AlertPromptContext = createContext({} as AlertPromptActions);

  const [message, setMessage] = useState<boolean>(false);
  const [name, setName] = useState<boolean>(false);
const AlertPromptProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [importedFunction, setImportedFunction] =
    useState<(text: string) => void | null>(null);
  const [functionData, setFunctionData] = useState<string>('');

  const setAlertPrompt = ({
    message,
    action: { f, name },
  }: AlertPromptProps) => {
    setMessage(message);
    setImportedFunction(() => f);
    setName(name);
    setOpen(true);
  };

  const handleCustomFunction = async () => {
    await importedFunction(functionData);
    setFunctionData('');
    setOpen(false);
  };

  return (
    <AlertPromptContext.Provider value={{ setAlertPrompt }}>
      <View style={styles.container}>
        <Dialog.Container visible={open}>
          <Dialog.Title>{message}</Dialog.Title>
          <Dialog.Input
            onChangeText={(text) => setFunctionData(text)}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={() => setOpen(false)} />
          <Dialog.Button label={name} onPress={() => handleCustomFunction()} />
        </Dialog.Container>
      </View>
      {children}
    </AlertPromptContext.Provider>
  );
};

const useSetAlertPrompt = () => {
  const context = useContext(AlertPromptContext);

  if (!context) {
    throw new Error(
      'useNetAlertPrompt must be placed wittin a AlertPromptProvider'
    );
  }

  return context.setAlertPrompt;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default AlertPromptProvider;
export { useSetAlertPrompt };
