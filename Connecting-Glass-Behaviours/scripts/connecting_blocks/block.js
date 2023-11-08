import { resetBit, setBit } from "../bit_tricks";
import { Block } from "@minecraft/server";

/**
 * Executes special placement/breaking logic on normal blocks.
 * @param {Block} block 
 * @param {Boolean} placed 
 */
export function alterBlock(block, placed) {
    const { location, dimension } = block;

    const block_n = block.north();
    const block_s = block.south();
    const block_e = block.east();
    const block_w = block.west();

    if (block_n.hasTag("connecting_glass")) {
        const perm = block_n.permutation;
        const nsew = perm.getState("cnct:cull_nsew");
        block_n.setPermutation(perm.withState("cnct:cull_nsew", placed ? setBit(nsew, 2) : resetBit(nsew, 2)));
    }

    if (block_s.hasTag("connecting_glass")) {
        const perm = block_s.permutation;
        const nsew = perm.getState("cnct:cull_nsew");
        block_s.setPermutation(perm.withState("cnct:cull_nsew", placed ? setBit(nsew, 3) : resetBit(nsew, 3)));
    }

    if (block_e.hasTag("connecting_glass")) {
        const perm = block_e.permutation;
        const nsew = perm.getState("cnct:cull_nsew");
        block_e.setPermutation(perm.withState("cnct:cull_nsew", placed ? setBit(nsew, 0) : resetBit(nsew, 0)));
    }

    if (block_w.hasTag("connecting_glass")) {
        const perm = block_w.permutation;
        const nsew = perm.getState("cnct:cull_nsew");
        block_w.setPermutation(perm.withState("cnct:cull_nsew", placed ? setBit(nsew, 1) : resetBit(nsew, 1)));
    }

    if (location.y < dimension.heightRange.max) {
        const block_u = block.above();
        if (block_u.hasTag("connecting_glass")) {
            const perm = block_u.permutation;
            const ud = perm.getState("cnct:cull_ud");
            block_u.setPermutation(perm.withState("cnct:cull_ud", placed ? setBit(ud, 0) : resetBit(ud, 0)));
        }
    }

    if (location.y > dimension.heightRange.min) {
        const block_d = block.below();
        if (block_d.hasTag("connecting_glass")) {
            const perm = block_d.permutation;
            const ud = perm.getState("cnct:cull_ud");
            block_d.setPermutation(perm.withState("cnct:cull_ud", placed ? setBit(ud, 1) : resetBit(ud, 1)));
        }
    }
}
