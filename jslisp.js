var endTime = function (time, expr) {
    // your code here
    
    var totalTime = function (expr2)  {
        console.log(expr2);
    if (expr2.tag == 'note') return expr2.dur;
    else {
        return totalTime(expr2.left) + totalTime(expr2.right);
    }
        };
    console.log('test');
    
    return totalTime(expr) + time;
};

// maybe some helper functions

// var compile = function (musexpr) {
//     // your code here
//     var total = 0;
//     var note = [];
    
//     // 深さ優先探索をする
//     var traverse = function (expr) {
//         if (expr.tag === 'note') {
//             expr.start = total; /// exprのノートobjにstart時間を追加してからnoteにプッシュ
//             note.push(expr);
//             total += expr.dur;
//         }
//         else {
//             traverse(expr.left);
//             traverse(expr.right);
//         }
            
//     };
    
//     traverse(musexpr);
//     return note;
// };



// this is all you


// this is all you



////newer compiler 
var compile = function (musexpr) {
    // your code here
    var total = 0;
    var note = [];
    
    // 深さ優先探索をする
    var traverse = function (expr) {
         if (expr.tag === 'par') {
             var now = total;  // log totalTime at this par node.
             traverse(expr.left);
             var leftTotal = total; /// left side endtime
             total = now; //// reset total time
             traverse(expr.right); /// right side endtime
             var rightTotal = total;
             total = Math.max(leftTotal,rightTotal);
        }
        else if (expr.tag === 'note') {
            expr.start = total; /// exprのノートobjにstart時間を追加してからnoteにプッシュ
            note.push(expr);
            total += expr.dur;
        }
        else {
            traverse(expr.left);
            traverse(expr.right);
        }
            
    };
    
    traverse(musexpr);
    return note;
};


var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));