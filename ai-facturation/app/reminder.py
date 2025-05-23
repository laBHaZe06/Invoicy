from ml_model import predict_client_risk
from translator import get_language_from_country, get_template_path
from jinja2 import Template
from mailer import send_email
from db import get_connection

def generate_features(client):
    return {
        "nb_invoices": client["nb_invoices"],
        "avg_late_days": client["avg_late_days"],
        "on_time_ratio": client["on_time_ratio"],
        "country_code": client["country_code"]
    }

def process_reminders():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.id, c.email, u.first_name, c.country_code, 
               COUNT(i.id) as nb_invoices,
               AVG(DATEDIFF(i.paid_date, i.due_date)) as avg_late_days,
               SUM(i.paid_on_time)/COUNT(i.id) as on_time_ratio,
               i.due_date
        FROM clients c
        JOIN user u ON c.user_id = u.id
        JOIN invoice i ON i.client_id = c.id
        WHERE i.paid = 0 AND i.due_date < NOW()
        GROUP BY c.id
    """)
    results = cursor.fetchall()

    for client in results:
        features = generate_features(client)
        is_risky = predict_client_risk(features)
        tone = "strict" if is_risky else "friendly"
        lang = get_language_from_country(client["country_code"])
        template_path = get_template_path(lang, tone)

        with open(template_path) as f:
            template = Template(f.read())

        content = template.render(
            name=client["first_name"],
            due_date=client["due_date"]
        )

        send_email(client["email"], "Rappel de paiement", content)
