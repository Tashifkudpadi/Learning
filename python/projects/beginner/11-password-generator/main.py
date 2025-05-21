# Ask the user to generate a password or not
# If the user chooses to generate a password, ask for the length of the password
# Generate a password of the specified length
# Print the generated password
# If the user chooses not to generate a password, print a message saying that no password was generated

import random
import string


def generate_password():
    # Ask the user to generate a password or not
    generate = input("Do you want to generate a password? (yes/no): ")
    if generate.lower() == 'yes':
        # Ask for the length of the password
        length = int(input(' Enter the length of the password: '))
        # Generate a password of the specified length
        password = ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for i in range(length))
        # Print the generated password
        print('Generated password: ', password)
    else:
        # If the user chooses not to generate a password, print a message saying that no password was
        # generated
        print('No password was generated.')
        return
# generate_password()      

# or 
characters=list(string.ascii_letters + string.digits + string.punctuation) 
def generate_password2():
    password_length = int(input("password length?: "))
    random.shuffle(characters)
    password=[]

    for x in range(password_length):
        password.append(random.choice(characters))
     
    random.shuffle(password)    

    password="".join(password)
    print(password)
 
option=input('Do u want to generate the password?')        

if option.lower()=='yes':
    generate_password2()
elif option == "no":
    print('No password was generated.')
    quit()
else:
    print('Invalid option')