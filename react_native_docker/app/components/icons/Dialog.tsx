import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
} from "react-native-paper";

interface IProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

const CustomDialog = ({ message, isVisible, onHide }: IProps) => (
  <PaperProvider>
    <Portal>
      <Dialog visible={isVisible} onDismiss={onHide}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onHide}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </PaperProvider>
);

export default CustomDialog;
