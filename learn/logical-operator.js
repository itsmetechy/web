var armory = {

	addSword : function(sword) {
		this.swords = this.swords ? this.swords : [];
		this.swords.push(sword);
		console.log(this.swords);

	}
};

armory.addSword('knife');
armory.addSword('scissor');