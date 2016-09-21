var prg = ['begin',
    ['define', 'x', 5],
    ['set!', 'x', ['+', 'x', 1]],
    ['<', 2, 100],
    ['cons', ['quote', [1, 2]], ['quote', [3, 4]]]];

var env = { a: 1, b: 7 };


var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Strings are variable references
    if (typeof expr === 'string') {
        return env[expr];
    }
    // Look at head of list for operation
    switch (expr[0]) {
        case 'define':
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;

        case 'set!':
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;

        case 'begin':
            for (var i = 1; i < expr.length - 1; i++) {
                evalScheem(expr[i], env);
            }
            return evalScheem(expr[expr.length - 1], env);
        case 'quote':
            return expr[1];

        case 'cons':
            return [evalScheem(expr[1], env)].concat(evalScheem(expr[2], env));
        case 'car':
            return evalScheem(expr[1], env).shift(0);
        case 'cdr':
            return evalScheem(expr[1], env).slice(1);


        case '+':
            return evalScheem(expr[1], env) +
                evalScheem(expr[2], env);
        case '-':
            return evalScheem(expr[1], env) -
                evalScheem(expr[2], env);

        case '*':
            return evalScheem(expr[1], env) *
                evalScheem(expr[2], env);

        case '/':
            return evalScheem(expr[1], env) /
                evalScheem(expr[2], env);


        case '<':
            var eq =
                (evalScheem(expr[1], env) <
                    evalScheem(expr[2], env));
            if (eq) return '#t';
            return '#f';

        case '=':
            var eq =
                (evalScheem(expr[1], env) ===
                    evalScheem(expr[2], env));
            if (eq) return '#t';
            return '#f';
            
        case 'if':
            if (evalScheem(expr[1], env) === '#t')
                return evalScheem(expr[2], env);
            else
                return evalScheem(expr[3], env);
    }
};

console.log(evalScheem(prg, env));