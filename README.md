# API RENTX
---
<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

  <a href="https://andrejr.dev">
    <img alt="Feito por André Junior" src="https://img.shields.io/badge/feito%20por-André Junior-blue">
  </a>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## Tecnologias
- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [JWT](https://typeorm.io/#/)
- [TypeOrm](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
<br />
<br />

## Requisitos

### Cadastro de carro
**RF**
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

**RN**
- Não deve ser possível cadastrar um carro com uma plca já existente
- O carro deve ser cadastrado, por padrão com disponibilidade
- * O usuário responsável pelo cadastro deve ser um usuário administrador

### Listagem de carros
**RF**
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros pelo nome da categoria
- Deve ser possível listar todos os carros pelo nome da marca
- Deve ser possível listar todos os carros pelo nome do carro

**RN**
- O usuário não precisa estar logado no sistema

### Cadastro de Especificações de carro
**RF**
- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros
- * O usuário responsável pelo cadastro deve ser um usuário administrador

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro

### Cadastro de Imagens do carro
**RF**
- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- * O usuário responsável pelo cadastro deve ser um usuário administrador


### Aluguel de carro
**RF**
- Deve ser possível cadastrar um aluguel


**RN**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível um novo aluguel caso já exista um aberto para o mesmo carro

<br>
<br>

---

Feito by André Junior :wave: [portifólio](https://andrejr.dev)