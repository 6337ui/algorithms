import Denque from 'denque';
// interface Graph {
//     [key: string]: string[];
// }
// type Person =
//     | "вы"
//     | "Алиса"
//     | "Боб"
//     | "Клэр"
//     | "Анудж"
//     | "Пегги"
//     | "Том"
//     | "Джонни"

// type Graph = Record<string, Person[]>;
type Graph = Record<string, string[]>;

const graph:Graph = {}

graph["вы"] = ["Алиса", "Боб", "Клэр"];
graph["Боб"] = ["Анудж", "Пегги"];
graph["Алиса"] = ["Пегги"];
graph["Клэр"] = ["Том", "Джонни"];
graph["Анудж"] = [];
graph["Пегги"] = [];
graph["Том"] = [];
graph["Джонни"] = []
const person_is_not_seller = (name:string | undefined) =>{
    if (!name) return true;
    return name === 'Анудж'
}
/*
* Для небольших графов обычного массива достаточно.
* В современных V8 операции shift() оптимизированы.
* В 90% случаев string[] быстрее и проще.
* 
* Назначение структуры данных Denque и её использование для обхода графа в ширину (BFS):
* - Deque (двусторонняя очередь) позволяет эффективно добавлять и удалять элементы с обоих концов.
* - При BFS очередь гарантирует, что все узлы одного уровня будут обработаны перед переходом к следующему.
* - Это позволяет находить кратчайший путь до цели (например, ближайшего продавца манго).
* 
* Зачем нужна очередь при поиске продавца манго:
* - Очередь обеспечивает порядок обхода — сначала рассматриваются друзья, затем друзья друзей.
* - Первый найденный продавец манго будет ближайшим по связям.
* - FIFO-порядок (первым пришёл — первым обработан) критически важен для корректности BFS.
* 
* Описание вариантов реализации:
* 1. С использованием shift():
*    - Простая реализация на базе массива.
*    - Метод shift() удаляет первый элемент и возвращает его.
*    - Подходит для небольших данных.
* 
* 2. С использованием Denque:
*    - Специализированная структура данных для двусторонних операций.
*    - Обеспечивает O(1) производительность для push и shift.
*    - Эффективна при работе с большими объёмами данных.
* 
* 3. С ручным управлением индексом:
*    - Используется массив с указателем head (голова очереди).
*    - Вместо удаления элемента просто увеличивается индекс head.
*    - Позволяет избежать cost-операций вроде shift().
* 
* Почему shift() может быть медленным для больших данных:
* - Операция shift() требует перемещения всех оставшихся элементов на одну позицию влево.
* - Это O(n) операция, где n — количество элементов в массиве.
* - При большом количестве итераций это приводит к значительным накладным расходам.
* - Вместо этого ручное управление индексом или использование Denque даёт O(1) производительность.
*/
const queue: string[] = [];
queue.push(...graph["вы"]);
while (queue.length) {
    const person = queue.shift()!;
    if(!person) continue
    if(person_is_not_seller(person)){
        console.log(`person '${person}' is a mango seller`)
    }
    else {
        queue.push(...graph[person])
    }
}
/*
* Вариант с denode
* Если граф очень большой (10⁵+ операций) — тогда denque оправдан
* */
const search_queue = new Denque<string>()
graph['вы'].forEach(el => search_queue.push(el))
while (search_queue.size()){ //sea
    const person = search_queue.shift()!
    if (person === undefined) continue;
    if (person_is_not_seller(person)){
        console.log(`person '${person}' is a mango seller`)
        break
    }
    else {
        graph[person].forEach(el => search_queue.push(el) )
    }
}
/*
* Вариант без shift и зависемостей
* */
const queue_buitin: string[] = [];
let head = 0;
queue_buitin.push(...graph["вы"]);
while (head < queue.length) {
    const person = queue[head++];
}

// const denque = new Denque([1, 2, 3, 4]);
// console.log(denque.shift()); // 1
// console.log(denque.pop()); // 4