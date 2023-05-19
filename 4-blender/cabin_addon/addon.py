import bpy
from . import foundation_block
from . import foundation_block_option

# Register the add-on


def register():
    bpy.utils.register_class(foundation_block.FoundationBlock)
    bpy.utils.register_class(foundation_block_option.FoundationBlockOption)

# Unregister the add-on


def unregister():
    bpy.utils.unregister_class(foundation_block.FoundationBlock)
    bpy.utils.unregister_class(foundation_block_option.FoundationBlockOption)
