// Функция countDown рекурсивно выводит числа от заданного значения i до 0.
// Если i меньше 0, выводится 'done' и возвращается 0.
// В противном случае выводится текущее значение i, и функция вызывает саму себя с аргументом i - 1.
// Пример: countDown(3) выведет: 3, 2, 1, 0, 'done'.

const countdown  = (i:number) =>{
    i < 0 ? (console.log('done'), 0) : (console.log(i), countdown(i - 1));
}
// const countdown  = (i:number) =>{
//     i < 0 ? (console.log('done'), 0) : (console.log(i), countDown(i - 1));
//     // if (i < 0){
//     //     console.log('done')
//     //     return 0
//     // }
//     // console.log(i)
//     // countDown(i-1)
// }

/*
* Функция sum рекурсивно вычисляет сумму всех элементов в массиве чисел.
* Базовый случай: если массив пуст, возвращается 0.
* Иначе: берется последний элемент (pop), и к нему прибавляется результат рекурсивного вызова sum с оставшимся массивом.
* Важно: pop() изменяет исходный массив, удаляя последний элемент.
*/

const sum = (list: number[]): number => {
    if (list.length === 0) {
        return 0;
    }
    return list.pop() + sum(list);
}
// let total = 0
// const sum = (list: number[]) => {
//     while (list.length > 0) {
//         total += list.pop();
//     }
//     return total;
// }

// let total = 0
// const sum = (list:number[]) =>{
//     if(list.length == 0 ) {
//         return total
//     }
//     total += list.pop()
//     return sum(list)
// }
//

// console.log(sum([2,3,4,5])) // Вернёт: 14

/*
* Функция count рекурсивно подсчитывает количество элементов в массиве.
* Вместо изменения массива (slice/pop), используется индекс i для обхода.
* Базовый случай: если i >= длины массива — возвращается 0.
* Иначе: возвращается 1 плюс результат вызова count с увеличенным индексом.
* Это позволяет избежать мутации массива и эффективно считать элементы.
*/

const count = (list:number[], i:number = 0): number => {
    if (i >= list.length) {
        return 0
    }
    return 1 + count(list, i + 1)
}
// const count = (list:number[])=> {
//     if (list.length === 0) {
//         return 0
//     }
//     return 1 + count(list.slice(1))
// }

// console.log(count([1,2,3,4,2,2])) // Вернёт: 6

/*
* Функция findMax находит максимальное число в массиве с помощью рекурсии.
* Базовый случай: если в массиве один элемент — он и является максимальным.
* Иначе: массив разделяется на head (первый элемент) и tail (остальные).
* Рекурсивно находится максимальный элемент в tail (maxTail).
* Затем сравнивается head и maxTail — возвращается большее значение.
* Подход "разделяй и властвуй", не изменяет исходный массив.
*/

const findMax = (list) =>{
    if(list.length === 1){
        return list[0]
    }
    const [head, ...tail] = list
    const maxTail = findMax(tail)
    return head > maxTail ? head : maxTail
}
// const findMax = (list, max = 0, current = 0) =>{
//     if (list.length === 0){
//         return max
//     }
//     current = list.pop()
//     if (current >= max){
//         max = current
//     }
//     return findMax(list, max, current)
// }
// console.log(findMax([1,2,3]))


