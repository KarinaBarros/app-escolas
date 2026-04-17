import { useEscolaStore } from "../application/stores/useEscolaStore";
import { salvarEscolas } from "../infrastructure/storage/escolasStorage";
import { Escola, Turma } from "../types/escola";

jest.mock("../services/escolasService", () => ({
  listarEscolas: jest.fn(),
}));

jest.mock("../infrastructure/storage/escolasStorage", () => ({
  buscarEscolas: jest.fn(),
  salvarEscolas: jest.fn(),
}));

const criarEscola = (overrides?: Partial<Escola>): Escola => ({
  id: "1",
  nome: "Escola A",
  endereco: "Rua A, 123",
  turmas: [],
  ...overrides,
});

const criarTurma = (overrides?: Partial<Turma>): Turma => ({
  id: "t1",
  nome: "1A",
  turno: "manha",
  anoLetivo: 2025,
  escolaId: "1",
  ...overrides,
});

describe("EscolaStore", () => {
  beforeEach(() => {
    useEscolaStore.setState({
      escolas: [],
      carregado: false,
    });

    jest.clearAllMocks();
  });

  it("deve adicionar uma escola no estado", () => {
    const escola = criarEscola();

    useEscolaStore.getState().adicionarEscola(escola);

    const state = useEscolaStore.getState();

    expect(state.escolas).toHaveLength(1);
    expect(state.escolas[0]).toEqual(escola);

    expect(salvarEscolas).toHaveBeenCalledWith([escola]);
  });

  it("deve editar uma escola existente", () => {
    useEscolaStore.setState({
      escolas: [criarEscola()],
    });

    useEscolaStore.getState().editarEscola(
      criarEscola({
        nome: "Escola B",
      })
    );

    const state = useEscolaStore.getState();

    expect(state.escolas[0].nome).toBe("Escola B");

    expect(salvarEscolas).toHaveBeenCalled();
  });

  it("deve remover uma escola", () => {
    useEscolaStore.setState({
      escolas: [
        criarEscola({ id: "1" }),
        criarEscola({ id: "2", nome: "Escola B" }),
      ],
    });

    useEscolaStore.getState().removerEscola("1");

    const state = useEscolaStore.getState();

    expect(state.escolas).toHaveLength(1);
    expect(state.escolas[0].id).toBe("2");

    expect(salvarEscolas).toHaveBeenCalled();
  });

  it("deve adicionar turma em uma escola", () => {
    useEscolaStore.setState({
      escolas: [criarEscola()],
    });

    useEscolaStore.getState().adicionarTurma("1", criarTurma());

    const state = useEscolaStore.getState();

    expect(state.escolas[0].turmas).toHaveLength(1);
    expect(state.escolas[0].turmas?.[0].nome).toBe("1A");

    expect(salvarEscolas).toHaveBeenCalled();
  });

  it("deve editar uma turma existente", () => {
    useEscolaStore.setState({
      escolas: [
        criarEscola({
          turmas: [criarTurma()],
        }),
      ],
    });

    useEscolaStore.getState().editarTurma(
      "1",
      criarTurma({ nome: "1B" })
    );

    const state = useEscolaStore.getState();

    expect(state.escolas[0].turmas?.[0].nome).toBe("1B");

    expect(salvarEscolas).toHaveBeenCalled();
  });

  it("deve remover uma turma da escola", () => {
    useEscolaStore.setState({
      escolas: [
        criarEscola({
          turmas: [
            criarTurma({ id: "t1" }),
            criarTurma({ id: "t2", nome: "1B" }),
          ],
        }),
      ],
    });

    useEscolaStore.getState().removerTurma("1", "t1");

    const state = useEscolaStore.getState();

    expect(state.escolas[0].turmas).toHaveLength(1);
    expect(state.escolas[0].turmas?.[0].id).toBe("t2");

    expect(salvarEscolas).toHaveBeenCalled();
  });
});