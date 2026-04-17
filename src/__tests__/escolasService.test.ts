import {
  criarEscola,
  listarEscolas,
  buscarEscolaPorId,
  atualizarEscola,
  deletarEscola,
} from "../services/escolasService";

global.fetch = jest.fn();

describe("escolasService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve listar escolas com sucesso", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [
        { id: "1", nome: "Escola A", endereco: "Rua A", turmas: [] },
      ],
    });

    const result = await listarEscolas();

    expect(fetch).toHaveBeenCalledWith("/schools");
    expect(result).toEqual([
      { id: "1", nome: "Escola A", endereco: "Rua A", turmas: [] },
    ]);
  });

  it("deve criar escola corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "1",
        nome: "Escola A",
        endereco: "Rua A",
        turmas: [],
      }),
    });

    const result = await criarEscola("Escola A", "Rua A");

    expect(fetch).toHaveBeenCalledWith("/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "Escola A",
        endereco: "Rua A",
      }),
    });

    expect(result.nome).toBe("Escola A");
  });

  it("deve buscar escola por id", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "1",
        nome: "Escola A",
        endereco: "Rua A",
        turmas: [],
      }),
    });

    const result = await buscarEscolaPorId("1");

    expect(fetch).toHaveBeenCalledWith("/schools/1");
    expect(result.id).toBe("1");
  });

  it("deve atualizar escola", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "1",
        nome: "Escola Atualizada",
        endereco: "Rua B",
        turmas: [],
      }),
    });

    const result = await atualizarEscola(
      "1",
      "Escola Atualizada",
      "Rua B"
    );

    expect(fetch).toHaveBeenCalledWith("/schools/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "Escola Atualizada",
        endereco: "Rua B",
      }),
    });

    expect(result.nome).toBe("Escola Atualizada");
  });

  it("deve deletar escola", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await deletarEscola("1");

    expect(fetch).toHaveBeenCalledWith("/schools/1", {
      method: "DELETE",
    });
  });

  it("deve lançar erro quando API falhar", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        message: "Erro na requisição",
      }),
    });

    await expect(listarEscolas()).rejects.toThrow(
      "Erro na requisição"
    );
  });
});