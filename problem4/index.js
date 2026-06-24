
function sum_to_n_a(n: number): number 
{
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

function sum_to_n_b(n: number): number 
{
    let sum = 0;

    if (n <= 1) {
        sum = n;
    }

    sum = n + sum_to_n_b(n - 1);

    return sum;
}

function sum_to_n_c(n: number): number 
{
    let sum = 0;
    
    sum = n * (n + 1) / 2;

    return sum;
}