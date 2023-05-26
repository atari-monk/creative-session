import bpy


class FoundationBlockOption:
    def __init__(self, size, position):
        self.size = size
        self.position = position


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


class GridGenerator:
    def __init__(self):
        self.blocks = []

    def generate_grid(self, block_options):
        for option in block_options:
            foundation_block = FoundationBlock()
            block = foundation_block.generate_from_concrete(option)
            self.blocks.append(block)

        # Connect the blocks with edges to form a grid
        self.connect_blocks()

    def connect_blocks(self):
        bpy.ops.object.select_all(action='DESELECT')

        for block in self.blocks:
            block.select_set(True)
            bpy.context.view_layer.objects.active = block

        bpy.ops.object.join()


# Usage example:
block_options = [
    FoundationBlockOption((2, 2, 0.5), (0, 0, 0)),
    FoundationBlockOption((2, 2, 0.5), (4, 0, 0)),
    FoundationBlockOption((2, 2, 0.5), (0, 4, 0)),
    FoundationBlockOption((2, 2, 0.5), (4, 4, 0)),
]

grid_generator = GridGenerator()
grid_generator.generate_grid(block_options)
