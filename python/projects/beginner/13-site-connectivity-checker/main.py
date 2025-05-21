import urllib.request as urllib

def main(url):
    response=urllib.urlopen(url)
    print(' Connected to',url, 'successfully')
    print(' The response code is',response.getcode()) #it give the status code of the request

input_url=input('Enter the url')
main(input_url)