import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';

/**
 * Итеративный обход дерева в ширину (BFS) с использованием очереди
 * @param startDir - начальный каталог
 * 
 * Алгоритм:
 * 1. Создает очередь и добавляет в нее начальный каталог
 * 2. Пока очередь не пуста:
 *    a. Извлекает первый каталог из очереди
 *    b. Читает его содержимое
 *    c. Для каждого элемента:
 *       - Если файл: выводит его имя
 *       - Если каталог: добавляет его в конец очереди
 * 3. Продолжает до тех пор, пока не будут обработаны все каталоги
 * 
 * Особенности:
 * - Использует явную очередь (массив) для управления обходом
 * - Не зависит от стека вызовов, поэтому безопасен для глубоких деревьев
 * - Требует больше памяти для хранения очереди
 * - Порядок обхода: уровень за уровнем (сначала все файлы первого уровня, потом второго и т.д.)
 * - Асинхронный, но управление потоком выполнения осуществляется через цикл
 * 
 * Отличия от рекурсивного варианта:
 * - Память: рекурсивный вариант использует стек вызовов, итеративный - динамическую очередь
 * - Глубина: рекурсивный может переполнить стек при большой глубине вложенности, итеративный масштабируется лучше
 * - Порядок обхода: рекурсивный - в глубину, итеративный - в ширину
 * - Сложность отладки: рекурсивный проще понять, итеративный требует понимания состояния очереди
 */
const printnames = async (startDir: string): Promise<void> => {
    const searchQueue: string[] = [];
    searchQueue.push(
    );

    while (searchQueue.length > 0) {
        const dir: string = searchQueue.shift()!;
        const files: string[] = await readdir(dir);

        for (const file of files.sort()) {
            const fullpath: string = join(dir, file);
            const fileStat = await stat(fullpath);

            if (fileStat.isFile()) {
                console.log(file);
            } else {
                searchQueue.push(fullpath);
            }
        }
    }
};
console.log('queue start')
await printnames('for_trees');

/**
 * Рекурсивный обход дерева в глубину (DFS)
 * @param dir - текущий каталог
 * 
 * Алгоритм:
 * 1. Читает содержимое каталога
 * 2. Для каждого элемента в каталоге:
 *    a. Если это файл - выводит его имя
 *    b. Если это каталог - рекурсивно вызывает себя для этого каталога
 * 3. Использует сортировку для упорядоченного вывода
 * 
 * Особенности:
 * - Использует стек вызовов JavaScript для управления обходом
 * - Простой и интуитивно понятный код
 * - Может привести к переполнению стека при очень глубоких деревьях каталогов
 * - Порядок обхода: префиксный (сначала файлы текущего каталога, потом подкаталоги)
 * - Асинхронный, использует await для всех операций ввода-вывода
 */
const printnames_recursive = async (dir: string): Promise<void> => {
    const files: string[] = await readdir(dir);
    // console.log(`\n dir is ${dir}`);
    // console.log(`\n files is ${files}`);
    for (const file of files.sort()) {
        const fullpath: string = join(dir, file);
        const fileStat = await stat(fullpath);

        if (fileStat.isFile()) {
            console.log(file);
        } else {
            await printnames_recursive(fullpath);
        }
    }
};
console.log('recursive start')

await printnames_recursive('for_trees');




// await fg('***/**/*').then(files => {
//     for (const file of files) {
//         console.log(file);
//     }
// });

// for_trees/c.png
// for_trees/2001/a.png
// for_trees/2001/b.png
// node_modules/braces/LICENSE
// node_modules/braces/README.md

// await fg('./**/*').then(files => {
//     for (const file of files) {
//         console.log(file);
//     }
// });

//README.md
// binary-search.ts
// for_trees/2001/a.png
// for_trees/2001/b.png
// node_modules/braces/LICENSE
