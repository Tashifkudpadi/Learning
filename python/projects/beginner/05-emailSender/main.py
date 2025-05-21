from email.message import EmailMessage
import os
import ssl
import smtplib  
from dotenv import load_dotenv
load_dotenv() # Load environment variables from .env

email_sender='Enter your email'
email_password=os.getenv('password') # get password from environment variable .env file

email_receiver="sedewi3469@daupload.com" #https://temp-mail.org/en get random mail id from here
subject="Don't forget to take your medication"

body="""
Please take your medication at the scheduled time.
"""
em=EmailMessage()      
em['From']=email_sender
em['To']=email_receiver
em['subject']=subject
em.set_content(body)

context=ssl.create_default_context()
with smtplib.SMTP_SSL('smtp.gmail.com',465,context=context) as smtp:
    smtp.login(email_sender,email_password)
    smtp.sendmail(email_sender,email_receiver,em.as_string())