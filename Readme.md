# 📂 Upload Service - Node.js & Streams

## 📌 Sobre o Projeto

Este projeto é um serviço de upload de imagens que permite:

- 📤 Upload de Imagens
- 📂 Listagem de Imagens
- 📊 Geração de relatórios CSV com alta performance usando Node.js Streams

O foco principal do projeto é eficiência e escalabilidade, processando grandes volumes de dados sem comprometer o desempenho.

## 🚀 Tecnologias Utilizadas

- Node.js - Ambiente de execução
- Streams API - Para processamento eficiente de arquivos
- Multer - Middleware para manipulação de upload de arquivos
- CSV Stringify - Para geração de relatórios em CSV
- Express.js - Framework para criação da API

## 📦 Instalação e Configuração

### 📥 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/upload-service.git
cd upload-service
```

### 📌 2. Instale as dependências

```bash
npm install
```

### ▶️ 3. Execute o servidor

```bash
npm start
```

O servidor rodará por padrão em `http://localhost:3000`.

## 📜 Endpoints da API

### 🖼 Upload de Imagem

**POST /upload**

**Descrição:** Faz o upload de uma imagem.

**📥 Request:**

`multipart/form-data`

Campo: `file` (imagem a ser enviada)

**📤 Response:**

```json
{
  "id": "123",
  "name": "image.png",
  "remoteUrl": "https://storage.com/image.png",
  "createdAt": "2025-03-18T10:00:00Z"
}
```

### 📂 Listar Imagens

**GET /uploads**

**Descrição:** Retorna uma lista paginada das imagens armazenadas.

**📥 Request:**

`?page=1&limit=10` (opcional)

**📤 Response:**

```json
{
  "uploads": [
    {
      "id": "123",
      "name": "image1.png",
      "remoteUrl": "https://storage.com/image1.png",
      "createdAt": "2025-03-18T10:00:00Z"
    }
  ],
  "total": 100
}
```

### 📊 Gerar Relatório CSV

**GET /uploads/report**

**Descrição:** Gera um arquivo CSV com os dados dos uploads, utilizando Streams para alta performance.

**📥 Request:**

Nenhum parâmetro necessário.

**📤 Response:**

Arquivo CSV com estrutura:

```
id,name,remoteUrl,createdAt
123,image1.png,https://storage.com/image1.png,2025-03-18T10:00:00Z
...
```

## 🛠 Como Funciona o Sistema

O sistema é otimizado para grandes volumes de dados através de:

- ✅ Streams: Evita consumo excessivo de memória, processando os arquivos em partes.
- ✅ Armazenamento Externo: As imagens são enviadas para um serviço de armazenamento remoto.
- ✅ Paginação: Para evitar consultas pesadas no banco de dados.
- ✅ CSV Streaming: O relatório é gerado dinamicamente sem sobrecarregar o servidor.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e contribuir!

