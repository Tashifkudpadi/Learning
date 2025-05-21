def main():
    print('Welcome to email slicer')
    print('')

    input_user=input('Enter your mail address: ')
    (username,domain)=input_user.split('@')
    (domain,extention)=domain.split('.')
    print("username",username)
    print("domain",domain)
    print("extention",extention)
main()    
    
# hello@codewithtomi.com
# username: hello
# domain: codewithtomi
# extention: com
