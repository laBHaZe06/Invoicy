import smtplib
from email.message import EmailMessage
import os

def send_email(to, subject, content):
    msg = EmailMessage()
    msg["From"] = os.getenv("EMAIL_FROM")
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(content)

    with smtplib.SMTP_SSL(os.getenv("SMTP_SERVER"), 465) as smtp:
        smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))
        smtp.send_message(msg)
