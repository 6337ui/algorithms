const findSmallest = (list: number[]) => {
    let smallest = list[0]
    let smallestIndex = 0

    
    // Способ 1: использование for...in — перебирает индексы массива как строки
    // Каждый индекс нужно преобразовать в число, так как i имеет тип string
    // Подходит, но менее очевиден и требует дополнительного преобразования
    // for (let i in list) {
    //     const index = Number(i); // i — это строка, нужно преобразовать
    //     if (list[index] < smallest) {
    //         smallest = list[index];
    //         smallestIndex = index;
    //     }
    // }

    // Способ 2: классический for с индексом — прямой доступ через счётчик
    // Наиболее явный и понятный способ, особенно для работы с индексами
    // for (let i = 0; i < list.length; i++) {
    //     if (list[i] < smallest) {
    //         smallest = list[i];
    //         smallestIndex = i;
    //     }
    // }

    // Способ 3: метод forEach — удобен для итерации по элементам с индексами
    // Не требует ручного управления индексом, читаемый и функциональный стиль
    list.forEach((item, index) => {
        if (item < smallest) {
            smallest = item;
            smallestIndex = index;
        }
    })
    return smallestIndex
}


const selectSort = (list: number[]) => {
    let newList = []
    // Цикл while продолжается, пока в исходном массиве есть элементы
    // На каждой итерации находим наименьший элемент и перемещаем его в новый массив
    while (list.length > 0) {
        console.log('длина списка ' + list.length)
        let smallest = findSmallest(list) // Находим индекс наименьшего элемента
        // Удаляем элемент по индексу из исходного массива с помощью splice
        // Это уменьшает длину массива — условие для завершения цикла
        // Оператор ... (spread) разворачивает элемент из массива (т.к. splice возвращает массив)
        // и позволяет добавить сам элемент, а не массив с одним элементом
        newList.push(...list.splice(smallest, 1))
    }

    console.log(newList)
    return newList
}
selectSort([7,6,5])