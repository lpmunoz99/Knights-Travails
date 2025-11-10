export function knight(){

    const moves = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1]
    ];

    function edges(start, index = 0){ 
        if(index === moves.length){
            return [];
        }

        const x = start[0] + moves[index][0];
        const y = start[1] + moves[index][1];

        const validMoves = edges(start, index + 1);

        if(x >= 0 && x <= 7 && y >= 0 && y <= 7){
            return [[x, y]].concat(validMoves);
        }

        return validMoves;
    }
    
    function knightMoves(start, end){
        if(start === null) return;

        const parents = {};
        const visited = [];
        const path = [];
        const queue = [];
        queue.push(start);
        while(queue.length !== 0){
            const current = queue.shift();
            if(current[0] === end[0] && current[1] === end[1]){
                let position = end.toString();
                while(position !== start.toString()){
                    const arr = position.split(',').map(Number);
                    path.push(arr);
                    position = parents[position];
                }
                path.push(start);
                path.reverse();
                console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
                return path;
            }
            const currentMoves = edges(current);

            currentMoves.forEach(element=> {
                if(!visited.includes(element.toString())){
                    visited.push(element.toString());
                    queue.push(element);
                    parents[element.toString()] = current.toString();
                }
            });
        }
    }
    
    return {knightMoves}
}