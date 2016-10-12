<h3>Quake log Parser<h3>

Como foi proposto no Exame conforme "Quake log Parser" no link "https://gist.github.com/Tempo-Telecom/6addf5dea09235e05340"

O exame proposto foi que fizesse o parser do arquivo game.log.

Task1:
Construa um parser para o arquivo de log games.log.
O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem morreu pq caiu no vazio, quem morreu machucado, entre outros.
O parser deve ser capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte.
Observação:
Quando o <world> mata o player ele perde -1 kill.
<world> não é um player e não deve aparecer na lista de players e nem no dicionário de kills.
total_kills são os kills dos games, isso inclui mortes do <world>.

Task2:
Após construir o parser construa um script que imprima um relatório de cada jogo (simplemente imprimindo o hash) e um ranking geral de kills por jogador.

Plus:
Gerar um relatório de mortes agrupando pelo motivo da morte, por partida.


Nota

Esse app foi escrito em javascript, html e bootstrap.
Não há necessidade de instalar nenhuma dependência, apenas abra no browser.

Para fazer o parser basta selecionar o arquivo game.log e clickar em "Task 1"
e então será gerado um arquivo parseado respeitando as exigências do exame task1 da Tempo Telecom.

Para gerar o arquivo de ranking basta selecionar o arquivo game.log e clickar em "Ranking Geral por Jogador".

Para gerar o relatório de mortes pelo motivo da morte basta selecionar o arquivo game.log e clickar em "Task Plus".

Atenção:<br/>
O jogo foi entendido como encerrado quando um novo se iniciou pela descrição "InitGame:"
e não pela descrição "ShutdownGame:" caso esteja incorreto posso fazer a correção imediata.

Para que o arquivo abra no formato especificado no exame basta utilizar o Wordpad.
