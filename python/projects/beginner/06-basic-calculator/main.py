#define the functions needed: add, sub, mul, div
#print options to the user
#ask for values     
#call the functions
#while lop to continue the program until user want to exit
def add(a, b):
    answer= a + b
    print(str(a) + " + " + str(b) + " = " + str(answer))
def sub(a, b):
    answer= a - b
    print(str(a) + " - " + str(b) + " = " + str(answer))
def mul(a, b):
    answer= a * b
    print(str(a) + " * " + str(b) + " = " + str(answer))
def div(a, b):
    answer= a / b
    print(str(a) + " / " + str(b) + " = " + str(answer))


while True:
    print("1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")
    print("5. Exit")
    user_input=input("Enter your choice: ")
    if user_input == "5":
        break
    elif user_input == "1":
        num1 = float(input("Enter the first number: "))
        num2 = float(input("Enter the second number: "))
        add(num1, num2)
    elif user_input == "2":
        num1 = float(input("Enter the first number: "))
        num2 = float(input("Enter the second number: "))
        sub(num1, num2)
    elif user_input == "3":
        num1 = float(input("Enter the first number: "))
        num2 = float(input("Enter the second number: "))
        mul(num1, num2)
    elif user_input == "4":
        num1 = float(input("Enter the first number: "))
        num2 = float(input("Enter the second number: "))
        div(num1, num2)
    else:
        print("Invalid choice. Please choose a valid option.")
        # call the main function
        
        

        
       
       
