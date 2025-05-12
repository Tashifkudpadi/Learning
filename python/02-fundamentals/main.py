# Functions
print("-----------------------Functions----------------------------")


def greeting(name, age=12):
      print('Hi', name, "your age is", str(age))


greeting('Jonas', 25)
greeting('Schmen', 35)
greeting('Kinsi')  #default age is 12


#immutable, bcz the int is immutable
def change(value):
      value = 2


val = 1
change(val)
print(val)


#mutable, bcz the dictionary is mutable
def change2(value):
      value['name'] = 'Tariz'


val = {'name': 'Jonas'}
change2(val)
print(val)  #{'name': 'Tariz'}


#funtion with return value
def sum(a, b):
      if a == -1:
            return
      return a + b


print(sum(1, 2))  # Output: 3
print(sum(-1, 2))  # Output: None

print("-----------------------Variable Scoping------------------------")
age = 8


def get_age():
      age = 20
      print(age)


print(age)
get_age()

print("-----------------------Nested functions------------------------")


def talk(phrase):

      def say(word):
            print(word)

      words = phrase.split(' ')
      for word in words:
            say(word)


talk('hello, how are you?')

print("-----------------------Closures------------------------")

# def counter():
#       count = 0

#       def increment():
#             nonlocal count
#             count = count + 1
#             print(count)

#       increment()

# counter()


#example 2
def counter2():
      count = 0

      def increment():
            nonlocal count
            count = count + 1
            return count

      return increment


incrementVal = counter2()
print(incrementVal())  #1
print(incrementVal())  #2
print(incrementVal())  #3

print("-----------------------Objects------------------------")
# What is an object in Python?
# In Python, everything is an object.
# An object is something that holds data (value) and behavior (functions/methods).

# For example:
# A number like 5 → is an object of type int.
# A text like 'hello' → is an object of type str.
# A list like [1, 2, 3] → is an object of type list.

# Every object has:
# Attributes → (data/values it stores)
# Methods → (functions it can perform)

# some built in objects
age = 8
print(age.real)
print(age.imag)
print(age.bit_length())

print(age.__add__(2))
print(age.__class__())
print(age.__sub__(2))
print(age.__mul__(2))
print(age.__truediv__(2))
print(age.conjugate())
print(age.denominator)

print(age.numerator)
print(age.__abs__())

print("-----------------------Loops------------------------")
#while loop
condition = True
while condition == True:
      print("Condition is True")
      condition = False

# or

count = 0
while count < 10:
      count += 1
      print(count, "Condition is True")
      if count == 5:
            break

#for loop
items = [1, 2, 3, 4, 5]
for item in items:
      print(item)

# or
print('using range function')
for item in range(5):
      print("using range func",item)

#with index
#example 1
items = ["ram", 2, 3, "", 5, [2, 3]]
for index, item in enumerate(items):
      print(index, item)

#example 2
for index, item in enumerate(items):
      print(index, item)

      # Check if the item is a list
      if isinstance(item, list):
            for index2, item2 in enumerate(item):
                  print(f"  {index}.{index2} {item2}")

print('-----------------------Break & Continues-------------------')
items = [1, 2, 3, 4, 5]
for item in items:
      if item == 3:  #skip 3
            continue
      print(item)

print('break')
for item in items:
      if item == 3:
            break
      print(item)

print('--------------------------------Classes----------------------------')


class Dog:
      #constructor
      def __init__(self, name, age):
            self.name = name
            self.age = age


# methods

      def bark(self):
            print('woof!')

roger = Dog('Roger', 8)
print(type(roger))  # class
print(roger.name)  #Roger
print(roger.age)  #8

roger.bark()


# one important of feature of class is inheritance
class Animal():

      def walk(self):
            print('walking...')


class Dog(Animal):
      #constructor
      def __init__(self, name, age):
            self.name = name
            self.age = age


# methods

      def bark(self):
            print('woof!')

print('----------inheritance n classes-----------')
roger = Dog('Roger', 8)
roger.bark()
roger.walk()  #this will inhherit the walk function

print('-------------------------Modules--------------------------------')
#This will import all from the file
#test is a file name
import test  #this should be in top of the file

test.bark()

#This will import only bark
from test import bark

bark()

#This will import all from sub folder
from lib import dog

dog.bark()

#This will import only bark from sub folder
from lib.dog import bark

bark()

# More  standard modules
#math for math utilities
import math
# or
# from math import sqrt

print(math.sqrt(4))  #2.0
#re for regular expressions
#json for working with json data
#datetime for working with dates
#sqlite3 for working with sqlite databases
#os for working with the operating system
#random for generating random numbers
#statistics for working with statistics utilities
#requests to perform http network requests
#http to create http servers
#urllib to manage urls

print('-----------------------Arguments from command line-------------------')
# import sys

# name=sys.argv[1]
# print("Hello",name) #We should write the arguments when we run the file python3 main.py jonas 22.

# import argparse

# parser=argparse.ArgumentParser(
#     description='This program prints the name of my friend'
# )

# parser.add_argument('-c','--color', metavar='color', required=True, choices={'red','yellow'}, help='the color to search for')
# args=parser.parse_args()
# print(args.color) #python3 main.py -c red run the file like this

print('-----------------lambda functions-----------------------------')
# also called as anonymous function which a function does not have a name also use to pass the func as a argument

lambda num: num * 2

multiply = lambda a, b: a * b
print(multiply(2, 4))

print('----------------map(),filter(),reduce()-------------------')
numbers = [2, 4, 6]

# def double(a):
#     return a * 2
# or
double = lambda a: a * 2

result = map(double, numbers)
# or
# result=map(lambda a:a*2, numbers)
print(list(result))

# filter
numbers = [1, 2, 3, 4, 5, 6]


def isEven(n):
      return n % 2 == 0


# result= filter(isEven,numbers)
# or
result = filter(lambda n: n % 2 == 0, numbers)
print(list(result))


def isOdd(n):
      return n % 2 != 0


result = filter(isOdd, numbers)
print(list(result))

# reduce
expenses = [('Dinner', 80), ('Car repair', 120)]

sum = 0
for expense in expenses:
      sum += expense[1]

print(sum)

from functools import reduce  #we should import this in python

expenses = [('Dinner', 80), ('Car repair', 120)]

# Define a normal function
# def add_expense(total, expense):
# return total + expense[1]

# # Use reduce with the function
# total = reduce(add_expense, expenses, 0)
# or
total = reduce(lambda acc, item: acc + item[1], expenses, 0)
print(total)

print('---------------------Recursion----------------------')

# [
#not a python code
2 != 2 * 1
3 != 3 * 2 * 1
4 != 4 * 3 * 2 * 1
# ]

#Below code will do the same as above


def factorial(n):
      if n == 1: return 1
      return n * factorial(n - 1)


print(factorial(2))
print(factorial(3))
print(factorial(4))

print('-----------------------Decorators----------------------')

# A decorator is a function that takes another function and extends the behavior of the latter function without explicitly modifying it.
# or
# A decorator is a function that takes another function as a parameter wraps the function in an inner function that performs thhee job has to do  and returns that inner function.


# this is helpful when we want to add some functionality to the function without changing the function itself.
# and also add logging, authentication, caching,verify peeermissions etc.
def logtime(func):

      def wrapper():
            #do something before
            print('Before')
            val = func()
            #do something after
            print('After')
            return val

      return wrapper


@logtime
def hello():
      print('helo')


hello()

print('-----------------------Docstrings----------------------')
# """Docstring is written in 3 quots"""

# class Dog:
#       """A class representing a dog"""
#       def __init__(self,name,age):
#             """Initialize a new dog"""
#             self.name=name,
#             self.age=age
#       def bark(self):
#             """Let the dog bark"""
#             print('Wooof!')

# print(help(Dog))

print('-----------------------Annotations----------------------')

#python will not enforce these annotations, it is just for the developers to understand the code better. the separate tool is required to enforce these annotations. which is called as mypy


# function without annotations
def increment(n):
      return n + 1


# function with annotations
def decrement(
    n: int
) -> int:  #we have specify that this function receives a int and return a int
      return n + 1


# varaible with annotations
count: int = 0

print('-----------------------Exceptions----------------------')
#To handle different tyrpes of error we use exceptions
# try:
#       #some lines of code
#       except <Error1>:
#             #handler <Error1>
#       except <Error2>:
#             #handler <Error2>
# finally:
#some lines of code
#this will execute no matter what

# Example 1 below will give an error
try:
      result = 2 / 0
except ZeroDivisionError:
      print('Cannot divide by zero')
finally:
      result = 1
print(result)

# # we can also raise an exception
# raise Exception('An error!')

#ex 2:


class DogNotFoundException(Exception):
      print('inside')
      pass


try:
      raise DogNotFoundException()
except DogNotFoundException:
      print('Dog not found')

print('------------File reading-----------------')
# filename='./test.py' #here it is showing no file found idk why

# try:
#       file=open(filename,'r')
#       content=file.read()
#       print(content)
# finally:
#       file.close()

# or
# with open(filename,'r') as file:
#       content=file.read()
#       print(content)

print('--------------------List Compressions-----------------')
numbers = [1, 2, 3, 4, 5]
numbers_power_2 = [n**2 for n in numbers]  #list compresison syntax
print(numbers_power_2)

# using for loop
numbers_power_3 = []
for n in numbers:
      numbers_power_3.append(n**3)

print(numbers_power_3)

#using map
numbers_power_4 = list(map(lambda n: n * 4, numbers))
print(numbers_power_4)

print('----------------Polymorphism--------------------')


class Dog:

      def eat():
            print('Eating dog food')


class Cat:

      def eat():
            print('Eating cat food')


animal1 = Dog
animal2 = Cat

animal1.eat()
animal2.eat()

print('----------------Operator Overloading--------------------')
#Operator Overloading is a advanced technique that allows us to make classes comparable and make theem to work with python operators like +,-,*,/,etc.

class Dog:

      def __init__(self, name, age):
            self.name = name
            self.age = age

      def __gt__(self, other): #greater than
            return True if self.age > other.age else False


roger = Dog('Roger', 8)
Syd = Dog('Syd', 7)
print(roger > Syd)
