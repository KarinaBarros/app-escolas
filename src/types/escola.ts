export type Turma = {
  id: string;
  nome: string;
  turno: "manha" | "tarde" | "noite";
  anoLetivo: number;
  escolaId: string;
};

export type Escola = {
  id: string;
  nome: string;
  endereco: string;
  turmas: Turma[];
};