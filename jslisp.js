var endTime = function (time, expr) {
    // your code here

    var totalTime = function (expr2) {
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
    var notes = [];

    /// change pitch to midi number (ex c4 -> 60)
    var convertPitch = (pitch) => {
        var midiNum = 12;
        var intervals = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 }
        // console.log(pitch);
        midiNum += intervals[pitch[0].toUpperCase()];
        midiNum += parseInt(pitch[1]) * 12;

        return midiNum
    }


    // 深さ優先探索をする
    var traverse = function (expr) {
        if (expr.tag === 'par') {
            var now = total;  // log totalTime at this par node.
            traverse(expr.left);
            var leftTotal = total; /// left side endtime
            total = now; //// reset total time
            traverse(expr.right); /// right side endtime
            var rightTotal = total;
            total = Math.max(leftTotal, rightTotal);
        }
        else if (expr.tag == 'repeat'){
            for (var i = 0; i < expr.count; i++){
                traverse(expr.section)
            }
            console.log(total);
        }
        else if (expr.tag === 'note') {
            // expr.start = total; /// exprのノートobjにstart時間を追加してからnoteにプッシュ
            // expr.pitch = convertPitch(expr.pitch);

            var newexpr = {
                tag: 'note',
                pitch: convertPitch(expr.pitch),
                start: total,
                dur: expr.dur
            };
            notes.push(newexpr);
            total += expr.dur;
        }
        else if (expr.tag === 'rest') {
            // expr.start = total; /// exprのノートobjにstart時間を追加してからnoteにプッシュ
            var newexpr = {
                tag: 'note',
                start: total,
                dur: expr.dur
            };
            notes.push(newexpr);
            total += expr.dur;
        }
        else {
            traverse(expr.left);
            traverse(expr.right);
        }

    };

    traverse(musexpr);
    return notes;
};


var melody_mus =
    {
        tag: 'seq',
        left:
        {
            tag: 'seq',
            left: { tag: 'rest', dur: 250 },
            right: { tag: 'note', pitch: 'b4', dur: 250 }
        },
        right:
        {
            tag: 'seq',
            left: { tag: 'note', pitch: 'c4', dur: 500 },
            right: { tag: 'repeat',
  section:  {
        tag: 'seq',
        left:
        {
            tag: 'seq',
            left: { tag: 'rest', dur: 250 },
            right: { tag: 'note', pitch: 'b4', dur: 250 }
        },
        right:
        {
            tag: 'seq',
            left: { tag: 'note', pitch: 'c4', dur: 500 },
            right: { tag: 'note', pitch: 'd4', dur: 500 }
        }
    },
  count: 3 }
        }
    };

var melody2 = { tag: 'repeat',
  section:  {
        tag: 'seq',
        left:
        {
            tag: 'seq',
            left: { tag: 'rest', dur: 250 },
            right: { tag: 'note', pitch: 'b4', dur: 250 }
        },
        right:
        {
            tag: 'seq',
            left: { tag: 'note', pitch: 'c4', dur: 500 },
            right: { tag: 'note', pitch: 'd4', dur: 500 }
        }
    },
  count: 3 }

console.log(melody_mus);
// console.log(compile(melody_mus));
console.log(compile(melody_mus));

var melody_music =
    { tag: 'seq',
      left:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: {
           tag: 'seq',
           left: { tag: 'note', pitch: 'c4', dur: 500 },
           right: { tag: 'rest', dur: 250 } },
         right: { tag: 'repeat',
           section : { tag: 'note', pitch: 'd4', dur: 500 },
           count: 3 } } };

// console.log(melody_music);
console.log(compile(melody_music));

