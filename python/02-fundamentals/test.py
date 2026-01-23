import random


def greeting():
    return "Hello"


print(greeting())


def player_choice():
    options = ["rock", "paper", "scissors"]
    player_choice = "paper"
    computer_choice = random.choice(options)
    choices = {
        "player": player_choice,
        "computer": computer_choice
    }
    return choices


print(player_choice())

Dictionaries = {
    "name": "tashif",
    "age": 23,
    "city": "Bhutan"
}
print(Dictionaries["name"])

lists = ["apple", "banana", "cherry"]
print(lists[0])
ddinner = random.choice(lists)
print(ddinner)
popmethod = lists.pop(2)
print(popmethod)
print(lists)

insertmethod = lists.insert(0, "orange")
print(insertmethod)
print(lists)

extendMet = lists.extend(["grapes", "papaya"])
print(extendMet)
print(lists)
lists.sort()
print(lists)
lists.sort(reverse=True)
print(lists)

asc = sorted(lists)
print(asc)
set1 = {'Faizan', 'Tashif', 'Chetan'}
set2 = {'Faizan'}
union = set1 - set2
print(union)


def counter():
    count = 0

    def increment():
        nonlocal count
        count = count+1
        return count

    return increment


incrementVal = counter()
print(incrementVal())  # 1
print(incrementVal())  # 2
print(incrementVal())


class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def Bark(self):
        print("wooof")


roger = Dog("Rogerida", 2)
print(roger.name)
print(roger.age)
roger.Bark()

numbers = [1, 2, 3, 4, 5, 6]

mapm = filter(lambda x: x % 2 != 0, numbers)
print(list(mapm))
