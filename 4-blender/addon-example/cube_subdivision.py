import bpy

bl_info = {
    "name": "Cube with Subdivision",
    "author": "atari-monk",
    "version": (1, 0),
    "blender": (2, 80, 0),
    "location": "Add > Mesh > Cube with Subdivision",
    "description": "Adds a cube with Subdivision Modifier",
    "category": "Add Mesh"
}


def add_cube_subdivision():
    bpy.ops.mesh.primitive_cube_add()
    cube = bpy.context.object
    mod = cube.modifiers.new(name="Subdivision", type='SUBSURF')
    mod.levels = 2


class OBJECT_OT_add_cube_subdivision(bpy.types.Operator):
    bl_idname = "mesh.add_cube_subdivision"
    bl_label = "Cube with Subdivision"
    bl_description = "Adds a cube with Subdivision Modifier"
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        add_cube_subdivision()
        return {'FINISHED'}


def menu_func(self, context):
    self.layout.operator(OBJECT_OT_add_cube_subdivision.bl_idname)


def register():
    bpy.utils.register_class(OBJECT_OT_add_cube_subdivision)
    bpy.types.VIEW3D_MT_mesh_add.append(menu_func)


def unregister():
    bpy.utils.unregister_class(OBJECT_OT_add_cube_subdivision)
    bpy.types.VIEW3D_MT_mesh_add.remove(menu_func)


if __name__ == "__main__":
    register()
