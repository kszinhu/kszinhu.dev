# AGENTS

Este documento descreve como trabalhar no repositório, com foco em testes e na estrutura de arquivos que normalmente serão alterados.

## Como executar os testes

Como agente você precisa utilizar TDD (Test-Driven Development) para garantir que suas mudanças não quebrem funcionalidades existentes e que o comportamento esperado seja mantido. Para isso, é fundamental saber como rodar os testes tanto do backend quanto do frontend.

Execute, valide e mantenha os testes atualizados sempre que fizer mudanças no código. Isso ajuda a garantir a qualidade e a estabilidade do projeto.

### Testes Rails (Rspec)
- Executar toda a suíte:
  - `bundle exec rspec`
- Executar um arquivo específico:
  - `bundle exec rspec path/to/test_file.rb`

### Testes Frontend (Vitest)
- Executar em modo interativo:
  - `yarn test`
- Executar uma vez com cobertura:
  - `yarn coverage`

> Dica: o repositório usa Minitest no backend e Vitest no frontend.

## Estrutura de arquivos (foco em `test`, `config`, `app/**`)

### `app/`
- `app/controllers/`  
  Controladores Rails (rotas → ações → renderização/props).
- `app/models/`  
  Modelos Active Record e regras de domínio.
- `app/views/`  
  Views Rails, incluindo arquivos `*.json.props` usados pelo Superglue para montar os dados do frontend.
- `app/frontend/`  
  Código frontend (React/TypeScript, Vite):
  - `components/` componentes de UI
  - `entrypoints/` entradas do Vite
  - `hooks/`, `contexts/`, `slices/`, `utils/` organização da lógica

#### Observação importante sobre `json.props`
O projeto usa arquivos `*.json.props` (ex.: `app/views/layouts/application.json.props` e outras views) para declarar os dados enviados ao frontend. Ao editar esses arquivos:
- mantenha a estrutura esperada pelo frontend;
- siga o padrão de `json.*` já adotado;
- evite mudanças que quebrem o contrato de props sem atualizar o frontend.

### `config/`
Configurações da aplicação Rails.
Arquivos frequentemente relevantes:
- `config/routes.rb` — rotas da aplicação
- `config/application.rb` — configuração global
- `config/environments/` — configurações por ambiente
- `config/vite.json` — integração Vite
- `config/database.yml` — banco de dados

### `rspec/`
Testes Rspec para o backend.
Estrutura comum:
- `spec/models/`
- `spec/controllers/`
- `spec/fixtures/`
- `spec/test_helper.rb` — configuração base da suíte

## Boas práticas rápidas
- Prefira alterar `app/**` e `spec/**` em conjunto quando mudar comportamento.
- Para mudanças de API de props em `*.json.props`, atualize o frontend em `app/frontend/`.
- Se ajustar rotas ou configs, valide com testes e/ou `bin/dev`.
