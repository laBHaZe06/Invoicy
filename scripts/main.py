def calculer_total_facture(lignes, tva):
    total_ht = sum(ligne['quantite'] * ligne['prix_unitaire'] for ligne in lignes)
    total_tva = total_ht * (tva / 100)
    total_ttc = total_ht + total_tva
    return {
        'total_ht': round(total_ht, 2),
        'total_tva': round(total_tva, 2),
        'total_ttc': round(total_ttc, 2),
    }

def main():
    lignes_facture = [
        {'description': 'Service de développement web', 'quantite': 10, 'prix_unitaire': 80},
        {'description': 'Design graphique', 'quantite': 5, 'prix_unitaire': 50},
    ]
    tva = 20

    resultat = calculer_total_facture(lignes_facture, tva)
    print(resultat)

if __name__ == '__main__':
    main()
    
