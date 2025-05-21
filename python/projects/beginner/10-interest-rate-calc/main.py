#collect the neccessary inputs: principal amt, apr, years
#calc the monthly payment
# show the result to the user

def main():
    print(' This is the monthly payment loan calculator ')
    print(" ")
    principal = float(input('Enter the principal amount: $'))
    apr = float(input('Enter the APR: '))
    years = int(input('Enter the number of years: '))   
    
    monthly_interest_rate= apr/1200
    amt_of_months= years * 12
    monthly_payment = principal * monthly_interest_rate / (1- (1 + monthly_interest_rate) ** (-amt_of_months))

    print('The monthly payment is: $', round(monthly_payment,2))
    # or 
    print('The monthly payment is: $ %.2f' % monthly_payment)

    
main()

# explainatiun

# Great question — let’s break down why we divide the APR by 1200 very clearly:

# 👇 Let’s say:
# APR = 6 → means 6% annually

# You want the monthly interest rate in decimal form

# 🔢 Step-by-step conversion:
# 1. Convert percentage to decimal
# 6% → divide by 100 → 0.06

# 2. Convert annual rate to monthly
# Annual rate = 0.06
# Monthly rate = 0.06 / 12 = 0.005

# ✅ One-step version:
# To go directly from APR as a percentage to monthly decimal rate:

# monthly_rate
# =
# 𝐴
# 𝑃
# 𝑅
# 12
# ×
# 100
# =
# 𝐴
# 𝑃
# 𝑅
# 1200
# monthly_rate= 
# 12×100
# APR
# ​
#  = 
# 1200
# APR
# ​
 
# 💡 Example:
# If user inputs: APR = 6
# Then:

# python
# Copy
# Edit
# monthly_interest_rate = 6 / 1200  # = 0.005 = 0.5% per month
# So, dividing by 1200 is just a shortcut for:

# "Convert percentage to decimal (÷100), then divide by 12 to get the monthly rate."