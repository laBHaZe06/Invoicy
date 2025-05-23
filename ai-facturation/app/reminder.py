from db import get_connection
from mailer import send_email
from jinja2 import Template

def load_template():
    with open("templates/reminder_email.txt") as f:
        return Template(f.read())

def find_overdue_invoices():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT i.id, i.due_date, c.email, u.first_name
        FROM invoice i
        JOIN clients c ON i.client_id = c.id
        JOIN user u ON c.user_id = u.id
        WHERE i.paid = 0 AND i.due_date < NOW()
    """)
    return cursor.fetchall()

def process_reminders():
    template = load_template()
    overdue = find_overdue_invoices()

    for invoice in overdue:
        email = template.render(
            name=invoice["first_name"],
            due_date=invoice["due_date"]
        )
        send_email(invoice["email"], "Rappel de paiement", email)
