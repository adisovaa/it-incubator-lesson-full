import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { AppDispatch } from "../../app/store"
import { BaseResponse } from "common/types"

// BaseResponse<item: Todolist>
// BaseResponse<item: DomainTask>
export const handleAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "some error occurred"))
  dispatch(setAppStatusAC("failed"))
}

// example 1
const numbers = [1, 2, 3, 4, 5, 6]
const isEven = (num: number) => num % 2 === 0
const result = filterArray(numbers, isEven)
console.log(result)

// example 2
const words = ["hello", "yes", "no"]
const startWithY = (word: string) => word.startsWith("y")
const result2 = filterArray(words, startWithY)

function filterArray<T>(array: T[], predicate: (el: T) => boolean): T[] {
  return array.filter(predicate)
}

// Пример 1: Преобразование чисел в строки
const numbers2 = [1, 2, 3, 4]
const transformNumberToString = (num: number) => `Number: ${num}`
const resul = mapArray(numbers2, transformNumberToString)
console.log(resul) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]

// Пример 2: Преобразование строк в их длины
const words2 = ["hello", "world", "typescript"]
const getLength = (word: string) => word.length
const lengthResults = mapArray(words2, getLength)
console.log(lengthResults) // [5, 5, 10]

function mapArray<T, V>(array: T[], transformer: (el: T) => V): V[] {
  return array.map(transformer)
}

// Пример 3: Преобразование объектов в строки
type Person = { name: string; age: number }
const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
]
const toDescription = (person: Person) => `${person.name} is ${person.age} years old`

const descriptions = mapArray(people, toDescription)
console.log(descriptions) // ["Alice is 25 years old", "Bob is 30 years old"]
