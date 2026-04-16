import { useEffect, useState } from "react";
import { View, Input, InputField, Button, ButtonText, Text } from "@gluestack-ui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { criarEscola, buscarEscolaPorId, atualizarEscola } from "../../src/services/escolasService";
import { useEscolaStore } from "../../src/application/stores/useEscolaStore";
import { SafeAreaView } from "react-native-safe-area-context";


export default function NovaEscola() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { adicionarEscola, editarEscola } = useEscolaStore();

  useEffect(() => {
    if (id) {
      carregarEscola();
    }
  }, [id]);

  async function carregarEscola() {
    try {
      setLoading(true);
      const data = await buscarEscolaPorId(String(id));
      setNome(data.nome);
      setEndereco(data.endereco);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function Salvar() {
    try {
      setLoading(true);

      if (id) {
        const data = await atualizarEscola(String(id), nome, endereco);
        editarEscola(data);
      } else {
        const data = await criarEscola(nome, endereco);
        adicionarEscola(data);
      }

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} p="$4" >

        <Text size="lg" mb="$4" bold>
          {id ? "Editar Escola" : "Nova Escola"}
        </Text>

        <Text mb="$1" size="sm" color="$gray600">
          Nome da escola:
        </Text>
        <Input mb="$3">
          <InputField
            placeholder="Nome da escola"
            value={nome}
            onChangeText={setNome}
          />
        </Input>

        <Text mb="$1" size="sm" color="$gray600">
          Endereço:
        </Text>
        <Input mb="$4">
          <InputField
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
          />
        </Input>

        <Button onPress={Salvar} isDisabled={loading} backgroundColor="#030213">
          <ButtonText>
            {loading ? "Salvando..." : id ? "Atualizar" : "Salvar"}
          </ButtonText>
        </Button>

      </View>
    </SafeAreaView>
  );
}