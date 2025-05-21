# def main():
#     print('This is a curency converter')
#     print(' ')

#     dollars=eval(input('Enter the amount of dollars you want to convert: '))
#     pounds=convert_to_pounds(dollars)
    
#     print('This is', pounds, 'in pounds')

# convert_to_pounds=lambda dollars: dollars*0.82
# main()

# why convert_to_pounds is called before it is defined 
# In Python, code is executed line by line from top to bottom — but function definitions are not executed until they are called. So when you run the script:
# Python reads the function main() and stores it.
# Then it reads the line:
# convert_to_pounds = lambda dollars: dollars * 0.82
# and now convert_to_pounds refers to a function.
# Then you call main() — and inside main(), the function convert_to_pounds() is used.
# At that point, convert_to_pounds is already defined.
# So as long as the function is defined before it is called during execution, it works — regardless of where it appears in the file.

# or 

convert_to_pounds = lambda dollars: dollars * 0.82

def main():
    dollars = float(input("Amount: "))
    print(convert_to_pounds(dollars))

main()
