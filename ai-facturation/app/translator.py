def get_template_path(lang, tone):
    return f"templates/reminder_{tone}_{lang}.txt"

def get_language_from_country(country_code):
    mapping = {
        "FR": "fr",
        "US": "en",
        "DE": "de",
        # ...
    }
    return mapping.get(country_code, "en")
