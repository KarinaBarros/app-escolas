import AsyncStorage from "@react-native-async-storage/async-storage";
import { Escola } from "../../types/escola";

const KEY = "@escolas";

export async function salvarEscolas(escolas: Escola[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(escolas));
}

export async function buscarEscolas(): Promise<Escola[] | null> {
    //await AsyncStorage.clear();
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
}

export async function limparEscolas() {
    await AsyncStorage.removeItem(KEY);
}