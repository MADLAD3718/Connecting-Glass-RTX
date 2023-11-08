import { resetBit, setBit } from "../bit_tricks";
import { Block } from "@minecraft/server";

/**
 * Executes special placement/breaking logic on connecting glass blocks.
 * @param {Block} block 
 * @param {Boolean} placed 
 */
export function alterConnectingGlass(block, placed) {
    let cull_ud = 0, cull_nsew = 0, cnct_ud = 0, cnct_nsew = 0;
    const { permutation } = block;

    const block_u = block.above();
    const block_d = block.below();
    const block_n = block.north();
    const block_s = block.south();
    const block_e = block.east();
    const block_w = block.west();

    cull_ud |= block_u.isSolid << 1;
    cull_ud |= block_d.isSolid << 0;
    cull_nsew |= block_n.isSolid << 3;
    cull_nsew |= block_s.isSolid << 2;
    cull_nsew |= block_e.isSolid << 1;
    cull_nsew |= block_w.isSolid << 0;

    if (block_u.hasTag("connecting_glass")) {
        cnct_ud = setBit(cnct_ud, 1);
        const perm = block_u.permutation;
        const ud = perm.getState("cnct:cnct_ud");
        block_u.setPermutation(perm.withState("cnct:cnct_ud", placed ? setBit(ud, 0) : resetBit(ud, 0)));
    }

    if (block_d.hasTag("connecting_glass")) {
        cnct_ud = setBit(cnct_ud, 0);
        const perm = block_d.permutation;
        const ud = perm.getState("cnct:cnct_ud");
        block_d.setPermutation(perm.withState("cnct:cnct_ud", placed ? setBit(ud, 1) : resetBit(ud, 1)));
    }

    if (block_n.hasTag("connecting_glass")) {
        cnct_nsew = setBit(cnct_nsew, 3);
        const perm = block_n.permutation;
        const nsew = perm.getState("cnct:cnct_nsew");
        block_n.setPermutation(perm.withState("cnct:cnct_nsew", placed ? setBit(nsew, 2) : resetBit(nsew, 2)));
    }

    if (block_s.hasTag("connecting_glass")) {
        cnct_nsew = setBit(cnct_nsew, 2);
        const perm = block_s.permutation;
        const nsew = perm.getState("cnct:cnct_nsew");
        block_s.setPermutation(perm.withState("cnct:cnct_nsew", placed ? setBit(nsew, 3) : resetBit(nsew, 3)));
    }

    if (block_e.hasTag("connecting_glass")) {
        cnct_nsew = setBit(cnct_nsew, 1);
        const perm = block_e.permutation;
        const nsew = perm.getState("cnct:cnct_nsew");
        block_e.setPermutation(perm.withState("cnct:cnct_nsew", placed ? setBit(nsew, 0) : resetBit(nsew, 0)));
    }

    if (block_w.hasTag("connecting_glass")) {
        cnct_nsew = setBit(cnct_nsew, 0);
        const perm = block_w.permutation;
        const nsew = perm.getState("cnct:cnct_nsew");
        block_w.setPermutation(perm.withState("cnct:cnct_nsew", placed ? setBit(nsew, 1) : resetBit(nsew, 1)));
    }

    if (placed) block.setPermutation(permutation.withState("cnct:cull_ud", cull_ud)
                                                .withState("cnct:cull_nsew", cull_nsew)
                                                .withState("cnct:cnct_ud", cnct_ud)
                                                .withState("cnct:cnct_nsew", cnct_nsew));
}
