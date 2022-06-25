import Board from "./board.js";
import Player from "./player.js";

const board = new Board(["", "", "", "", "x", "", "", "", ""]);
board.printFormattedBoard();
const p = new Player();
console.log(p.getBestMove(board));
console.log(p.getBestMove(board, false));
console.log(p.nodeMap);
board.insert("x", 7);
board.printFormattedBoard();
console.log(p.getBestMove(board, false));
console.log(p.nodeMap);
board.insert("o", 4);
board.printFormattedBoard();
console.log(p.getBestMove(board));
console.log(p.nodeMap);
board.insert("x", 2);
board.printFormattedBoard();
console.log(p.getBestMove(board, false));
console.log(p.nodeMap);
/*
funkcja nowa gra(depth-1,kto zaczyna gre 1 czlowiek,0 komputer){
    instancie nowego gracza i tablicy
    dodawanie tilesów
    wszystkie tilesy są w tablicy
    dodatkowa zmienna na zparsowane(kto zaczyna gre)
    mazimizing to też starting
    playerTurn to też starting

    jeśli komputer zaczyna to 
        wybiera srodek albo 0 2 6 8
        !maximizing?'x':'o'
        wstaw do tablicy
        dodaj klase do miejsca gdzie wstawiles symbol
        switch turns
    eventlistener dla tilsow
        tylko jesli miejsce jest wolne i jest kolei gracza - false
        symbol = maximizing?'x':'o'
        insertuj symbol tam gdzie klik
        dodaj klase
        sprawdz czy nie koniec gry
        zmien kolejke
        //Get computer's best move and update the UI
            player.getBestMove(board, !maximizing, best => {
                const symbol = !maximizing ? 'x' : 'o';
                board.insert(symbol, parseInt(best));
                addClass(htmlCells[best], symbol);
                if(board.isTerminal()) {
                    drawWinningLine(board.isTerminal());
                }
                playerTurn = 1; //Switch turns
            });
        }, false);
        
}
