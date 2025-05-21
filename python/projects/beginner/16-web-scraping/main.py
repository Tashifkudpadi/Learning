# pip install bs4
# pip install requests

import requests
from bs4 import BeautifulSoup

url = "http://codewithtomi.com"
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Extract quotes
quotes = soup.find_all('h2', class_='post-title')

for quote in quotes:
    print(quote.text)
