Como foi proposto no Exame conforme Quake log Parser no link https://gist.github.com/Tempo-Telecom/6addf5dea09235e05340

O exame proposto foi que fizesse o parsser do arquivo game.log.
Task1:
	Construa um parser para o arquivo de log games.log.
	O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem morreu pq caiu no vazio, quem morreu machucado, entre outros.
	O parser deve ser capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte.

	Objeservação:
		Quando o <world> mata o player ele perde -1 kill.
		<world> não é um player e não deve aparecer na lista de players e nem no dicionário de kills.
		total_kills são os kills dos games, isso inclui mortes do <world>.

Task2:
	Após construir o parser construa um script que imprima um relatório de cada jogo (simplemente imprimindo o hash) e um ranking geral de kills por jogador.

Plus:
	Gerar um relatório de mortes agrupando pelo motivo da morte, por partida.


Esse app foi escrito exclusivamente em javascript, html e bootstrap.
Não a necessidade de instalar nenhuma dependencia apenas abrir no browser.

Para fazer o parser basta selecionar o arquivo game.log e clickar em "Task 1"
e então será gerado um arquivo parseado respeitando as exigências do exame task1 da tempo telecom.

Para gerar o arquivo de ranking basta selecionar o arquivo game.log e clickar em "Ranking Geral por Jogador".

Para gerar o relatório de mortes pelo motivo da morte basta selecionar o arquivo game.log e clickar em "Task Plus"
