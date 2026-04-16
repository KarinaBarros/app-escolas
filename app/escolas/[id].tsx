import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, Icon, Input, InputField } from "@gluestack-ui/themed";
import { Plus, Edit, Trash, ArrowLeft } from "lucide-react-native";
import { useEscolaStore } from "../../src/application/stores/useEscolaStore";
import { deletarTurma } from "../../src/services/turmasService";
import { useConfirm } from "../../src/application/hooks/useConfirm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaTurmas() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { escolas, removerTurma } = useEscolaStore();
  const { confirm } = useConfirm();

  const escola = escolas.find((e) => e.id === id);

  const [filtro, setFiltro] = useState<
    "todos" | "manha" | "tarde" | "noite"
  >("todos");

  const [busca, setBusca] = useState("");

  if (!escola) {
    return <Text>Escola não encontrada</Text>;
  }

  const turmasFiltradas = (escola.turmas ?? []).filter((t) => {
    const matchTurno = filtro === "todos" ? true : t.turno === filtro;

    const matchBusca = t.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    return matchTurno && matchBusca;
  });

  async function handleDelete(turmaId: string) {
    try {
      await deletarTurma(turmaId);
      removerTurma(id, turmaId);
    } catch (error) {
      console.log("Erro ao deletar turma:", error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} backgroundColor="$blue50">

        <View
          p="$3"
          flexDirection="row"
          alignItems="center"
          backgroundColor="white"
          borderBottomWidth={2}
          borderColor="#D7DDE7"
        >
          <Pressable onPress={() => router.replace("/escolas")}>
            <Icon as={ArrowLeft} size="lg" color="black" />
          </Pressable>

          <View>
            <Text size="lg" ml="$2" bold>
              {escola.nome}
            </Text>
            <Text size="sm" ml="$2" color="$gray600">
              {escola.endereco}
            </Text>
          </View>
        </View>

        <View p="$3" flex={1}>

          <Text size="lg" bold>
            Classes
          </Text>
          <Text size="xs" mb="$2">
            {(escola?.turmas?.length ?? 0)} classe(s)
          </Text>

          {/* BUSCA */}
          <Input mb="$3">
            <InputField
              placeholder="Buscar turma..."
              value={busca}
              onChangeText={setBusca}
            />
          </Input>

          <View flexDirection="row" gap="$2" mb="$3">
            {["todos", "manha", "tarde", "noite"].map((item) => {
              const ativo = filtro === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setFiltro(item as "todos" | "manha" | "tarde" | "noite")
                  }
                  px="$3"
                  py="$1"
                  borderRadius="$full"
                  borderWidth={1}
                  borderColor="#D7DDE7"
                  backgroundColor={ativo ? "$blue600" : "white"}
                >
                  <Text color={ativo ? "white" : "$gray700"}>
                    {item === "todos"
                      ? "Todos"
                      : item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {turmasFiltradas.length > 0 ? (
            turmasFiltradas.map((t) => (
              <View
                key={t.id}
                mb="$2"
                bg="white"
                borderRadius="$lg"
                p="$2"
                borderWidth={2}
                borderColor="#D7DDE7"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <View flex={1}>
                  <Text bold>{t.nome}</Text>
                  <Text size="sm" color="$gray600">
                    {t.turno} • {t.anoLetivo}
                  </Text>
                </View>

                <View flexDirection="row" alignItems="center" gap="$2">

                  {/* EDITAR */}
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/escolas/novaTurma",
                        params: { id, turmaId: t.id },
                      })
                    }
                  >
                    <Icon as={Edit} size="lg" color="black" />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      confirm({
                        title: "Excluir turma",
                        message: "Deseja excluir essa turma?",
                        onConfirm: () => handleDelete(t.id),
                      })
                    }
                  >
                    <Icon as={Trash} size="lg" color="red" />
                  </Pressable>

                </View>
              </View>
            ))
          ) : (
            <Text color="$gray500">Nenhuma turma encontrada</Text>
          )}
        </View>

        <Pressable
          onPress={() => router.push(`/escolas/novaTurma?id=${id}`)}
          bg="$blue600"
          w={56}
          h={56}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          position="absolute"
          bottom={20}
          right={20}
        >
          <Icon as={Plus} color="white" size="lg" />
        </Pressable>
      </View>
    </SafeAreaView >
  );
}