## API de Autenticação usando JWT Tokens - Documentação
Bem-vindo à documentação da API de autenticação desenvolvida com NestJS e baseada em JWT Tokens. Esta API oferece funcionalidades básicas de autenticação, incluindo login, cadastro de usuário e visualização de perfil. Utiliza cookies para armazenar o token JWT, proporcionando uma forma segura de autenticação e autorização.

## Visão Geral
A API é construída utilizando o framework NestJS, que é uma estrutura Node.js para construção de aplicativos eficientes, escaláveis e confiáveis e TypeORM para aumentar a velocidade de desenvolvimento do seu app. A autenticação é realizada por meio de JSON Web Tokens (JWT), o que oferece uma maneira segura e eficiente de verificar a identidade dos usuários.

## Aqui está uma visão geral das principais funcionalidades oferecidas pela API:

Login: Rota para autenticar usuários e gerar um token JWT.
Cadastro de Usuário: Rota para registrar novos usuários no sistema.
Visualização de Perfil: Rota para recuperar informações do perfil do usuário autenticado.

## Endpoints
```
1. Login
URL: /auth/login
Método: POST
Parâmetros do Corpo:
email: E-mail do usuário (String)
password: Senha do usuário (String)
Resposta de Sucesso:
Status: 200 OK
Resposta de Erro:
Status: 401 Unauthorized
Corpo: Mensagem de erro
```
```
2. Cadastro de Usuário
URL: /auth/register
Método: POST
Parâmetros do Corpo:
name: Nome do usuário (String)
email: E-mail do usuário (String)
password: Senha do usuário (String)
Resposta de Sucesso:
Status: 201 Created
Corpo: Usuário registrado com sucesso
Resposta de Erro:
Status: 400 Bad Request
Corpo: Mensagem de erro
```
```
3. Visualização de Perfil
URL: /auth/profile
Método: GET
Cabeçalhos:
Authorization: Token JWT
Resposta de Sucesso:
Status: 200 OK
Corpo: Informações do perfil do usuário
Resposta de Erro:
Status: 401 Unauthorized
Corpo: Mensagem de erro
```

## Estratégia de Cookies
A API utiliza cookies para armazenar o token JWT. Isso proporciona uma camada adicional de segurança, pois o token não é exposto no corpo das solicitações HTTP. Se desejar mudar a estratégia de onde o cookie é salvo, você é livre para implementar sua própria lógica de manipulação de cookies.

## Conclusão
Esta documentação fornece uma visão geral da API de autenticação desenvolvida com NestJS e JWT Tokens.




