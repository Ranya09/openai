import { Configuration, OpenAIApi } from "openai";

/*
  1 - Configurer OpenAI avec une clé API (https://platform.openai.com/account/api-keys)
  2 - Définir un prompt 
  3 - Faire le choix du modèle 
  4 - Définir les paramètres de génération de contenu
  5 - Définir la requête API
*/

// 1. Configurer OpenAI avec une clé API
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

// Vérifier si la clé API est présente
if (!configuration.apiKey) {
  res.status(500).json({ error: 'Clé API OpenAI manquante, veuillez suivre les instructions : (https://platform.openai.com/account/api-keys)' });
  return;
}

// 2. Initialiser l'objet OpenAIApi avec la configuration
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  // Vérifier si l'entrée (input) est présente dans la requête
  if (!req.body.input) {
    res.status(400).json({ error: "Entrée manquante" });
    return;
  }

  try {
    // 3 à 5. Définir le modèle, le prompt et les paramètres, puis effectuer la requête API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Q: ${req.body.input} \nA:`,
      temperature: 0,  // Vérifiez la syntaxe de la température (temperature)
      max_tokens: 200
    });

    // Utilisez la réponse comme nécessaire
    res.status(200).json({ result: response.data.choices[0].text });
  } catch (e) {
       console.log(e.message )
    res.status(500).json({ error: e.message });
    
  }
}
