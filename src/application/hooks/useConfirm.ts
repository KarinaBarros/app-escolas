import { Alert, Platform } from "react-native";

type ConfirmParams = {
  title?: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirm() {
  function confirm({
    title = "Confirmação",
    message,
    onConfirm,
    confirmText = "Excluir",
    cancelText = "Cancelar",
  }: ConfirmParams) {
    if (Platform.OS === "web") {
      const ok = window.confirm(message);
      if (ok) onConfirm();
      return;
    }

    Alert.alert(title, message, [
      {
        text: cancelText,
        style: "cancel",
      },
      {
        text: confirmText,
        style: "destructive",
        onPress: onConfirm,
      },
    ]);
  }

  return { confirm };
}