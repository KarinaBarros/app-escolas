import { useEffect, useState } from "react";
import { View, Input, InputField, Button, ButtonText, Text, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectItem, SelectDragIndicator, SelectDragIndicatorWrapper } from "@gluestack-ui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { criarTurma, atualizarTurma } from "../../src/services/turmasService";
import { useEscolaStore } from "../../src/application/stores/useEscolaStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NovaTurma() {
    const [nome, setNome] = useState("");
    const [turno, setTurno] = useState<"manha" | "tarde" | "noite">("manha");
    const [anoLetivo, setAnoLetivo] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id, turmaId } = useLocalSearchParams();
    const router = useRouter();
    const { escolas, adicionarTurma, editarTurma } = useEscolaStore();
    const escolaId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        if (turmaId && escolaId) {
            const escola = escolas.find((e) => e.id === escolaId);
            const turma = escola?.turmas?.find((t) => t.id === turmaId);

            if (turma) {
                setNome(turma.nome);
                setTurno(turma.turno);
                setAnoLetivo(turma.anoLetivo);
            }
        }
    }, [turmaId, escolaId, escolas]);

    async function Salvar() {
        try {
            setLoading(true);

            const payload = {
                nome,
                turno,
                anoLetivo,
                escolaId,
            };

            if (turmaId) {
                const atualizada = await atualizarTurma(
                    String(turmaId),
                    payload
                );

                editarTurma(escolaId, atualizada);
            } else {
                // ➕ CREATE
                const nova = await criarTurma(payload);

                adicionarTurma(escolaId, nova);
            }

            router.push(`/escolas/${escolaId}`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View flex={1} p="$4">
                <Text size="lg" mb="$4" bold>
                    {turmaId ? "Editar Classe" : "Nova Classe"}
                </Text>

                <Text mb="$1" size="sm" color="$gray600">
                    Nome:
                </Text>
                <Input mb="$3">
                    <InputField
                        placeholder="Nome da turma"
                        value={nome}
                        onChangeText={setNome}
                    />
                </Input>

                <Text mb="$1" size="sm" color="$gray600">
                    Turno:
                </Text>
                <Select
                    mb="$3"
                    selectedValue={turno}
                    onValueChange={(value) =>
                        setTurno(value as "manha" | "tarde" | "noite")
                    }
                >
                    <SelectTrigger>
                        <SelectInput placeholder="Selecione o turno" />
                    </SelectTrigger>

                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>

                            <SelectItem label="Manhã" value="manha" />
                            <SelectItem label="Tarde" value="tarde" />
                            <SelectItem label="Noite" value="noite" />
                        </SelectContent>
                    </SelectPortal>
                </Select>

                <Text mb="$1" size="sm" color="$gray600">
                    Ano:
                </Text>
                <Input mb="$4">
                    <InputField
                        placeholder="Ano Letivo"
                        keyboardType="numeric"
                        value={anoLetivo.toString()}
                        onChangeText={(text) =>
                            setAnoLetivo(parseInt(text) || 0)
                        }
                    />
                </Input>

                <Button onPress={Salvar} isDisabled={loading} backgroundColor="#030213">
                    <ButtonText>
                        {loading
                            ? "Salvando..."
                            : turmaId
                                ? "Atualizar"
                                : "Salvar"}
                    </ButtonText>
                </Button>
            </View>
        </SafeAreaView>
        
    );
}