import random
def roll_dice():
    dice1=random.randint(1,6)
    dice2=random.randint(1,6)   
    print("You rolled a {} and {}".format(dice1,dice2))
roll_dice()    