import { useEffect, useState } from "react";
import { View, Text, Button, ButtonText, Pressable, Icon, Input, InputField } from "@gluestack-ui/themed";
import { FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useEscolaStore } from "../../src/application/stores/useEscolaStore";
import { useConfirm } from "../../src/application/hooks/useConfirm";
import { School, Plus, Eye, Edit, Trash } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaEscolas() {
  const router = useRouter();
  const { escolas, carregarEscolas, removerEscola } = useEscolaStore();
  const { confirm } = useConfirm();
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarEscolas();
  }, []);

  const escolasFiltradas = escolas.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function handleDelete(id: string) {
    try {
      removerEscola(id);
    } catch (error) {
      console.log("Erro ao deletar escola:", error);
      Alert.alert("Erro", "Não foi possível excluir a escola.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} backgroundColor="$blue50">
        <View
          p="$3"
          flexDirection="row"
          alignItems="center"
          backgroundColor="white"
          borderBottomWidth={2}
          borderColor="#D7DDE7"
        >
          <View p="$2" bg="$blue600" borderRadius="$md">
            <Icon as={School} size="xl" color="white" />
          </View>

          <View>
            <Text size="lg" ml="$2" bold>
              Gestão Escolar
            </Text>
            <Text size="sm" ml="$2" color="$gray600">
              Gerenciar escolas e classes
            </Text>
          </View>
        </View>

        <View px="$3">
          <Text size="lg" bold>
            Escolas
          </Text>
          <Text size="xs">
            {(escolas?.length ?? 0)} escola(s)
          </Text>
        </View>

        <View style={{ flex: 1 }} p="$3">

          <Input mb="$3">
            <InputField
              placeholder="Buscar escola..."
              value={busca}
              onChangeText={setBusca}
            />
          </Input>

          <FlatList
            data={escolasFiltradas}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View
                mb="$2"
                bg="white"
                borderRadius="$lg"
                p="$2"
                borderWidth={2}
                borderColor="#D7DDE7"
              >
                <Text bold flexWrap="wrap">
                  {item.nome}
                </Text>
                <Text>{item.endereco}</Text>
                <Text size="xs">
                  {(item.turmas?.length ?? 0)} classe(s)
                </Text>

                <View
                  mt="$2"
                  flexDirection="row"
                  gap="$2"
                  alignItems="center"
                >
                  <Button
                    onPress={() =>
                      router.push(`/escolas/${item.id}`)
                    }
                    flex={1}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    gap="$2"
                    backgroundColor="#030213"
                  >
                    <Icon as={Eye} size="sm" color="white" />
                    <ButtonText>Ver</ButtonText>
                  </Button>

                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/escolas/novaEscola",
                        params: { id: item.id },
                      })
                    }
                  >
                    <Icon as={Edit} size="lg" color="black" />
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      confirm({
                        title: "Excluir escola",
                        message: "Deseja excluir essa escola?",
                        onConfirm: () => handleDelete(item.id),
                      })
                    }
                  >
                    <Icon as={Trash} size="lg" color="red" />
                  </Pressable>

                </View>
              </View>
            )}
          />
        </View>
        <Pressable
          onPress={() =>
            router.push("/escolas/novaEscola")
          }
          bg="$blue600"
          w={56}
          h={56}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          position="absolute"
          bottom={20}
          right={20}
          zIndex={999}
          elevation={10}
        >
          <Icon as={Plus} color="white" size="lg" />
        </Pressable>

      </View>
    </SafeAreaView>
  );
}