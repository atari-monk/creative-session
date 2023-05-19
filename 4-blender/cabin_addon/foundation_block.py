import bpy


class FoundationBlock:
    def __init__(self):
        pass

    def generate_from_concrete(self, options):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
        block = bpy.context.object

        block.scale = options.size
        block.location = options.position
        block.name = "Foundation Block"

        # Apply concrete material to the block
        self.apply_concrete_material(block)

        return block

    def apply_concrete_material(self, block):
        # Create a new material
        material = bpy.data.materials.new(name="Concrete")
        block.data.materials.append(material)

        # Configure the material properties (e.g., color, roughness)
        # ...
