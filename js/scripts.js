       
/*Faz o parser e gera e imprime conforme a task1 */
function generateTask1(){        
    var file = document.getElementById('file').files[0];
    var read = new FileReader();
    read.onload = function(e) {
        var contents = e.target.result;
        var array = contents.split('\n');
        var games = {};
        var countGame = 0;

        var game= {};
        //Faz a leitura do arquivo games.log
        for(var i=0; i< array.length; i++){
        	switch(true){
        		//Quando inicial o jogo
        		case array[i].indexOf('InitGame:') !== -1:
					game = {}
					game.totalKills = 0;
					game.players = [];
					game.kills = {};
					countGame++;
        		break;

        		//Quando inicia o jogo
        		case array[i].indexOf('ClientUserinfoChanged:') !== -1:
	        		var player = array[i].split('n\\')[1].split('\\t\\')[0];
	        		if(game.players.indexOf(player) == -1){
	        			game.players.push(player);
	        			game.kills[player] = 0;
	        		}
				break;

				//Matou
        		case array[i].indexOf('Kill:') !== -1:
        			for(var k=0; k<Object.keys(game.kills).length;k++){
        				//Conta total de kills
        				game.totalKills += 1;
        				//Quando mata, o seu kill é somado
        				if(array[i].split('killed')[0].indexOf(Object.keys(game.kills)[k])!==-1){
        					game.kills[Object.keys(game.kills)[k]] += 1;
        				}
        				//Quando o word mata alguém, esse alguem tem o kill subtraído
        				if(array[i].split('killed')[0].indexOf('<world>')!==-1 && array[i].split('killed')[1].indexOf(Object.keys(game.kills)[k])!==-1){
	       					game.kills[Object.keys(game.kills)[k]] -= 1;
        				}
        			}
        		break;

        		//Quando finaliza o jogo o game é inserido no objeto jogos
        		case array[i].indexOf('ShutdownGame:') !== -1:
        			games['game_'+countGame] = game;				        		
        		break;
        	}
        }
        //Gera o arquivo
        generateFile('task1_and_task2', JSON.stringify(games,null,2));
    }
    read.readAsText(file);
}


/*Faz o parser e gera ranking por jogador conforme a task 2*/
function generateRankingPerPlayer(){        
    var file = document.getElementById('file').files[0];
    var read = new FileReader();
    read.onload = function(e) {
        var contents = e.target.result;
        var array = contents.split('\n');
        var players = {};

        //Faz a leitura do arquivo games.log
        for(var i=0; i< array.length; i++){
            switch(true){

                //Quando inicia o jogo
                case array[i].indexOf('ClientUserinfoChanged:') !== -1:
                    var player = array[i].split('n\\')[1].split('\\t\\')[0];
                    if(Object.keys(players).indexOf(player) == -1){
                        players[player]=0;
                    }
                break;

                //Matou
                case array[i].indexOf('Kill:') !== -1:
                    for(var k=0; k<Object.keys(players).length;k++){
                        //Quando mata, o seu kill é somado
                        if(array[i].split('killed')[0].indexOf(Object.keys(players)[k])!==-1){
                            players[Object.keys(players)[k]] += 1;
                        }
                        //Quando o word mata alguém, esse alguem tem o kill subtraído
                        if(array[i].split('killed')[0].indexOf('<world>')!==-1 && array[i].split('killed')[1].indexOf(Object.keys(players)[k])!==-1){
                            players[Object.keys(players)[k]] -= 1;
                        }
                        
                    }
                break;
            }
        }

        //Gera o arquivo
        generateFile('task1_and_task2', JSON.stringify(players,null,2));
    }
    read.readAsText(file);
}


/*Faz o parser e gera e imprime o relatório conforme a Task Plus*/
function generateTaskplus(){        
    var file = document.getElementById('file').files[0];
    var read = new FileReader();
    read.onload = function(e) {
        var contents = e.target.result;
        var array = contents.split('\n');
        var games = {};
        var countGame = 0;

        var game= {};
        //Faz a leitura do arquivo games.log
        for(var i=0; i< array.length; i++){
            switch(true){
                //Quando inicial o jogo
                case array[i].indexOf('InitGame:') !== -1:
                    game = {}
                    game.kills_by_means = {};
                    countGame++;
                break;

                //Quando inicia o jogo
                case array[i].indexOf('Kill:') !== -1:
                    var gun = array[i].split('killed')[1].split('by')[1].trim();
                    
                        if(Object.keys(game.kills_by_means).indexOf(gun) == -1){
                           game.kills_by_means[gun] = 1;
                        }else{
                           game.kills_by_means[gun]++;
                        }
                    
                break;

                //Quando finaliza o jogo o game é inserido no objeto jogos
                case array[i].indexOf('ShutdownGame:') !== -1:
                    games['game-'+countGame] = game;                                
                break;
            }
        }
        //Gera o arquivo
        generateFile('plus', JSON.stringify(games,null,2));
    }
    read.readAsText(file);
}


/*Metodo que faz imprime em arquivo texto*/
function generateFile(filename,text){

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}