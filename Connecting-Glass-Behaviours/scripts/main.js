import { world, PlayerPlaceBlockAfterEvent, PlayerBreakBlockAfterEvent } from "@minecraft/server";
import { alterConnectingGlass } from "./connecting_blocks/connecting_glass";
import { alterBlock } from "./connecting_blocks/block";

world.afterEvents.playerPlaceBlock.subscribe(placeBlock);
world.afterEvents.playerBreakBlock.subscribe(breakBlock);

/**
 * Calls events based on which block was placed.
 * @param {PlayerPlaceBlockAfterEvent} event 
 */
function placeBlock(event) {
    if (event.block.hasTag("connecting_glass")) alterConnectingGlass(event.block, true);
    else if (event.block.isSolid) alterBlock(event.block, true);
}

/**
 * Calls events based on which block was broken.
 * @param {PlayerBreakBlockAfterEvent} event 
 */
function breakBlock(event) {
    if (event.brokenBlockPermutation.hasTag("connecting_glass"))
        alterConnectingGlass(event.block, false);
    else alterBlock(event.block, false);
}