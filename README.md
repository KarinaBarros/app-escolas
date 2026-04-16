# app-escolas

Aplicativo mobile desenvolvido com React Native + Expo para gerenciamento de escolas públicas e suas turmas.

O sistema centraliza o cadastro de escolas e turmas, substituindo o uso de planilhas manuais e oferecendo uma experiência moderna, offline e responsiva.

---

# Requisitos

- Node.js >= 18
- npm ou yarn
- Expo CLI

---

# Tecnologias

## Core
- Expo (React Native) ~54.0.33
- React 19.1.0
- React Native 0.81.5
- TypeScript ~5.9.2

## Navegação
- Expo Router ~6.0.23 (file-based routing)

## Estado global
- Zustand 5.0.12

## UI / Estilo
- @gluestack-ui/themed 1.1.73
- @gluestack-ui/config 1.1.20
- @gluestack-style/react 1.0.57
- lucide-react-native 1.8.0 (ícones)

## Persistência
- AsyncStorage 2.2.0 (armazenamento local)

## API / Mock
- MirageJS 0.1.48 (API fake para desenvolvimento)

## Plataformas
- react-dom (Web)
- react-native-web (suporte web)

## Ferramentas de desenvolvimento
- ESLint
- Prettier

---

# Arquitetura

O projeto segue uma arquitetura modular inspirada em Clean Architecture:

```
app/           # Expo Router (telas e navegação)
src/
├── application/
│   ├── hooks/             # Hooks personalizados
│   ├── stores/            # Estado global (Zustand)
│
├── infrastructure/
│   ├── api/
│   │   ├── mocks/         # MirageJS (API fake)
│   ├── storage/          # AsyncStorage / persistência local
│
├── services/              # Regras de comunicação com API
├── types/                 # Tipagens globais
```

---

# Fluxo de dados


UI (React Native)
↓
Services (API MirageJS) - mock api
↓
Zustand Store - estado em memória
↓
Infrastructure (AsyncStorage) -cache persistente


---

# Funcionalidades

## Escolas

- Listagem de escolas
- Cadastro de escola
- Edição de escola
- Exclusão de escola
- Busca por nome
- Contagem de turmas

---

## Turmas

- Listagem por escola
- Cadastro de turma
- Edição de turma
- Exclusão de turma
- Filtro por turno (manhã, tarde, noite)
- Busca por nome

---

## Gerais

- Busca global
- Filtros combinados
- Navegação entre telas
- Confirmação de exclusão (web + mobile)
- Alertas de erro e confirmação
- Botão flutuante (FAB)

---

# Offline First

O app utiliza AsyncStorage para persistência local:

- Carrega dados salvos primeiro
- Caso não exista, busca no MirageJS
- Atualiza cache automaticamente
- Salva alterações após CRUD

---

# API Mock (MirageJS)

Endpoints simulados:

## Schools
- GET /schools
- GET /schools/:id
- POST /schools
- PUT /schools/:id
- DELETE /schools/:id

## Classes
- GET /classes
- POST /classes
- PUT /classes/:id
- DELETE /classes/:id

---

# Estado Global (Zustand)

Gerencia:

- escolas
- turmas
- sincronização com storage
- carregamento inicial

### Ações principais:

- carregarEscolas
- adicionarEscola
- editarEscola
- removerEscola
- adicionarTurma
- editarTurma
- removerTurma

---

# Rotas (Expo Router)


/escolas → lista de escolas
/escolas/[id] → turmas da escola
/escolas/novaEscola → criar/editar escola
/escolas/novaTurma → criar/editar turma


---

# UI/UX

- Design mobile-first
- Cards informativos
- Busca em tempo real
- Filtros interativos
- Confirmação de ações
- Ícones intuitivos

---

# Como rodar o projeto

1. Instale dependências:
npm install

2. Inicie o projeto:
npx expo start

---

# Diferenciais

Arquitetura modular (clean-ish)
Persistência offline real
Estado global centralizado
Confirmação cross-platform (web + mobile)
Simulação de backend real
UX consistente e responsiva

---

# Melhorias futuras
Skeleton loading
Paginação
Testes automatizados
Sync offline → online real

---
