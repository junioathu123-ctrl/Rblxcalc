const { 
  Client, 
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// BASE
const precoBase = 6.00;
const robuxBase = 149;
const precoPorRobux = precoBase / robuxBase;

client.on('messageCreate', async (msg) => {
  if (!msg.content.startsWith("$c")) return;

  let texto = msg.content.toLowerCase();

  // normaliza entrada
  texto = texto
    .replace(",", ".")
    .replace("r$", "")
    .trim();

  // pega número corretamente
  const match = texto.match(/\d+(\.\d+)?/);

  if (!match) {
    return msg.reply("Use: `$c 500` ou `$c 20 reais`");
  }

  const numero = parseFloat(match[0]);

  const isReais = /(real|reais|r\$)/.test(texto);

  let resposta;

  // =========================
  // DINHEIRO -> ROBUX
  // =========================
  if (isReais) {

    const robux = numero / precoPorRobux;
    const robuxComTaxa = robux / 0.7;

    resposta =
`<:Dinheiros:1503157410372649030> __***R$${numero.toFixed(2).replace(".", ",")} = <:Bobux:1503157441859293305> ${Math.floor(robux)} Robux***__

<:hm:1503185736185155615> __***Com taxa (pls donate) = <:Bobux:1503157441859293305> ${Math.floor(robuxComTaxa)} Robux***__`;

  } 
  // =========================
  // ROBUX -> DINHEIRO
  // =========================
  else {

    const reais = numero * precoPorRobux;
    const reaisComTaxa = (numero / 0.7) * precoPorRobux;

    resposta =
`<:Bobux:1503157441859293305> __***${numero} Robux = <:Dinheiros:1503157410372649030> R$${reais.toFixed(2).replace(".", ",")}***__

<:hm:1503157410372649030> __***Com taxa (pls donate) = R$${reaisComTaxa.toFixed(2).replace(".", ",")}***__`;
  }

  const embed = new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("<a:IMG_9014:1503600361858924625> Calculadora de Robux")
    .setDescription(resposta)
    .setFooter({ text: "Sistema de conversão" })
    .setTimestamp();

  msg.reply({ embeds: [embed] });
});

client.login(process.env.TOKEN);
