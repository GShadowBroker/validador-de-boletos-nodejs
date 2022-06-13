# API para validação de linha digitável de boletos

API REST que faz a validação da linha digitável de boletos bancário ou de concessionária segundo normas das [Especificações Técnicas para Confecção de Boleto de Cobrança do Banco do Brasil](https://storage.googleapis.com/slite-api-files-production/files/b8def5e9-f732-4749-88ea-25270cb71c4d/Titulo.pdf) e [“Layout” Padrão de Arrecadação/Recebimento com Utilização do Código de Barras](https://storage.googleapis.com/slite-api-files-production/files/222c4ec7-9056-4149-aa42-e66b135f523a/Convenio.pdf) elaborados pelo FEBRABAN.


## Como rodar o projeto localmente:

1. Baixe o projeto localmente utilizando o git:
```
git clone https://github.com/GShadowBroker/validador-de-boletos-nodejs.git
```
2. Entre na pasta do projeto e instale dependências:
```
ls validador-de-boletos-nodejs & yarn install
```
*ou*
```
ls validador-de-boletos-nodejs & npm install
```
3. Copie o conteúdo de .env.example para .env:
```
cp ./.env.example ./.env
```
5. Inicie o servidor local:
```
yarn run start:dev
```
*ou*
```
npm run start:dev
```

## Como usar a API

Para validar uma linha digitável de um boleto, basta acessar o seguinte endpoint:
```
GET http://localhost:8080/boleto/{{ linha digitável }}
```
A linha digitável possui 47 caractéres numéricos para boletos bancários, e 48 caractéres para boletos de concessionárias.

Exemplo:
```
GET http://localhost:8080/boleto/23793380296099605290241006333300689690000143014
```
Resposta:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{
	"barCode": "23796896900001430143380260996052904100633330",
	"amount": "1430.14",
	"expirationDate": "28-04-2022"
}
```
