Rodando o Projeto Completo (Backend + Frontend)

Este projeto é composto por um Backend em ASP.NET Core e um Frontend em React Native (Expo).
Siga as instruções abaixo para executar a aplicação por completo.

Backend — ASP.NET Core Web API
Tecnologias Utilizadas

Linguagem: C#

Framework: ASP.NET Core Web API

Runtime / SDK: .NET 8 (net8.0)

Documentação e testes: Swagger (Swashbuckle)

Pré-requisitos

Antes de rodar o backend, certifique-se de ter instalado:

.NET SDK 8 (obrigatório)

Observação:
Caso abra o projeto no Visual Studio, pode ser solicitada a workload “ASP.NET and web development”.

Como rodar o Backend
1) Acessar a pasta do projeto

No terminal, navegue até a pasta onde está localizado o arquivo .csproj.

Exemplo:

cd "ASP.NET core/WebApplication1"

2) Restaurar dependências
dotnet restore

3) Executar a API
dotnet run


A API será iniciada na porta 5143.

URLs Importantes

Swagger (documentação e testes das rotas):

http://localhost:5143/swagger

Acesso via celular (React Native)

O computador e o celular devem estar conectados à mesma rede Wi-Fi.

O backend já está configurado para aceitar conexões externas.

No arquivo Program.cs, existe a seguinte configuração:

builder.WebHost.UseUrls("http://0.0.0.0:5143");

Frontend — React Native com Expo
Tecnologias Utilizadas

Linguagem: TypeScript (React)

Framework: React Native

Ferramenta: Expo

Navegação: expo-router

Gráficos: react-native-chart-kit

Ícones: @expo/vector-icons (MaterialIcons via IconSymbol)

Pré-requisitos
1) Node.js

Instale o Node.js (versão LTS).

2) Expo CLI

Instale globalmente:

npm install -g expo

3) Expo Go (caso utilize celular físico)

Instale o aplicativo Expo Go (Android ou iOS).

Configuração da API

O frontend consome a API local na porta 5143.

Nos arquivos de tela (index.tsx, explore.tsx, etc.), existe uma configuração semelhante a:

const API_BASE_URL = "http://192.168.X.X:5143";

Usando Emulador

Android Emulator:

http://10.0.2.2:5143


iOS Simulator:

http://localhost:5143

Usando Celular Físico

Utilize o IP do computador na rede local, por exemplo:

const API_BASE_URL = "http://192.168.5.161:5143";


Observação:
Nunca utilize localhost no celular, pois ele aponta para o próprio dispositivo.

Como rodar o Frontend

Certifique-se de ter ajustado o API_BASE_URL corretamente.

1) Acessar a pasta do frontend
cd seiwa-app

2) Instalar dependências
npm install

3) Executar o aplicativo
npx expo start -c


Isso abrirá o Metro Bundler no navegador e exibirá um QR Code.

Executando no celular (Expo Go)

Garanta que o computador e o celular estão na mesma rede Wi-Fi

Abra o aplicativo Expo Go

Escaneie o QR Code exibido no navegador

Se quiser, posso:

reduzir ainda mais o texto

adaptar o README para padrão corporativo ou acadêmico

separar Backend e Frontend em arquivos diferentes (README_BACKEND.md, README_FRONTEND.md)