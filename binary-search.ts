const list = [1, 2, 3, 4, 5,7,8,9, 10,11,12,13]

const binarySearch = (list: number[], item: number): number | null => {
    let low = 0
    let high = list.length - 1
    let seteps = 0
    while (low <= high) {
        seteps++
        let mid = Math.floor((low + high) / 2)
        let guess = list[mid]
        console.log('mid = ' + mid)
        console.log('guess = ' + guess)
        console.log('start searching')

        if (guess ==item){
            console.log('index is '+ mid)
            console.log('number is '+ list[mid])
            console.log('length '+ list.length)

            console.log('steps art '+ seteps)
            return mid
        }
        else if(guess > item){
            high = mid - 1
            console.log("high = " + high)
        }
        else{
            low = mid + 1
            console.log("low = " + low)
        }
    }
    return null
}

binarySearch(list,1)



