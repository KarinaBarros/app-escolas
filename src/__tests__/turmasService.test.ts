import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma,
} from "../services/turmasService";

import { Turma } from "../types/escola";

global.fetch = jest.fn();

describe("turmasService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve listar turmas com sucesso", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: "1",
          nome: "1A",
          turno: "manha",
          anoLetivo: 2025,
          escolaId: "1",
        },
      ],
    });

    const result = await listarTurmas();

    expect(fetch).toHaveBeenCalledWith("/classes");

    expect(result).toEqual([
      {
        id: "1",
        nome: "1A",
        turno: "manha",
        anoLetivo: 2025,
        escolaId: "1",
      },
    ]);
  });

  it("deve criar turma corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "1",
        nome: "1A",
        turno: "manha",
        anoLetivo: 2025,
        escolaId: "1",
      }),
    });

    const novaTurma: Omit<Turma, "id"> = {
      nome: "1A",
      turno: "manha",
      anoLetivo: 2025,
      escolaId: "1",
    };

    const result = await criarTurma(novaTurma);

    expect(fetch).toHaveBeenCalledWith("/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaTurma),
    });

    expect(result.nome).toBe("1A");
  });

  it("deve atualizar turma corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "1",
        nome: "1B",
        turno: "manha",
        anoLetivo: 2025,
        escolaId: "1",
      }),
    });

    const result = await atualizarTurma("1", {
      nome: "1B",
    });

    expect(fetch).toHaveBeenCalledWith("/classes/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: "1B" }),
    });

    expect(result.nome).toBe("1B");
  });

  it("deve deletar turma", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    await deletarTurma("1");

    expect(fetch).toHaveBeenCalledWith("/classes/1", {
      method: "DELETE",
    });
  });

  it("deve lançar erro quando API falhar ao listar", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        message: "Erro ao buscar turmas",
      }),
    });

    await expect(listarTurmas()).rejects.toThrow(
      "Erro ao buscar turmas"
    );
  });
});