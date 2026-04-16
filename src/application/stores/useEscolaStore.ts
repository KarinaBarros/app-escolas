import { create } from "zustand";
import { Escola, Turma } from "../../types/escola";
import { listarEscolas } from "../../services/escolasService";
import { buscarEscolas, salvarEscolas } from "../../infrastructure/storage/escolasStorage";

type Estado = {
  escolas: Escola[];
  carregado: boolean;

  carregarEscolas: () => Promise<void>;

  adicionarEscola: (escola: Escola) => void;
  editarEscola: (escola: Escola) => void;
  removerEscola: (id: string) => void;

  adicionarTurma: (escolaId: string, turma: Turma) => void;
  editarTurma: (escolaId: string, turma: Turma) => void;
  removerTurma: (escolaId: string, turmaId: string) => void;
};

export const useEscolaStore = create<Estado>((set, get) => ({
  escolas: [],
  carregado: false,

  carregarEscolas: async () => {
    const jaCarregou = get().carregado;
    if (jaCarregou) return;

    const local = await buscarEscolas();

    if (local && local.length > 0) {
      set({
        escolas: local,
        carregado: true,
      });
      return;
    }

    const data = await listarEscolas();

    set({
      escolas: data,
      carregado: true,
    });

    await salvarEscolas(data);
  },

  adicionarEscola: (escola) =>
    set((state) => {
      const updated = [...state.escolas, escola];

      salvarEscolas(updated);

      return { escolas: updated };
    }),

  editarEscola: (escola) =>
    set((state) => {
      const updated = state.escolas.map((e) =>
        e.id === escola.id ? escola : e
      );

      salvarEscolas(updated);

      return { escolas: updated };
    }),

  removerEscola: (id) =>
    set((state) => {
      const updated = state.escolas.filter((e) => e.id !== id);

      salvarEscolas(updated);

      return { escolas: updated };
    }),

  adicionarTurma: (escolaId, turma) =>
    set((state) => {
      const updated = state.escolas.map((e) =>
        e.id === escolaId
          ? {
              ...e,
              turmas: [...(e.turmas ?? []), turma],
            }
          : e
      );

      salvarEscolas(updated);

      return { escolas: updated };
    }),

  editarTurma: (escolaId, turma) =>
    set((state) => {
      const updated = state.escolas.map((e) =>
        e.id === escolaId
          ? {
              ...e,
              turmas: (e.turmas ?? []).map((t) =>
                t.id === turma.id ? turma : t
              ),
            }
          : e
      );

      salvarEscolas(updated);

      return { escolas: updated };
    }),

  removerTurma: (escolaId, turmaId) =>
    set((state) => {
      const updated = state.escolas.map((e) =>
        e.id === escolaId
          ? {
              ...e,
              turmas: (e.turmas ?? []).filter(
                (t) => t.id !== turmaId
              ),
            }
          : e
      );

      salvarEscolas(updated);

      return { escolas: updated };
    }),
}));