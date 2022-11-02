import { AlertProps } from '../hooks/alert';

const handleDisplayCatchError = (
  e: unknown,
  setAlert: ({ title, description, primmaryButton }: AlertProps) => void
) => {

  if (e instanceof Error) {
    return setAlert({
      title: e.message,
    });
  }

  return setAlert({
    title: 'Error, please content support.',
  });
};

export default handleDisplayCatchError;
