import random

# variables and functions
# 1

# def greeting():
#   return 'Hi there!'

# response = greeting()
# print(response)


# 2
def getChoices():
  player_choice = input('Enter a choice (rock, paper, scissors):')
  options = ['rock', 'paper', 'scissors']
  colorOptions = [
      'red',
      'green',
  ]
  computer_choice = random.choice(options)
  color_choice = random.choice(colorOptions)

  choices = {
      "player": player_choice,
      "computer": computer_choice,
      "color": color_choice
  }

  return choices


# in python we can assign a same variable multiple times
choices = getChoices()
print(choices)

# Dictionaries
# dic = {
#     "name": "John",
#     "age": 25,
#     "city": "New York",
#     "favorite_color": choices['color']
# }
# print(dic["favorite_color"])

# Lists
food = ['pizza', 'cake', 'salad', 'hamburger']
print(food[0])
dinner = random.choice(food)
print(dinner)
print(f"'pizza' in food: {'pizza' in food}")
print("'pizza' in food:", 'pizza' in food)
print("'pizza' not in food:", 'pizza' not in food)

# List Methods
food.append('ice cream')
print(f"'food append'{food}")
food.extend(['pasta', 'soup'])
print(f"'food extend'{food}")
food.insert(1, 'taco')
print("'food insert'", food)
food.remove('pizza')
print("'food remove'", food)
food.pop(0)
print("food pop", food)
food.pop(-1)
print("food pop -1", food)
food.sort()
print("food sort", food)
food.sort(reverse=True)
print("food sort reverse", food)

items = ['Rogers', 'bob', 'Beau', 'Quincy']
items.sort(key=str.lower)
print("items aftersort", items)

# also directly we can target to the index
food[0] = 'pasta'
print("food[0]", food[0])
print("food[0] aftr adding", food)

cats = ['fluffy', 'whiskers', 1, 'felix', True, [1, 2, 3, 4, 5]]
print("Cats", cats)

print(cats[5][2])  #3

# cats[5][2] means:
# cats[5] refers to the list at index 5:
# ➜ [1, 2, 3, 4, 5]
# ➜ go to that list and access the item at index 2
# ➜ which is 3 (since index starts at 0)

cats.extend(['tommy', '5'])
print(cats[6])
print("cats", cats)

numbers=[7,8,1,2,3,4,5]
# numbers.sort() #change the original array ascen
# numbers.sort(reverse=True) #chang the original array for desc
# print(numbers)
ascending= sorted(numbers)
descending= sorted(numbers, reverse=True)
print(ascending,descending)

# functions with arguments
def check_win(player, computer):
  print(f'You chose {player}, computer chose {computer}')

  if player == computer:
    return 'It is a tie!'
  elif player == 'rock' and computer == 'scissors':
    return 'Rock smashes scissors! Player wins!'
  elif player == 'paper' and computer == 'rock':
    return 'Paper covers rock! Player wins!'
  elif player == 'scissors' and computer == 'paper':
    return 'Scissors cuts paper! Player wins!'
  else:
    # print("You chose " + player + "computer chose " + computer)
    # or with f strings
    # print(f'You chose {player}, computer chose {computer}')
    return 'Computer wins!'


# or

# print(f'You chose {player}, computer chose {computer}')
# if player == computer:
#   print("It is a tie!")
# elif player == 'rock':
#   if computer == 'scissors':
#     print("Rock smashes scissors! Player win!")
#   else:
#     print("Paper covers rock! Computer win!")
# elif player == 'paper':
#   if computer == 'rock':
#     print("Paper covers rock! Player win!")
#   else:
#     print("Scissors cuts paper! Computer win!")
# elif player == 'scissors':
#   if computer == 'paper':
#     print("Scissors cuts paper! Player win!")
#   else:
#     print("Rock smashes scissors! Computer win!")

# to run this call get_choices funcc
choices = getChoices()
result = check_win(choices['player'], choices['computer'])
print(result)

# if else statements

# age = 20
# if age >= 18:
#   print("You are an adult")
# elif age >= 12:
#   print("You are a teenager")
# elif age >= 1:
#   print("You are a child")
# else:
#   print("You are a baby")

# data types or type conversion
# int()
# float()
# str()
# bool()
# list()
# tuple()
# dict()
# set()
# NoneType()

# int :	x = 10	#Integer numbers
# float:	pi = 3.14	#Decimal numbers
# str	: name = "Tashif"	#Text
# bool :	is_cool = True	#Boolean (True or False)
# list :	fruits = ["apple", "banana"]	#List of items
# tuple :	point = (3, 4)	#Immutable list
# dict :	user = {"name": "Tashif", "age": 25}	#Key-value pairs
# set	: unique = {1, 2, 3}	#Unordered collection of unique values
# NoneType :	empty = None	#Represents nothing

name = "Beau"
print(type(name))
print(isinstance(name, str))

age = 30
print(isinstance(age, int))

age = 2.9
print(isinstance(age, float))  #checks decimal

age = float(13)  #convert to float
print(isinstance(age, float))

age = int("20")
print(isinstance(age, int))

# Arithmatic opeerators
age = 8
age += 1
print(age)

#comparison operators
a = 1
b = 2

# a==b#False
# a<b#True
# a!=b#True
# a>b#False

# Boolean operators
print(0 or 1)  #1
print(False or 'hello')  #'hello'
print('hello' or 'world')  #'hello'
print([] or False)  #False bcz empty list is false
print(False or [])  #[] bcz empty list is false

# and operator only evaluates to true if both are true and or only evaluates to true if one is true
# and only evaluate 2nd value if first is true and or only evaluate 2nd value if first is false

print(0 and 1)  #0 bcz 0 is false
print(1 and 0)  #0 bcz 0 is false
print(False and 'hello')  #False bcz False is false
print('hello' and 'world')  #'world' bcz 'hello' is true
print([] and False)  #[] bcz empty list is false
print(False and [])  #False bcz False is false


# ternary operator
def is_adult(age):
  if (age >= 18):
    print("You are an adult")
  else:
    print("You are a child")
  # or


def is_adult2(age):
  return True if age >= 18 else False


# multi line string
print("""Hello
World""")

print('beau'.capitalize())
print('beau'.upper())
print('Beau'.lower())
print('beau'.islower())
print('beau'.isalpha())
print('beau person'.title())

# isalpha() to check if a string contains only characters and is not empty
# isalnum() to check if a string contains only characters and numbers and is not empty
# isdecimal() to check if a string contains digits and is not empty
# lower() to get a lowercase version of a string
# islower() to check if a string is lowercase
# upper() to get an uppercase version of a string
# title() to get a capitalized version of a string
# isupper() to check if a string is uppercase
# startsswith() to check if the string starts with a specific substring
# replace()  # to replace parts of a string
# endswith() to check if the string ends with a specific substring
# isspace() to check if a string only contains whitespace
# split() to split a string on a specific character separator
# (space is the default) It splits the string into a list, using the comma , as a separator.
# strip() to remove whitespace from the start and end of a string
# join()  # to append new letters to a string
# find() to find the position of a substring
# count() to get the number of occurrences of a substring in a string
# len() to get the length of a string
print(len(name))
# in to check if a substring exists in a string
print('au' in name)
# All above methods does not change the original string

def word_replacement():
  name = "hello, beau"
  word_to_replace=input('Enter a word to replace: ')
  word_to_replace_with=input('Enter a word to replacement: ')
  name = name.replace(word_to_replace, word_to_replace_with)
  print("wordreplacemnet",name)
word_replacement()  

#miltiple values
x, y, z = "Orange", "Banana", "Cherry"
print(x)
print(y)
print(z)
#unpacking
fruits = ["apple", "banana", "cherry"]
x, y, z = fruits
print(x)
print(y)
print(z)

# Escaping Characters
name = "Beau"
print("Be\nau")  # \n for new line
print("Be\tau")  #\t for tab
print("Be\\au")  #\\ for backslash
print("Be\"au")  #\" for double quote
print("\"Beau\"")  #\" for double quote
# or
print('"Beau"')

# String Characters and Slicing
print(name[1])  #e
print(name[-1])  #u -1 is the last character
print(
    name[1:2]
)  #e 1 is the start index and 2 is the end index (a character before the end index)
name = "Beau is cool"
print(name[1:7])  #eau is
print(name[1:])  #eau is cool
print(name[:7])  #Beau is
print(name[1:7:2])  #eu i 2 is the step

print('----------------------BOOLEANS-----------------------')

done = True
if (done):
  print("Yes")
else:
  print("No")

done = 0  # 0 is false and 1 or other any integers are true
if (done):
  print("Yes")
else:
  print("No")

done = ""  # empty string is false and any string is true
if (done):
  print("Yes")
else:
  print("No")

print(type(done) == bool)
print(isinstance(done, bool))

print('----------------------Any and All funct-----------------------')
book_1_read = True
book_2_read = False

check_read = any([book_1_read, book_2_read])
print(check_read)

incrediants_purchasedd = True
meals_cooked = False

check_meals = all([incrediants_purchasedd, meals_cooked])
print(check_meals)

print('------------------------complex numbers-----------------------')

# complex numbers
num1 = 2 + 3j
num2 = complex(2, 3)
print(num1.real, num1.imag)
print(num2.real, num2.imag)

# Build in Functions
print(abs(-5.5))  #5.5
# abs will return absulute value of a number
print(round(5.5))  #6
print(round(5.4))  #5
print(round(5.49))  #5
print(round(5.49, 1))  #5.5

print('------------------------ENUMS-------------------------')
from enum import Enum


class State(Enum):
  Inactive = 0
  Active = 1


print(State.Active)
print(State.Active.value)
# or
print(State['Inactive'])
print(State['Inactive'].value)
print(State(1))  #Active

print(list(State))  #[<State.Inactive: 0>, <State.Active: 1>]
print(len(State))  #2

# Tuples
print('------------------------TUPPLES-------------------------')

names = ('John', 'Jane', 'Jack')
print(names[0])
print(len(names))
print(names[-1])
print(len(names))

print('John' in names)
print('John' not in names)
print(sorted(names))

newTuple = names + ('Jill', 'Joe') + ('Jonas', )
print(newTuple)

print('------------------------DICTIONARIES-------------------------')

dog = {"name": "Tommy", "age": 5, "owner": "John", "color": "black"}
print(dog["name"])
# or
print(dog.get("name"))

print(dog.get('color', 'brown'))  #default value is brown
print(dog.pop("name"))  #remove name from dog
print(dog)

print(dog.popitem())  #remove last item from dog
print("color" in dog)
print(dog.keys())
print(list(dog.keys()))

print(dog.values())
print(list(dog.values()))

dog["favorite food"] = "meat"
print(len(dog))

print(dog.items())
print(list(dog.items()))

#delete dog.color
del dog["favorite food"]
print(dog)

print('------------------------SETS-------------------------')
set1 = {'Faizan', 'Tashif', 'Chetan'}
set2 = {'Faizan'}
intersection = set1 & set2
print(intersection)
#set is not going to have duplicate values
set3 = {'Faizan', 'Tashif', 'Chetan', 'Faizan'}
print(set3)  #{'Faizan', 'Tashif', 'Chetan'}

print('------------------------UNION-------------------------')
set1 = {'Faizan', 'Tashif', 'Chetan'}
set2 = {'Faizan'}
union = set1 | set2
print(union)

difference = set1 - set2
print(difference)

print('------------------------Superset-------------------------')

#set is a superset of set2
mod = set1 > set2
print(mod)
# The > operator checks if set1 is a proper superset of set2.
# Means: "Does set1 contain all elements of set2, and is set1 bigger?"
# set1 = Faizan, Tashif, Chetan
# set2 = Faizan
# Since set1 has Faizan and more elements, this is True.

print('------------------------SUBSET-------------------------')
#set is a subset of set2
# The < operator checks if set1 is a proper subset of set2.
# Means: "Are all elements of set1 inside set2, and is set1 smaller?"
# set1 = Faizan, Tashif, Chetan
# set2 = Faizan
# No — because set1 has more elements than set2, so False.

mod2 = set1 < set2
print(mod2)

print('------------------------Update & Discard Method-------------------------')


fruits = {"apple", "banana"}
more_fruits = ["cherry", "banana", "mango"]
fruits.update(more_fruits)
print(fruits)
# Output: {'apple', 'banana', 'cherry', 'mango'}

fruits = {"apple", "banana", "cherry"}
fruits.discard("banana")
print(fruits)
# Output: {'apple', 'cherry'}

fruits.discard("mango")  # No error even though "mango" isn't present

