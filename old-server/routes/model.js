const db = require("./data/dbConfig");

module.exports = function(nameOfDatabase) {
	
	return {
		find,
		findById,
		add
	};

	function find() {
		return db(nameOfDatabase);
	}

	function findById(id) {
		return db(nameOfDatabase).where({id}).first();
	}

	function add(json) {
		return db(nameOfDatabase)
			.insert(json, "id")
			.then(([id]) => id);
	}
}
