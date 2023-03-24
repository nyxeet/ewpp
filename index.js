// Для решения задачи был использован бинарный поиск, сложность алгоритма будет O(logn). Это решение сможет нейти неограниченное количество пропущеных чисел 
// между первым и последним элементом массива. Числа могут быть разрозненны по всей части массива.

function binarySearch(numbers) {
  let result = []
  // делю здесь массив на две части, если количество элементов будет нечётное - то длина первой левой части будет на 1 элемент больше
  const median = Math.ceil(numbers.length / 2)

  const firstPart = numbers.slice(0, median)
  const secondPart = numbers.slice(median, numbers.length)
  const isSecondPartEven = secondPart.length % 2 === 0

  const lastItem = numbers[numbers.length - 1]
  const firstItem = numbers[0]

  const isFinalStage = numbers.length === 2

  // может быть отсутствующее число между левой и правой частью массива
  const isCenter = numbers[median] - numbers[median - 1] !== 1

  // если нечетное - можно проверять также как и в isLeftPartMissing, если четное то наоборот
  const isRightPartMissing = isSecondPartEven ? secondPart.length <= lastItem - numbers[median] : secondPart.length < lastItem - numbers[median]

  // если разница между последним и первым больше за количество элементов - значит там были пропущены числа
  const isLeftPartMissing = numbers[median - 1] - numbers[0] >= median

  // рекурсивный вызов этой же функции для каждой из частей массива
  isLeftPartMissing && result.push(...binarySearch(firstPart))
  isRightPartMissing && result.push(...binarySearch(secondPart))


  const missingNumber = isFinalStage ? Array.from({ length: lastItem - firstItem - 1 }, (_, index) => firstItem + index + 1) : []

  // здесь проверяю если пропущеные числа между левым и правым массивом
  isCenter && !isFinalStage && result.push(...Array.from({ length: numbers[median] - numbers[median - 1] - 1 }, (_, index) => numbers[median - 1] + index + 1))

  return [...result, ...missingNumber]

}

// небольшой декоратор для проверки первых чисел и сортировки результата
function findMissingNumbers(numbers) {
  const missingFirstNumbers = numbers[0] !== 1 ? Array.from({ length: numbers[0] - 1 }, (_, index) => index + 1) : []
  return [...missingFirstNumbers, ...binarySearch(numbers)].sort((a, b) => a - b)
}

console.log(findMissingNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(findMissingNumbers([3, 4, 5, 11, 12, 13]));
console.log(findMissingNumbers([1, 2, 3, 4, 6, 7, 8, 9]));
console.log(findMissingNumbers([1, 4, 5, 6, 7, 8, 9, 10]));
console.log(findMissingNumbers([1, 3, 4, 5, 6, 7, 8, 10, 11]))
console.log(findMissingNumbers([1, 4, 5, 6, 7, 10, 11]))
console.log(findMissingNumbers([1, 11]))
console.log(findMissingNumbers([1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17, 19, 22]));
console.log(findMissingNumbers([4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17, 19, 22]));









