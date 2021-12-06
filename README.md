# Mon application météo

## installation
Créé un env.js à la racine du dossier avec une variable apiKey qui aura en valeur la votre clef API de https://openweathermap.org, et exporter cette variable.

Pour que cette exportable et requise dans un autre fichier nous avons besoin d'utiliser un bundle(browserify). Lancez dans votre terminal la commande "browserify -e app.js -o dist/bundle.js".

Une fois ces manipulations effectuées vous pouvez utiliser cette application en local.
____