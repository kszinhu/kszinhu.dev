# AGENTS

Documento que define regras para agentes neste repo. Também define uso de guias em `.agents/agents/` e skills em `.agents/skills/`, mas sempre observar as regras do repositório em `.agents/rules`
Meta: padrao, menos risco, trilha de auditoria.

Sumario
- Objetivo
- Papel do agente
- Uso de subagents especializados
- Comandos uteis e testes
- Fluxos repetitivos
- Checklist de PR
- Gates de Seguranca & Compliance
- Limites e quando chamar operador
- Boas praticas para guias
- Referencias rapidas

## 1) Objetivo
- Permitir trabalho seguro em componentes, views, testes, docs.
- Definir gates auto + manuais contra segredo, dependencia vulneravel, quebra de contrato backend/frontend.

## 2) Papel do agente
- Ler codigo + docs antes de mudar.
- Seguir TDD sempre: RED -> GREEN -> REFACTOR.
- Escrever/ajustar testes antes de abrir PR.
- Fazer mudanca pequena, atomica, clara.
- Documentar mudanca de contrato, ex. `*.json.props`, no PR.
- Passar gates de seguranca/compliance antes de pedir merge.
- Consultar guias em `.agents/agents/` e `.agents/skills/` quando tarefa pedir.

### Escolha de guia
- Escolher guia mais perto da tarefa antes de editar codigo.
- Se tarefa cruza backend + frontend + contrato, usar guia de area dominante + skill ou segundo guia.
- Se guia divergir do repo, repo vence. Atualizar guia se necessario.

## 3) Uso de subagents especializados
- Subagent nao obrigatorio. Usar so se especializacao ou paralelismo ajudar.
- So delegar se runtime permitir e politica/pedido do usuario permitir.
- Agente principal continua dono de integracao, testes, seguranca, resposta final.
- Dar para subagent: escopo fechado, contexto minimo, objetivo, criterio de sucesso, arquivos alvo, limites.
- Evitar overlap de escrita. Um dono por area/arquivo.
- Nao delegar bloco imediato se agente principal resolve mais rapido.
- Registrar no chat/PR qual guia ou subagent entrou e por que.

### Roteamento recomendado
- `tdd-red-agent.md`: fase RED, testes falhando primeiro.
- `implementation-agent.md`: fase GREEN, minimo para testes passar.
- `refactoring-agent.md`: fase REFACTOR, sem mudar comportamento.
- `rspec-agent.md`: RSpec, factories, request/model/service/query specs.
- `react-agent.md`: React, TypeScript, Vite, Vitest, componentes, tipos frontend.
- `tailwind-agent.md`: styling com Tailwind.
- `superglue-agent.md`: `*.json.props`, Operations/ViewModels, contrato backend -> frontend.
- `model-agent.md`: ActiveRecord, validacoes, associacoes, escopos.
- `service-agent.md`: service objects, orquestracao de regra de negocio.
- `query-agent.md`: query objects, SQL/ActiveRecord complexo, performance de consulta.
- `lint-agent.md`: formatacao/lint sem mexer na regra de negocio.
- `review-agent.md`: revisao tecnica sem editar codigo.
- `security-agent.md`: auditoria de seguranca, auth/authz, dependencias, XSS/CSRF/OWASP.

### Uso de skills
- Skill vive em `.agents/skills/<skill>/SKILL.md`.
- Usar quando tarefa casar com padrao reutilizavel, ex. `superglue`, `tdd-cycle`, `rails-query-object`, `i18n-patterns`.
- Skill complementa agente principal. Nao troca ownership.

## 4) Comandos uteis
- Backend / Rails / RSpec
  - Suite toda: `bundle exec rspec`
  - Arquivo unico: `bundle exec rspec spec/path/to/file_spec.rb`
- Frontend / Vite / React / Vitest
  - Watch: `yarn test`
  - Coverage: `yarn coverage`
  - Build: `yarn build`
- Lint / format
  - Ruby: `bundle exec rubocop`
  - JS/TS: `yarn lint` ou `npx eslint .`
  - Markdown: `npx markdownlint docs/`
- Seguranca / dependencias
  - Ruby audit: `bundle exec bundler-audit update && bundle exec bundler-audit check`
  - JS audit: `yarn audit` ou `npm audit`
  - Rails static analysis: `bundle exec brakeman -q`

## 5) Fluxos repetitivos
- Adicionar componente React
  1. Criar `app/frontend/components/<category>/<name>.tsx`.
  2. Criar teste Vitest adjacente em `app/frontend/components/.../*.test.tsx`.
  3. Exportar em `app/frontend/components/index.ts`.
  4. Usar em `app/views/...` ou layout certo.
  5. Rodar `yarn test` e `bundle exec rspec` se backend entrou.
  6. Abrir PR com descricao, screenshot se visual, checklist completo.
- Alterar props Rails -> Frontend (`*.json.props`)
  1. Atualizar backend `.json.props`.
  2. Atualizar tipos `useContent<T>()`.
  3. Ajustar testes backend + frontend.
  4. Documentar mudanca de contrato no PR. Se preciso, nota de migracao/changelog.
- Hotfix
  - PR pequeno.
  - Se nao muda contrato, fluxo curto.
  - Ainda escrever teste contra regressao.

## 6) Checklist de PR
- [ ] Codigo compilou/rodou local quando aplicavel.
- [ ] Testes relevantes passaram: `bundle exec rspec`, `yarn test`.
- [ ] Lint/format passaram: RuboCop/ESLint/Prettier quando aplicavel.
- [ ] Nenhum segredo entrou no codigo.
- [ ] Mudanca em `*.json.props` ou contrato documentada + tipagem atualizada.
- [ ] Dependencia nova justificada + auditada.
- [ ] Screenshot/video curto para mudanca visual quando aplicavel.
- [ ] PR descreve objetivo + instrucoes de QA.
- [ ] Operador marcado em mudanca sensivel: infra, contrato, seguranca.

## 7) Gates de Seguranca & Compliance
Agente roda local. CI bloqueia quando possivel.

### 7.1 Gate automatico (CI)
- Testes obrigatorios passam.
- Lint/format: ESLint, RuboCop, Prettier.
- Dependencias: `yarn audit`/`npm audit` + `bundler-audit`. Vulnerabilidade critica nova bloqueia merge.
- Static analysis Rails, ex. `brakeman`. Vulnerabilidade critica nova bloqueia merge.
- License check: pacote com licenca incompativel pede revisao manual.
- Secrets scan: varrer diff por API keys, RSA keys, JWTs, credenciais. Falha bloqueia.

### 7.2 Gate manual (aprovacao humana)
- Mudanca de contrato backend/frontend, incluindo `*.json.props`, remocao ou rename de campo: operador + plano de migracao.
- Mudanca de infra, CI critico, rota critica, migracao de banco com impacto: operador + plano de rollback.
- Mudanca em politica de seguranca/compliance, dados sensiveis, storage/processamento: revisao de compliance + aprovacoes definidas pelo operador.

### 7.3 Implementacao local sugerida
Antes de abrir PR:
- `bundle exec rspec`
- `yarn test --runInBand` ou equivalente
- `bundle exec rubocop`
- `yarn lint`
- `bundle exec bundler-audit check`
- `yarn audit`
- Script de secrets-scan, se existir, ou revisao manual do diff

No PR, incluir secao `Security checks` com resumo das saidas.

## 8) Limites / quando chamar operador
Operador responde por:
- Plano + implementacao de gates no CI.
- Aprovacao de mudanca de contrato backend/frontend.
- Autorizacao para infra, deploy, dados sensiveis.

Agente nao deve:
- Comitar/publicar segredo ou credencial.
- Mudar CI/CD, pipeline critica, ou segredo do repo sem aprovacao.
- Fazer mudanca grande sem plano de rollback + aprovacao do operador.

## 9) Como registrar conhecimento
Em mudanca nao trivial:
- Colocar resumo curto no PR: o que mudou, por que, provas, como validar.
- Atualizar `docs/` se fluxo mudou.
- Atualizar `AGENTS.md`, `.agents/agents/`, ou `.agents/skills/` se regra de agente mudou.
- Criar receita em `docs/recipes/` para tarefa repetitiva.

## 10) Boas praticas para guias
- Ser especifico, orientado a acao, com paths, comandos, exemplos.
- Dizer claro quando escalar para operador.
- Manter curto e consultavel. Linkar docs longos.
- Versionar mudancas no repo.

## 11) Referencias rapidas
- Frontend: `app/frontend/`
- Views React: `app/views/`
- Export de componentes: `app/frontend/components/index.ts`
- Props Rails -> frontend: `app/views/**/*.json.props`
- Agentes e exemplos: `.agents/agents/`
  - Exemplos: `implementation-agent.md`, `lint-agent.md`, `model-agent.md`, `query-agent.md`, `react-agent.md`, `refactoring-agent.md`, `review-agent.md`, `rspec-agent.md`, `security-agent.md`, `service-agent.md`, `superglue-agent.md`, `tailwind-agent.md`, `tdd-red-agent.md`
  - Skills: `.agents/skills/`, ex. `i18n-patterns/SKILL.md`
  - Ler guias relevantes antes de atuar. Mapear skills usados na tarefa.
  - Mover/atualizar docs entre `.agents/agents/` e `.agents/skills/` se isso melhorar uso por agentes automaticos.
- Contato / operador: marcar no PR para gates, aprovacoes manuais, risco sensivel.

## 12) Contato com operador
Notificar operador no PR quando:
- Precisa implementar gate automatico no CI.
- Mudanca de contrato ou infra entrou.
- Vulnerabilidade critica apareceu ou foi introduzida.

Usar secao `Operator attention` com:
- Resumo do risco
- Mitigacao / rollback
- Lista de checks que passaram / falharam

## 13) Diretivas operacionais adicionais

### Comentarios no codigo
- Evitar comentario obvio ou comentario que so repete codigo.
- Permitido:
  - doc de API publica
  - justificativa de decisao nao obvia
  - `TODO`/`XXX` com plano claro
- Raciocinio, trade-off, contexto operacional vao no chat do agente, PR, ou `docs/`. Nao espalhar comentario transitorio no codigo.

### Saida de iteracao obrigatoria
Toda iteracao de agente registra no chat e no PR:
1. Plano executado: passos breves, objetivo, criterio de sucesso.
2. Diffs: arquivos alterados + resumo; se possivel patch/diff ou referencia de commit.
3. Resultado TDD: RED -> GREEN -> REFACTOR.
4. Security checks: scanners/verificacoes + resultado.
5. Observacoes / proximos passos: risco remanescente, revisao humana, follow-up do operador.

Exemplo minimo de `Iteration output`:
- Plan: [1] Write test for footer props; [2] Update json.props; [3] Update Footer component
- Diffs: files changed: `app/views/root/index.json.props` (+25 -0), `app/frontend/components/organisms/footer.tsx` (+80 -45), `spec/views/root/index_json_props_spec.rb` (+40)
- TDD results: RSpec: before -> 1 failing spec; after -> all specs passing; Vitest: before -> 2 failing; after -> all passing
- Security checks: `bundle exec bundler-audit` -> no issues; `yarn audit` -> minor advisory (non-blocking)
- Next: consolidate footer into layout-level props (requires operator)

### Enfoque na conversa / audit trail
- Debate, raciocinio, trade-off, decisao complexa: registrar no chat do agente ou corpo do PR.
- Chat do agente deve conter log de iteracao: plano, diffs, resultados, proximos passos.
- PR deve referenciar esse log quando aplicavel.

### Aplicacao e excecoes
- Regras obrigatorias para agentes automaticos.
- Fortemente recomendadas para humanos atuando como agentes.
- Excecao, ex. comentario extra por compliance, precisa aprovacao do operador + registro no PR.
- Em hotfix critico, ainda registrar no chat: plano, diff aplicado, testes rodados apos intervencao.
