import { Turma } from "../types/escola";

const BASE_URL = "/classes";

async function getErrorMessage(response: Response) {
  try {
    const data = await response.json();
    return data?.message || "Erro na requisição";
  } catch {
    return "Erro na requisição";
  }
}

export async function listarTurmas(): Promise<Turma[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}

export async function criarTurma(
  turma: Omit<Turma, "id">
): Promise<Turma> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turma),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}

export async function atualizarTurma(
  id: string,
  dados: Partial<Turma>
): Promise<Turma> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}
export async function deletarTurma(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}