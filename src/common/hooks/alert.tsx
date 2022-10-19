import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import Dialog from 'react-native-dialog';

interface AlertProps {
  title: string;
  description?: string;
  primmaryButton?: string;
}

type AlertContextActions = {
  setAlert: ({title, description, primmaryButton }: AlertProps) => void;
};

const AlertContext = createContext({} as AlertContextActions);

const AlertProvider: FunctionComponent = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [primmaryButton, setPrimaryButton] = useState<string>('Cancel');

  const setAlert = ({title, description, primmaryButton }: AlertProps) => {
    setTitle(title);
    if (description) {
      setDescription(description);
    }
    if (primmaryButton) {
      setPrimaryButton(primmaryButton);
    }
    setOpen(true);
  };

  return (
    <AlertContext.Provider value={{ setAlert }}>
      <View style={styles.container}>
        <Dialog.Container visible={open}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <Dialog.Button label={primmaryButton} onPress={() => setOpen(false)} />
        </Dialog.Container>
      </View>
      {children}
    </AlertContext.Provider>
  );
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

const useSetAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useSetAlert must be placed inside a AlertProvider');
  }
  return context.setAlert;
};

export default AlertProvider;
export { useSetAlert };
