import socket

# Créer un socket pour écouter sur le port 5000
host = '0.0.0.0'
port = 5000

# Créer un objet socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Lier le socket à l'adresse et au port
server_socket.bind((host, port))

# Commencer à écouter les connexions
server_socket.listen(1)
print(f"Le serveur écoute sur {host}:{port}...")

while True:
    # Accepter les connexions
    client_socket, client_address = server_socket.accept()
    print(f"Connexion de {client_address}")

    # Envoyer un message "Hello, World!" au client
    message = "Hello, World!\n"
    client_socket.sendall(message.encode('utf-8'))

    # Fermer la connexion avec le client
    client_socket.close()