import { Factions } from "../../Faction/Factions";
import { Faction } from "../../Faction/Faction";
import { Gang } from "../../Gang/Gang";
import { PlayerObject } from "./PlayerObject";
import { GangConstants } from "../../Gang/data/Constants";

export function canAccessGang(this: PlayerObject): boolean {
  if (this.bitNodeN === 2) {
    return true;
  }
  if (this.sourceFileLvl(2) <= 0) {
    return false;
  }

  return this.karma <= GangConstants.GangKarmaRequirement;
}

export function isAwareOfGang(this: PlayerObject): boolean {
  return this.bitNodeN === 2 || this.sourceFileLvl(2) >= 1;
}

export function getGangFaction(this: PlayerObject): Faction {
  const gang = this.gang;
  if (gang === null) {
    throw new Error("Cannot get gang faction because player is not in a gang.");
  }
  const fac = Factions[gang.facName];
  if (fac == null) {
    throw new Error(`Gang has invalid faction name: ${gang.facName}`);
  }

  return fac;
}

export function getGangName(this: PlayerObject): string {
  if (!this.inGang()) return "";
  const gang = this.gang;
  if (gang === null) {
    throw new Error("Cannot get gang faction because player is not in a gang.");
  }
  return gang.facName;
}

export function hasGangWith(this: PlayerObject, facName: string): boolean {
  if (!this.inGang()) return false;
  const gang = this.gang;
  if (gang === null) {
    throw new Error("Cannot get gang faction because player is not in a gang.");
  }
  return gang.facName === facName;
}

export function inGang(this: PlayerObject): boolean {
  if (this.gang == null || this.gang == undefined) {
    return false;
  }

  return this.gang instanceof Gang;
}

export function startGang(this: PlayerObject, factionName: string, hacking: boolean): void {
  this.gang = new Gang(factionName, hacking);

  const fac = Factions[factionName];
  if (fac == null) {
    throw new Error(`Invalid faction name when creating gang: ${factionName}`);
  }
  fac.playerReputation = 0;
}
