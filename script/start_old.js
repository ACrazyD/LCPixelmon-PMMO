const fs = require("fs");
var validSkills = [ "mining", "building", "excavation", "woodcutting", "farming", "agility", "endurance", "combat", "archery", "smithing", "flying", "swimming", "fishing", "crafting", "magic", "slayer", "hunter", "taming", "cooking", "alchemy" ];
const validKeys = [ "skills", "req_wear", "req_tool", "req_weapon", "req_use", "req_place", "req_break", "req_craft", "req_biome", "req_kill", "xp_value_general", "xp_value_break", "xp_value_craft", "xp_value_place", "xp_value_breed", "xp_value_tame", "xp_value_kill", "xp_value_smelt", "xp_value_cook", "xp_value_trigger", "xp_value_brew", "xp_value_grow", "info_ore", "info_log", "info_plant", "info_smelt", "info_cook", "info_brew", "biome_effect_negative", "biome_effect_positive", "biome_mob_multiplier", "xp_bonus_biome", "xp_bonus_held", "xp_bonus_worn", "xp_bonus_dimension", "xp_multiplier_dimension", "fish_pool", "fish_enchant_pool", "mob_rare_drop", "level_up_command", "player_specific", "block_specific", "item_specific", "vein_blacklist" ];
const validKeys2 = [ "salvage", "treasure", "req_use_enchantment" ];
const validInfo = [ "extraChance" ];
const validSkillsInfo = [ "color" ];
const validSalvage = [ "salvageMax", "baseChance", "chancePerLevel", "maxChance", "xpPerItem", "levelReq" ];
const validBiomeMobMultiplier = [ "speedBonus", "damageBonus", "hpBonus" ];
const validFishPool = [ "startWeight", "startLevel", "endWeight", "endLevel", "enchantLevelReq", "xp", "minCount", "maxCount" ];
const validFishEnchantPool = [ "levelReq", "levelPerLevel", "chancePerLevel", "maxChance", "maxLevel" ];
const validTreasure = [ "startChance", "startLevel", "endChance", "endLevel", "xpPerItem", "minCount", "maxCount" ];
const validInfoKeys = [ "info_ore", "info_log", "info_plant", "info_smelt", "info_cook", "info_brew" ];
const validPlayerSpecific = [ "ignoreReq" ];
const validBlockSpecific = [ "growsUpwards" ];
const validItemSpecific = [ "meleeWeapon", "archeryWeapon", "magicWeapon", "autoValueOffsetWear", "autoValueOffsetWeapon", "autoValueOffsetTool" ];

const blacklistChars = [ ' ', ',', '/', '\\', '-' ];
const jsonConstructor = {}.constructor;

var corrupt = false;
if( !fs.existsSync( "./oldData/" ) )
	 fs.mkdirSync( "./oldData/" );
oldData = {};
oldData2 = {};
validKeys.forEach( key =>
{
	var path = `./oldData/${key}.json`;
	if( fs.existsSync( path ) )
	{
		try
		{
			oldData[ key ] = require( path );
		}
		catch( e )
		{
			console.log( `${path} is corrupted! Please fix, or remove the file before reattempting` );
			corrupt = true;
		}
	}
});
validKeys2.forEach( key =>
{
	var path = `./oldData/${key}.json`;
	if( fs.existsSync( path ) )
	{
		try
		{
			oldData2[ key ] = require( path );
		}
		catch( e )
		{
			console.log( `${path} is corrupted! Please fix, or remove the file before reattempting` );
			corrupt = true;
		}
	}
});
if( corrupt )
	return;
dupes = 0, dupes2 = 0;
if( !fs.existsSync( "./data/" ) )
	fs.mkdirSync( "./data/" );
data = {};
data2 = {};

//ONLY THESE COLORS WORK BELOW 1.15: 0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff
addData( "skills", "engineering", { "color": 0xffffff } );

//Examples
addData2( "req_use_enchantment", 	"some_mod:some_enchantment",	1,
{
	"magic": 5
});
addData2( "req_use_enchantment", 	"some_mod:some_enchantment",	2,
{
	"agility": 10
});
addData( "xp_value_place", 			"some_mod:some_block",								{ "magic": 5 } );
addData( "item_specific", 			"some_mod:gun",										{ "archeryWeapon": 1 } );
addData( "item_specific", 			"some_mod:sword",									{ "meleeWeapon": 1 } );
addData( "item_specific", 			"some_mod:staff",									{ "magicWeapon": 1 } );
addData( "item_specific", 			"minecraft:wooden_pickaxe",							{ "autoValueOffsetTool": -10 } );
addData( "item_specific", 			"minecraft:stone_pickaxe",							{ "autoValueOffsetTool": -10 } );

addData( "req_wear", "minecraft:elytra",												{ "agility": 40, "endurance": 20 } );										   
addData( "req_wear", "minecraft:netherite_helmet",										{ "endurance": 60 } );
addData( "req_wear", "minecraft:netherite_chestplate",									{ "endurance": 60 } );
addData( "req_wear", "minecraft:netherite_leggings",									{ "endurance": 60 } );
addData( "req_wear", "minecraft:netherite_boots",										{ "endurance": 60 } );
addData( "req_wear", "minecraft:diamond_helmet",										{ "endurance": 40 } );
addData( "req_wear", "minecraft:diamond_chestplate",									{ "endurance": 40 } );
addData( "req_wear", "minecraft:diamond_leggings",										{ "endurance": 40 } );
addData( "req_wear", "minecraft:diamond_boots",											{ "endurance": 40 } );
addData( "req_wear", "minecraft:iron_helmet",											{ "endurance": 30 } );
addData( "req_wear", "minecraft:iron_chestplate",										{ "endurance": 30 } );
addData( "req_wear", "minecraft:iron_leggings",											{ "endurance": 30 } );
addData( "req_wear", "minecraft:iron_boots",											{ "endurance": 30 } );
addData( "req_wear", "minecraft:chainmail_helmet",										{ "endurance": 20 } );
addData( "req_wear", "minecraft:chainmail_chestplate",									{ "endurance": 20 } );
addData( "req_wear", "minecraft:chainmail_leggings",									{ "endurance": 20 } );
addData( "req_wear", "minecraft:chainmail_boots",										{ "endurance": 20 } );
addData( "req_wear", "minecraft:golden_helmet",											{ "endurance": 10 } );
addData( "req_wear", "minecraft:golden_chestplate",										{ "endurance": 10 } );
addData( "req_wear", "minecraft:golden_leggings",										{ "endurance": 10 } );
addData( "req_wear", "minecraft:golden_boots",											{ "endurance": 10 } );
addData( "req_wear", "minecraft:leather_helmet",										{ "endurance": 5 } );
addData( "req_wear", "minecraft:leather_chestplate",									{ "endurance": 5 } );
addData( "req_wear", "minecraft:leather_leggings",										{ "endurance": 5 } );
addData( "req_wear", "minecraft:leather_boots",											{ "endurance": 5 } );
addData( "req_wear", "minecraft:turtle_helmet",											{ "endurance": 15, "swimming": 5 } );
addData( "req_tool", "minecraft:netherite_pickaxe",										{ "mining": 60 } );
addData( "req_tool", "minecraft:netherite_shovel",										{ "excavation": 60 } );
addData( "req_tool", "minecraft:netherite_axe",											{ "woodcutting": 60 } );
addData( "req_tool", "minecraft:netherite_hoe",											{ "farming": 40 } );
addData( "req_tool", "minecraft:diamond_pickaxe",										{ "mining": 40 } );
addData( "req_tool", "minecraft:diamond_shovel",										{ "excavation": 40 } );
addData( "req_tool", "minecraft:diamond_axe",											{ "woodcutting": 40 } );
addData( "req_tool", "minecraft:diamond_hoe",											{ "farming": 30 } );
addData( "req_tool", "minecraft:golden_pickaxe",										{ "mining": 30 } );
addData( "req_tool", "minecraft:golden_shovel",											{ "excavation": 30 } );
addData( "req_tool", "minecraft:golden_axe",											{ "woodcutting": 30 } );
addData( "req_tool", "minecraft:golden_hoe",											{ "farming": 50 } );
addData( "req_tool", "minecraft:iron_pickaxe",											{ "mining": 15 } );
addData( "req_tool", "minecraft:iron_shovel",											{ "excavation": 15 } );
addData( "req_tool", "minecraft:iron_axe",												{ "woodcutting": 15 } );
addData( "req_tool", "minecraft:iron_hoe",												{ "farming": 15 } );
addData( "req_tool", "minecraft:stone_pickaxe",											{ "mining": 3 } );
addData( "req_tool", "minecraft:stone_shovel",											{ "excavation": 3 } );
addData( "req_tool", "minecraft:stone_axe",												{ "woodcutting": 3 } );
addData( "req_tool", "minecraft:stone_hoe",												{ "farming": 3 } );
addData( "req_tool", "minecraft:wooden_pickaxe",										{ "mining": 1 } );
addData( "req_tool", "minecraft:wooden_shovel",											{ "excavation": 1 } );
addData( "req_tool", "minecraft:wooden_axe",											{ "woodcutting": 1 } );
addData( "req_tool", "minecraft:wooden_hoe",											{ "farming": 1 } );
addData( "req_weapon", "minecraft:netherite_pickaxe",									{ "combat": 60 } );
addData( "req_weapon", "minecraft:netherite_shovel",									{ "combat": 60 } );
addData( "req_weapon", "minecraft:netherite_axe",										{ "combat": 65 } );
addData( "req_weapon", "minecraft:netherite_sword",										{ "combat": 60 } );
addData( "req_weapon", "minecraft:diamond_pickaxe",										{ "combat": 40 } );
addData( "req_weapon", "minecraft:diamond_shovel",										{ "combat": 40 } );
addData( "req_weapon", "minecraft:diamond_axe",											{ "combat": 45 } );
addData( "req_weapon", "minecraft:diamond_sword",										{ "combat": 40 } );
addData( "req_weapon", "minecraft:golden_pickaxe",										{ "combat": 30 } );
addData( "req_weapon", "minecraft:golden_shovel",										{ "combat": 30 } );
addData( "req_weapon", "minecraft:golden_axe",											{ "combat": 35 } );
addData( "req_weapon", "minecraft:golden_sword",										{ "combat": 30 } );
addData( "req_weapon", "minecraft:iron_pickaxe",										{ "combat": 15 } );
addData( "req_weapon", "minecraft:iron_shovel",											{ "combat": 15 } );
addData( "req_weapon", "minecraft:iron_axe",											{ "combat": 15 } );
addData( "req_weapon", "minecraft:iron_sword",											{ "combat": 15 } );
addData( "req_weapon", "minecraft:stone_pickaxe",										{ "combat": 3 } );
addData( "req_weapon", "minecraft:stone_shovel",										{ "combat": 3 } );
addData( "req_weapon", "minecraft:stone_axe",											{ "combat": 3 } );
addData( "req_weapon", "minecraft:stone_sword",											{ "combat": 3 } );
addData( "req_weapon", "minecraft:wooden_pickaxe",										{ "combat": 1 } );
addData( "req_weapon", "minecraft:wooden_shovel",										{ "combat": 1 } );
addData( "req_weapon", "minecraft:wooden_axe",											{ "combat": 1 } );
addData( "req_weapon", "minecraft:wooden_sword",										{ "combat": 1 } );
addData( "req_use", "minecraft:firework_rocket",										{ "flying": 5 } );
addData( "req_use", "minecraft:stonecutter",											{ "building": 10 } );
addData( "req_craft", "minecraft:stonecutter",											{ "crafting": 10 } );
addData( "req_place", "minecraft:stonecutter",											{ "building": 10 } );
addData( "req_use", "minecraft:smoker",													{ "cooking": 10 } );
addData( "req_craft", "minecraft:smoker",												{ "crafting": 10 } );
addData( "req_place", "minecraft:smoker",												{ "building": 10 } );
addData( "req_use", "minecraft:blast_furnace",											{ "smithing": 10 } );
addData( "req_craft", "minecraft:blast_furnace",										{ "crafting": 10 } );
addData( "req_place", "minecraft:blast_furnace",										{ "building": 10 } );
addData( "req_use", "minecraft:enchanting_table",										{ "mining": 25 } );
addData( "req_place", "minecraft:enchanting_table",										{ "building": 25 } );
addData( "req_place", "minecraft:scaffolding",											{ "building": 10 } );
addData( "req_place", "minecraft:oak_sapling",											{ "farming": 5, "woodcutting": 10 } );
addData( "req_place", "minecraft:birch_sapling",										{ "farming": 10, "woodcutting": 15 } );
addData( "req_place", "minecraft:spruce_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "req_place", "minecraft:jungle_sapling",										{ "farming": 20, "woodcutting": 35 } );
addData( "req_place", "minecraft:dark_oak_sapling",										{ "farming": 10, "woodcutting": 25 } );
addData( "req_place", "minecraft:acacia_sapling",										{ "farming": 5, "woodcutting": 15 } );
addData( "xp_bonus_held", "minecraft:golden_pickaxe",									{ "mining": 50 } );
addData( "xp_bonus_held", "minecraft:golden_shovel",									{ "excavation": 50 } );
addData( "xp_bonus_held", "minecraft:golden_axe",										{ "woodcutting": 50, "combat": 50 } );
addData( "xp_bonus_held", "minecraft:golden_sword",										{ "combat": 50 } );
addData( "xp_bonus_held", "minecraft:golden_hoe",										{ "farming": 20 } );
addData( "xp_bonus_held", "minecraft:netherite_hoe",									{ "farming": 15 } );
addData( "xp_bonus_held", "minecraft:diamond_hoe",										{ "farming": 10 } );
addData( "xp_bonus_held", "minecraft:iron_hoe",											{ "farming": 5 } );
addData( "xp_bonus_held", "minecraft:stone_hoe",										{ "farming": 2.5 } );
addData( "xp_bonus_held", "minecraft:wooden_hoe",										{ "farming": 1 } );
addData( "xp_bonus_worn", "minecraft:golden_helmet",									{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:golden_chestplate",								{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:golden_leggings",									{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:golden_boots",										{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_helmet",									{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_chestplate",								{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_leggings",								{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_boots",									{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:iron_helmet",										{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:iron_chestplate",									{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:iron_leggings",									{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:iron_boots",										{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_helmet",									{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_chestplate",								{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_leggings",									{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_boots",									{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_helmet",									{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_chestplate",								{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_leggings",									{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_boots",									{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:turtle_helmet",									{ "swimming": 15, "fishing": 7.5 } );
addData( "xp_bonus_worn", "minecraft:shield",											{ "endurance": 12.5, "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:dragon_head",										{ "flying": 50, "combat": 25 } );
addData( "xp_bonus_worn", "minecraft:carved_pumpkin",									{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:heart_of_the_sea",									{ "swimming": 25, "fishing": 10 } );
addData( "xp_bonus_worn", "minecraft:nether_star",										{ "combat": 10, "endurance": 10, "archery": 10, "magic": 10, "flying": 20 } );
addData( "xp_value_break", "minecraft:nether_quartz_ore",								{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:nether_quartz",									{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:coal_ore",										{ "mining": 2 } );
addData( "xp_value_break", "minecraft:iron_ore",										{ "mining": 12 } );
addData( "xp_value_break", "minecraft:gold_ore",										{ "mining": 22 } );
addData( "xp_value_break", "minecraft:diamond_ore",										{ "mining": 35 } );
addData( "xp_value_break", "minecraft:redstone_ore",									{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:lapis_ore",										{ "mining": 5 } );
addData( "xp_value_break", "minecraft:emerald_ore",										{ "mining": 60 } );
addData( "xp_value_break", "minecraft:granite",											{ "mining": 0.4 } );
addData( "xp_value_break", "minecraft:polished_granite",								{ "mining": 0.4 } );
addData( "xp_value_break", "minecraft:diorite",											{ "mining": 0.3 } );
addData( "xp_value_break", "minecraft:polished_diorite",								{ "mining": 0.3 } );
addData( "xp_value_break", "minecraft:andesite",										{ "mining": 0.5 } );
addData( "xp_value_break", "minecraft:polished_andesite",								{ "mining": 0.5 } );
addData( "xp_value_break", "minecraft:stone",											{ "mining": 0.1 } );
addData( "xp_value_break", "minecraft:stone_bricks",									{ "mining": 0.7 } );
addData( "xp_value_break", "minecraft:cobblestone",										{ "mining": 0.5 } );
addData( "xp_value_break", "minecraft:mossy_cobblestone",								{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:netherrack",										{ "mining": 0.1 } );
addData( "xp_value_break", "minecraft:nether_bricks",									{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:ice",												{ "mining": 0.1 } );
addData( "xp_value_break", "minecraft:rail",											{ "mining": 0.8 } );
addData( "xp_value_break", "minecraft:prismarine",										{ "mining": 2.5 } );
addData( "xp_value_break", "minecraft:dark_prismarine",									{ "mining": 3.5 } );
addData( "xp_value_break", "minecraft:prismarine_bricks",								{ "mining": 4 } );
addData( "xp_value_break", "minecraft:purpur_block",									{ "mining": 2 } );
addData( "xp_value_break", "minecraft:purpur_pillar",									{ "mining": 2.5 } );
addData( "xp_value_break", "minecraft:infested_stone",									{ "mining": 50 } );
addData( "xp_value_break", "minecraft:infested_cobblestone",							{ "mining": 50 } );
addData( "xp_value_break", "minecraft:infested_stone_bricks",							{ "mining": 200 } );
addData( "xp_value_break", "minecraft:infested_mossy_stone_bricks",						{ "mining": 200 } );
addData( "xp_value_break", "minecraft:infested_cracked_stone_bricks",					{ "mining": 200 } );
addData( "xp_value_break", "minecraft:infested_chiseled_stone_bricks",					{ "mining": 200 } );
addData( "xp_value_break", "minecraft:bedrock",											{ "mining": 9001 } );
addData( "req_break", "minecraft:spawner",												{ "combat": 5 } );
addData( "xp_value_break", "minecraft:spawner",											{ "mining": 50, "combat": 150, "endurance": 100 } );
addData( "xp_value_break", "minecraft:dirt",											{ "excavation": 1.5 } );
addData( "xp_value_break", "minecraft:podzol",											{ "excavation": 3, "farming": 1 } );
addData( "xp_value_break", "minecraft:mycelium",										{ "excavation": 6, "farming": 1 } );
addData( "xp_value_break", "minecraft:coarse_dirt",										{ "excavation": 1.7 } );
addData( "xp_value_break", "minecraft:grass_block",										{ "excavation": 2 } );
addData( "xp_value_break", "minecraft:sand",											{ "excavation": 1 } );
addData( "xp_value_break", "minecraft:red_sand",										{ "excavation": 1.2 } );
addData( "xp_value_break", "minecraft:clay",											{ "excavation": 5 } );
addData( "xp_value_break", "minecraft:clay_ball",										{ "excavation": 5 } );
addData( "xp_value_break", "minecraft:gravel",											{ "excavation": 2 } );
addData( "xp_value_break", "minecraft:soul_sand",										{ "excavation": 5 } );
addData( "xp_value_break", "minecraft:snow_block",										{ "excavation": 3.5 } );
addData( "xp_value_break", "minecraft:oak_sapling",										{ "woodcutting": 15 } );
addData( "xp_value_break", "minecraft:birch_sapling",									{ "woodcutting": 12 } );
addData( "xp_value_break", "minecraft:spruce_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "minecraft:jungle_sapling",									{ "woodcutting": 24 } );
addData( "xp_value_break", "minecraft:dark_oak_sapling",								{ "woodcutting": 18 } );
addData( "xp_value_break", "minecraft:acacia_sapling",									{ "woodcutting": 26 } );
addData( "xp_value_grow", "minecraft:oak_sapling",										{ "farming": 10 } );
addData( "xp_value_grow", "minecraft:birch_sapling",									{ "farming": 20 } );
addData( "xp_value_grow", "minecraft:spruce_sapling",									{ "farming": 15 } );
addData( "xp_value_grow", "minecraft:jungle_sapling",									{ "farming": 25 } );
addData( "xp_value_grow", "minecraft:dark_oak_sapling",									{ "farming": 15 } );
addData( "xp_value_grow", "minecraft:acacia_sapling",									{ "farming": 30 } );
addData( "xp_value_break", "minecraft:log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "minecraft:oak_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "minecraft:birch_log",										{ "woodcutting": 12 } );
addData( "xp_value_break", "minecraft:spruce_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:jungle_log",										{ "woodcutting": 4.5 } );
addData( "xp_value_break", "minecraft:dark_oak_log",									{ "woodcutting": 7 } );
addData( "xp_value_break", "minecraft:acacia_log",										{ "woodcutting": 14 } );
addData( "xp_value_break", "minecraft:oak_wood",										{ "woodcutting": 8 } );
addData( "xp_value_break", "minecraft:birch_wood",										{ "woodcutting": 12 } );
addData( "xp_value_break", "minecraft:spruce_wood",										{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:jungle_wood",										{ "woodcutting": 4.5 } );
addData( "xp_value_break", "minecraft:dark_oak_wood",									{ "woodcutting": 7 } );
addData( "xp_value_break", "minecraft:acacia_wood",										{ "woodcutting": 14 } );
addData( "xp_value_break", "minecraft:oak_planks",										{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:birch_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:spruce_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:jungle_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:dark_oak_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:acacia_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:oak_leaves",										{ "woodcutting": 0.5 } );
addData( "xp_value_break", "minecraft:birch_leaves",									{ "woodcutting": 0.7 } );
addData( "xp_value_break", "minecraft:spruce_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_break", "minecraft:jungle_leaves",									{ "woodcutting": 0.9 } );
addData( "xp_value_break", "minecraft:dark_oak_leaves",									{ "woodcutting": 0.6 } );
addData( "xp_value_break", "minecraft:acacia_leaves",									{ "woodcutting": 1.1 } );
addData( "xp_value_break", "minecraft:bookshelf",										{ "woodcutting": 50 } );
addData( "xp_value_break", "minecraft:brown_mushroom_block",							{ "farming": 3 } );
addData( "xp_value_break", "minecraft:brown_mushroom",									{ "farming": 10 } );
addData( "xp_value_break", "minecraft:red_mushroom_block",								{ "farming": 4 } );
addData( "xp_value_break", "minecraft:red_mushroom",									{ "farming": 12 } );
addData( "xp_value_break", "minecraft:sugar_cane",										{ "farming": 1.5 } );
addData( "xp_value_break", "minecraft:cactus",											{ "farming": 2 } );
addData( "xp_value_break", "minecraft:bamboo",											{ "farming": 0.2, "woodcutting": 0.4 } );
addData( "xp_value_break", "minecraft:bamboo_sapling",									{ "farming": 0.2, "woodcutting": 0.4 } );
addData( "xp_value_break", "minecraft:kelp",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:kelp_plant",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:sea_pickle",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:wheat",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:wheat_seeds",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:beetroot",										{ "farming": 1.5 } );
addData( "xp_value_break", "minecraft:beetroots",										{ "farming": 1.5 } );
addData( "xp_value_break", "minecraft:carrot",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:carrots",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:potato",											{ "farming": 0.75 } );
addData( "xp_value_break", "minecraft:potatoes",										{ "farming": 0.75 } );
addData( "xp_value_break", "minecraft:melon",											{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:melon_seeds",										{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:melon_slice",										{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:pumpkin",											{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:pumpkin_seeds",									{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:cocoa",											{ "farming": 2 } );
addData( "xp_value_break", "minecraft:nether_wart",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:chorus_flower",									{ "farming": 35 } );
addData( "xp_value_break", "minecraft:chorus_plant",									{ "farming": 2.5 } );
addData( "xp_value_grow", "minecraft:sugar_cane",										{ "farming": 5 } );
addData( "xp_value_grow", "minecraft:cactus",											{ "farming": 6 } );
addData( "xp_value_grow", "minecraft:bamboo",											{ "farming": 1.2 } );
addData( "xp_value_grow", "minecraft:bamboo_sapling",									{ "farming": 1.2 } );
addData( "xp_value_grow", "minecraft:kelp",												{ "farming": 2 } );
addData( "xp_value_grow", "minecraft:kelp_plant",										{ "farming": 2 } );
addData( "xp_value_grow", "minecraft:sea_pickle",										{ "farming": 4 } );
addData( "xp_value_grow", "minecraft:wheat",											{ "farming": 9 } );
addData( "xp_value_grow", "minecraft:wheat_seeds",										{ "farming": 9 } );
addData( "xp_value_grow", "minecraft:beetroot",											{ "farming": 12 } );
addData( "xp_value_grow", "minecraft:beetroots",										{ "farming": 12 } );
addData( "xp_value_grow", "minecraft:carrot",											{ "farming": 8 } );
addData( "xp_value_grow", "minecraft:carrots",											{ "farming": 8 } );
addData( "xp_value_grow", "minecraft:potato",											{ "farming": 6.6 } );
addData( "xp_value_grow", "minecraft:potatoes",											{ "farming": 6.6 } );
addData( "xp_value_grow", "minecraft:cocoa",											{ "farming": 17 } );
addData( "xp_value_grow", "minecraft:nether_wart",										{ "farming": 11 } );
addData( "xp_value_break", "minecraft:lily_pad",										{ "farming": 5 } );
addData( "xp_value_break", "minecraft:dandelion",										{ "farming": 8 } );
addData( "xp_value_break", "minecraft:white_tulip",										{ "farming": 8.5 } );
addData( "xp_value_break", "minecraft:pink_tulip",										{ "farming": 6 } );
addData( "xp_value_break", "minecraft:red_tulip",										{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:oxeye_daisy",										{ "farming": 8.5 } );
addData( "xp_value_break", "minecraft:sunflower",										{ "farming": 17.5 } );
addData( "xp_value_break", "minecraft:lilac",											{ "farming": 16.5 } );
addData( "xp_value_break", "minecraft:rose_bush",										{ "farming": 13.5 } );
addData( "xp_value_break", "minecraft:peony",											{ "farming": 17.5 } );
addData( "xp_value_break", "minecraft:dead_bush",										{ "farming": 5 } );
addData( "xp_value_break", "minecraft:cobweb",											{ "farming": 5 } );
addData( "xp_value_break", "minecraft:orange_tulip",									{ "farming": 16.5 } );
addData( "xp_value_break", "minecraft:wither_rose",										{ "farming": 35 } );
addData( "xp_value_break", "minecraft:allium",											{ "farming": 12.5 } );
addData( "xp_value_break", "minecraft:poppy",											{ "farming": 11.5 } );
addData( "xp_value_break", "minecraft:vine",											{ "farming": 3.5 } );
addData( "xp_value_break", "minecraft:grass",											{ "farming": 0.25 } );
addData( "xp_value_break", "minecraft:fern",											{ "farming": 0.35 } );
addData( "xp_value_break", "minecraft:sea_grass",										{ "farming": 4.5 } );
addData( "xp_value_break", "minecraft:large_fern",										{ "farming": 5.5 } );
addData( "xp_value_break", "minecraft:tall_grass",										{ "farming": 4.5 } );
addData( "xp_value_break", "minecraft:cornflower",										{ "farming": 5.5 } );
addData( "xp_value_break", "minecraft:azure_bluet",										{ "farming": 4.5 } );
addData( "xp_value_break", "minecraft:lily_of_the_valley",								{ "farming": 9.5 } );
addData( "xp_value_break", "minecraft:blue_orchid",										{ "farming": 20 } );
addData( "xp_value_break", "minecraft:sweet_berry_bush",								{ "farming": 1.25 } );
addData( "xp_value_general", "minecraft:pufferfish",									{ "fishing": 35 } );
addData( "xp_value_general", "minecraft:name_tag",										{ "fishing": 60 } );
addData( "xp_value_general", "minecraft:cod",											{ "fishing": 20 } );
addData( "xp_value_general", "minecraft:salmon",										{ "fishing": 25 } );
addData( "xp_value_general", "minecraft:tropical_fish",									{ "fishing": 200 } );
addData( "xp_value_general", "minecraft:saddle",										{ "fishing": 75 } );
addData( "xp_value_general", "minecraft:tripwire_hook",									{ "fishing": 35 } );
addData( "xp_value_general", "minecraft:leather",										{ "fishing": 25 } );
addData( "xp_value_craft", "minecraft:netherite_helmet",								{ "crafting": 1000, "smithing": 200 } );
addData( "xp_value_craft", "minecraft:netherite_chestplate",							{ "crafting": 1600, "smithing": 320 } );
addData( "xp_value_craft", "minecraft:netherite_leggings",								{ "crafting": 1400, "smithing": 280 } );
addData( "xp_value_craft", "minecraft:netherite_boots",									{ "crafting": 800, "smithing": 160 } );
addData( "xp_value_craft", "minecraft:netherite_pickaxe",								{ "crafting": 600, "smithing": 120 } );
addData( "xp_value_craft", "minecraft:netherite_shovel",								{ "crafting": 200, "smithing": 40 } );
addData( "xp_value_craft", "minecraft:netherite_hoe",									{ "crafting": 400, "smithing": 80 } );
addData( "xp_value_craft", "minecraft:netherite_axe",									{ "crafting": 600, "smithing": 120 } );
addData( "xp_value_craft", "minecraft:netherite_sword",									{ "crafting": 400, "smithing": 80 } );
addData( "xp_value_craft", "minecraft:diamond_helmet",									{ "crafting": 300, "smithing": 60 } );
addData( "xp_value_craft", "minecraft:diamond_chestplate",								{ "crafting": 480, "smithing": 96 } );
addData( "xp_value_craft", "minecraft:diamond_leggings",								{ "crafting": 420, "smithing": 84 } );
addData( "xp_value_craft", "minecraft:diamond_boots",									{ "crafting": 240, "smithing": 48 } );
addData( "xp_value_craft", "minecraft:diamond_pickaxe",									{ "crafting": 180, "smithing": 36 } );
addData( "xp_value_craft", "minecraft:diamond_shovel",									{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:diamond_hoe",										{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:diamond_axe",										{ "crafting": 180, "smithing": 36 } );
addData( "xp_value_craft", "minecraft:diamond_sword",									{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:golden_helmet",									{ "crafting": 150, "smithing": 30 } );
addData( "xp_value_craft", "minecraft:golden_chestplate",								{ "crafting": 240, "smithing": 48 } );
addData( "xp_value_craft", "minecraft:golden_leggings",									{ "crafting": 210, "smithing": 42 } );
addData( "xp_value_craft", "minecraft:golden_boots",									{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:golden_pickaxe",									{ "crafting": 90, "smithing": 18 } );
addData( "xp_value_craft", "minecraft:golden_shovel",									{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "minecraft:golden_hoe",										{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:golden_axe",										{ "crafting": 90, "smithing": 18 } );
addData( "xp_value_craft", "minecraft:golden_sword",									{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:clock",											{ "crafting": 125 } );
addData( "xp_value_craft", "minecraft:light_weighted_pressure_plate",					{ "crafting": 60 } );
addData( "xp_value_craft", "minecraft:iron_helmet",										{ "crafting": 50, "smithing": 10 } );
addData( "xp_value_craft", "minecraft:iron_chestplate",									{ "crafting": 80, "smithing": 16 } );
addData( "xp_value_craft", "minecraft:iron_leggings",									{ "crafting": 70, "smithing": 14 } );
addData( "xp_value_craft", "minecraft:iron_boots",										{ "crafting": 40, "smithing": 8 } );
addData( "xp_value_craft", "minecraft:iron_pickaxe",									{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "minecraft:iron_shovel",										{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "minecraft:iron_hoe",										{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "minecraft:iron_axe",										{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "minecraft:iron_sword",										{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "minecraft:anvil",											{ "crafting": 310, "smithing": 62 } );
addData( "xp_value_craft", "minecraft:iron_trapdoor",									{ "crafting": 40 } );
addData( "xp_value_craft", "minecraft:iron_door",										{ "crafting": 20 } );
addData( "xp_value_craft", "minecraft:hopper",											{ "crafting": 58 } );
addData( "xp_value_craft", "minecraft:compass",											{ "crafting": 45 } );
addData( "xp_value_craft", "minecraft:minecart",										{ "crafting": 50 } );
addData( "xp_value_craft", "minecraft:bucket",											{ "crafting": 30 } );
addData( "xp_value_craft", "minecraft:cauldron",										{ "crafting": 70 } );
addData( "xp_value_craft", "minecraft:flint_and_steel",									{ "crafting": 12 } );
addData( "xp_value_craft", "minecraft:shears",											{ "crafting": 20 } );
addData( "xp_value_craft", "minecraft:blast_furnace",									{ "crafting": 61 } );
addData( "xp_value_craft", "minecraft:heavy_weighted_pressure_plate",					{ "crafting": 20 } );
addData( "xp_value_craft", "minecraft:leather_helmet",									{ "crafting": 75, "smithing": 15 } );
addData( "xp_value_craft", "minecraft:leather_chestplate",								{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:leather_leggings",								{ "crafting": 105, "smithing": 21 } );
addData( "xp_value_craft", "minecraft:leather_boots",									{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:turtle_helmet",									{ "crafting": 100, "smithing": 20 } );
addData( "xp_value_craft", "minecraft:crossbow",										{ "crafting": 20, "smithing": 10 } );
addData( "xp_value_craft", "minecraft:stone_pickaxe",									{ "crafting": 15, "smithing": 3 } );
addData( "xp_value_craft", "minecraft:stone_shovel",									{ "crafting": 5, "smithing": 1 } );
addData( "xp_value_craft", "minecraft:stone_hoe",										{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "minecraft:stone_axe",										{ "crafting": 15, "smithing": 3 } );
addData( "xp_value_craft", "minecraft:stone_sword",										{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "minecraft:wooden_pickaxe",									{ "crafting": 9 } );
addData( "xp_value_craft", "minecraft:wooden_shovel",									{ "crafting": 3 } );
addData( "xp_value_craft", "minecraft:wooden_hoe",										{ "crafting": 6 } );
addData( "xp_value_craft", "minecraft:wooden_axe",										{ "crafting": 9 } );
addData( "xp_value_craft", "minecraft:wooden_sword",									{ "crafting": 6 } );
addData( "xp_value_craft", "minecraft:beacon",											{ "crafting": 1000 } );
addData( "xp_value_craft", "minecraft:iron_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:iron_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:iron_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:gold_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:gold_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:gold_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:diamond",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:diamond_block",									{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:emerald",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:emerald_block",									{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:coal",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:coal_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:bone",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:bone_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:redstone",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:redstone_block",									{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:lapis",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:lapis_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:wheat",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:hay_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:bread",											{ "cooking": 3.5 } );
addData( "xp_value_craft", "minecraft:beetroot_soup",									{ "cooking": 22.5 } );
addData( "xp_value_craft", "minecraft:mushroom_stew",									{ "cooking": 15 } );
addData( "xp_value_craft", "minecraft:rabbit_stew",										{ "cooking": 35 } );
addData( "xp_value_craft", "minecraft:cake",											{ "cooking": 45 } );
addData( "xp_value_craft", "minecraft:cookie",											{ "cooking": 0.75 } );
addData( "xp_value_craft", "minecraft:pumpkin_pie",										{ "cooking": 27.5 } );
addData( "xp_value_breed", "minecraft:chicken",											{ "farming": 10 } );
addData( "xp_value_breed", "minecraft:sheep",											{ "farming": 30 } );
addData( "xp_value_breed", "minecraft:cow",												{ "farming": 35 } );
addData( "xp_value_breed", "minecraft:pig",												{ "farming": 25 } );
addData( "player_specific", "UUID_GOES_HERE",											{ "ignoreReq": 1 } );
addData( "block_specific", "minecraft:sugar_cane",										{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:kelp",											{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:kelp_plant",										{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:bamboo",											{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:cactus",											{ "growsUpwards": 1 } );
addData( "req_kill", "minecraft:silverfish",											{ "combat": 10 } );
addData( "xp_value_kill", "minecraft:silverfish",										{ "combat": 35 } );
addData( "xp_value_kill", "minecraft:zombie",											{ "combat": 15 } );
addData( "xp_value_kill", "minecraft:creeper",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:spider",											{ "combat": 20 } );
addData( "xp_value_kill", "minecraft:skeleton",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:enderman",											{ "combat": 35 } );
addData( "xp_value_kill", "minecraft:wither_skeleton",									{ "combat": 40 } );
addData( "xp_value_kill", "minecraft:slime",											{ "combat": 5 } );
addData( "xp_value_kill", "minecraft:blaze",											{ "combat": 30 } );
addData( "xp_value_kill", "minecraft:drowned",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:evoker",											{ "combat": 40 } );
addData( "xp_value_kill", "minecraft:ravager",											{ "combat": 50 } );
addData( "xp_value_kill", "minecraft:vindicator",										{ "combat": 35 } );
addData( "xp_value_kill", "minecraft:cave_spider",										{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:guardian",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:elder_guardian",									{ "combat": 100 } );
addData( "xp_value_kill", "minecraft:husk",												{ "combat": 45 } );
addData( "xp_value_kill", "minecraft:magma_cube",										{ "combat": 7.5 } );
addData( "xp_value_kill", "minecraft:zombie_pigman",									{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:zombie_villager",									{ "combat": 15 } );
addData( "xp_value_kill", "minecraft:ender_dragon",										{ "combat": 2500 } );
addData( "xp_value_kill", "minecraft:wither",											{ "combat": 1000 } );
addData( "xp_value_smelt", "minecraft:cobblestone",										{ "smithing": 0.5 } );
addData( "xp_value_smelt", "minecraft:stone",											{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:stone_bricks",									{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:netherrack",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:nether_bricks",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:polished_blackstone_bricks",						{ "smithing": 2.5 } );
addData( "xp_value_smelt", "minecraft:sand",											{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:red_sand",										{ "smithing": 1.2 } );
addData( "xp_value_smelt", "minecraft:sandstone",										{ "smithing": 3 } );
addData( "xp_value_smelt", "minecraft:red_sandstone",									{ "smithing": 3.6 } );
addData( "xp_value_smelt", "minecraft:coal_ore",										{ "smithing": 8 } );
addData( "xp_value_smelt", "minecraft:iron_ore",										{ "smithing": 12 } );
addData( "xp_value_smelt", "minecraft:gold_ore",										{ "smithing": 18 } );
addData( "xp_value_smelt", "minecraft:nether_gold_ore",									{ "smithing": 22 } );
addData( "xp_value_smelt", "minecraft:nether_quartz_ore",								{ "smithing": 8 } );
addData( "xp_value_smelt", "minecraft:diamond_ore",										{ "smithing": 35 } );
addData( "xp_value_smelt", "minecraft:redstone_ore",									{ "smithing": 15 } );
addData( "xp_value_smelt", "minecraft:lapis_ore",										{ "smithing": 25 } );
addData( "xp_value_smelt", "minecraft:emerald_ore",										{ "smithing": 60 } );
addData( "xp_value_smelt", "minecraft:ancient_debris",									{ "smithing": 60 } );
addData( "xp_value_smelt", "minecraft:clay_ball",										{ "smithing": 1.5, "crafting": 3.5 } );
addData( "xp_value_smelt", "minecraft:clay",											{ "smithing": 6, "crafting": 14 } );
addData( "xp_value_smelt", "minecraft:chainmail_helmet",								{ "smithing": 7.5 } );
addData( "xp_value_smelt", "minecraft:chainmail_chestplate",							{ "smithing": 12 } );
addData( "xp_value_smelt", "minecraft:chainmail_leggings",								{ "smithing": 10.5 } );
addData( "xp_value_smelt", "minecraft:chainmail_boots",									{ "smithing": 6 } );
addData( "xp_value_smelt", "minecraft:iron_helmet",										{ "smithing": 2.5 } );
addData( "xp_value_smelt", "minecraft:iron_chestplate",									{ "smithing": 4 } );
addData( "xp_value_smelt", "minecraft:iron_leggings",									{ "smithing": 3.5 } );
addData( "xp_value_smelt", "minecraft:iron_boots",										{ "smithing": 2 } );
addData( "xp_value_smelt", "minecraft:iron_pickaxe",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:iron_shovel",										{ "smithing": 0.5 } );
addData( "xp_value_smelt", "minecraft:iron_axe",										{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:iron_hoe",										{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:iron_sword",										{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:iron_horse_armor",								{ "smithing": 25 } );
addData( "xp_value_smelt", "minecraft:golden_helmet",									{ "smithing": 10 } );
addData( "xp_value_smelt", "minecraft:golden_chestplate",								{ "smithing": 16 } );
addData( "xp_value_smelt", "minecraft:golden_leggings",									{ "smithing": 14 } );
addData( "xp_value_smelt", "minecraft:golden_boots",									{ "smithing": 8 } );
addData( "xp_value_smelt", "minecraft:golden_pickaxe",									{ "smithing": 6 } );
addData( "xp_value_smelt", "minecraft:golden_shovel",									{ "smithing": 2 } );
addData( "xp_value_smelt", "minecraft:golden_axe",										{ "smithing": 6 } );
addData( "xp_value_smelt", "minecraft:golden_hoe",										{ "smithing": 4 } );
addData( "xp_value_smelt", "minecraft:golden_sword",									{ "smithing": 4 } );
addData( "xp_value_smelt", "minecraft:golden_horse_armor",								{ "smithing": 100 } );
addData( "xp_value_smelt", "minecraft:log",												{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:oak_log",											{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:birch_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:spruce_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:jungle_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:dark_oak_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:acacia_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:white_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:orange_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:magenta_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:light_blue_terracotta",							{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:yellow_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:lime_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:pink_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:gray_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:light_gray_terracotta",							{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:cyan_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:purple_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:blue_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:brown_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:green_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:red_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:black_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:terracotta",										{ "smithing": 1.5 } );
addData( "info_smelt", "minecraft:cobblestone",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:stone",												{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:stone_bricks",										{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:netherrack",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:nether_bricks",										{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:polished_blackstone_bricks",							{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:sand",												{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:red_sand",											{ "extraChance": 0.9 } );
addData( "info_smelt", "minecraft:sandstone",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:red_sandstone",										{ "extraChance": 0.9 } );
addData( "info_smelt", "minecraft:coal_ore",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:iron_ore",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:gold_ore",											{ "extraChance": 0.5 } );
addData( "info_smelt", "minecraft:nether_gold_ore",										{ "extraChance": 0.75 } );
addData( "info_smelt", "minecraft:nether_quartz_ore",									{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:diamond_ore",											{ "extraChance": 0.25 } );
addData( "info_smelt", "minecraft:redstone_ore",										{ "extraChance": 2 } );
addData( "info_smelt", "minecraft:lapis_ore",											{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:emerald_ore",											{ "extraChance": 0.2 } );
addData( "info_smelt", "minecraft:ancient_debris",										{ "extraChance": 0.33 } );
addData( "info_smelt", "minecraft:clay_ball",											{ "extraChance": 0.5 } );
addData( "info_smelt", "minecraft:clay",												{ "extraChance": 0.5 } );
addData( "info_smelt", "minecraft:chainmail_helmet",									{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:chainmail_chestplate",								{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:chainmail_leggings",									{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:chainmail_boots",										{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:iron_helmet",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_chestplate",										{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_leggings",										{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_boots",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_pickaxe",										{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_shovel",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_axe",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_hoe",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_sword",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_horse_armor",									{ "extraChance": 50 } );
addData( "info_smelt", "minecraft:golden_helmet",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_chestplate",									{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_leggings",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_boots",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_pickaxe",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_shovel",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_axe",											{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_hoe",											{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_sword",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_horse_armor",									{ "extraChance": 50 } );
addData( "info_smelt", "minecraft:log",													{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:oak_log",												{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:birch_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:spruce_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:jungle_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:dark_oak_log",										{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:acacia_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:white_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:orange_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:magenta_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:light_blue_terracotta",								{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:yellow_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:lime_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:pink_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:gray_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:light_gray_terracotta",								{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:cyan_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:purple_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:blue_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:brown_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:green_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:red_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:black_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:terracotta",											{ "extraChance": 1.5 } );
addData( "xp_value_cook", "minecraft:mutton",											{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:rabbit",											{ "cooking": 15 } );
addData( "xp_value_cook", "minecraft:salmon",											{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:cod",												{ "cooking": 5 } );
addData( "xp_value_cook", "minecraft:beef",												{ "cooking": 10 } );
addData( "xp_value_cook", "minecraft:porkchop",											{ "cooking": 12.5 } );
addData( "xp_value_cook", "minecraft:chicken",											{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:potato",											{ "cooking": 5 } );
addData( "xp_value_cook", "minecraft:wet_sponge",										{ "cooking": 15, "crafting": 15 } );
addData( "xp_value_cook", "minecraft:cactus",											{ "cooking": 12.5, "crafting": 4 } );
addData( "xp_value_cook", "minecraft:sea_pickle",										{ "cooking": 12.5, "crafting": 3 } );
addData( "xp_value_cook", "minecraft:chorus_fruit",										{ "cooking": 25, "crafting": 22.5 } );
addData( "xp_value_cook", "minecraft:kelp",												{ "cooking": 6, "crafting": 5 } );
addData( "info_cook", "minecraft:mutton",												{ "extraChance": 1 } );
addData( "info_cook", "minecraft:rabbit",												{ "extraChance": 1 } );
addData( "info_cook", "minecraft:salmon",												{ "extraChance": 1.5 } );
addData( "info_cook", "minecraft:cod",													{ "extraChance": 1.75 } );
addData( "info_cook", "minecraft:beef",													{ "extraChance": 0.75 } );
addData( "info_cook", "minecraft:porkchop",												{ "extraChance": 1.25 } );
addData( "info_cook", "minecraft:chicken",												{ "extraChance": 0.5 } );
addData( "info_cook", "minecraft:potato",												{ "extraChance": 0.5 } );
addData( "info_cook", "minecraft:cactus",												{ "extraChance": 2 } );
addData( "info_cook", "minecraft:sea_pickle",											{ "extraChance": 2 } );
addData( "info_cook", "minecraft:chorus_fruit",											{ "extraChance": 0.33 } );
addData( "info_cook", "minecraft:kelp",													{ "extraChance": 0.6 } );
addData( "xp_value_brew", "minecraft:nether_wart",										{ "alchemy": 6 } );
addData( "info_brew", "minecraft:nether_wart",											{ "extraChance": 0.25 } );
addData( "xp_value_brew", "minecraft:ghast_tear",										{ "alchemy": 20 } );
addData( "info_brew", "minecraft:ghast_tear",											{ "extraChance": 0.75 } );
addData( "xp_value_brew", "minecraft:glistering_melon_slice",							{ "alchemy": 12 } );
addData( "info_brew", "minecraft:glistering_melon_slice",								{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:golden_carrot",									{ "alchemy": 11 } );
addData( "info_brew", "minecraft:golden_carrot",										{ "extraChance": 0.5 } );
addData( "xp_value_brew", "minecraft:sugar",											{ "alchemy": 3 } );
addData( "info_brew", "minecraft:sugar",												{ "extraChance": 0.3 } );
addData( "xp_value_brew", "minecraft:magma_cream",										{ "alchemy": 17 } );
addData( "info_brew", "minecraft:magma_cream",											{ "extraChance": 0.6 } );
addData( "xp_value_brew", "minecraft:glowstone_dust",									{ "alchemy": 9 } );
addData( "info_brew", "minecraft:glowstone_dust",										{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:rabbit_foot",										{ "alchemy": 20 } );
addData( "info_brew", "minecraft:rabbit_foot",											{ "extraChance": 0.65 } );
addData( "xp_value_brew", "minecraft:blaze_powder",										{ "alchemy": 9 } );
addData( "info_brew", "minecraft:blaze_powder",											{ "extraChance": 0.35 } );
addData( "xp_value_brew", "minecraft:gunpowder",										{ "alchemy": 7.5 } );
addData( "info_brew", "minecraft:gunpowder",											{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:fermented_spider_eye",								{ "alchemy": 12 } );
addData( "info_brew", "minecraft:fermented_spider_eye",									{ "extraChance": 0.6 } );
addData( "xp_value_brew", "minecraft:spider_eye",										{ "alchemy": 9 } );
addData( "info_brew", "minecraft:spider_eye",											{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:redstone",											{ "alchemy": 8 } );
addData( "info_brew", "minecraft:redstone",												{ "extraChance": 0.4 } );
addData( "xp_value_brew", "minecraft:turtle_helmet",									{ "alchemy": 45 } );
addData( "info_brew", "minecraft:turtle_helmet",										{ "extraChance": 2 } );
addData( "xp_value_brew", "minecraft:dragon_breath",									{ "alchemy": 35 } );
addData( "info_brew", "minecraft:dragon_breath",										{ "extraChance": 3 } );
addData( "xp_value_brew", "minecraft:pufferfish",										{ "alchemy": 5 } );
addData( "info_brew", "minecraft:pufferfish",											{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:phantom_membrane",									{ "alchemy": 17 } );
addData( "info_brew", "minecraft:phantom_membrane",										{ "extraChance": 0.7 } );
addData( "mob_rare_drop", "minecraft:ender_dragon",										{ "minecraft:dragon_head": 1, "minecraft:dragon_egg": 10 } );
addData( "mob_rare_drop", "minecraft:slime",											{ "minecraft:slime_block": 100 } );
addData( "mob_rare_drop", "minecraft:zombie",											{ "minecraft:beetroot": 40 } );
addData( "mob_rare_drop", "minecraft:sheep",											{ "minecraft:string": 10 } );
addData( "mob_rare_drop", "minecraft:chicken",											{ "minecraft:egg": 10 } );
addData( "biome_mob_multiplier", "minecraft:plains",									{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );											   
addData( "biome_effect_positive", "minecraft:plains",									{ "minecraft:speed": 0 } );
addData( "xp_bonus_biome", "minecraft:river",											{ "fishing": 5 } );
addData( "biome_mob_multiplier", "minecraft:river",										{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );
addData( "biome_mob_multiplier", "minecraft:beach",										{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );		 
addData( "xp_bonus_biome", "minecraft:desert",											{ "excavation": 10, "farming": -15 } );
addData( "biome_mob_multiplier", "minecraft:desert",									{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );
addData( "biome_mob_multiplier", "minecraft:the_end",									{ "speedBonus": 1.25, "hpBonus": 2, "damageBonus": 1.25 } );
addData( "biome_mob_multiplier", "minecraft:nether",									{ "hpBonus": 1.5, "damageBonus": 1.5 } );
addData( "xp_bonus_biome", "minecraft:jungle",											{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -25, "farming": -25 } );
addData( "biome_effect_negative", "minecraft:jungle",									{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:jungle",									{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:jungle_hills",									{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -75, "farming": -75 } );
addData( "biome_effect_negative", "minecraft:jungle_hills",								{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:jungle_hills",								{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:bamboo_jungle",									{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -25, "farming": -25 } );
addData( "biome_effect_negative", "minecraft:bamboo_jungle",							{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:bamboo_jungle",								{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:bamboo_jungle_hills",								{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -75, "farming": -75 } );
addData( "biome_effect_negative", "minecraft:bamboo_jungle_hills",						{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:bamboo_jungle_hills",						{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:jungle_edge",										{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -75, "farming": -75 } );
addData( "biome_effect_negative", "minecraft:jungle_edge",								{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:jungle_edge",								{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:ocean",											{ "swimming": 25, "fishing": 10 } );
addData( "biome_effect_negative", "minecraft:ocean",									{ "minecraft:slowness": 0 } );
addData( "req_biome", "minecraft:deep_ocean",											{ "swimming": 15 } );
addData( "xp_bonus_biome", "minecraft:deep_ocean",										{ "swimming": 50, "fishing": 20 } );
addData( "biome_effect_negative", "minecraft:deep_ocean",								{ "minecraft:slowness": 0 } );
addData( "req_biome", "minecraft:cold_ocean",											{ "swimming": 25, "endurance": 15 } );
addData( "xp_bonus_biome", "minecraft:cold_ocean",										{ "swimming": 50, "fishing": 30 } );
addData( "biome_effect_negative", "minecraft:cold_ocean",								{ "minecraft:slowness": 1, "minecraft:weakness": 0 } );
addData( "req_biome", "minecraft:frozen_ocean",											{ "swimming": 35, "endurance": 15 } );
addData( "xp_bonus_biome", "minecraft:frozen_ocean",									{ "swimming": 75, "fishing": 40 } );
addData( "biome_effect_negative", "minecraft:frozen_ocean",								{ "minecraft:slowness": 2, "minecraft:weakness": 1 } );
addData( "req_biome", "minecraft:deep_frozen_ocean",									{ "swimming": 35, "endurance": 25 } );
addData( "xp_bonus_biome", "minecraft:deep_frozen_ocean",								{ "swimming": 100, "fishing": 50 } );
addData( "biome_effect_negative", "minecraft:deep_frozen_ocean",						{ "minecraft:slowness": 3, "minecraft:weakness": 2 } );
addData( "info_ore", "minecraft:nether_quartz_ore",										{ "extraChance": 0.55 } );
addData( "info_ore", "minecraft:coal_ore",												{ "extraChance": 1 } );
addData( "info_ore", "minecraft:iron_ore",												{ "extraChance": 0.75 } );
addData( "info_ore", "minecraft:gold_ore",												{ "extraChance": 0.5 } );
addData( "info_ore", "minecraft:diamond_ore",											{ "extraChance": 0.33 } );
addData( "info_ore", "minecraft:redstone_ore",											{ "extraChance": 2 } );
addData( "info_ore", "minecraft:lapis_ore",												{ "extraChance": 1.5 } );
addData( "info_ore", "minecraft:emerald_ore",											{ "extraChance": 0.75 } );
addData( "info_ore", "minecraft:glowstone",												{ "extraChance": 0.1 } );
addData( "info_log", "minecraft:log",													{ "extraChance": 1 } );
addData( "info_log", "minecraft:oak_log",												{ "extraChance": 1 } );
addData( "info_log", "minecraft:birch_log",												{ "extraChance": 0.85 } );
addData( "info_log", "minecraft:spruce_log",											{ "extraChance": 0.65 } );
addData( "info_log", "minecraft:jungle_log",											{ "extraChance": 0.55 } );
addData( "info_log", "minecraft:dark_oak_log",											{ "extraChance": 0.5 } );
addData( "info_log", "minecraft:acacia_log",											{ "extraChance": 1.25 } );
addData( "info_log", "minecraft:oak_wood",												{ "extraChance": 1 } );
addData( "info_log", "minecraft:birch_wood",											{ "extraChance": 0.85 } );
addData( "info_log", "minecraft:spruce_wood",											{ "extraChance": 0.65 } );
addData( "info_log", "minecraft:jungle_wood",											{ "extraChance": 0.55 } );
addData( "info_log", "minecraft:dark_oak_wood",											{ "extraChance": 0.5 } );
addData( "info_log", "minecraft:acacia_wood",											{ "extraChance": 1.25 } );
addData( "info_plant", "minecraft:cocoa_beans",											{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:wheat",												{ "extraChance": 0.5 } );
addData( "info_plant", "minecraft:melon",												{ "extraChance": 1 } );
addData( "info_plant", "minecraft:pumpkin",												{ "extraChance": 0.6 } );
addData( "info_plant", "minecraft:beetroot",											{ "extraChance": 1 } );
addData( "info_plant", "minecraft:cactus",												{ "extraChance": 0.45 } );
addData( "info_plant", "minecraft:sugar_cane",											{ "extraChance": 0.33 } );
addData( "info_plant", "minecraft:kelp",												{ "extraChance": 0.25 } );
addData( "info_plant", "minecraft:kelp_plant",											{ "extraChance": 0.25 } );
addData( "info_plant", "minecraft:bamboo",												{ "extraChance": 0.35 } );
addData( "info_plant", "minecraft:sea_pickle",											{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:potatoes",											{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:potato",												{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:carrots",												{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:carrot",												{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:nether_wart",											{ "extraChance": 0.75 } );
addData2( "salvage", "minecraft:diamond_helmet", "minecraft:diamond",
{
	"salvageMax": 5,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_chestplate", "minecraft:diamond",
{
	"salvageMax": 8,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_leggings", "minecraft:diamond",
{
	"salvageMax": 7,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_boots", "minecraft:diamond",
{
	"salvageMax": 4,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_horse_armor", "minecraft:diamond",
{
	"salvageMax": 7,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_sword", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_axe", "minecraft:diamond",
{
	"salvageMax": 3,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_pickaxe", "minecraft:diamond",
{
	"salvageMax": 3,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_hoe", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_shovel", "minecraft:diamond",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:jukebox", "minecraft:diamond",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:jukebox", "minecraft:oak_planks",
{
	"salvageMax": 8,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:enchanting_table", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 85,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:enchanting_table", "minecraft:book",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1,
	"maxChance": 95,
	"xpPerItem": 7.5,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:enchanting_table", "minecraft:obsidian",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:golden_helmet", "minecraft:gold_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_chestplate", "minecraft:gold_ingot",
{
	"salvageMax": 8,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_leggings", "minecraft:gold_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_boots", "minecraft:gold_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_horse_armor", "minecraft:gold_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_sword", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_axe", "minecraft:gold_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_pickaxe", "minecraft:gold_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_hoe", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_shovel", "minecraft:gold_ingot",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:clock", "minecraft:gold_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:clock", "minecraft:redstone",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:golden_apple", "minecraft:gold_ingot",
{
	"salvageMax": 8,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_carrot", "minecraft:gold_nugget",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 0.85,
	"maxChance": 80,
	"xpPerItem": 4,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:golden_carrot", "minecraft:carrot",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 80,
	"xpPerItem": 4,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:light_weighted_pressure_plate", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:chainmail_helmet", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chainmail_chestplate", "minecraft:iron_ingot",
{
	"salvageMax": 8,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chainmail_leggings", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chainmail_boots", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:iron_helmet", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_chestplate", "minecraft:iron_ingot",
{
	"salvageMax": 8,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_leggings", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_boots", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_horse_armor", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_sword", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_axe", "minecraft:iron_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_pickaxe", "minecraft:iron_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_hoe", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_shovel", "minecraft:iron_ingot",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:anvil", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:anvil", "minecraft:iron_block",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:chipped_anvil", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chipped_anvil", "minecraft:iron_block",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:damaged_anvil", "minecraft:iron_ingot",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:damaged_anvil", "minecraft:iron_block",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_trapdoor", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_door", "minecraft:iron_ingot",
{
	"salvageMax": 6,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:hopper", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:hopper", "minecraft:chest",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 10,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:compass", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:compass", "minecraft:redstone",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:minecart", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:bucket", "minecraft:iron_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:cauldron", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:flint_and_steel", "minecraft:iron_ingot",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:flint_and_steel", "minecraft:flint",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 3,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:shears", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:blast_furnace", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:heavy_weighted_pressure_plate", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:leather_helmet", "minecraft:leather",
{
	"salvageMax": 5,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_chestplate", "minecraft:leather",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_leggings", "minecraft:leather",
{
	"salvageMax": 7,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_boots", "minecraft:leather",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_horse_armor", "minecraft:leather",
{
	"salvageMax": 7,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:item_frame", "minecraft:leather",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:item_frame", "minecraft:stick",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 0.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:book", "minecraft:leather",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:book", "minecraft:paper",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 2,
	"maxChance": 90,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:writable_book", "minecraft:book",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 12.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:saddle", "minecraft:leather",
{
	"salvageMax": 5,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 25,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_sword", "minecraft:cobblestone",
{
	"salvageMax": 2,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_axe", "minecraft:cobblestone",
{
	"salvageMax": 3,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_pickaxe", "minecraft:cobblestone",
{
	"salvageMax": 3,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_hoe", "minecraft:cobblestone",
{
	"salvageMax": 2,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_shovel", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:wooden_sword", "minecraft:stick",
{
	"salvageMax": 4,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_axe", "minecraft:stick",
{
	"salvageMax": 5,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_pickaxe", "minecraft:stick",
{
	"salvageMax": 5,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_hoe", "minecraft:stick",
{
	"salvageMax": 4,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_shovel", "minecraft:stick",
{
	"salvageMax": 3,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:elytra", "minecraft:phantom_membrane",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 100,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:fishing_rod", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 45,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:bow", "minecraft:string",
{
	"salvageMax": 3,
	"baseChance": 60,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:beacon", "minecraft:nether_star",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 200,
	"levelReq": 50
} );
addData2( "salvage", "minecraft:beacon", "minecraft:obsidian",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 3.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:tnt", "minecraft:gunpowder",
{
	"salvageMax": 5,
	"baseChance": 25,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 4,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:brewing_stand", "minecraft:blaze_rod",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:gravel", "minecraft:flint",
{
	"salvageMax": 2,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 85,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:ender_eye", "minecraft:ender_pearl",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:ender_eye", "minecraft:blaze_powder",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 85,
	"xpPerItem": 10,
	"levelReq": 8
} );
addData2( "salvage", "minecraft:magma_cream", "minecraft:slime_ball",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 15,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:jack_o_lantern", "minecraft:carved_pumpkin",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.25,
	"maxChance": 80,
	"xpPerItem": 3,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:jack_o_lantern", "minecraft:torch",
{
	"salvageMax": 1,
	"baseChance": 60,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:furnace", "minecraft:cobblestone",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1.25,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:cobblestone_wall", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1.25,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:sandstone_wall", "minecraft:sandstone",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:end_stone_brick_wall", "minecraft:end_stone_bricks",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:mossy_cobblestone", "minecraft:vine",
{
	"salvageMax": 1,
	"baseChance": 1,
	"chancePerLevel": 1,
	"maxChance": 15,
	"xpPerItem": 5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:turtle_helmet", "minecraft:scute",
{
	"salvageMax": 5,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 15,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:wheat", "minecraft:wheat_seeds",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:beetroot", "minecraft:beetroot_seeds",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:ladder", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 100,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:oak_leaves", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:birch_leaves", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:spruce_leaves", "minecraft:stick",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:jungle_leaves", "minecraft:stick",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:dark_oak_leaves", "minecraft:stick",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:acacia_leaves", "minecraft:stick",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:nether_bricks", "minecraft:nether_brick",
{
	"salvageMax": 4,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 1.5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:end_crystal", "minecraft:ghast_tear",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 25,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:end_crystal", "minecraft:ender_eye",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:egg", "minecraft:chicken_spawn_egg",
{
	"salvageMax": 1,
	"baseChance": 12.5,
	"chancePerLevel": 0,
	"maxChance": 12.5,
	"xpPerItem": 3,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:ghast_tear", "minecraft:ghast_spawn_egg",
{
	"salvageMax": 1,
	"baseChance": 12.5,
	"chancePerLevel": 0.1,
	"maxChance": 25,
	"xpPerItem": 10,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:wither_rose", "minecraft:wither_skeleton_spawn_egg",
{
	"salvageMax": 3,
	"baseChance": 12.5,
	"chancePerLevel": 0.1,
	"maxChance": 25,
	"xpPerItem": 10,
	"levelReq": 50
} );
addData2( "salvage", "minecraft:bedrock", "minecraft:nether_star",
{
	"salvageMax": 666,
	"baseChance": 0.01,
	"chancePerLevel": 0,
	"maxChance": 0.01,
	"xpPerItem": 200,
	"levelReq": 99
} );
addData2( "salvage", "minecraft:emerald_ore", "minecraft:zombie_villager_spawn_egg",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 0,
	"maxChance": 25,
	"xpPerItem": 50,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:prismarine_bricks", "minecraft:prismarine_shard",
{
	"salvageMax": 9,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:dark_prismarine", "minecraft:prismarine_shard",
{
	"salvageMax": 8,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:prismarine", "minecraft:prismarine_shard",
{
	"salvageMax": 4,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:sea_lantern", "minecraft:prismarine_crystals",
{
	"salvageMax": 5,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:flower_pot", "minecraft:brick",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:bricks", "minecraft:brick",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:honeycomb_block", "minecraft:honeycomb",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 2,
	"maxChance": 90,
	"xpPerItem": 2,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:scaffolding", "minecraft:bamboo",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 2,
	"levelReq": 12
} );
addData2( "salvage", "minecraft:quartz_block", "minecraft:quartz",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 1.5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:daylight_detector", "minecraft:quartz",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 4.5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:lead", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 50,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 7.5,
	"levelReq": 8
} );
addData2( "salvage", "minecraft:nether_wart_block", "minecraft:nether_wart",
{
	"salvageMax": 9,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 2,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:dragon_head", "minecraft:dragon_egg",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 0.5,
	"maxChance": 20,
	"xpPerItem": 100,
	"levelReq": 50
} );
addData2( "salvage", "minecraft:redstone_torch", "minecraft:redstone",
{
	"salvageMax": 1,
	"baseChance": 60,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:trapped_chest", "minecraft:chest",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 100,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:chest", "minecraft:oak_planks",
{
	"salvageMax": 8,
	"baseChance": 40,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 0.8,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:packed_ice", "minecraft:ice",
{
	"salvageMax": 9,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:blue_ice", "minecraft:packed_ice",
{
	"salvageMax": 9,
	"baseChance": 35,
	"chancePerLevel": 0.75,
	"maxChance": 90,
	"xpPerItem": 0.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:magma_block", "minecraft:magma_cream",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 50,
	"xpPerItem": 0.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:sandstone", "minecraft:sand",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 0.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:red_sandstone", "minecraft:red_sand",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 0.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:soul_sand", "minecraft:nether_wart",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.05,
	"maxChance": 0.5,
	"xpPerItem": 0.5,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:conduit", "minecraft:heart_of_the_sea",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 100,
	"xpPerItem": 50,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:bone_block", "minecraft:bone",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 8
} );
addData2( "salvage", "minecraft:melon", "minecraft:melon_slice",
{
	"salvageMax": 9,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 0.35,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:emerald", "minecraft:experience_bottle",
{
	"salvageMax": 16,
	"baseChance": 1,
	"chancePerLevel": 1,
	"maxChance": 100,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:glass_bottle", "minecraft:glass",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 0.35,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:andesite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:rotten_flesh", "minecraft:leather",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 0.8,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 12
} );
addData2( "salvage", "minecraft:granite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:diorite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
{
addData2( "treasure", "minecraft:magma_block", "minecraft:magma_cream",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 2
} );
}
{
addData2( "treasure", "minecraft:netherrack", "minecraft:gold_nugget",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 7.5,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:soul_sand", "minecraft:nether_wart",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:soul_sand", "minecraft:wither_skeleton_skull",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 50,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:soul_sand", "minecraft:ghast_tear",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 125,
	"xpPerItem": 15,
	"minCount": 1,
	"maxCount": 2
} );
}
{
addData2( "treasure", "minecraft:podzol", "minecraft:wheat_seeds",
{
	"startChance": 0.1,
	"startLevel": 10,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:pumpkin_seeds",
{
	"startChance": 0.1,
	"startLevel": 15,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:melon_seeds",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:beetroot_seeds",
{
	"startChance": 0.1,
	"startLevel": 20,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:potato",
{
	"startChance": 0.1,
	"startLevel": 30,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:poisonous_potato",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:carrot",
{
	"startChance": 0.1,
	"startLevel": 30,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:sweet_berries",
{
	"startChance": 0.1,
	"startLevel": 15,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:coal_ore", "minecraft:diamond",
{
	"startChance": 0.01,
	"startLevel": 1,
	"endChance": 0.1,
	"endLevel": 200,
	"xpPerItem": 100,
	"minCount": 1,
	"maxCount": 1
} );
}
{
addData2( "treasure", "minecraft:stone", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:granite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 3,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 2,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:diorite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 3,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:andesite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 3,
	"endLevel": 100,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:gravel", "minecraft:diamond",
{
	"startChance": 0.01,
	"startLevel": 50,
	"endChance": 0.1,
	"endLevel": 200,
	"xpPerItem": 100,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:gravel", "minecraft:bone",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 100,
	"xpPerItem": 8,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:gravel", "minecraft:gunpowder",
{
	"startChance": 0.2,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 125,
	"xpPerItem": 4,
	"minCount": 1,
	"maxCount": 4
} );
}
{
addData2( "treasure", "minecraft:sand", "minecraft:clay",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 200,
	"xpPerItem": 2,
	"minCount": 1,
	"maxCount": 4
} );
}
{
addData2( "treasure", "minecraft:grass_block", "minecraft:wheat",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.5,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 2
} );
addData2( "treasure", "minecraft:grass_block", "minecraft:wheat_seeds",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 75,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:grass_block", "minecraft:tall_grass",
{
	"startChance": 0.08,
	"startLevel": 1,
	"endChance": 0.8,
	"endLevel": 100,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:grass_block", "minecraft:grass",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 100,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 1
} );
}
{
addData2( "treasure", "minecraft:dirt", "minecraft:cake",
{
	"startChance": 0.01,
	"startLevel": 1,
	"endChance": 0.05,
	"endLevel": 999,
	"xpPerItem": 1000,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:dirt", "minecraft:bone",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 125,
	"xpPerItem": 8,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_13",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_cat",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_blocks",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_chirp",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_far",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_mall",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_mellohi",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_stal",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_strad",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_ward",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_11",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_wait",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
}
addData( "fish_pool", "minecraft:leather_helmet",										{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:leather_chestplate",									{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:leather_leggings",										{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:leather_boots",										{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_shovel",										{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_pickaxe",										{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_axe",											{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_sword",											{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_hoe",											{ "startWeight": 100, "startLevel": 1, "endWeight": 10, "endLevel": 80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:bow",													{ "startWeight": 100, "startLevel": 1, "endWeight": 25, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:fishing_rod",											{ "startWeight": 40, "startLevel": 1, "endWeight": 100, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_helmet",										{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_chestplate",									{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_leggings",									{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_boots",										{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:iron_helmet",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_chestplate",										{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_leggings",										{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_boots",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_shovel",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_pickaxe",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_axe",												{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_sword",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_hoe",												{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:golden_helmet",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_chestplate",									{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_leggings",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_boots",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_shovel",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_pickaxe",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_axe",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_sword",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_hoe",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:diamond_helmet",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_chestplate",									{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_leggings",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_boots",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_shovel",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_pickaxe",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_axe",											{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_sword",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_hoe",											{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:netherite_helmet",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_chestplate",									{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_leggings",									{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_boots",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_shovel",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_pickaxe",									{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_axe",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_sword",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_hoe",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:kelp",													{ "startWeight": 500, "startLevel": 1, "endWeight": 25, "endLevel": 75, "xp": 0.25, "minCount": 5, "maxCount": 24 } );
addData( "fish_pool", "minecraft:lily_pad",												{ "startWeight": 500, "startLevel": 1, "endWeight": 25, "endLevel": 75, "xp": 0.25, "minCount": 5, "maxCount": 24 } );
addData( "fish_pool", "minecraft:string",												{ "startWeight": 200, "startLevel": 1, "endWeight": 15, "endLevel": 80, "xp": 0.35, "minCount": 5, "maxCount": 16 } );
addData( "fish_pool", "minecraft:heart_of_the_sea",										{ "startWeight": 1, "startLevel": 1, "endWeight": 1, "endLevel": 1, "xp": 250, "minCount": 1, "maxCount": 1 } );
addData( "fish_pool", "minecraft:nautilus_shell",										{ "startWeight": 1, "startLevel": 1, "endWeight": 5, "endLevel": 25, "xp": 250, "minCount": 1, "maxCount": 3 } );
addData( "fish_pool", "minecraft:nether_star",											{ "startWeight": 0, "startLevel": 95, "endWeight": 1, "endLevel": 150, "xp": 666, "minCount": 1, "maxCount": 1 } );
addData( "fish_enchant_pool", "minecraft:bane_of_arthropods",							{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 10 } );
addData( "fish_enchant_pool", "minecraft:depth_strider",								{ "levelReq": 20, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:efficiency",									{ "levelReq": 25, "levelPerLevel": 30, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 10 } );
addData( "fish_enchant_pool", "minecraft:feather_falling",								{ "levelReq": 5, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:fortune",										{ "levelReq": 35, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:frost_walker",									{ "levelReq": 25, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:looting",										{ "levelReq": 35, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:luck_of_the_sea",								{ "levelReq": 15, "levelPerLevel": 15, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:lure",											{ "levelReq": 20, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:mending",										{ "levelReq": 50, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:silk_touch",									{ "levelReq": 40, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:channeling",									{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:multishot",									{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:projectile_protection",						{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:blast_protection",								{ "levelReq": 25, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:protection",									{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:sharpness",									{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:sweeping",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:smite",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:thorns",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:unbreaking",									{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:quick_charge",									{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:power",										{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:punch",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 10 } );
addData( "fish_enchant_pool", "minecraft:piercing",										{ "levelReq": 35, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 7 } );
addData( "fish_enchant_pool", "minecraft:riptide",										{ "levelReq": 25, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 7 } );
addData( "level_up_command", "fishing",													{ "give >player< minecraft:cookie >level<": 100 } );
addData( "vein_blacklist", "all_dimensions",											{ "minecraft:furnace": 0, "minecraft:chest": 0, "minecraft:trapped_chest": 0, "minecraft:shulker_box": 0, "minecraft:barrel": 0, "minecraft:dropper": 0, "minecraft:dispenser": 0 } );
addData( "vein_blacklist", "minecraft:overworld",										{ "minecraft:stone": 0 } );
addData( "vein_blacklist", "minecraft:the_nether",										{ "minecraft:netherrack": 0 } );
addData( "vein_blacklist", "minecraft:the_end",											{ "minecraft:end_stone": 0 } );
addData( "xp_multiplier_dimension", "all_dimensions",									{ "engineering": 1.0 } );
addData( "xp_bonus_dimension", "all_dimensions",										{  } );
addData( "xp_bonus_dimension", "minecraft:the_end",										{ "flying": 50, "combat": 20, "archery": 50, "endurance": 20 } );
addData( "xp_bonus_dimension", "minecraft:the_nether",									{ "combat": 25, "archery": 25, "endurance": 25, "flying": 250, "farming": -25 } );
//Loungecraft Little Things
{
	addData2( "salvage", "minecraft:spectral_arrow", "minecraft:glowstone_dust",
	{
		"salvageMax": 4,
		"baseChance": 25,
		"chancePerLevel": 1.5,
		"maxChance": 75,
		"xpPerItem": 5,
		"levelReq": 1
	} );
	addData2( "salvage", "minecraft:spectral_arrow", "minecraft:arrow",
	{
		"salvageMax": 1,
		"baseChance": 35,
		"chancePerLevel": 2,
		"maxChance": 80,
		"xpPerItem": 1.5,
		"levelReq": 5
	} );
addData( "item_specific", "minecraft:potion", { "magicWeapon": 1.5 });

}
//MineColoies Addon
{
addData( "req_weapon", "minecolonies:chiefsword",										{ "combat": 35 } );
addData( "req_weapon", "minecolonies:iron_scimitar",									{ "combat": 15 } );
addData( "req_weapon", "minecolonies:pharaoscepter",									{ "archery": 75 } );
addData( "req_wear", "minecolonies:pirate_hat",											{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_top",											{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_leggins",										{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_boots",										{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_cap",											{ "endurance": 45 } );
addData( "req_wear", "minecolonies:pirate_chest",										{ "endurance": 45 } );
addData( "req_wear", "minecolonies:pirate_legs",										{ "endurance": 45 } );
addData( "req_wear", "minecolonies:pirate_shoes",										{ "endurance": 45 } );
addData( "req_use", "minecolonies:blockhuttownhall",									{ "crafting": 15 } );
addData( "req_use", "minecolonies:blockhutbaker", { "crafting": 20, "cooking":20 } );
addData( "req_use", "minecolonies:blockhutblacksmith", { "crafting": 30, "smithing":30 } );
addData( "req_use", "minecolonies:blockhutbuilder", { "crafting": 15, "building":15 } );
addData( "req_use", "minecolonies:blockhutfarmer", { "crafting": 15, "farming":15 } );
addData( "req_use", "minecolonies:blockhutfield", { "crafting": 15, "farming":15 } );
addData( "req_use", "minecolonies:blockhutfisherman", { "crafting": 15, "fishing":15 } );
addData( "req_use", "minecolonies:blockhutlumberjack", { "crafting": 15, "woodcutting":15 } );
addData( "req_use", "minecolonies:blockhutminer", { "crafting": 15, "mining":15 } );
addData( "req_use", "minecolonies:blockhutbarracks", { "crafting": 20, "combat":20 } );
addData( "req_use", "minecolonies:blockhutsmeltery", { "crafting": 30, "smithing":30 } );
addData( "req_use", "minecolonies:blockhutcombatacademy", { "crafting": 30, "combat":30 } );
addData( "req_use", "minecolonies:blockhutcook", { "crafting": 15, "cooking":15 } );
addData( "req_use", "minecolonies:blockhutarchery", { "crafting": 20, "archery":20 } );
addData( "req_use", "minecolonies:blockhutguardtower", { "crafting": 15, "combat":15 } );
addData( "req_use", "minecolonies:blockhutdeliveryman", { "crafting": 15, "agility":15 } );
addData( "req_use", "minecolonies:blockhutcowboy", { "farming":30 } );
addData( "req_use", "minecolonies:blockhutswineherder", { "farming":30 } );
addData( "req_use", "minecolonies:blockhutchickenherder", { "farming":30 } );
addData( "req_use", "minecolonies:blockhutcomposter", { "farming":40 } );
addData( "req_use", "minecolonies:blockhutlibrary", { "building":40 } );
addData( "req_use", "minecolonies:blockhutsawmill", { "woodcutting":40 } );
addData( "req_use", "minecolonies:blockhutcrusher", { "mining":40 } );
addData( "req_use", "minecolonies:blockhutsifter", { "excavation":40 } );
addData( "req_use", "minecolonies:blockhuthospital", { "endurance":40 } );
addData( "req_use", "minecolonies:blockhutschool", { "building":40 } );
addData( "req_use", "minecolonies:blockhutglassblower", { "excavation": 40, "smithing":40 } );
addData( "req_use", "minecolonies:blockhutdyer", { "cooking":40 } );
addData( "req_use", "minecolonies:blockhutfletcher", { "archery":40 } );
addData( "req_use", "minecolonies:blockhutmechanic", { "smithing":40 } );
addData( "req_use", "minecolonies:blockhutplantation", { "farming":15 } );
addData( "req_use", "minecolonies:blockhutshepherd", { "farming":30 } );
addData( "req_use", "minecolonies:blockhutstonemason", { "mining":40 } );
addData( "req_use", "minecolonies:blockhutconcretemixer", { "building":40, "mining":40 } );
}
//Create Addon
{
addData( "req_craft", "create:schematicannon",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:schematic_table",											{ "crafting": 20 } );
addData( "req_craft", "create:shaft",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:cogwheel",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:large_cogwheel",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:encased_shaft",											{ "crafting": 20 } );
addData( "req_craft", "create:gearbox",													{ "crafting": 20 } );
addData( "req_craft", "create:vertical_gearbox",										{ "crafting": 20 } );
addData( "req_craft", "create:clutch",													{ "crafting": 20 } );
addData( "req_craft", "create:gearshift",												{ "crafting": 20 } );
addData( "req_craft", "create:encased_belt",											{ "crafting": 20 } );
addData( "req_craft", "create:adjustable_pulley",										{ "crafting": 25 } );
addData( "req_craft", "create:water_wheel",												{ "crafting": 20 } );
addData( "req_craft", "create:encased_fan",												{ "crafting": 20 } );
addData( "req_craft", "create:nozzle",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:turntable",												{ "crafting": 20 } );
addData( "req_craft", "create:hand_crank",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:cuckoo_clock",											{ "crafting": 20 } );
addData( "req_craft", "create:millstone",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_press",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_mixer",										{ "crafting": 20 } );
addData( "req_craft", "create:speedometer",												{ "crafting": 20 } );
addData( "req_craft", "create:basin",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:stressometer",											{ "crafting": 20 } );
addData( "req_craft", "create:mechanical_piston",										{ "crafting": 20 } );
addData( "req_craft", "create:sticky_mechanical_piston",								{ "crafting": 20 } );
addData( "req_craft", "create:piston_extension_pole",									{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_bearing",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:clockwork_bearing",										{ "crafting": 20 } );
addData( "req_craft", "create:rope_pulley",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:cart_assembler",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:linear_chassis",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:secondary_linear_chassis",								{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:radial_chassis",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_drill",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_saw",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:deployer",												{ "crafting": 20 } );
addData( "req_craft", "create:portable_storage_interface",								{ "crafting": 20 } );
addData( "req_craft", "create:mechanical_harvester",									{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_plough",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:andesite_casing",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:brass_casing",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:copper_casing",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_crafter",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:sequenced_gearshift",										{ "crafting": 20 } );
addData( "req_craft", "create:rotation_speed_controller",								{ "crafting": 25 } );
addData( "req_craft", "create:redstone_contact",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:stockpile_switch",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:adjustable_crate",										{ "crafting": 20 } );
addData( "req_craft", "create:belt_observer",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:belt_tunnel",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:extractor",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:linked_extractor",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:funnel",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:transposer",												{ "crafting": 20 } );
addData( "req_craft", "create:linked_transposer",										{ "crafting": 20 } );
addData( "req_craft", "create:analog_lever",											{ "crafting": 20 } );
addData( "req_craft", "create:pulse_repeater",											{ "crafting": 20 } );
addData( "req_craft", "create:adjustable_repeater",										{ "crafting": 20 } );
addData( "req_craft", "create:adjustable_pulse_repeater",								{ "crafting": 25 } );
addData( "req_craft", "create:powered_latch",											{ "crafting": 20 } );
addData( "req_craft", "create:powered_toggle_latch",									{ "crafting": 20 } );
addData( "req_craft", "create:andesite_alloy",											{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:propeller",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:whisk",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:brass_hand",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:crafter_slot_cover",										{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:electron_tube",											{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:belt_connector",											{ "crafting": 10 } );
addData( "req_craft", "create:super_glue",												{ "crafting": 10 } );
addData( "req_craft", "create:sand_paper",												{ "crafting": 5 } );
addData( "req_craft", "create:red_sand_paper",											{ "crafting": 5 } );
addData( "req_craft", "create:wrench",													{ "crafting": 10, "smithing": 10 } );
addData( "req_craft", "create:goggles",													{ "crafting": 25, "smithing": 10 } );
addData( "req_craft", "create:filter",													{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:attribute_filter",										{ "crafting": 15, "smithing": 5 } );
addData( "req_craft", "create:tree_fertilizer",											{ "crafting": 10, "farming": 10 } );
addData( "req_craft", "create:deforester",												{ "crafting": 30, "smithing": 30 } );
addData( "req_craft", "create:wand_of_symmetry",										{ "crafting": 30, "smithing": 30 } );
addData( "req_craft", "create:empty_schematic",											{ "crafting": 5 } );
addData( "req_craft", "create:schematic_and_quill",										{ "crafting": 5 } );
addData( "req_craft", "create:handheld_blockzapper",									{ "crafting": 30, "smithing": 30 } );
addData( "xp_value_craft", "create:schematicannon",										{ "crafting": 50 } );
addData( "xp_value_craft", "create:schematic_table",									{ "crafting": 10.4 } );
addData( "xp_value_craft", "create:shaft",												{ "crafting": 3.25 } );
addData( "xp_value_craft", "create:cogwheel",											{ "crafting": 4.1 } );
addData( "xp_value_craft", "create:large_cogwheel",										{ "crafting": 6.2 } );
addData( "xp_value_craft", "create:encased_shaft",										{ "crafting": 5 } );
addData( "xp_value_craft", "create:gearbox",											{ "crafting": 5 } );
addData( "xp_value_craft", "create:clutch",												{ "crafting": 4 } );
addData( "xp_value_craft", "create:gearshift",											{ "crafting": 4 } );
addData( "xp_value_craft", "create:adjustable_pulley",									{ "crafting": 10.8 } );
addData( "xp_value_craft", "create:water_wheel",										{ "crafting": 14.5 } );
addData( "xp_value_craft", "create:encased_fan",										{ "crafting": 6 } );
addData( "xp_value_craft", "create:nozzle",												{ "crafting": 4.7 } );
addData( "xp_value_craft", "create:turntable",											{ "crafting": 5.3 } );
addData( "xp_value_craft", "create:hand_crank",											{ "crafting": 2 } );
addData( "xp_value_craft", "create:cuckoo_clock",										{ "crafting": 16.7 } );
addData( "xp_value_craft", "create:millstone",											{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:mechanical_press",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:mechanical_mixer",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:speedometer",										{ "crafting": 4 } );
addData( "xp_value_craft", "create:basin",												{ "crafting": 12 } );
addData( "xp_value_craft", "create:mechanical_piston",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:sticky_mechanical_piston",							{ "crafting": 12.3 } );
addData( "xp_value_craft", "create:piston_extension_pole",								{ "crafting": 3 } );
addData( "xp_value_craft", "create:mechanical_bearing",									{ "crafting": 6.4 } );
addData( "xp_value_craft", "create:clockwork_bearing",									{ "crafting": 6.4 } );
addData( "xp_value_craft", "create:rope_pulley",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:cart_assembler",										{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:linear_chassis",										{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:radial_chassis",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:mechanical_drill",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:mechanical_saw",										{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:deployer",											{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:portable_storage_interface",							{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:mechanical_harvester",								{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:mechanical_plough",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:andesite_casing",									{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:brass_casing",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:copper_casing",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:mechanical_crafter",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:sequenced_gearshift",								{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:rotation_speed_controller",							{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:redstone_contact",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:redstone_link",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:stockpile_switch",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:adjustable_crate",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:belt_observer",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:belt_tunnel",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:extractor",											{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:linked_extractor",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:funnel",												{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:transposer",											{ "crafting": 10 } );
addData( "xp_value_craft", "create:linked_transposer",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:analog_lever",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:pulse_repeater",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:adjustable_repeater",								{ "crafting": 10 } );
addData( "xp_value_craft", "create:adjustable_pulse_repeater",							{ "crafting": 18 } );
addData( "xp_value_craft", "create:powered_latch",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:powered_toggle_latch",								{ "crafting": 10.6 } );
addData( "xp_value_craft", "create:andesite_alloy",										{ "crafting": 3 } );
addData( "xp_value_craft", "create:propeller",											{ "crafting": 7 } );
addData( "xp_value_craft", "create:whisk",												{ "crafting": 7 } );
addData( "xp_value_craft", "create:brass_hand",											{ "crafting": 7 } );
addData( "xp_value_craft", "create:crafter_slot_cover",									{ "crafting": 3 } );
addData( "xp_value_craft", "create:electron_tube",										{ "crafting": 6 } );
addData( "xp_value_craft", "create:belt_connector",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:super_glue",											{ "crafting": 5 } );
addData( "xp_value_craft", "create:sand_paper",											{ "crafting": 5 } );
addData( "xp_value_craft", "create:red_sand_paper",										{ "crafting": 5 } );
addData( "xp_value_craft", "create:wrench",												{ "crafting": 10 } );
addData( "xp_value_craft", "create:goggles",											{ "crafting": 10 } );
addData( "xp_value_craft", "create:filter",												{ "crafting": 6.5 } );
addData( "xp_value_craft", "create:attribute_filter",									{ "crafting": 6.5 } );
addData( "xp_value_craft", "create:tree_fertilizer",									{ "crafting": 10.4 } );
addData( "xp_value_craft", "create:deforester",											{ "crafting": 120 } );
addData( "xp_value_craft", "create:wand_of_symmetry",									{ "crafting": 100 } );
addData( "xp_value_craft", "create:empty_schematic",									{ "crafting": 6.2 } );
addData( "xp_value_craft", "create:schematic_and_quill",								{ "crafting": 8.5 } );
addData( "xp_value_craft", "create:handheld_blockzapper",								{ "crafting": 120 } );
addData( "req_place", "create:schematicannon",											{ "building": 20 } );
addData( "req_place", "create:schematic_table",											{ "building": 10 } );
addData( "req_place", "create:shaft",													{ "building": 10 } );
addData( "req_place", "create:cogwheel",												{ "building": 10 } );
addData( "req_place", "create:large_cogwheel",											{ "building": 10 } );
addData( "req_place", "create:encased_shaft",											{ "building": 10 } );
addData( "req_place", "create:gearbox",													{ "building": 10 } );
addData( "req_place", "create:vertical_gearbox",										{ "building": 10 } );
addData( "req_place", "create:clutch",													{ "building": 10 } );
addData( "req_place", "create:gearshift",												{ "building": 10 } );
addData( "req_place", "create:encased_belt",											{ "building": 10 } );
addData( "req_place", "create:adjustable_pulley",										{ "building": 10 } );
addData( "req_place", "create:water_wheel",												{ "building": 10 } );
addData( "req_place", "create:encased_fan",												{ "building": 10 } );
addData( "req_place", "create:nozzle",													{ "building": 10 } );
addData( "req_place", "create:turntable",												{ "building": 10 } );
addData( "req_place", "create:hand_crank",												{ "building": 10 } );
addData( "req_place", "create:cuckoo_clock",											{ "building": 10 } );
addData( "req_place", "create:millstone",												{ "building": 10 } );
addData( "req_place", "create:mechanical_press",										{ "building": 10 } );
addData( "req_place", "create:mechanical_mixer",										{ "building": 10 } );
addData( "req_place", "create:speedometer",												{ "building": 10 } );
addData( "req_place", "create:basin",													{ "building": 10 } );
addData( "req_place", "create:stressometer",											{ "building": 10 } );
addData( "req_place", "create:mechanical_piston",										{ "building": 10 } );
addData( "req_place", "create:sticky_mechanical_piston",								{ "building": 10 } );
addData( "req_place", "create:piston_extension_pole",									{ "building": 10 } );
addData( "req_place", "create:mechanical_bearing",										{ "building": 10 } );
addData( "req_place", "create:clockwork_bearing",										{ "building": 10 } );
addData( "req_place", "create:rope_pulley",												{ "building": 10 } );
addData( "req_place", "create:cart_assembler",											{ "building": 10 } );
addData( "req_place", "create:linear_chassis",											{ "building": 10 } );
addData( "req_place", "create:secondary_linear_chassis",								{ "building": 10 } );
addData( "req_place", "create:radial_chassis",											{ "building": 10 } );
addData( "req_place", "create:mechanical_drill",										{ "building": 10 } );
addData( "req_place", "create:mechanical_saw",											{ "building": 10 } );
addData( "req_place", "create:deployer",												{ "building": 10 } );
addData( "req_place", "create:portable_storage_interface",								{ "building": 10 } );
addData( "req_place", "create:mechanical_harvester",									{ "building": 10 } );
addData( "req_place", "create:mechanical_plough",										{ "building": 10 } );
addData( "req_place", "create:andesite_casing",											{ "building": 10 } );
addData( "req_place", "create:brass_casing",											{ "building": 10 } );
addData( "req_place", "create:copper_casing",											{ "building": 10 } );
addData( "req_place", "create:mechanical_crafter",										{ "building": 10 } );
addData( "req_place", "create:sequenced_gearshift",										{ "building": 10 } );
addData( "req_place", "create:rotation_speed_controller",								{ "building": 10 } );
addData( "req_place", "create:redstone_contact",										{ "building": 10 } );
addData( "req_place", "create:stockpile_switch",										{ "building": 10 } );
addData( "req_place", "create:adjustable_crate",										{ "building": 10 } );
addData( "req_place", "create:belt_observer",											{ "building": 10 } );
addData( "req_place", "create:belt_tunnel",												{ "building": 10 } );
addData( "req_place", "create:extractor",												{ "building": 10 } );
addData( "req_place", "create:linked_extractor",										{ "building": 10 } );
addData( "req_place", "create:funnel",													{ "building": 10 } );
addData( "req_place", "create:transposer",												{ "building": 10 } );
addData( "req_place", "create:linked_transposer",										{ "building": 10 } );
addData( "req_place", "create:analog_lever",											{ "building": 10 } );
addData( "req_place", "create:pulse_repeater",											{ "building": 10 } );
addData( "req_place", "create:adjustable_repeater",										{ "building": 10 } );
addData( "req_place", "create:adjustable_pulse_repeater",								{ "building": 10 } );
addData( "req_place", "create:powered_latch",											{ "building": 10 } );
addData( "req_place", "create:powered_toggle_latch",									{ "building": 10 } );
addData( "req_place", "create:belt_connector",											{ "building": 10 } );
addData( "req_place", "create:wand_of_symmetry",										{ "building": 20 } );
addData( "req_use", "create:sand_paper",												{ "smithing": 5 } );
addData( "req_use", "create:red_sand_paper",											{ "smithing": 5 } );
addData( "req_use", "create:tree_fertilizer",											{ "farming": 10 } );
addData( "req_use", "create:super_glue",												{ "building": 5 } );
addData( "xp_value_craft", "create:zinc_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:zinc_ingot",											{ "crafting": 0 } );
addData( "xp_value_craft", "create:zinc_block",											{ "crafting": 0 } );
addData( "xp_value_craft", "create:brass_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:brass_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:brass_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:copper_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:copper_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:copper_block",										{ "crafting": 0 } );
addData( "req_wear", "create:goggles",													{ "crafting": 25 } );
addData( "req_use", "create:wrench",													{ "crafting": 15 } );
addData( "req_tool", "create:deforester",												{ "woodcutting": 92 } );
addData( "req_weapon", "create:deforester",												{ "combat": 75 } );
addData( "req_craft", "create:redstone_link",											{ "crafting": 30, "building": 20 } );
addData( "req_place", "create:redstone_link",											{ "building": 20 } );
addData( "req_use", "create:redstone_link",												{ "crafting": 30 } );
addData( "xp_value_smelt", "create:copper_ore",											{ "smithing": 7 } );
addData( "info_smelt", "create:copper_ore",												{ "extraChance": 0.85 } );
addData( "xp_value_break", "create:copper_ore",											{ "mining": 7 } );
addData( "info_ore", "create:copper_ore",												{ "extraChance": 0.8 } );
addData( "xp_value_smelt", "create:zinc_ore",											{ "smithing": 16 } );
addData( "info_smelt", "create:zinc_ore",												{ "extraChance": 0.7 } );
addData( "xp_value_smelt", "create:crushed_iron_ore",									{ "smithing": 11 } );
addData( "info_smelt", "create:crushed_iron_ore",										{ "extraChance": 1.1 } );
addData( "xp_value_smelt", "create:crushed_gold_ore",									{ "smithing": 17 } );
addData( "info_smelt", "create:crushed_gold_ore",										{ "extraChance": 0.6 } );
addData( "xp_value_smelt", "create:crushed_copper_ore",									{ "smithing": 6.5 } );
addData( "info_smelt", "create:crushed_copper_ore",										{ "extraChance": 0.95 } );
addData( "xp_value_smelt", "create:crushed_zinc_ore",									{ "smithing": 15 } );
addData( "info_smelt", "create:crushed_zinc_ore",										{ "extraChance": 0.8 } );
addData( "xp_value_smelt", "create:crushed_brass_ore",									{ "smithing": 23.5 } );
addData( "info_smelt", "create:crushed_brass_ore",										{ "extraChance": 0.4 } );
addData( "xp_value_break", "create:zinc_ore",											{ "mining": 22 } );
addData( "info_ore", "create:zinc_ore",													{ "extraChance": 0.75 } );
addData( "xp_value_break", "create:dolomite",											{ "mining": 0.25 } );
addData( "xp_value_break", "create:polished_dolomite",									{ "mining": 0.25 } );
addData( "xp_value_smelt", "create:dough",												{ "cooking": 3.5 } );
}
addData2( "salvage", "create:dolomite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 55,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:gabbro",												{ "mining": 0.35 } );
addData( "xp_value_break", "create:polished_gabbro",									{ "mining": 0.35 } );
addData2( "salvage", "create:gabbro", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 40,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:limestone",											{ "mining": 0.3 } );
addData( "xp_value_break", "create:polished_limestone",									{ "mining": 0.3 } );
addData2( "salvage", "create:limestone", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:weathered_limestone",								{ "mining": 0.3 } );
addData( "xp_value_break", "create:polished_weathered_limestone",						{ "mining": 0.3 } );
addData2( "salvage", "create:weathered_limestone", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 40,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:scoria",												{ "mining": 0.35 } );
addData( "xp_value_break", "create:polished_scoria",									{ "mining": 0.35 } );
addData2( "salvage", "minecraft:scoria", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 55,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:dark_scoria",										{ "mining": 0.4 } );
addData( "xp_value_break", "create:polished_dark_scoria",								{ "mining": 0.4 } );
addData2( "salvage", "minecraft:dark_scoria", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 55,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:natural_scoria",										{ "mining": 0.65 } );
{
addData2( "treasure", "create:dolomite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "create:gabbro", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "create:limestone", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 2
} );
addData2( "treasure", "create:weathered_limestone", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "create:scoria", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "create:dark_scoria", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 2,
	"maxCount": 2
} );
addData2( "treasure", "create:natural_scoria", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 2,
	"endLevel": 200,
	"xpPerItem": 5,
	"minCount": 2,
	"maxCount": 4
} );
}
//Charm
{
addData( "fish_enchant_pool", "charm:curse_break",										{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "charm:homing",											{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "charm:salvage",											{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "charm:magnetic",											{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "xp_value_break", "charm:nether_gold_deposit",									{ "mining": 2 } );
addData( "xp_value_break", "charm:pig_iron_ore",										{ "mining": 12 } );
addData( "xp_value_smelt", "charm:nether_gold_deposit",									{ "smithing": 22 } );
addData( "xp_value_smelt", "charm:pig_iron_ore",										{ "smithing": 22 } );
addData( "info_smelt", "charm:nether_gold_deposit",										{ "extraChance": 0.75 } );
addData( "info_smelt", "charm:pig_iron_ore",											{ "extraChance": 0.75 } );
addData( "info_ore", "charm:pig_iron_ore",												{ "extraChance": 0.75 } );
}
//Quark
{
addData( "xp_value_break", "quark:blue_blossom_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "quark:lavender_blossom_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "quark:orange_blossom_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "quark:pink_blossom_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "quark:yellow_blossom_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "quark:red_blossom_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "quark:blue_blossom_sapling",								{ "farming": 2 } );
addData( "xp_value_break", "quark:lavender_blossom_sapling",							{ "farming": 2 } );
addData( "xp_value_break", "quark:orange_blossom_sapling",								{ "farming": 2 } );
addData( "xp_value_break", "quark:pink_blossom_sapling",								{ "farming": 2 } );
addData( "xp_value_break", "quark:yellow_blossom_sapling",								{ "farming": 2 } );
addData( "xp_value_break", "quark:red_blossom_sapling",									{ "farming": 2 } );
addData( "req_tool", "quark:pickarang", { "mining":40 });
addData( "req_tool", "quark:flamerang", { "mining":60 });
}
//Pams2 Addon (MultiPack)
{
addData( "xp_value_break", "pamhc2crops:sesameseedsitem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:mustardseedsitem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:agaveseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:amaranthseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:arrowrootseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:artichokeseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:asparagusseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:barleyseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:beanseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:bellpepperseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:blackberryseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:blueberryseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:broccoliseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:brusselsproutseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cabbageseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cactusfruitseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:candleberryseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cantaloupeseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cassavaseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cauliflowerseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:celeryseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:chickpeaseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:chilipepperseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:coffeebeanseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cornseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cottonseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cranberryseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:cucumberseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:eggplantseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:elderberryseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:flaxseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:garlicseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:gingerseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:grapeseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:greengrapeseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:huckleberryseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:jicamaseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:juniperberryseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:juteseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:kaleseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:kenafseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:kiwiseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:kohlrabiseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:leekseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:lentilseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:lettuceseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:milletseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:mulberryseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:mustardseedsseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:oatsseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:okraseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:onionseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:parsnipseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:peanutseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:peasseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:pineappleseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:quinoaseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:radishseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:raspberryseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:rhubarbseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:riceseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:rutabagaseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:ryeseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:scallionseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:sesameseedsseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:sisalseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:soybeanseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:spiceleafseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:spinachseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:strawberryseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:sweetpotatoseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:taroseeditem",									{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:tealeafseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:tomatilloseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:tomatoseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:turnipseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:waterchestnutseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:whitemushroomseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:wintersquashseeditem",							{ "farming": 1 } );
addData( "xp_value_break", "pamhc2crops:zucchiniseeditem",								{ "farming": 1 } );
addData( "xp_value_break", "pamhc2trees:pamorange",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamnutmeg",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamlemon",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamgooseberry",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamchestnut",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamcherry",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamcandlenut",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamavocado",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamapple",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampomegranate",								{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampeppercorn",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamolive",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampawpaw",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamwalnut",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampeach",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamapricot",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamcoconut",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamdurian",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampistachio",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampecan",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pammango",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamhazelnut",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamplum",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamsoursop",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pambanana",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamdate",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamfig",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampersimmon",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampapaya",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamlime",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamspiderweb",									{ "combat": 3 } );
addData( "xp_value_break", "pamhc2trees:pampear",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamalmond",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamcashew",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamdragonfruit",								{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamgrapefruit",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamlychee",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamjackfruit",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamguava",										{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pambreadfruit",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamvanillabean",								{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamstarfruit",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampinenut",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamtamarind",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pamrambutan",									{ "farming": 3 } );
addData( "xp_value_break", "pamhc2trees:pampassionfruit",								{ "farming": 3 } );
addData( "xp_value_grow", "pamhc2crops:sesameseedsitem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:mustardseedsitem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:agaveseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:amaranthseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:arrowrootseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:artichokeseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:asparagusseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:barleyseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:beanseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:bellpepperseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:blackberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:blueberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:broccoliseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:brusselsproutseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cabbageseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cactusfruitseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:candleberryseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cantaloupeseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cassavaseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cauliflowerseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:celeryseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:chickpeaseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:chilipepperseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:coffeebeanseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cornseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cottonseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cranberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:cucumberseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:eggplantseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:elderberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:flaxseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:garlicseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:gingerseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:grapeseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:greengrapeseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:huckleberryseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:jicamaseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:juniperberryseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:juteseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:kaleseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:kenafseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:kiwiseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:kohlrabiseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:leekseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:lentilseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:lettuceseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:milletseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:mulberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:mustardseedsseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:oatsseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:okraseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:onionseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:parsnipseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:peanutseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:peasseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:pineappleseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:quinoaseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:radishseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:raspberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:rhubarbseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:riceseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:rutabagaseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:ryeseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:scallionseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:sesameseedsseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:sisalseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:soybeanseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:spiceleafseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:spinachseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:strawberryseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:sweetpotatoseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:taroseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:tealeafseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:tomatilloseeditem",								{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:tomatoseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:turnipseeditem",									{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:waterchestnutseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:whitemushroomseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:wintersquashseeditem",							{ "farming": 9 } );
addData( "xp_value_grow", "pamhc2crops:zucchiniseeditem",								{ "farming": 9 } );
}
//BYG Addon
{
addData( "xp_value_break", "byg:byg_logo",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:aspen_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_aspen_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:baobab_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_baobab_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:blue_enchanted_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_blue_enchanted_log",							{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:cherry_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_cherry_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:cika_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_cika_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:cypress_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_cypress_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:ebony_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_ebony_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:ether_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_ether_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:fir_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_fir_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:green_enchanted_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_green_enchanted_log",							{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:holly_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_holly_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:jacaranda_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_jacaranda_log",								{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:lament_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_lament_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:mahogany_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_mahogany_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:mangrove_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_mangrove_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:maple_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_maple_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:nightshade_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_nightshade_log",								{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:palm_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_palm_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:palo_verde_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_palo_verde_log",								{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:pine_log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_pine_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:rainbow_eucalyptus_log",								{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_rainbow_eucalyptus_log",						{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:redwood_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_redwood_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:skyris_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_skyris_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:willow_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_willow_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:witch_hazel_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_witch_hazel_log",								{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:zelkova_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:stripped_zelkova_log",									{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:withering_oak_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "byg:aspen_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:baobab_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:blue_enchanted_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:pink_cherry_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:white_cherry_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:cika_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:cypress_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:ebony_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:ether_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:fir_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:green_enchanted_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:holly_berry_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:holly_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:jacaranda_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:indigo_jacaranda_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:lament_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:mahogany_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:mangrove_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:maple_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:red_maple_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:silver_maple_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:flowering_nightshade_leaves",							{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:nightshade_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:palm_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:flowering_palo_verde_leaves",							{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:palo_verde_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:pine_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:rainbow_eucalyptus_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:redwood_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:green_apple_skyris_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:skyris_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:willow_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:blooming_witch_hazel_leaves",							{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:witch_hazel_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:zelkova_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:withering_oak_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:araucaria_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:blue_spruce_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:brown_birch_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:brown_oak_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:brown_zelkova_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:joshua_leaves",											{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:ripe_joshua_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:orange_birch_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:orange_oak_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:orange_spruce_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:ripe_orchard_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:flowering_orchard_leaves",								{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:orchard_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:red_birch_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:red_oak_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:red_spruce_leaves",										{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:yellow_birch_leaves",									{ "woodcutting": 1 } );
addData( "xp_value_break", "byg:yellow_spruce_leaves",									{ "woodcutting": 1 } );
addData( "req_weapon", "byg:pendorite_sword",  {"combat": 75});
addData( "req_weapon", "byg:pendorite_hoe",  {"combat": 75});
addData( "req_weapon", "byg:pendorite_shovel",  {"combat": 75});
addData( "req_weapon", "byg:pendorite_pickaxe",  {"combat": 75});
addData( "req_weapon", "byg:pendorite_axe",  {"combat": 75});
addData( "req_weapon", "byg:pendorite_battleaxe",  {"combat": 75});
addData( "req_tool", "byg:pendorite_pickaxe", {"mining": 80});
addData( "req_tool", "byg:pendorite_axe", {"woodcutting": 80});
addData( "req_tool", "byg:pendorite_shovel", {"excavation": 80});
addData( "req_tool", "byg:pendorite_hoe", {"farming": 80});
addData( "req_wear", "byg:ametrine_helmet", {"endurance": 75});
addData( "req_wear", "byg:ametrine_chestplate", {"endurance": 75});
addData( "req_wear", "byg:ametrine_leggings", {"endurance": 75});
addData( "req_wear", "byg:ametrine_boots", {"endurance": 75});
}
//ExtendedStorage Addon
{
addData( "req_craft", "expandedstorage:iron_chest", { "crafting": 5 } );
addData( "req_craft", "expandedstorage:wood_to_iron_conversion_kit", { "crafting": 5 } );
addData( "req_craft", "expandedstorage:gold_chest", { "crafting": 10 } );
addData( "req_craft", "expandedstorage:wood_to_gold_conversion_kit", { "crafting": 10 } );
addData( "req_craft", "expandedstorage:iron_to_gold_conversion_kit", { "crafting": 10 } );
addData( "req_craft", "expandedstorage:diamond_chest", { "crafting": 20 } );
addData( "req_craft", "expandedstorage:wood_to_diamond_conversion_kit", { "crafting": 20 } );
addData( "req_craft", "expandedstorage:iron_to_diamond_conversion_kit", { "crafting": 20 } );
addData( "req_craft", "expandedstorage:gold_to_diamond_conversion_kit", { "crafting": 20 } );
addData( "req_craft", "expandedstorage:obsidian_chest", { "crafting": 30 } );
addData( "req_craft", "expandedstorage:wood_to_obsidian_conversion_kit", { "crafting": 30 } );
addData( "req_craft", "expandedstorage:iron_to_obsidian_conversion_kit", { "crafting": 30 } );
addData( "req_craft", "expandedstorage:gold_to_obsidian_conversion_kit", { "crafting": 30 } );
addData( "req_craft", "expandedstorage:diamond_to_obsidian_conversion_kit", { "crafting": 30 } );
addData( "req_craft", "expandedstorage:netherite_chest", { "crafting": 60 } );
addData( "req_craft", "expandedstorage:wood_to_netherite_conversion_kit", { "crafting": 60 } );
addData( "req_craft", "expandedstorage:iron_to_netherite_conversion_kit", { "crafting": 60 } );
addData( "req_craft", "expandedstorage:gold_to_netherite_conversion_kit", { "crafting": 60 } );
addData( "req_craft", "expandedstorage:diamond_to_netherite_conversion_kit", { "crafting": 60 } );
addData( "req_craft", "expandedstorage:obsidian_to_netherite_conversion_kit", { "crafting": 60 } );
}
//Mining Addon
{
addData( "req_craft", "mining_dimension:teleporter", { "smithing": 10, "crafting": 15, "mining":20 } );
addData( "req_craft", "mininggadgets:mininggadget", { "crafting": 80, "mining": 70 } );
addData( "req_tool", "mininggadgets:mininggadget", { "mining": 80 } );
}
//StorageNetworks Addon
{
addData( "req_craft", "storagenetwork:inventory", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:master", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:request", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:kabel", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:storage_kabel", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:import_kabel", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:import_filter_kabel", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:filter_kabel", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:export_kabel", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:exchange", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:collector", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:stack_upgrade", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:speed_upgrade", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:inventory_remote", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:crafting_remote", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:picker_remote", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:collector_remote", { "crafting": 100, "smithing":100 });
addData( "req_craft", "storagenetwork:builder_remote", { "crafting": 100, "smithing":100 });
}
//Spartan Weapons/Shields Addon
{
//wood
addData( "req_weapon", "spartanweaponry:boomerang_wood", { "combat" : 1 } );
addData( "req_weapon", "spartanweaponry:flanged_mace_wood", { "combat" : 1 } );
addData( "req_weapon", "spartanweaponry:spartanweaponry:club_wood", { "combat" : 1 } );
addData( "req_weapon", "spartanweaponry:dagger_wood", { "combat": 1, "agility": 1 } );
addData( "req_weapon", "spartanweaponry:tomahawk_wood", { "combat": 1, "agility": 1 } );
addData( "req_weapon", "spartanweaponry:throwing_knife_wood", { "combat": 1, "agility": 1 } );
addData( "req_weapon", "spartanweaponry:pike_wood", { "combat": 1, "agility": 1 } );
addData( "req_weapon", "spartanweaponry:quarterstaff_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:glaive_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:halberd_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:spear_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:warhammer_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:javelin_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:lance_wood", { "combat": 1, "agility": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:arrow_wood", { "combat": 1, "archery": 1 } );
addData( "req_weapon", "spartanweaponry:longbow_wood", { "combat": 1, "archery": 1 } );
addData( "req_weapon", "minecraft:crossbow", { "combat": 1, "archery": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:heavy_crossbow_wood", { "combat": 1, "archery": 1, "endurance": 1 } );
addData( "req_weapon", "minecraft:shield", { "combat": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:longsword_wood", { "combat": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:battleaxe_wood", { "combat": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:greatsword_wood", { "combat": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:hammer_wood", { "combat": 1, "endurance": 1 } );
addData( "req_weapon", "spartanweaponry:saber_wood", { "combat": 1, "swimming": 1 } );
addData( "req_weapon", "spartanweaponry:katana_wood", { "combat": 1, "smithing": 1 } );
//stone
addData( "req_weapon", "spartanshields:shield_basic_stone", {"combat": 3});
addData( "req_weapon", "spartanweaponry:boomerang_stone", {"combat": 3});
addData( "req_weapon", "spartanweaponry:flanged_mace_stone", {"combat": 3});
addData( "req_weapon", "spartanweaponry:rapier_stone", {"combat": 3, "agility": 3});
addData( "req_weapon", "spartanweaponry:tomahawk_stone", {"combat": 3, "agility": 3});
addData( "req_weapon", "spartanweaponry:throwing_knife_stone", {"combat": 3, "agility": 3});
addData( "req_weapon", "spartanweaponry:dagger_stone", {"combat": 3, "agility": 3});
addData( "req_weapon", "spartanweaponry:katana_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:warhammer_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:glaive_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:spear_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:pike_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:halberd_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:lance_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:quarterstaff_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:javelin_stone", {"combat": 3, "agility": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:battleaxe_stone", {"combat": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:hammer_stone", {"combat": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:longsword_stone", {"combat": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:greatsword_stone", {"combat": 3, "endurance": 3});
addData( "req_weapon", "spartanshields:shield_tower_stone", {"combat": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:saber_stone", {"combat": 3, "swimming": 3});
addData( "req_weapon", "spartanweaponry:heavy_crossbow_leather", {"combat": 3, "archery": 3, "endurance": 3});
addData( "req_weapon", "spartanweaponry:longbow_leather", {"combat": 3, "archery": 3 });
//iron
addData( "req_weapon", "spartanweaponry:glaive_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:quarterstaff_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:longbow_iron",  {"combat": 15, "archery": 15});
addData( "req_weapon", "spartanweaponry:heavy_crossbow_iron",  {"combat": 15, "archery": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:arrow_iron",  {"combat": 15, "archery": 15});
addData( "req_weapon", "spartanshields:shield_tower_iron",  {"combat": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:hammer_iron",  {"combat": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:battleaxe_iron",  {"combat": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:longsword_iron",  {"combat": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:greatsword_iron",  {"combat": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:saber_iron",  {"combat": 15, "swimming": 15});
addData( "req_weapon", "spartanweaponry:katana_iron",  {"combat": 15, "agility": 15, "smithing": 15});
addData( "req_weapon", "spartanshields:shield_basic_iron",  {"combat": 15});
addData( "req_weapon", "spartanweaponry:boomerang_iron",  {"combat": 15});
addData( "req_weapon", "spartanweaponry:flanged_mace_iron",  {"combat": 15});
addData( "req_weapon", "spartanweaponry:throwing_knife_iron",  {"combat": 15, "agility": 15});
addData( "req_weapon", "spartanweaponry:tomahawk_iron",  {"combat": 15, "agility": 15});
addData( "req_weapon", "spartanweaponry:dagger_iron",  {"combat": 15, "agility": 15});
addData( "req_weapon", "spartanweaponry:rapier_iron",  {"combat": 15, "agility": 15});
addData( "req_weapon", "spartanweaponry:javelin_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:warhammer_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:spear_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:halberd_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:pike_iron",  {"combat": 15, "agility": 15, "endurance": 15});
addData( "req_weapon", "spartanweaponry:lance_iron",  {"combat": 15, "agility": 15, "endurance": 15});
//gold
addData( "req_weapon", "spartanweaponry:glaive_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:quarterstaff_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:longbow_gold",  {"combat": 30, "archery": 30});
addData( "req_weapon", "spartanweaponry:heavy_crossbow_gold",  {"combat": 30, "archery": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:arrow_gold",  {"combat": 30, "archery": 30});
addData( "req_weapon", "spartanshields:shield_tower_gold",  {"combat": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:hammer_gold",  {"combat": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:battleaxe_gold",  {"combat": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:longsword_gold",  {"combat": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:greatsword_gold",  {"combat": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:saber_gold",  {"combat": 30, "swimming": 30});
addData( "req_weapon", "spartanweaponry:katana_gold",  {"combat": 30, "agility": 30, "smithing": 30});
addData( "req_weapon", "spartanshields:shield_basic_gold",  {"combat": 30});
addData( "req_weapon", "spartanweaponry:boomerang_gold",  {"combat": 30});
addData( "req_weapon", "spartanweaponry:flanged_mace_gold",  {"combat": 30});
addData( "req_weapon", "spartanweaponry:throwing_knife_gold",  {"combat": 30, "agility": 30});
addData( "req_weapon", "spartanweaponry:tomahawk_gold",  {"combat": 30, "agility": 30});
addData( "req_weapon", "spartanweaponry:dagger_gold",  {"combat": 30, "agility": 30});
addData( "req_weapon", "spartanweaponry:rapier_gold",  {"combat": 30, "agility": 30});
addData( "req_weapon", "spartanweaponry:javelin_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:warhammer_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:spear_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:halberd_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:pike_gold",  {"combat": 30, "agility": 30, "endurance": 30});
addData( "req_weapon", "spartanweaponry:lance_gold",  {"combat": 30, "agility": 30, "endurance": 30});
//diamond
addData( "req_weapon", "spartanweaponry:glaive_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:quarterstaff_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:longbow_diamond",  {"combat": 40, "archery": 40});
addData( "req_weapon", "spartanweaponry:heavy_crossbow_diamond",  {"combat": 40, "archery": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:arrow_diamond",  {"combat": 40, "archery": 40});
addData( "req_weapon", "spartanshields:shield_tower_diamond",  {"combat": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:hammer_diamond",  {"combat": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:battleaxe_diamond",  {"combat": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:longsword_diamond",  {"combat": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:greatsword_diamond",  {"combat": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:saber_diamond",  {"combat": 40, "swimming": 40});
addData( "req_weapon", "minecraft:trident",  {"combat": 40, "swimming": 40});
addData( "req_weapon", "spartanweaponry:katana_diamond",  {"combat": 40, "agility": 40, "smithing": 40});
addData( "req_weapon", "spartanshields:shield_basic_diamond",  {"combat": 40});
addData( "req_weapon", "spartanweaponry:boomerang_diamond",  {"combat": 40});
addData( "req_weapon", "spartanweaponry:flanged_mace_diamond",  {"combat": 40});
addData( "req_weapon", "spartanweaponry:throwing_knife_diamond",  {"combat": 40, "agility": 40});
addData( "req_weapon", "spartanweaponry:tomahawk_diamond",  {"combat": 40, "agility": 40});
addData( "req_weapon", "spartanweaponry:dagger_diamond",  {"combat": 40, "agility": 40});
addData( "req_weapon", "spartanweaponry:rapier_diamond",  {"combat": 40, "agility": 40});
addData( "req_weapon", "spartanweaponry:javelin_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:warhammer_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:spear_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:halberd_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:pike_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
addData( "req_weapon", "spartanweaponry:lance_diamond",  {"combat": 40, "agility": 40, "endurance": 40});
//netherite
addData( "req_weapon", "spartanshields:shield_basic_netherite",  {"combat": 60});
addData( "req_weapon", "spartanweaponry:boomerang_netherite",  {"combat": 60});
addData( "req_weapon", "spartanweaponry:flanged_mace_netherite",  {"combat": 60});
addData( "req_weapon", "spartanweaponry:throwing_knife_netherite",  {"combat": 60, "agility": 60});
addData( "req_weapon", "spartanweaponry:tomahawk_netherite",  {"combat": 60, "agility": 60});
addData( "req_weapon", "spartanweaponry:dagger_netherite",  {"combat": 60, "agility": 60});
addData( "req_weapon", "spartanweaponry:rapier_netherite",  {"combat": 60, "agility": 60});
addData( "req_weapon", "spartanweaponry:spear_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:pike_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:glaive_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:warhammer_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:halberd_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:quarterstaff_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:javelin_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:lance_netherite",  {"combat": 60, "agility": 60, "endurance":60});
addData( "req_weapon", "spartanweaponry:longbow_netherite",  {"combat": 60, "archery": 60});
addData( "req_weapon", "spartanweaponry:heavy_crossbow_netherite",  {"combat": 60, "archery": 60, "endurance": 60});
addData( "req_weapon", "spartanshields:shield_tower_netherite",  {"combat": 60, "endurance": 60});
addData( "req_weapon", "spartanweaponry:greatsword_netherite",  {"combat": 60, "endurance": 60});
addData( "req_weapon", "spartanweaponry:longsword_netherite",  {"combat": 60, "endurance": 60});
addData( "req_weapon", "spartanweaponry:battleaxe_netherite",  {"combat": 60, "endurance": 60});
addData( "req_weapon", "spartanweaponry:hammer_netherite",  {"combat": 60, "endurance": 60});
addData( "req_weapon", "spartanweaponry:saber_netherite",  {"combat": 60, "swimming": 60});
addData( "req_weapon", "spartanweaponry:katana_netherite",  {"combat": 60, "endurance": 60, "smithing": 60});
//copper
addData( "req_weapon", "spartanweaponry:pike_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:lance_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:glaive_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:halberd_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:quarterstaff_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:longbow_copper",  {"combat": 10, "archery": 10});
addData( "req_weapon", "spartanweaponry:heavy_crossbow_copper",  {"combat": 10, "archery": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:battleaxe_copper",  {"combat": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:greatsword_copper",  {"combat": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:longsword_copper",  {"combat": 10, "endurance": 10});
addData( "req_weapon", "spartanshields:shield_tower_copper",  {"combat": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:hammer_copper",  {"combat": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:saber_copper",  {"combat": 10, "swimming": 10});
addData( "req_weapon", "spartanweaponry:katana_copper",  {"combat": 10, "endurance": 10, "smithing": 10});
addData( "req_weapon", "spartanshields:shield_basic_copper",  {"combat": 10});
addData( "req_weapon", "spartanweaponry:boomerang_copper",  {"combat": 10});
addData( "req_weapon", "spartanweaponry:flanged_mace_copper",  {"combat": 10});
addData( "req_weapon", "spartanweaponry:throwing_knife_copper",  {"combat": 10, "agility": 10});
addData( "req_weapon", "spartanweaponry:dagger_copper",  {"combat": 10, "agility": 10});
addData( "req_weapon", "spartanweaponry:tomahawk_copper",  {"combat": 10, "agility": 10});
addData( "req_weapon", "spartanweaponry:rapier_copper",  {"combat": 10, "agility": 10});
addData( "req_weapon", "spartanweaponry:spear_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:javelin_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "req_weapon", "spartanweaponry:warhammer_copper",  {"combat": 10, "agility": 10, "endurance": 10});
addData( "item_specific", "minecraft:bow", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_wood", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_iron", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_gold", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_diamond", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_netherite", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_copper", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:longbow_leather", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_wood", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_iron", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_gold", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_diamond", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_netherite", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_copper", { "archeryWeapon": 1.5 });
addData( "item_specific", "spartanweaponry:heavy_crossbow_leather", { "archeryWeapon": 1.5 });
}
//Farmers Delight Addon
{

}
//GemsNJewels Addon
{
addData( "req_wear", "gemsnjewels:aquamarine_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:aquamarine_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:aquamarine_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:aquamarine_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:zircon_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:zircon_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:zircon_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:zircon_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:peridot_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:peridot_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:peridot_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:peridot_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tanzanite_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tanzanite_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tanzanite_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tanzanite_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tourmaline_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tourmaline_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tourmaline_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:tourmaline_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:black_opal_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:black_opal_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:black_opal_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:black_opal_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:iolite_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:iolite_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:iolite_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:iolite_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:kunzite_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:kunzite_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:kunzite_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:kunzite_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:ametrine_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:ametrine_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:ametrine_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:ametrine_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:morganite_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:morganite_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:morganite_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:morganite_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:citrine_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:citrine_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:citrine_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:citrine_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:emerald_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:emerald_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:emerald_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:emerald_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:amethyst_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:amethyst_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:amethyst_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:amethyst_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:opal_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:opal_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:opal_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:opal_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:garnet_helmet", {"endurance": 35});
addData( "req_wear", "gemsnjewels:garnet_chestplate", {"endurance": 35});
addData( "req_wear", "gemsnjewels:garnet_leggings", {"endurance": 35});
addData( "req_wear", "gemsnjewels:garnet_boots", {"endurance": 35});
addData( "req_wear", "gemsnjewels:topaz_helmet", {"endurance": 40});
addData( "req_wear", "gemsnjewels:topaz_chestplate", {"endurance": 40});
addData( "req_wear", "gemsnjewels:topaz_leggings", {"endurance": 40});
addData( "req_wear", "gemsnjewels:topaz_boots", {"endurance": 40});
addData( "req_wear", "gemsnjewels:alexandrite_helmet", {"endurance": 40});
addData( "req_wear", "gemsnjewels:alexandrite_chestplate", {"endurance": 40});
addData( "req_wear", "gemsnjewels:alexandrite_leggings", {"endurance": 40});
addData( "req_wear", "gemsnjewels:alexandrite_boots", {"endurance": 40});
addData( "req_wear", "gemsnjewels:ruby_helmet", {"endurance": 40});
addData( "req_wear", "gemsnjewels:ruby_chestplate", {"endurance": 40});
addData( "req_wear", "gemsnjewels:ruby_leggings", {"endurance": 40});
addData( "req_wear", "gemsnjewels:ruby_boots", {"endurance": 40});
addData( "req_wear", "gemsnjewels:sapphire_helmet", {"endurance": 40});
addData( "req_wear", "gemsnjewels:sapphire_chestplate", {"endurance": 40});
addData( "req_wear", "gemsnjewels:sapphire_leggings", {"endurance": 40});
addData( "req_wear", "gemsnjewels:sapphire_boots", {"endurance": 40});
addData( "req_wear", "gemsnjewels:spinel_helmet", {"endurance": 40});
addData( "req_wear", "gemsnjewels:spinel_chestplate", {"endurance": 40});
addData( "req_wear", "gemsnjewels:spinel_leggings", {"endurance": 40});
addData( "req_wear", "gemsnjewels:spinel_boots", {"endurance": 40});
//iron
addData( "req_tool", "gemsnjewels:diamond_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:emerald_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:ruby_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:sapphire_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:amethyst_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:opal_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:garnet_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:topaz_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:peridot_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:aquamarine_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:zircon_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:alexandrite_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:tanzanite_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:tourmaline_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:spinel_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:black_opal_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:citrine_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:morganite_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:ametrine_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:iolite_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:kunzite_set_iron_sword",  {"combat": 15});
addData( "req_tool", "gemsnjewels:diamond_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:emerald_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:ruby_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:sapphire_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:amethyst_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:opal_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:garnet_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:topaz_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:peridot_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:aquamarine_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:zircon_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:alexandrite_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:tanzanite_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:tourmaline_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:spinel_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:black_opal_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:citrine_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:morganite_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:ametrine_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:iolite_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:kunzite_set_iron_pickaxe",  {"mining": 15});
addData( "req_tool", "gemsnjewels:diamond_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:emerald_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:ruby_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:sapphire_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:amethyst_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:opal_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:garnet_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:topaz_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:peridot_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:aquamarine_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:zircon_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:alexandrite_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:tanzanite_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:tourmaline_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:spinel_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:black_opal_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:citrine_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:morganite_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:ametrine_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:iolite_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:kunzite_set_iron_axe",  {"woodcutting": 15});
addData( "req_tool", "gemsnjewels:diamond_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:emerald_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:ruby_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:sapphire_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:amethyst_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:opal_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:garnet_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:topaz_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:peridot_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:aquamarine_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:zircon_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:alexandrite_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:tanzanite_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:tourmaline_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:spinel_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:black_opal_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:citrine_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:morganite_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:ametrine_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:iolite_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:kunzite_set_iron_shovel",  {"excavation": 15});
addData( "req_tool", "gemsnjewels:diamond_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:emerald_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:ruby_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:sapphire_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:amethyst_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:opal_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:garnet_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:topaz_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:peridot_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:aquamarine_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:zircon_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:alexandrite_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:tanzanite_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:tourmaline_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:spinel_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:black_opal_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:citrine_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:morganite_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:ametrine_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:iolite_set_iron_hoe",  {"farming": 15});
addData( "req_tool", "gemsnjewels:kunzite_set_iron_hoe",  {"farming": 15});
//gold
addData( "req_tool", "gemsnjewels:diamond_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:emerald_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:ruby_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:sapphire_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:amethyst_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:opal_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:garnet_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:topaz_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:peridot_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:aquamarine_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:zircon_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:alexandrite_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:tanzanite_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:tourmaline_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:spinel_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:black_opal_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:citrine_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:morganite_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:ametrine_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:iolite_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:kunzite_set_gold_sword",  {"combat": 30});
addData( "req_tool", "gemsnjewels:diamond_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:emerald_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:ruby_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:sapphire_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:amethyst_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:opal_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:garnet_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:topaz_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:peridot_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:aquamarine_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:zircon_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:alexandrite_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:tanzanite_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:tourmaline_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:spinel_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:black_opal_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:citrine_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:morganite_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:ametrine_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:iolite_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:kunzite_set_gold_pickaxe",  {"mining": 30});
addData( "req_tool", "gemsnjewels:diamond_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:emerald_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:ruby_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:sapphire_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:amethyst_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:opal_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:garnet_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:topaz_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:peridot_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:aquamarine_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:zircon_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:alexandrite_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:tanzanite_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:tourmaline_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:spinel_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:black_opal_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:citrine_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:morganite_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:ametrine_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:iolite_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:kunzite_set_gold_axe",  {"woodcutting": 30});
addData( "req_tool", "gemsnjewels:diamond_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:emerald_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:ruby_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:sapphire_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:amethyst_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:opal_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:garnet_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:topaz_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:peridot_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:aquamarine_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:zircon_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:alexandrite_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:tanzanite_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:tourmaline_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:spinel_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:black_opal_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:citrine_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:morganite_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:ametrine_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:iolite_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:kunzite_set_gold_shovel",  {"excavation": 30});
addData( "req_tool", "gemsnjewels:diamond_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:emerald_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:ruby_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:sapphire_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:amethyst_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:opal_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:garnet_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:topaz_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:peridot_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:aquamarine_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:zircon_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:alexandrite_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:tanzanite_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:tourmaline_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:spinel_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:black_opal_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:citrine_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:morganite_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:ametrine_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:iolite_set_gold_hoe",  {"farming": 30});
addData( "req_tool", "gemsnjewels:kunzite_set_gold_hoe",  {"farming": 30});
//diamond
addData( "req_tool", "gemsnjewels:diamond_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:emerald_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:ruby_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:sapphire_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:amethyst_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:opal_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:garnet_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:topaz_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:peridot_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:aquamarine_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:zircon_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:alexandrite_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:tanzanite_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:tourmaline_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:spinel_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:black_opal_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:citrine_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:morganite_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:ametrine_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:iolite_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:kunzite_set_diamond_sword",  {"combat": 40});
addData( "req_tool", "gemsnjewels:diamond_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:emerald_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:ruby_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:sapphire_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:amethyst_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:opal_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:garnet_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:topaz_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:peridot_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:aquamarine_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:zircon_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:alexandrite_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:tanzanite_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:tourmaline_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:spinel_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:black_opal_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:citrine_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:morganite_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:ametrine_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:iolite_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:kunzite_set_diamond_pickaxe",  {"mining": 40});
addData( "req_tool", "gemsnjewels:diamond_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:emerald_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:ruby_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:sapphire_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:amethyst_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:opal_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:garnet_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:topaz_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:peridot_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:aquamarine_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:zircon_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:alexandrite_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:tanzanite_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:tourmaline_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:spinel_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:black_opal_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:citrine_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:morganite_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:ametrine_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:iolite_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:kunzite_set_diamond_axe",  {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:diamond_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:emerald_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:ruby_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:sapphire_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:amethyst_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:opal_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:garnet_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:topaz_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:peridot_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:aquamarine_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:zircon_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:alexandrite_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:tanzanite_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:tourmaline_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:spinel_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:black_opal_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:citrine_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:morganite_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:ametrine_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:iolite_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:kunzite_set_diamond_shovel",  {"excavation": 40});
addData( "req_tool", "gemsnjewels:diamond_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:emerald_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:ruby_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:sapphire_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:amethyst_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:opal_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:garnet_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:topaz_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:peridot_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:aquamarine_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:zircon_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:alexandrite_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:tanzanite_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:tourmaline_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:spinel_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:black_opal_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:citrine_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:morganite_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:ametrine_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:iolite_set_diamond_hoe",  {"farming": 40});
addData( "req_tool", "gemsnjewels:kunzite_set_diamond_hoe",  {"farming": 40});
//netherite
addData( "req_tool", "gemsnjewels:diamond_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:emerald_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:ruby_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:sapphire_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:amethyst_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:opal_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:garnet_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:topaz_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:peridot_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:aquamarine_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:zircon_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:alexandrite_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:tanzanite_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:tourmaline_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:spinel_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:black_opal_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:citrine_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:morganite_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:ametrine_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:iolite_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:kunzite_set_netherite_sword",  {"combat": 60});
addData( "req_tool", "gemsnjewels:diamond_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:emerald_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:ruby_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:sapphire_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:amethyst_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:opal_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:garnet_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:topaz_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:peridot_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:aquamarine_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:zircon_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:alexandrite_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:tanzanite_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:tourmaline_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:spinel_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:black_opal_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:citrine_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:morganite_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:ametrine_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:iolite_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:kunzite_set_netherite_pickaxe",  {"mining": 60});
addData( "req_tool", "gemsnjewels:diamond_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:emerald_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:ruby_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:sapphire_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:amethyst_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:opal_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:garnet_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:topaz_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:peridot_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:aquamarine_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:zircon_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:alexandrite_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:tanzanite_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:tourmaline_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:spinel_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:black_opal_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:citrine_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:morganite_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:ametrine_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:iolite_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:kunzite_set_netherite_axe",  {"woodcutting": 60});
addData( "req_tool", "gemsnjewels:diamond_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:emerald_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:ruby_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:sapphire_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:amethyst_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:opal_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:garnet_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:topaz_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:peridot_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:aquamarine_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:zircon_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:alexandrite_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:tanzanite_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:tourmaline_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:spinel_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:black_opal_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:citrine_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:morganite_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:ametrine_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:iolite_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:kunzite_set_netherite_shovel",  {"excavation": 60});
addData( "req_tool", "gemsnjewels:diamond_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:emerald_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:ruby_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:sapphire_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:amethyst_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:opal_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:garnet_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:topaz_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:peridot_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:aquamarine_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:zircon_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:alexandrite_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:tanzanite_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:tourmaline_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:spinel_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:black_opal_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:citrine_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:morganite_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:ametrine_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:iolite_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:kunzite_set_netherite_hoe",  {"farming": 60});
addData( "req_tool", "gemsnjewels:solid_tourmaline_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_emerald_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_black_opal_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_morganite_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_ametrine_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_citrine_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_kunzite_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_opal_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_garnet_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_amethyst_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_peridot_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_aquamarine_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_zircon_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_tanzanite_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_iolite_pickaxe", {"mining": 35});
addData( "req_tool", "astralsorcery:crystal_pickaxe", {"mining": 35});
addData( "req_tool", "gemsnjewels:solid_tourmaline_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_emerald_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_black_opal_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_morganite_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_ametrine_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_citrine_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_kunzite_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_opal_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_garnet_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_amethyst_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_peridot_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_aquamarine_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_zircon_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_tanzanite_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_iolite_shovel", {"excavation": 35});
addData( "req_tool", "astralsorcery:crystal_shovel", {"excavation": 35});
addData( "req_tool", "gemsnjewels:solid_tourmaline_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_emerald_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_black_opal_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_morganite_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_ametrine_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_citrine_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_kunzite_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_opal_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_garnet_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_amethyst_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_peridot_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_aquamarine_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_zircon_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_tanzanite_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_iolite_axe", {"woodcutting": 35});
addData( "req_tool", "gemsnjewels:solid_tourmaline_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_emerald_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_black_opal_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_morganite_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_ametrine_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_citrine_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_kunzite_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_opal_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_garnet_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_amethyst_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_peridot_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_aquamarine_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_zircon_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_tanzanite_hoe", {"farming": 35});
addData( "req_tool", "gemsnjewels:solid_iolite_hoe", {"farming": 35});
addData( "req_tool", "astralsorcery:infused_crystal_pickaxe", {"mining": 40});
addData( "req_tool", "gemsnjewels:solid_sapphire_hoe", {"farming": 40});
addData( "req_tool", "gemsnjewels:solid_topaz_hoe", {"farming": 40});
addData( "req_tool", "gemsnjewels:solid_spinel_hoe", {"farming": 40});
addData( "req_tool", "gemsnjewels:solid_ruby_hoe", {"farming": 40});
addData( "req_tool", "gemsnjewels:solid_alexandrite_hoe", {"farming": 40});
addData( "req_tool", "gemsnjewels:solid_sapphire_axe", {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:solid_topaz_axe", {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:solid_spinel_axe", {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:solid_ruby_axe", {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:solid_alexandrite_axe", {"woodcutting": 40});
addData( "req_tool", "gemsnjewels:solid_sapphire_shovel", {"excavation": 40});
addData( "req_tool", "gemsnjewels:solid_topaz_shovel", {"excavation": 40});
addData( "req_tool", "gemsnjewels:solid_spinel_shovel", {"excavation": 40});
addData( "req_tool", "gemsnjewels:solid_ruby_shovel", {"excavation": 40});
addData( "req_tool", "gemsnjewels:solid_alexandrite_shovel", {"excavation": 40});
addData( "req_tool", "gemsnjewels:solid_sapphire_pickaxe", {"mining": 40});
addData( "req_tool", "gemsnjewels:solid_topaz_pickaxe", {"mining": 40});
addData( "req_tool", "gemsnjewels:solid_spinel_pickaxe", {"mining": 40});
addData( "req_tool", "gemsnjewels:solid_ruby_pickaxe", {"mining": 40});
addData( "req_tool", "gemsnjewels:solid_alexandrite_pickaxe", {"mining": 40});
}
//Test Name
{
}
function addData2( dataKey, regKey, entryKey, entryObject, probe )
{
	if( probe != null )
		console.log( `Warning: addData has 1 too many arguments at "${dataKey}" -> ${regKey} -> ${entryKey} -> ${stringify( entryObject )}: ${probe}` );

	dataKey = dataKey.toString();
	regKey = regKey.toString();
	entryKey = entryKey.toString();

	if( entryObject.constructor != jsonConstructor )
	{
		console.log( `Error: "${stringify( entryObject )}" is not a json object! -> "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		return;
	}

	if( dataKey.includes( " " ) )
	{
		console.log( `Warning: "${dataKey}" has a space in it! "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		dataKey = dataKey.replace( / /g, "" );
	}
	if( regKey.includes( " " ) )
	{
		console.log( `Warning: "${regKey}" has a space in it! "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		regKey = regKey.replace( / /g, "" );
	}
	if( entryKey.includes( " " ) )
	{
		console.log( `Warning: "${entryKey}" has a space in it! "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		entryKey = entryKey.replace( / /g, "" );
	}
	
	Object.keys( entryObject ).forEach( key =>
	{
		if( key.includes( " " ) )
		{
			console.log( `Warning: "${key}" has a space in it! -> "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
			entryObject[ key.replace( / /g, "" ) ] = entryObject[ key ];
			delete entryObject[ key ];
		}
	});

	if( validKeys2.includes( dataKey ) )
	{
		if( data2[ dataKey ] == null )
			data2[ dataKey ] = {};
		if( data2[ dataKey ][ regKey ] == null )
			data2[ dataKey ][ regKey ] = {};
		
		if( data2[ dataKey ][ regKey ][ entryKey ] != null )
			console.log( `${++dupes2} Warning: duplicate entry of ${entryKey} in ${regKey} in ${dataKey}` )
		data2[ dataKey ][ regKey ][ entryKey ] = entryObject;
	}
	else
		console.log( `invalid key "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
}

function addData( dataKey, regKey, entryObject, probe )
{
	// Debug
	// if( /*dataKey == "req_wear" || dataKey == "req_tool" || dataKey == "req_weapon" ||*/ dataKey == "req_enchant" || dataKey == "req_craft" || dataKey == "req_place" || dataKey == "req_break" || dataKey == "req_kill" )
	// Object.keys( entryObject ).forEach( key =>
	// {
	// 	if( entryObject[ key ] >= 40 )
	// 		console.log( `${dataKey}, ${regKey}, ${key}: ${entryObject[ key ]}` );
	// });

	if( dataKey == "skills" )
		validSkills.push( regKey );

	if( probe != null )
		console.log( `Warning: addData has 1 too many arguments at "${dataKey}" -> "${regKey}" -> ${stringify( entryObject ) }: ${probe}` );

	dataKey = dataKey.toString();
	regKey = regKey.toString();

	if( entryObject.constructor != jsonConstructor )
	{
		console.log( `Error: "${stringify( entryObject )}" is not a json object! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
		return;
	}

	if( dataKey.includes( " " ) )
	{
		console.log( `Warning: "${dataKey}" has a space in it! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
		dataKey = dataKey.replace( / /g, "" );
	}
	if( regKey.includes( " " ) )
	{
		console.log( `Warning: "${regKey}" has a space in it! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
		regKey = regKey.replace( / /g, "" );
	}

	if( dataKey != "level_up_command" )
	{
		Object.keys( entryObject ).forEach( key =>
		{
			if( key.includes( " " ) )
			{
				console.log( `Warning: "${key}" has a space in it! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
				entryObject[ key.replace( / /g, "" ) ] = entryObject[ key ];
				delete entryObject[ key ];
			}
		});
	}

	if( validKeys.includes( dataKey ) )
	{
		if( data[ dataKey ] == null )
		data[ dataKey ] = {};
	
		if( data[ dataKey ][ regKey ] != null )
			console.log( `${++dupes} Warning: duplicate entry of ${regKey} in ${dataKey}` );
		data[ dataKey ][ regKey ] = entryObject;
	}
	else
		console.log( `invalid key "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
}

function stringify( object )
{
	return JSON.stringify( object, null, "\t" ).replace(/: {\n([\t]*)\t/g, ":\n$1{\n$1\t" );
}

validKeys.forEach( dataKey =>
{
	if( data[ dataKey ] != null )
	{
		Object.keys( data[ dataKey ] ).forEach( regKey =>
		{
			Object.keys( data[ dataKey ][ regKey ] ).forEach( entry =>
			{
				if( validInfoKeys.includes( dataKey ) )
				{
					if( !validInfo.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "biome_mob_multiplier" )
				{
					if( !validBiomeMobMultiplier.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "fish_pool" )
				{
					if( !validFishPool.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "fish_enchant_pool" )
				{
					if( !validFishEnchantPool.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "level_up_command" )
				{
					if( !validSkills.includes( regKey ) )
						console.log( `"${dataKey}" unexpected value "${regKey}" at "${dataKey}"` );
				}
				else if( dataKey == "player_specific" )
				{
					if( !validPlayerSpecific.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "block_specific" )
				{
					if( !validBlockSpecific.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "item_specific" )
				{
					if( !validItemSpecific.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "skills" )
				{
					if( !validSkillsInfo.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "vein_blacklist" || dataKey == "mob_rare_drop" || dataKey == "biome_effect_negative" || dataKey == "biome_effect_positive" )
				{
					
				}
				else
				{
					if( !validSkills.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				if( entry != "salvageItem" && parseFloat( data[ dataKey ][ regKey ][ entry ] ).toString() == "NaN" )
					console.log( `"${dataKey}" not a valid number "${entry}" at "${regKey}"` );
			
				blacklistChars.forEach( blacklistChar =>
				{
					if( entry.includes( blacklistChar ) && dataKey != "level_up_command" )
						console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${entry}" at "${regKey}"` );
					if( regKey.includes( blacklistChar ) )
						console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${regKey}" at "${entry}" at "${regKey}"` );
					if( dataKey.includes( blacklistChar ) )
						console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${dataKey}" at "${entry}" at "${regKey}"` );
				});
			});
		});
	}
	else
		console.log( `You can also (optionally) use "${dataKey}".` );
});
validKeys2.forEach( dataKey =>
	{
		if( data2[ dataKey ] != null )
		{
			Object.keys( data2[ dataKey ] ).forEach( regKey =>
			{
				Object.keys( data2[ dataKey ][ regKey ] ).forEach( entryKey =>
				{
					Object.keys( data2[ dataKey ][ regKey ][ entryKey ] ).forEach( value =>
					{
						if( dataKey == "salvage" )
						{
							if( !validSalvage.includes( value ) )
								console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}" at ${entryKey}` );
						}
						else if( dataKey == "treasure" )
						{
							if( !validTreasure.includes( value ) )
								console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}" at ${entryKey}` );
						}
						else if( dataKey == "req_use_enchantment" )
						{
							if( isNaN( parseFloat( entryKey ) ) )
								console.log( `"${dataKey}" unexpected non-number value "${entryKey}" at "${regKey}"` );
							if( !validSkills.includes( value ) )
							console.log( `"${dataKey}" unexpected skill "${value}" at "${regKey}", "${entryKey}"` );
						}

						blacklistChars.forEach( blacklistChar =>
						{
							if( value.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${value}" at "${entryKey}" at "${regKey}"` );
							if( entryKey.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${entryKey}" at "${value}" at "${entryKey}" at "${regKey}"` );
							if( regKey.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${regKey}" at "${value}" at "${entryKey}" at "${regKey}"` );
							if( dataKey.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${dataKey}" at "${value}" at "${entryKey}" at "${regKey}"` );
						});
					});
				});
			});
		}
		else
			console.log( `You can also (optionally) use "${dataKey}".` );
	});
Object.keys( data ).forEach( key =>
{
	if( !oldData[ key ] )
		oldData[ key ] = {};
	Object.keys( data[ key ] ).forEach( innerKey =>
	{
		oldData[ key ][ innerKey ] = data[ key ][ innerKey ];
	});
});
Object.keys( data2 ).forEach( key =>
{
	if( !oldData2[ key ] )
		oldData2[ key ] = {};
	Object.keys( data2[ key ] ).forEach( innerKey =>
	{
		oldData2[ key ][ innerKey ] = data2[ key ][ innerKey ];
	});
});
validKeys.forEach( key =>
{
	if( oldData[ key ] )
	{
		fs.writeFileSync( `./data/${key}.json`, stringify( oldData[ key ] ) );
	}
});
validKeys2.forEach( key =>
{
	if( oldData2[ key ] )
	{
		fs.writeFileSync( `./data/${key}.json`, stringify( oldData2[ key ] ) );
	}
});
console.log( "JSON Successfully built!" );

module.exports.data = data;
module.exports.data2 = data2;