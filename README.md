# openai-chatbot

## Overview
This project aims to develop an advanced chatbot solution capable of engaging users through text, image generation, and voice recognition. It is designed with an intuitive user interface for natural and multimodal interaction.

## Features

### Text Response
The chatbot understands and provides relevant responses to user text queries, facilitating an interactive assistance experience.

### Image Generation
By utilizing large-scale language models, the chatbot is adept at creating images based on user-provided textual descriptions, adding a visual dimension to the interaction.

### Voice Recognition
With the integration of voice recognition capabilities, the chatbot can comprehend and act on spoken commands, making user interactions more accessible and fluid.

## Technologies and Models
At the heart of our chatbot lies the utilization of large-scale language models like Mistral from Hugging Face. The architecture also supports integration with other models such as ChatGPT, offering versatility to meet project-specific requirements or preferences in language processing techniques.

## Préparation de l’Environnement

## Étapes pour établir l’environnement de développement :
1. **Installation de l’Éditeur de Code** :
   - Utiliser [Visual Studio Code](https://code.visualstudio.com/Download) pour son confort et ses nombreuses extensions.

2. **Extraction et Ouverture du Projet** :
   - Extraire le contenu du projet reçu par email.
   - Ouvrir le projet dans Visual Studio Code pour accéder et modifier le code source.

3. **Lancement des Services avec Docker** :
   - Utiliser la commande suivante pour initier les services définis dans `docker-compose.yml` :
     ```bash
     docker-compose up
     ```
   - En cas de problème de connexion avec Docker :
     ```bash
     systemctl --user stop docker.service
     docker-rootless-init.sh
     ```

4. **Configuration de Visual Studio Code** :
   - Installer les extensions spécifiques pour **Docker** et **Angular** afin d’enrichir l’éditeur avec des outils adaptés au projet.

5. **Initialisation de l’Application** :
   - Exécuter les commandes suivantes dans le terminal intégré à Visual Studio Code :
     ```bash
     npm install   # Télécharge les dépendances du projet
     ng serve       # Lance le serveur de développement Angular
     ```
   - En cas de difficultés d'accès à [http://localhost:4200](http://localhost:4200), utiliser la commande alternative :
     ```bash
     ./serve.sh
     ```

Ces étapes garantissent une base solide pour le développement et le test efficace de l'application ChatBot.




- **Text:** Enter your query or comment into the chat interface to receive a text-based response.
- **Images:** Provide a detailed description of the image you envision to prompt the chatbot to generate a corresponding visual.
- **Audio:** Enable voice recognition to submit your queries directly through spoken commands.

Designed for ease of use, this chatbot solution ensures that users of all technological backgrounds can quickly become proficient in its operation.


## Création de l’Assistant

La phase de développement de l’assistant numérique a été axée sur l’intégration et la personnalisation de fonctionnalités avancées pour améliorer les interactions utilisateurs avec le ChatBot.

### Fonctionnalités Implémentées :
1. **Envoi du Texte aux Modèles de Langage** :
   - Le ChatBot est conçu pour traiter les entrées textuelles et générer des réponses cohérentes à l’aide de modèles de langage de pointe.
   - Les utilisateurs peuvent diriger leurs requêtes vers l’un des services suivants :
     - **ChatGPT** : Offre des réponses diversifiées et engageantes adaptées à un large éventail de sujets.
     - **Llama** via HuggingFace ([Lien vers le modèle](https://huggingface.co/meta-llama/Llama-2-7b)) : Connu pour ses capacités étendues en matière de connaissances et d’interaction.
     - **Mistral** via HuggingFace ([Lien vers le modèle](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2)) : Spécialisé dans la fourniture d’instructions claires et concises.

### Avantages de l’Intégration :
- Cette flexibilité permet au ChatBot de répondre efficacement à une grande variété de demandes, rendant les interactions plus riches, engageantes et informatives.
## Extension des Fonctionnalités de l’Assistant

Pour enrichir l’interaction utilisateur, l’assistant a été étendu avec des commandes spécifiques : **"dessine-moi"** et **"dis-moi"**.

### Fonctionnalités Ajoutées :
1. **Génération d’Images** :
   - Commande : *"dessine-moi [description]"*
   - Utilise le modèle **StableDiffusion XL** via HuggingFace ([lien vers le modèle](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)).
   - Génère une image correspondant à la description fournie, affichée directement dans la conversation.

2. **Réponses Textuelles** :
   - Commande : *"dis-moi [requête]"*
   - Utilise des modèles de langage avancés comme **Llama** ou **Mistral** pour fournir des réponses informatives ou instructives.
   - La sélection du modèle dépend du choix de l’utilisateur ou de la configuration par défaut.

### Impact des Extensions :
- Transforme le ChatBot en un assistant dynamique et interactif.
- Démonstre la puissance et la flexibilité des modèles actuels pour répondre aux besoins créatifs et informatifs des utilisateurs.



