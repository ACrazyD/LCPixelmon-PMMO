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