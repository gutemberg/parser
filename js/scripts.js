       
/*Faz o parser do arquivo*/
function task1(){        
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



function generateFile(filename,text){

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}