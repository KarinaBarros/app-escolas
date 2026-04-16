import { Server } from "miragejs";
import { Escola, Turma } from "../../../types/escola";

export function seeds(server: Server) {
  const escola1 = server.create("escola", {
    id: "1",
    nome: "Escola Estadual Central",
    endereco: "Rua A, 123",
    turmas: [],
  } as Escola);

  const escola2 = server.create("escola", {
    id: "2",
    nome: "Colégio Futuro",
    endereco: "Av. Brasil, 456",
    turmas: [],
  } as Escola);

  const turma1 = server.create("turma", {
    id: "101",
    nome: "1º Ano A",
    turno: "manha",
    anoLetivo: 2026,
    escolaId: "1",
  } as Turma);

  const turma2 = server.create("turma", {
    id: "102",
    nome: "2º Ano B",
    turno: "tarde",
    anoLetivo: 2026,
    escolaId: "1",
  } as Turma);

  const turma3 = server.create("turma", {
    id: "103",
    nome: "3º Ano C",
    turno: "noite",
    anoLetivo: 2026,
    escolaId: "2",
  } as Turma);

  escola1.update({
    turmas: [turma1.attrs, turma2.attrs],
  });

  escola2.update({
    turmas: [turma3.attrs],
  });
}