# Desafio PIC PAY

Este projeto utiliza o Cypress para testes automatizados e mochawesome para geração de relatórios.

Pré-requisitos

Certifique-se de que você tenha instalado:

Node.js (versão 14 ou superior)

npm ou yarn
__________________________________________________________________________________________________________________
# Instalação


1 Clone o repositório:
```
git clone https://github.com/andersonishii/desafioPicpay.git
cd desafioPicpay
```

2 Instale as dependências:
```
npm install
```
__________________________________________________________________________________________________________________
# Script

## Executar os testes em modo headless:
```
npm test
```
Este comando executa os testes utilizando o Cypress no modo headless.

Após a execução, os resultados são gerados em formato JSON e depois convertidos para um relatório HTML utilizando o mochawesome.
## Abrir o Cypress em modo interativo:
```
npm run testOpen
```
Este comando abre o Cypress no modo interativo, permitindo selecionar os testes manualmente.
__________________________________________________________________________________________________________________
## Geração de Relatórios

Ao executar os testes com o comando npm run test, um relatório sedrá gerado nos seguintes passos:

Os resultados dos testes serão salvos como arquivos .json em cypress/results/.

Esses arquivos serão mesclados em um único arquivo: cypress/results/report.json.

O relatório final em formato HTML será gerado em mochawesome-report/.

Para acessar o relatório, basta abrir o arquivo HTML gerado.

__________________________________________________________________________________________________________________
## Dependências

## DevDependencies:

**cypress**: Framework para automação de testes front-end.

**mochawesome**: Ferramenta para geração de relatórios em formato JSON e HTML.

**mochawesome-merge**: Mescla múltiplos relatórios JSON do mochawesome.

**mochawesome-report-generator**: Converte os arquivos JSON em relatórios HTML.