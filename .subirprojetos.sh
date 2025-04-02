#!/bin/bash

# Navega para o diretório do projeto
cd "/c/Users/Anderson/Desktop/Tag" || { echo "Erro: Não foi possível acessar o diretório do projeto"; exit 1; }

# Inicia o Front-Dashboard em segundo plano
cd Front-Dashboard || { echo "Erro: Não foi possível acessar o projeto Dashboard"; exit 1; }
yarn start &  # O & coloca o processo em segundo plano

# Inicia o Front-members-area em segundo plano
cd ..
cd Front-members-area || { echo "Erro: Não foi possível acessar o projeto Front Area de Membros"; exit 1; }
yarn dev -p 3001 &  # O & coloca o processo em segundo plano

# Inicia os serviços Docker
cd .. 
cd API-v2 || { echo "Erro: Não foi possível acessar o projeto API V2"; exit 1; }

docker compose -f 'traefik-dc.yml' up -d --build &
docker compose -f redis.yml up -d --build &

wait  # Espera todos os processos em segundo plano terminarem (o que pode não acontecer para servidores)
echo "Todos os projetos foram iniciados"