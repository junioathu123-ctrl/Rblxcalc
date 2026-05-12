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

  // troca vírgula por ponto
  texto = texto.replace(",", ".");

  // pega número
  const match = texto.match(/[\d.]+/);

  if (!match) {
    return msg.reply("Use: `$c 500` ou `$c 20 reais`");
  }

  const numero = parseFloat(match[0]);

  let resposta;

  // =========================
  // DINHEIRO -> ROBUX
  // =========================
  if (texto.includes("real") || texto.includes("r$")) {

    const robux = numero / precoPorRobux;

    // cobrindo taxa do Roblox
    const robuxComTaxa = robux / 0.7;

    resposta =
`__***<:Dinheiros:1503157410372649030> R$${numero.toFixed(2).replace(".", ",")} = <:Bobux:1503157441859293305> ${Math.floor(robux)} Robux***__

__***<:hm:1503185736185155615> Com taxa (só se for enviar pelo pls donate) = <:Bobux:1503157441859293305> ${Math.floor(robuxComTaxa)} Robux***__`;

  } 
  
  // =========================
  // ROBUX -> DINHEIRO
  // =========================
  else {

    const reais = numero * precoPorRobux;

    // cobrindo taxa
    const reaisComTaxa = (numero / 0.7) * precoPorRobux;

    resposta =
`__***<:Bobux:1503157441859293305> ${numero} Robux = R$${reais.toFixed(2).replace(".", ",")}***__

__***<:hm:1503185736185155615> Com taxa (só se for enviar pelo pls donate) = R$${reaisComTaxa.toFixed(2).replace(".", ",")}***__`;

  }

  const embed = new EmbedBuilder()
    .setColor("#FFD700") // amarelo forte
    .setTitle("<a:IMG_9014:1503600361858924625> Calculadora de Robux")
    .setDescription(resposta)
    .setFooter({
      text: "Sistema de conversão"
    })
    .setTimestamp();

  msg.reply({
    embeds: [embed]
  });
});

client.login(process.env.TOKEN);
