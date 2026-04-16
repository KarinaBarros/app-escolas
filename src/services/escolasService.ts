import { Escola } from "../types/escola";

const BASE_URL = "/schools";

async function getErrorMessage(response: Response) {
  try {
    const data = await response.json();
    return data?.message || "Erro na requisição";
  } catch {
    return "Erro na requisição";
  }
}

export async function criarEscola(
  nome: string,
  endereco: string
): Promise<Escola> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, endereco }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}

export async function listarEscolas(): Promise<Escola[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}

export async function buscarEscolaPorId(id: string): Promise<Escola> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message || "Escola não encontrada");
  }

  return response.json();
}

export async function atualizarEscola(
  id: string,
  nome: string,
  endereco: string
): Promise<Escola> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, endereco }),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}

export async function deletarEscola(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

}