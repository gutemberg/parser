       
/*Faz o parser do arquivo*/
function task1(){        
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onload = function(e) {
        var contents = e.target.result;
        var parsed = '';
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

        generateFile('task1', JSON.stringify(games,null,2));
    }
    r.readAsText(f);
}

function task2(){        
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onload = function(e) {
        var contents = e.target.result;
       	document.getElementById("result").innerHTML = contents;
    }
    r.readAsText(f);
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