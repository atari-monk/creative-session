import bpy
import cabin_addon.foundation_block as foundation_block
import cabin_addon.foundation_block_option as foundation_block_option

# Usage example:
options = foundation_block_option.FoundationBlockOption((2, 2, 0.5), (0, 0, 0))
foundation_block = foundation_block.FoundationBlock()
foundation_block.generate_from_concrete(options)
