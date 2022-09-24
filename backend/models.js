const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	scryfall_id: { type: String, required: true },
	name: { type: String, required: true },
	count: { type: Number, required: true },
	image_uris: {type: Object}
});

const scryfallCardSchema = new mongoose.Schema({
	id:{type: String, required: true},
	name:{type: String, required: true},
	scryfall_uri: {type: String},
	image_uris: {type: Object}
})

const Card = mongoose.model("greg_cards", cardSchema);
const ScryfallCard = mongoose.model("oracle_cards", scryfallCardSchema);

const models = {
	Card,
	ScryfallCard
};

module.exports = models; 
